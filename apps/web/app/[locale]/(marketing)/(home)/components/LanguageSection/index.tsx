import Link from 'next/link'
import AnimatedButton from '../../../../components/AnimatedButton'

export const LanguageSection = () => {
  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className='space-y-8'>
            {/* 按钮 */}
            <Link href='/ai-music-generator' target='_blank'>
              <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity'>
                makesong Now
              </button>
            </Link>

            {/* <AnimatedButton text1='makesong Now' /> */}

            {/* 标题 */}
            <h3 className='text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500'>
              Make AI Songs in Any Language
            </h3>

            {/* 语言列表 */}
            <div className='flex flex-wrap justify-center gap-4 text-gray-400'>
              <div className='flex items-center space-x-2'>
                <span className='w-2 h-2 rounded-full bg-purple-500'></span>
                <span>English Song</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='w-2 h-2 rounded-full bg-pink-500'></span>
                <span>German Songs</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='w-2 h-2 rounded-full bg-purple-400'></span>
                <span>Brazilian Song</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='w-2 h-2 rounded-full bg-pink-400'></span>
                <span>Russian Song</span>
              </div>
              <div className='flex items-center space-x-2 text-gray-400 italic'>
                <span>and more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
