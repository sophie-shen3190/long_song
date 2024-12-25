// LoginClient.tsx (客户端组件)
'use client'
import { useEffect, useCallback } from 'react'
import { LoginForm } from '@saas/auth/components/LoginForm'
import { supabase } from '../../../../lib/supabaseClient'

export function LoginClient() {
  const checkAndCreateUser = useCallback(async (username: string, email?: string, avatarUrl?: string) => {
    const { data: existingUser, error: searchError } = await supabase.from('song_user').select('*').eq('username', username).single()

    if (searchError && searchError.code !== 'PGRST116') {
      console.error('Error checking user:', searchError)
      throw searchError
    }

    if (existingUser) {
      const { data: updatedUser, error: updateError } = await supabase
        .from('song_user')
        .update({
          last_login_time: new Date().toISOString(),
          email: email || existingUser.email,
          avatar_url: avatarUrl || existingUser.avatar_url
        })
        .eq('username', username)
        .select()
        .single()

      if (updateError) {
        console.error('Error updating user:', updateError)
        throw updateError
      }

      return updatedUser
    }

    const { data: newUser, error: insertError } = await supabase
      .from('song_user')
      .insert([
        {
          username,
          email,
          avatar_url: avatarUrl,
          last_login_time: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (insertError) {
      console.error('Error creating user:', insertError)
      throw insertError
    }

    return newUser
  }, [])

  const handleUserLogin = useCallback(
    async (username: string, email?: string, avatarUrl?: string) => {
      try {
        const user = await checkAndCreateUser(username, email, avatarUrl)
        console.log('User processed:', user)
        return user
      } catch (error) {
        console.error('Error processing user:', error)
        throw error
      }
    },
    [checkAndCreateUser]
  )

  useEffect(() => {
    handleUserLogin('supermanklk', 'faith1314666@gmai.com', 'xxxxx')
  }, [])

  return <LoginForm />
}
