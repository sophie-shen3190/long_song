import { atom } from 'jotai'
import { NavItem } from './types'

export const activeItemAtom = atom(0)

// const navItems = [
//   {
//     icon: <Music className='h-6 w-6' />,
//     label: 'Music generator',
//     href: '/ai-music-generator'
//   },
//   {
//     icon: <Speaker className='h-6 w-6' />,
//     label: 'Vocal Isolation',
//     href: '/ai-vocal-remover'
//   },
//   {
//     icon: <Volume2 className='h-6 w-6' />,
//     label: 'Free sound effects',
//     href: '#'
//   }
// ]
