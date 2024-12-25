// components/MusicShowcase.tsx
import { cn } from '@ui/lib'
import Link from 'next/link'
import PlayButton from './components/PlayButton'

interface MusicItem {
  title: string
  genre: string
  plays: string
  likes: string
  gradient: string
  id?: string
  image?: string
  index: number
}

const MusicCard = ({ title, genre, plays, likes, gradient, id, image, index }: MusicItem) => {
  // 构建音频 URL
  const audioNumber = index + 1 // 1 到 8
  // const audioUrl = `https://knowledge-embedding-sg.oss-ap-southeast-1.aliyuncs.com/7.mp3`
  const audioUrl = `https://knowledge-embedding-sg.oss-ap-southeast-1.aliyuncs.com/${audioNumber}.mp3`

  return (
    <div
      className={cn(
        'block bg-[#212936] rounded-xl overflow-hidden transition-transform duration-300',
        'border border-gray-800 relative',
        'hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10',
        'group cursor-pointer'
      )}>
      {/* 封面图片容器 */}
      <div className={cn(`h-48 relative overflow-hidden`)}>
        {/* 背景渐变 */}
        <div className={cn(`absolute inset-0 bg-gradient-to-r ${gradient}`, 'mix-blend-soft-light')} />

        {/* 封面图片 */}
        <div className='absolute inset-0'>
          <img src={`/${image}`} alt={title} className='w-full h-full object-cover' />
        </div>

        {/* 播放控制部分替换为新组件 */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            'bg-black/30'
          )}>
          <PlayButton audioUrl={audioUrl} />
        </div>

        {/* 纹理叠加 */}
        {/* <div className='absolute inset-0 opacity-30'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
              linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)
            `,
              backgroundSize: '4px 4px, 40px 40px'
            }}
          />
        </div>

        <div className='absolute inset-0 bg-gradient-to-t from-[#212936] via-transparent to-transparent opacity-90' />

        <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#212936] to-transparent' /> */}
      </div>

      <div className='p-4'>
        <h4 className='font-bold text-lg text-white'>{title}</h4>
        <p className='text-gray-400'>{genre}</p>
        <div className='flex items-center mt-2 text-gray-400'>
          <span className='text-sm'>{plays} plays</span>
          <span className='mx-2'>•</span>
          <span className='text-sm'>{likes} likes</span>
        </div>
      </div>
    </div>
  )
}

// const MusicCard = ({ title, genre, plays, likes, gradient, id, image }: MusicItem) => {
//   // 构建音频 URL
//   const audioUrl = `https://knowledge-embedding-sg.oss-ap-southeast-1.aliyuncs.com/7.mp3`

//   return (
//     <div
//       className={cn(
//         'block bg-[#212936] rounded-xl overflow-hidden transition-transform duration-300',
//         'border border-gray-800 relative',
//         'hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10',
//         'group cursor-pointer'
//       )}>
//       {/* 封面图片容器 */}
// <div className={cn(`h-48 relative overflow-hidden`)}>
//   {/* 背景渐变 */}
//   <div className={cn(`absolute inset-0 bg-gradient-to-r ${gradient}`, 'mix-blend-soft-light')} />

//   {/* 封面图片 */}
//   <div className='absolute inset-0'>
//     <img src={`/${image}`} alt={title} className='w-full h-full object-cover' />
//   </div>

//   {/* 播放图标 */}
//   <div
//     className={cn(
//       'absolute inset-0 flex items-center justify-center',
//       'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
//       'bg-black/30'
//     )}>
//     <PlayButton audioUrl={audioUrl} />
//   </div>

//   {/* 纹理叠加 */}
//   <div className='absolute inset-0 opacity-30'>
//     <div
//       className='absolute inset-0'
//       style={{
//         backgroundImage: `
//         radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
//         linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)
//       `,
//         backgroundSize: '4px 4px, 40px 40px'
//       }}
//     />
//   </div>

//   {/* 渐变遮罩 */}
//   <div className='absolute inset-0 bg-gradient-to-t from-[#212936] via-transparent to-transparent opacity-90' />

//   {/* 波浪效果 */}
//   <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#212936] to-transparent' />
// </div>

//       <div className='p-4'>
//         <h4 className='font-bold text-lg text-white'>{title}</h4>
//         <p className='text-gray-400'>{genre}</p>
//         <div className='flex items-center mt-2 text-gray-400'>
//           <span className='text-sm'>{plays} plays</span>
//           <span className='mx-2'>•</span>
//           <span className='text-sm'>{likes} likes</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// const musicRow1 = [
//   {
//     title: 'DNA',
//     genre: 'Chicago rap, soulful',
//     plays: '293K',
//     likes: '7.7K',
//     gradient: 'from-[#9F3BF9] to-[#DA62C4]',
//     id: '1074794245686558001'
//   },
//   {
//     title: 'Starlight',
//     genre: 'Vintage soul, R&B',
//     plays: '145K',
//     likes: '3.8K',
//     gradient: 'from-[#DA62C4] to-[#F978B6]',
//     id: '1074794245686558002'
//   },
//   {
//     title: 'Running Back',
//     genre: 'Stripped back ambient',
//     plays: '119K',
//     likes: '2.6K',
//     gradient: 'from-[#9F3BF9] to-[#DA62C4]',
//     id: '1074794245686558003'
//   },
//   {
//     title: 'Circles',
//     genre: 'Electronic, jazz',
//     plays: '252K',
//     likes: '5.9K',
//     gradient: 'from-[#DA62C4] to-[#F978B6]',
//     id: '1074794245686558004'
//   }
// ]

// const musicRow2 = [
//   {
//     title: 'Curtains',
//     genre: 'Electronic, jazz',
//     plays: '252K',
//     likes: '5.9K',
//     gradient: 'from-[#DA62C4] to-[#F978B6]',
//     id: '1074794245686558005'
//   },
//   {
//     title: 'Neon Lights',
//     genre: 'Rasta rap, soulful',
//     plays: '140K',
//     likes: '1.8K',
//     gradient: 'from-[#9F3BF9] to-[#DA62C4]',
//     id: '1074794245686558006'
//   },
//   {
//     title: 'Turkey Time',
//     genre: 'Rap, vocal',
//     plays: '148K',
//     likes: '1.9K',
//     gradient: 'from-[#DA62C4] to-[#F978B6]',
//     id: '1074794245686558007'
//   },
//   {
//     title: 'Midnight',
//     genre: 'Ambient, chill',
//     plays: '180K',
//     likes: '4.2K',
//     gradient: 'from-[#9F3BF9] to-[#DA62C4]',
//     id: '1074794245686558007'
//   }
// ]

const musicRow1 = [
  {
    title: 'The Holy Spirit',
    genre: 'Rasta rap, soulful',
    plays: '293K',
    likes: '7.7K',
    gradient: 'from-[#9F3BF9] to-[#DA62C4]',
    image: 'song_1.jpeg',
    fullGenre: 'rasta rap, soulful, chipmunk sample, jamaican accent',
    artist: 'SoulMaster',
    id: '1074794245686558001'
  },
  {
    title: 'Circles',
    genre: 'Electronic, jazz',
    plays: '145K',
    likes: '3.8K',
    gradient: 'from-[#DA62C4] to-[#F978B6]',
    image: 'song_2.jpeg',
    fullGenre: 'electronic, jazz, experimental, minimal, percussion, deep voice, acid jazz',
    artist: 'BeatWizard',
    id: '1074794245686558002'
  },
  {
    title: 'Lost in the now',
    genre: 'EDM, Guajira',
    plays: '119K',
    likes: '2.6K',
    gradient: 'from-[#9F3BF9] to-[#DA62C4]',
    image: 'song_3.jpeg',
    fullGenre: 'edm, guajira',
    artist: 'RhythmRider',
    id: '1074794245686558003'
  },
  {
    title: 'Ton PERE',
    genre: 'House French touch',
    plays: '252K',
    likes: '5.9K',
    gradient: 'from-[#DA62C4] to-[#F978B6]',
    image: 'song_4.jpeg',
    fullGenre:
      'House French touch, joke, Very Experimental and Artistic Flavor in the Music, French Bass and Drum, 808 bass, catchy chorus',
    artist: 'WaveRunner',
    id: '1074794245686558004'
  }
]

const musicRow2 = [
  {
    title: 'Wir sind die Welt 2',
    genre: 'Pop, World',
    plays: '252K',
    likes: '5.9K',
    gradient: 'from-[#DA62C4] to-[#F978B6]',
    image: 'song_5.jpeg',
    fullGenre: 'Pop, World Music, German',
    artist: 'MelodyMaker',
    id: '1074794245686558005'
  },
  {
    title: 'Te echo de menos',
    genre: 'Bachata, Latin',
    plays: '140K',
    likes: '1.8K',
    gradient: 'from-[#9F3BF9] to-[#DA62C4]',
    image: 'song_6.jpeg',
    fullGenre: 'Bachata, Latin Romance, Spanish',
    artist: 'LatinSoul',
    id: '1074794245686558006'
  },
  {
    title: 'Terr#ne',
    genre: 'Nu jazz, Acoustic',
    plays: '148K',
    likes: '1.9K',
    gradient: 'from-[#DA62C4] to-[#F978B6]',
    image: 'song_7.jpeg',
    fullGenre: 'mandolin, indignant voice, acoustic guitar, mandolin, harmonica, jazz, nu jazz',
    artist: 'JazzFusion',
    id: '1074794245686558007'
  },
  {
    title: 'Πληγωμένες ψυχές',
    genre: 'Instrumental',
    plays: '180K',
    likes: '4.2K',
    gradient: 'from-[#9F3BF9] to-[#DA62C4]',
    image: 'song_8.jpeg',
    fullGenre: 'Instrumental, Greek',
    artist: 'SoundScape',
    id: '1074794245686558008'
  }
]

export default function MusicShowcase() {
  return (
    <div className='bg-[#171E2E] text-white py-16 px-4'>
      {/* 标题部分 */}
      <h2 className='text-4xl md:text-5xl text-center font-bold mb-4 bg-gradient-to-r from-[#9F3BF9] to-[#DA62C4] text-transparent bg-clip-text'>
        Generate high-quality music in seconds
      </h2>
      <h3 className='text-xl md:text-2xl text-center text-gray-400 mb-12'>Any Style of Music, From Pop to Classical</h3>

      {/* 音乐展示区域 */}
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* 第一排 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {musicRow1.map((item, index) => (
            <MusicCard key={`row1-${index}`} {...item} index={index} />
          ))}
        </div>
        {/* 第二排 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {musicRow2.map((item, index) => (
            <MusicCard key={`row2-${index}`} {...item} index={index + 4} />
          ))}
        </div>
      </div>

      {/* 特性标签 */}
      <div className='flex flex-wrap justify-center gap-4 mt-12'>
        {['Hip Hop music generator', 'AI rap song maker', 'Rock music generator', 'Instrumental song maker'].map((feature, index) => (
          <div key={index} className='bg-[#212936] px-6 py-2 rounded-full flex items-center gap-2 border border-gray-800'>
            <svg className='w-4 h-4 text-[#DA62C4]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
            </svg>
            <span className='text-gray-400'>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
