// HomeSongFeatures.jsx
import Link from 'next/link'
import AudioPlayer from './AudioPlayer'
import AnimatedLogo from './ClientWrapper'
const HomeSongFeatures = () => {
  return (
    <section className='py-20 bg-gray-900/50'>
      <div className='container mx-auto px-4'>
        {/* 顶部标题部分 */}
        <div className='text-center mb-16'>
          <h3 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-8'>
            Make Unlimited Song with AI
          </h3>

          {/* 两种模式说明 */}
          <div className='grid md:grid-cols-2 gap-8 mb-12 relative'>
            {/* Description Mode */}
            <div className='p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm'>
              <h3 className='text-2xl font-semibold mb-4 text-purple-400'>Song Description Mode—Text to music</h3>
              <p className='text-gray-400 mb-4'>
                Just enter your song description and create unique songs in just a few clicks. Generate unlimited royalty-free music to use
                in your songs, projects, and videos.
              </p>
              <p className='text-gray-400 italic'>
                Click 'AI-Generated' to transform your brief prompt into a detailed, professional description. Let us help you create better
                music.
              </p>
            </div>

            {/* Center Image */}
            {/* <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 z-10'>
              <img
                src='/shaonv_logo.png'
                alt='Anime Singer'
                className='w-full h-full object-contain'
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))'
                }}
              />
            </div> */}

            {/* Customer Mode */}
            <div className='p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm'>
              <h3 className='text-2xl font-semibold mb-4 text-purple-400'>Customer Mode—Turn Lyrics into a Song</h3>
              <p className='text-gray-400 mb-4'>
                JMakeSong supports direct input of lyrics to create music. Generate 100% royalty-free songs with ease!
              </p>
              <p className='text-gray-400'>The lyrics generator uses advanced AI to create unique lyrics based on your prompts.</p>
            </div>
          </div>
          <Link href='/ai-music-generator' target='_blank'>
            <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity'>
              Free AI song generator
            </button>
          </Link>
        </div>

        <div className='max-w-7xl mx-auto space-y-24 py-12'>
          {/* Header */}
          <div className='text-center space-y-4'>
            <h2 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600'>
              A new tool for Song Makers
            </h2>
            <p className='text-gray-400 max-w-2xl mx-auto'>Create, split, and transform your music with our AI-powered tools</p>
          </div>

          {/* Vocal Remover Section */}
          <div className='grid md:grid-cols-2 gap-16 items-center rounded-2xl bg-gradient-to-b from-gray-800/30 to-transparent p-8'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h3 className='text-3xl font-bold text-white'>
                  <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500'>
                    Vocal Remover & Instrumental AI Splitter
                  </span>
                </h3>
                <ul className='space-y-6 text-gray-300'>
                  <li className='flex items-start gap-4'>
                    <div className='w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0'>
                      <span className='text-purple-400'>•</span>
                    </div>
                    <span>
                      Once the song is generated, click the Splitter button. You will get two tracks: a karaoke version and an acapella
                      version.
                    </span>
                  </li>
                  <li className='flex items-start gap-4'>
                    <div className='w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0'>
                      <span className='text-purple-400'>•</span>
                    </div>
                    <span>Import your own music files and let AI separate the vocals from the instrumental.</span>
                  </li>
                </ul>
              </div>
              <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105'>
                Try AI Vocal Remover
              </button>
            </div>
            <AudioPlayer />
          </div>

          {/* Instrumental Section */}
          <div className='grid md:grid-cols-2 gap-16 items-center rounded-2xl bg-gradient-to-b from-gray-800/30 to-transparent p-8'>
            <div className='bg-gray-800/50 rounded-2xl h-[360px] overflow-hidden backdrop-blur-sm border border-gray-700/50'>
              <img
                src='/feature_3.png'
                alt='Instrumental Music'
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
              />
            </div>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <div className='inline-block px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20'>
                  <span className='text-purple-400 font-medium'>Instrumental Music Generator</span>
                </div>
                <h3 className='text-3xl font-bold text-white'>Create Instrumental Music</h3>
                <p className='text-gray-300'>Create instrumental music that matches your mood, without vocals or lyrics.</p>
                <div className='space-y-6 mt-6'>
                  <ul className='space-y-4 text-gray-300'>
                    <li className='flex items-start gap-4'>
                      <div className='w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0'>
                        <span className='text-purple-400'>1</span>
                      </div>
                      <span>Simple Mode – Enter a description and let AI create the perfect match.</span>
                    </li>
                    <li className='flex items-start gap-4'>
                      <div className='w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0'>
                        <span className='text-purple-400'>2</span>
                      </div>
                      <span>Custom Mode – Select your preferred style and get a tailored piece.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Lyrics Generator Section */}
          <div className='grid md:grid-cols-2 gap-16 items-center rounded-2xl bg-gradient-to-b from-gray-800/30 to-transparent p-8'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h3 className='text-3xl font-bold text-white'>
                  <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500'>
                    Generate AI Lyrics In One Click
                  </span>
                </h3>
                <p className='text-gray-300'>
                  Share your theme or topic, and our AI will create unique, rhyming lyrics that match your vision. Transform your ideas into
                  powerful words.
                </p>
              </div>
              <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105'>
                Generate Lyrics Now
              </button>
            </div>
            <div className='bg-gray-800/50 rounded-2xl h-[360px] overflow-hidden backdrop-blur-sm border border-gray-700/50'>
              <img
                src='/feature_2.png'
                alt='Audio Visualization'
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSongFeatures
