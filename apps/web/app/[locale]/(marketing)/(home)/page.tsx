import { FaqSection } from '@marketing/home/components/FaqSection'
import { Features } from '@marketing/home/components/Features'
import { Footer } from '@marketing/shared/components/Footer'
import { Hero } from '@marketing/home/components/Hero'
import { Clock, Globe, Music, Sparkles, Mic2 } from 'lucide-react'
import Head from 'next/head'
import MusicEdit from './components/MusicEdit'
import MusicShowcase2 from './components/MusicShowcase2/MusicShowcase'
import HomeSongFeatures from './components/HomeSongFeatures'
import AiSongGenerator from './components/AiSongGenerator'
import FaqSectionPro from './components/FaqSectionPro'
import TestimonialSection from './components/TestimonialSection'
import { LanguageSection } from './components/LanguageSection'
import AnimatedButton from '../../components/AnimatedButton'
import AudioVisualizer from './components/AudioVisualizer'
import MusicBackground from './components/MusicBackground'
import HeroBackground from './components/HeroBackground'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MakeSong: Free AI Music & Song Generator ',
  description:
    'MakeSong is an all-in-one AI-powered music and song generator that creates high-quality, royalty-free tracks. We also offer make-song tools like Vocal Remover to help you create professional-grade music for videos, social media, and more.'
  // keywords: ['ai music generator', 'music ai', 'song generator', 'lyrics to music', 'ai composer'],
}

export default function Home() {
  return (
    <>
      {/* <Head>
        <title>MakeSong: Free AI Music & Song Generator</title>
        <meta
          name='description'
          content='MakeSong is an all-in-one AI-powered music and song generator that creates high-quality, royalty-free tracks. We also offer make-song tools like Vocal Remover to help you create professional-grade music for videos, social media, and more.'
        />
        <link rel='canonical' href='https://makesong.com' />
      </Head> */}
      {/* <AudioVisualizer /> */}

      <div className='relative min-h-screen'>
        {/* 背景容器 */}
        <div className='absolute inset-0 overflow-hidden'>
          <MusicBackground />
        </div>

        {/* 主要内容，确保在背景之上 */}
        <div className='container pt-32 text-center relative z-10'>
          <div className='relative'>
            {/* <h1 className='mx-auto max-4xl text-balance font-bold text-5xl lg:text-7xl sm:pb-8 xl:pb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-floating'>
              AI Music & Song Generator
            </h1> */}

            <h1 className='mx-auto text-white max-4xl text-balance font-bold text-5xl lg:text-7xl sm:pb-8 xl:pb-8  animate-floating'>
              AI Music & Song Generator
            </h1>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-400 mb-8'>Just describe it, makesongs in seconds</h2>
            <div className='flex flex-wrap justify-center gap-4 mb-8'>
              <span className='px-4 py-2 bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 flex items-center gap-2'>
                <Music className='w-4 h-4 text-purple-400' />
                Text/Lyric to music
              </span>
              <span className='px-4 py-2 bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 flex items-center gap-2'>
                <Sparkles className='w-4 h-4 text-pink-400' />
                100% Royalty-free
              </span>
              <span className='px-4 py-2 bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 flex items-center gap-2'>
                <Mic2 className='w-4 h-4 text-purple-400' />
                Support Isolate Vocals & Instrumental
              </span>
            </div>
          </div>

          <section className='pb-20'>
            <MusicEdit />
          </section>
        </div>
      </div>

      {/* 音乐展示 */}
      <MusicShowcase2 />
      <LanguageSection />
      <HomeSongFeatures />
      <AiSongGenerator />
      <FaqSectionPro />
      <TestimonialSection />
      {/* <Features /> */}
      {/* <FaqSection /> */}
      <Head>
        <title>AI Music Generator | Create Royalty Free Music</title>
        <meta
          name='description'
          content='Create unlimited royalty-free music using advanced AI. Transform your lyrics or descriptions into professional songs instantly.'
        />
        <meta name='keywords' content='ai music generator, music ai, song generator, lyrics to music, ai composer' />
        <meta property='og:title' content='AI Music Generator | Create Royalty Free Music' />
        <meta property='og:description' content='Create unlimited royalty-free music using advanced AI technology.' />
        <link rel='canonical' href='https://yourdomain.com' />
      </Head>
      <main className=' bg-gradient-to-b from-gray-900 to-black text-white'>
        {/* <section className='relative h-screen flex items-center justify-center'>
          <div className='absolute inset-0 bg-gradient-radial from-purple-500/10 to-transparent' />
          <div className='container mx-auto px-4 text-center z-10'>
            <h1 className='text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6'>
              AI Music Creator
            </h1>
            <p className='text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8'>
              Transform your words into professional music using advanced AI technology
            </p>
            <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition'>
              Start Creating Now
            </button>
          </div>
        </section> */}

        <section className='py-20 bg-gray-900/50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Why Choose Our AI Music Generator?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {features.map((feature, index) => (
                <div key={index} className='p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm'>
                  <feature.icon className='w-12 h-12 text-purple-400 mb-4' />
                  <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                  <p className='text-gray-400'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

const features = [
  {
    icon: Music,
    title: '100% Royalty Free',
    description: 'Use generated music in any project without worrying about licensing'
  },
  {
    icon: Globe,
    title: 'Multiple Languages',
    description: 'Create music in any language with our advanced AI technology'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Get help anytime with our round-the-clock customer support'
  }
]

const testimonials = [
  {
    content: 'This AI music generator has revolutionized my creative process. Amazing results!',
    name: 'Sarah Johnson',
    title: 'Content Creator'
  }
  // Add more testimonials...
]
