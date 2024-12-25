// components/ProgressBar.tsx
interface ProgressBarProps {
  progress: number
  progressMessage: string
}

const ProgressBar = ({ progress, progressMessage }: ProgressBarProps) => {
  return (
    <div className='mt-4'>
      <div className='relative'>
        <div className='relative h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm'>
          {/* 背景闪光效果 */}
          <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse' />

          {/* 主进度条 */}
          <div className='relative h-full transition-all duration-300' style={{ width: `${progress}%` }}>
            {/* 渐变底色 */}
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500' />

            {/* 流光效果 1 */}
            <div className='absolute inset-0 animate-shine-slow opacity-70'>
              <div className='w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent' />
            </div>

            {/* 流光效果 2 */}
            <div className='absolute inset-0 animate-shine-fast opacity-50'>
              <div className='w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent' />
            </div>

            {/* 边缘光晕 */}
            <div className='absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-sm animate-glow' />

            {/* 粒子效果 */}
            <div className='absolute inset-0 overflow-hidden'>
              <div className='particles-container'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className='particle absolute bg-white/80 rounded-full'
                    style={{
                      width: '2px',
                      height: '2px',
                      animation: `particle-float ${2 + i * 0.5}s infinite linear`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 进度数值圆环 */}
        <div className='flex justify-center mt-3'>
          <div className='relative w-12 h-12 flex items-center justify-center'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse'></div>
            <div className='absolute inset-0.5 bg-gray-800 rounded-full'></div>
            <div className='relative text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse'>
              {progress}%
            </div>
            <div className='absolute inset-0 border border-purple-500/30 rounded-full'></div>
            <div
              className='absolute inset-0 border border-transparent border-t-purple-500 rounded-full'
              style={{
                transform: `rotate(${progress * 3.6}deg)`,
                transition: 'transform 0.3s ease-out'
              }}></div>
          </div>
        </div>
      </div>
      {/* 进度文字 */}
      <p className='text-center text-sm text-gray-400 mt-2 animate-pulse'>{progressMessage}</p>
    </div>
  )
}

export default ProgressBar
