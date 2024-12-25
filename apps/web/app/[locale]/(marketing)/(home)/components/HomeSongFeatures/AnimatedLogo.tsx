// components/AnimatedLogo.tsx
'use client'

const AnimatedLogo = () => {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 z-10'>
      <div className='relative w-full h-full'>
        <img
          src='/shaonv_logo.png'
          alt='Anime Singer'
          className='w-full h-full object-contain'
          style={{
            filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))',
            animation: 'pulse 2s infinite'
          }}
        />
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default AnimatedLogo
