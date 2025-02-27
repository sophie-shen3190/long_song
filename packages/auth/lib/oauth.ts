import { OAuth2RequestError } from 'arctic'
import { db } from 'database'
import { logger } from 'logs'
import { cookies } from 'next/headers'
import { createSessionCookie } from './cookies'
import { createSession, generateSessionToken } from './sessions'

export function createOauthRedirectHandler(
  providerId: string,
  createAuthorizationTokens: () => {
    state: string
    codeVerifier?: string
    url: URL
  }
) {
  return async () => {
    const cookieStore = await cookies()
    const { url, state, codeVerifier } = createAuthorizationTokens()

    cookieStore.set(`${providerId}_oauth_state`, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax'
    })

    if (codeVerifier) {
      // store code verifier as cookie
      cookieStore.set('code_verifier', codeVerifier, {
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        httpOnly: true,
        maxAge: 60 * 10 // 10 min
      })
    }

    return Response.redirect(url)
  }
}

// 这里是辅助函数的定义
function serializeCookieOptions(options: {
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  path?: string
  maxAge?: number
}) {
  const parts = []

  if (options.httpOnly) parts.push('HttpOnly')
  if (options.secure) parts.push('Secure')
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`)
  if (options.path) parts.push(`Path=${options.path}`)
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`)

  return parts.join('; ')
}

export function createOauthCallbackHandler(
  providerId: string,
  validateAuthorizationCode: (
    code: string,
    codeVerifier?: string
  ) => Promise<{
    email: string
    name?: string
    id: string
    avatar?: string
  }>
) {
  return async (req: Request) => {
    const cookieStore = await cookies()
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = cookieStore.get(`${providerId}_oauth_state`)?.value ?? null
    const storedCodeVerifier = cookieStore.get('code_verifier')?.value ?? null

    console.log('faith=============faithfaithfaithfaithfaithfaithfaithfaithfaithfaithfaithfaithfaith')

    if (!code || !state || !storedState || state !== storedState) {
      logger.error(`Invalid state or code parameters for provider ${providerId}`)

      return new Response(null, {
        status: 400
      })
    }

    console.log('faith=============8888888888888888888888888888888???')

    const cookieOptions = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7天
    }

    console.log('faith=============999999999999999999999', code, storedCodeVerifier)
    try {
      const oauthUser = await validateAuthorizationCode(code, storedCodeVerifier ?? undefined)

      console.log('faith=============7777777777777777777777777777', oauthUser)
      const headers = new Headers()
      headers.set('Location', '/auth/login?demo=' + oauthUser.email)
      console.log('faith=============888888888888888888888888888')

      // 使用 append 而不是 set 来添加多个 cookie
      headers.append('Set-Cookie', `oauth_email=${oauthUser.email}; ${serializeCookieOptions(cookieOptions)}`)
      headers.append('Set-Cookie', `oauth_id=${oauthUser.id}; ${serializeCookieOptions(cookieOptions)}`)

      if (oauthUser.name) {
        headers.append('Set-Cookie', `oauth_name=${oauthUser.name}; ${serializeCookieOptions(cookieOptions)}`)
      }

      if (oauthUser.avatar) {
        headers.append('Set-Cookie', `oauth_avatar=${oauthUser.avatar}; ${serializeCookieOptions(cookieOptions)}`)
      }

      console.log('faith=============oauthUser', oauthUser)
      return new Response(null, {
        status: 302,
        headers
      })

      const existingUser: any = await db.user.findFirst({
        where: {
          OR: [
            {
              oauthAccounts: {
                some: {
                  providerId,
                  providerUserId: oauthUser.id
                }
              }
            },
            {
              email: oauthUser.email.toLowerCase()
            }
          ]
        },
        select: {
          id: true,
          oauthAccounts: {
            select: {
              providerId: true
            }
          }
        }
      })

      if (existingUser) {
        if (!existingUser.oauthAccounts.some((account: any) => account.providerId === providerId)) {
          await db.userOauthAccount.create({
            data: {
              providerId,
              providerUserId: oauthUser.id,
              userId: existingUser.id
            }
          })
        }

        const sessionToken = generateSessionToken()
        await createSession(sessionToken, existingUser.id)
        cookieStore.set(createSessionCookie(sessionToken))

        return new Response(null, {
          status: 302,
          headers: {
            Location: '/app'
          }
        })
      }

      const newUser = await db.user.create({
        data: {
          email: oauthUser.email.toLowerCase(),
          emailVerified: true,
          name: oauthUser.name,
          avatarUrl: oauthUser.avatar
        }
      })

      await db.userOauthAccount.create({
        data: {
          providerId,
          providerUserId: oauthUser.id,
          userId: newUser.id
        }
      })
      const sessionToken = generateSessionToken()
      await createSession(sessionToken, newUser.id)
      cookieStore.set(createSessionCookie(sessionToken))

      return new Response(null, {
        status: 302,
        headers: {
          Location: '/app'
        }
      })
    } catch (e) {
      logger.error('Could not handle oAuth request', e)

      if (e instanceof OAuth2RequestError) {
        return new Response(null, {
          status: 400
        })
      }

      return new Response(null, {
        status: 500
      })
    }
  }
}
