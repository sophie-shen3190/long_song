import { Google, generateCodeVerifier, generateState } from 'arctic'
import { getBaseUrl } from 'utils'
import { NextApiResponse } from 'next'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { createOauthCallbackHandler, createOauthRedirectHandler } from '../lib/oauth'
console.log('faith=============process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)
export const googleAuth = new Google(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  new URL('/api/oauth/google/callback', getBaseUrl()).toString()
)

const GOOGLE_PROIVDER_ID = 'google'

type GoogleUser = {
  sub: string
  email: string
  email_verified?: boolean
  picture?: string
  name: string
}

export const googleRouteHandler = createOauthRedirectHandler(GOOGLE_PROIVDER_ID, () => {
  console.log('faith=============????-GOOGLE_PROIVDER_ID', GOOGLE_PROIVDER_ID)
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  console.log('faith=============state-codeVerifier', state, codeVerifier)
  const url = googleAuth.createAuthorizationURL(state, codeVerifier, ['profile', 'email'])

  console.log('faith=============url', url)

  return {
    state,
    url,
    codeVerifier
  }
})

export const googleCallbackRouteHandler = createOauthCallbackHandler(GOOGLE_PROIVDER_ID, async (code, verifier) => {
  console.log('faith=============code-verifier', code, verifier)
  const tokens = await googleAuth.validateAuthorizationCode(code, verifier as string)

  console.log('faith=============tokens---tokens', tokens)

  const googleUserResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`
    }
  })

  const googleUser = (await googleUserResponse.json()) as GoogleUser

  return {
    id: googleUser.sub,
    email: googleUser.email,
    name: googleUser.name,
    avatar: googleUser.picture
  }
})

// export async function googleCallbackRouteHandler(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams
//     const code = searchParams.get('code')
//     const verifier = searchParams.get('verifier')

//     if (!code || !verifier) {
//       return new Response(null, {
//         status: 302,
//         headers: {
//           Location: '/auth/error?error=missing_parameters'
//         }
//       })
//     }

//     const tokens = await googleAuth.validateAuthorizationCode(code, verifier)

//     console.log('faith=============tokenstokens', tokens)

//     const googleUserResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
//       headers: {
//         Authorization: `Bearer ${tokens.accessToken()}`
//       }
//     })

//     if (!googleUserResponse.ok) {
//       throw new Error('Failed to fetch user info')
//     }

//     const googleUser = (await googleUserResponse.json()) as GoogleUser

//     const user = {
//       id: googleUser.sub,
//       email: googleUser.email,
//       name: googleUser.name,
//       avatar: googleUser.picture
//     }

//     console.log('faith=============user', user)

//     // 处理认证成功的情况，这里可以根据需要修改重定向地址和参数
//     return new Response(null, {
//       status: 302,
//       headers: {
//         Location: `/auth/success?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}`
//       }
//     })
//   } catch (error) {
//     console.error('Google OAuth callback error:', error)
//     return new Response(null, {
//       status: 302,
//       headers: {
//         Location: '/auth/error?error=authentication_failed'
//       }
//     })
//   }
// }
