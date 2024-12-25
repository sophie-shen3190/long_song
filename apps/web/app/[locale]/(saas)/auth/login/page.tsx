// page.tsx (服务器端组件)
import { getTranslations } from 'next-intl/server'
import { LoginClient } from './LoginPage'

export async function generateMetadata() {
  const t = await getTranslations()
  return {
    title: t('auth.login.title')
  }
}

export default function LoginPage() {
  return <LoginClient />
}
