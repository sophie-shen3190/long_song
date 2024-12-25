// components/PlayButton.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@ui/lib'

interface PlayButtonProps {
  audioUrl: string
  onPlayingChange?: (isPlaying: boolean) => void
  isGlobalPlaying?: boolean
}

export default function PlayButton({ audioUrl, onPlayingChange, isGlobalPlaying }: PlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(audioUrl)
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false)
      onPlayingChange?.(false)
    })

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [audioUrl])

  useEffect(() => {
    if (isGlobalPlaying === false && isPlaying) {
      setIsPlaying(false)
      audioRef.current?.pause()
    }
  }, [isGlobalPlaying])

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      onPlayingChange?.(true)
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div
      onClick={togglePlay}
      className={cn(
        'w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm',
        'flex items-center justify-center',
        'transform group-hover:scale-110 transition-transform duration-300',
        'border border-white/20'
      )}>
      {isPlaying ? (
        <svg className='w-8 h-8 text-white fill-current' viewBox='0 0 24 24'>
          <path d='M6 4h4v16H6zm8 0h4v16h-4z' />
        </svg>
      ) : (
        <svg className='w-8 h-8 text-white fill-current' viewBox='0 0 24 24'>
          <path d='M8 5v14l11-7z' />
        </svg>
      )}
    </div>
  )
}
