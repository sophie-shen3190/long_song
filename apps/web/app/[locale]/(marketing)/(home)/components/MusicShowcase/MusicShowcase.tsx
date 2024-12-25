// components/MusicShowcase.tsx
import dynamic from 'next/dynamic'
import ScrollingMusic from './ScrollingMusic'

const musicRow1 = [
  {
    title: 'DNA',
    genre: 'Chicago rap, soulful',
    plays: '293K',
    likes: '7.7K',
    gradient: 'from-blue-500 to-green-500'
  },
  {
    title: 'Starlight',
    genre: 'Vintage soul, R&B',
    plays: '145K',
    likes: '3.8K',
    gradient: 'from-yellow-500 to-red-500'
  },
  {
    title: 'Running Back',
    genre: 'Stripped back ambient',
    plays: '119K',
    likes: '2.6K',
    gradient: 'from-purple-500 to-pink-500'
  }
  // 添加更多音乐...
]

const musicRow2 = [
  {
    title: 'Circles',
    genre: 'Electronic, jazz',
    plays: '252K',
    likes: '5.9K',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Curtains',
    genre: 'Rasta rap, soulful',
    plays: '140K',
    likes: '1.8K',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Turkey Time',
    genre: 'Rap, vocal',
    plays: '148K',
    likes: '1.9K',
    gradient: 'from-green-500 to-teal-500'
  }
  // 添加更多音乐...
]

export default function MusicShowcase() {
  return (
    <div className='bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4'>
      {/* 标题部分 */}
      <h2 className='text-4xl md:text-5xl text-center font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text'>
        Generate high-quality music in seconds with MakeSong.com
      </h2>
      <h3 className='text-xl md:text-2xl text-center text-gray-400 mb-12'>Any Style of Music, From Pop to Classical</h3>

      {/* 音乐展示区域 */}
      <div className='space-y-8'>
        {/* 第一排 */}
        <div className='overflow-hidden relative'>
          <ScrollingMusic />
        </div>
      </div>

      {/* 特性标签 */}
      <div className='flex flex-wrap justify-center gap-4 mt-12'>
        {['Hip Hop music generator', 'AI rap song maker', 'Rock music generator', 'Instrumental song maker'].map((feature, index) => (
          <div key={index} className='bg-white bg-opacity-10 px-6 py-2 rounded-full flex items-center gap-2'>
            <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
            </svg>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
