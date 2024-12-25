'use client'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface MusicItem {
  title: string
  genre: string
  plays: string
  likes: string
  gradient: string
}

const MusicCard = ({ title, genre, plays, likes, gradient }: MusicItem) => (
  <div className='min-w-[280px] bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300'>
    <div className={`h-48 bg-gradient-to-r ${gradient}`}></div>
    <div className='p-4'>
      <h4 className='font-bold text-lg'>{title}</h4>
      <p className='text-gray-400'>{genre}</p>
      <div className='flex items-center mt-2 text-gray-400'>
        <span className='text-sm'>{plays} plays</span>
        <span className='mx-2'>•</span>
        <span className='text-sm'>{likes} likes</span>
      </div>
    </div>
  </div>
)

interface ScrollingMusicProps {
  items: MusicItem[]
}

export function ScrollingMusic({ items }: ScrollingMusicProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: false,
      dragFree: true
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  )

  return (
    <div className='overflow-hidden' ref={emblaRef}>
      <div className='flex gap-6'>
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className='flex-none'>
            <MusicCard {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

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
  },
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
  },
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

// 使用示例
const MusicSection = () => {
  return (
    <div className='space-y-8'>
      <div className='overflow-hidden relative'>
        <ScrollingMusic items={musicRow1} />
      </div>
    </div>
  )
}

export default MusicSection
