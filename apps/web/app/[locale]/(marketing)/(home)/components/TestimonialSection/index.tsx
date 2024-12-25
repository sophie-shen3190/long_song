import Link from 'next/link'
import { FC } from 'react'

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Content Creator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content:
      "I always struggled to find the right background music... until I found MakeSong. Just made a hopeful-sounding track for my latest video, and everyone's asking where I got it from! 🎶",
    tags: ['#IndieMusic', '#MusicDiscovery']
  },
  {
    name: 'Marcus L.',
    role: 'Game Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    content:
      'Used Makesong to generate atmospheric music for my indie game. The custom instrumental mode gave me exactly the mysterious vibe I needed. Saved thousands on music production!'
  },
  {
    name: 'Emily R.',
    role: 'Podcast Host',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    content:
      "I've been creating ambient music for years, and MakeSong's generated tracks are exactly what I needed. The spatial audio quality and stereo field created by the AI are surprisingly impressive—saved me hours of post-processing! 🎧",
    tags: ['#ProducerLife']
  },
  {
    name: 'Lisa M.',
    role: 'TikTok Influencer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    content:
      "My TikTok views doubled after using Makesong's custom tracks! The 30-second music snippets are perfect for my content, and the style variety keeps things fresh."
  },
  {
    name: 'Tom W.',
    role: 'Independent Musician',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
    content:
      "Say goodbye to copyright headaches! The music MakeSong generates sounds so natural—none of that robotic AI vibe. It's perfect for my podcast intros. 🎵",
    tags: ['#ContentCreator']
  },
  {
    name: 'Rachel N.',
    role: 'Wedding Filmmaker',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    content:
      'Generated custom romantic tracks for highlight reels. Clients love how the music enhances their special moments. No more generic wedding music!'
  }
]

const TestimonialSection: FC = () => {
  return (
    <section className='relative py-20 overflow-hidden bg-gray-900/50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
          Inspiring Music, Real Creator Stories
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-purple-500/10'>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  {/* 头像区域 */}
                  <div className='relative'>
                    <div className='w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]'>
                      <div className='w-full h-full rounded-full overflow-hidden bg-gray-800'>
                        <img src={testimonial.avatar} alt={testimonial.name} className='w-full h-full object-cover' />
                      </div>
                    </div>
                    {/* 在线状态指示器 */}
                    <div className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-gray-800'></div>
                  </div>
                  {/* 用户信息 */}
                  <div>
                    <div className='font-semibold text-purple-400'>{testimonial.name}</div>
                    <div className='text-sm text-gray-400'>{testimonial.role}</div>
                  </div>
                </div>

                {/* 评价内容 */}
                <p className='text-gray-400'>{testimonial.content}</p>

                {/* 标签 */}
                {testimonial.tags && (
                  <div className='flex flex-wrap gap-2'>
                    {testimonial.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className='text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/20'>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center space-y-8'>
          <h3 className='text-2xl md:text-3xl font-bold'>
            With MakeSong,
            <br />
            Make your musical dreams come true with ease!
          </h3>
          <Link href='/ai-music-generator' target='_blank'>
            <button className='h-12 px-8  mt-3 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity'>
              Song Maker AI
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
