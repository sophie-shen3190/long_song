// components/AiSongGenerator.tsx
import { Music, Mic, Gamepad, Radio, Speaker } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Music,
    title: '🎵 makesong for Social Media Creators',
    content: [
      'Unleash Infinite Music Possibilities with MakeSong.com',
      "Create unique background music perfect for videos and social media content, whether you're crafting 30-second tracks for TikTok or 4-minute background music for YouTube, boosting audience engagement and increasing video chances of video going viral."
    ]
  },
  {
    icon: Mic,
    title: 'makesong for Independent Musicians',
    content: [
      'True 100% royalty-free',
      "Generate professional-quality tracks effortlessly. Whether you're looking for a full-length album or a single track, create original music that matches your style and resonates with your audience."
    ]
  },
  {
    icon: Gamepad,
    title: '🎮 Generate Custom Music for Your Game',
    content: [
      "MakeSong can generate a wide range of game music styles, tailored to the game's plot, setting, and atmosphere.",
      'Whether the game requires mysterious, tense, or relaxed background music, our generated music will enhance the immersive experience for players.',
      'Free Download video games royalty-free audio tracks and instrumentals.'
    ]
  },
  {
    icon: Radio,
    title: '🎙️ Get Free Music for Your Podcast,Royalty-Free Podcast Music',
    content: [
      'Are you still navigating copyright issues? With MakeSong, you can create high-quality, unique tracks for free.',
      'Our platform allows you to generate music tailored to specific genres and moods, and it offers a wide variety of sound effects ideal for audio dramas and narration.'
    ]
  },
  {
    icon: Speaker,
    title: '📢 Music for advertising -Jingles: Short songs or tunes',
    content: [
      'With MakeSong, we offer brands and advertisers the ability to create custom commercial songs, specializing in crafting catchy jingles.',
      "Our tool allows brands to generate custom 'earworms' that enhance their sound branding and leave a memorable impact on their audience."
    ]
  }
]

export function AiSongGenerator() {
  return (
    <section className='py-20 bg-gray-900/50'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-4 mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
            AI Song Generator For Any Moment
          </h2>
          <p className='text-xl text-gray-400'>makesongs perfect for videos, social media, and more</p>
        </div>

        <div className='space-y-6'>
          {features.map((feature, index) => (
            <div key={index} className='rounded-xl border border-gray-800 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300'>
              <div className='p-6 border-b border-gray-800'>
                <h3 className='flex items-center gap-3 font-semibold text-lg'>
                  <feature.icon className='w-6 h-6 text-purple-400' />
                  <span className='text-purple-400'>{feature.title}</span>
                </h3>
              </div>
              <div className='p-6 space-y-3 text-gray-400'>
                {feature.content.map((text, idx) => (
                  <p key={idx} className='leading-relaxed'>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link href='/ai-music-generator' target='_blank'>
            <button className='h-12 px-8 text-lg rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity'>
              Music Maker Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AiSongGenerator
