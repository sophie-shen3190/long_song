// ClientWrapper.tsx - 客户端包装组件
'use client'

import dynamic from 'next/dynamic'

const AnimatedLogo = dynamic(() => import('./AnimatedLogo'), {
  ssr: false
})

export default AnimatedLogo
