'use client'

import { useState, useRef, useEffect } from 'react'

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState({
    original: false,
    vocals: false,
    instrumental: false
  })

  const audioRefs = {
    original: null,
    vocals: null,
    instrumental: null
  }

  const canvasRefs = {
    original: useRef(null),
    vocals: useRef(null),
    instrumental: useRef(null)
  }

  const animationFrames = useRef({})
  const barHeights = useRef({}) // 存储每个轨道的静态波形高度

  // 生成静态波形数据
  const generateStaticWaveform = (barCount) => {
    const heights = []
    for (let i = 0; i < barCount; i++) {
      heights.push(Math.random() * 0.5 + 0.2) // 生成0.2到0.7之间的随机值
    }
    return heights
  }

  const drawWaveform = (canvasId, isActive) => {
    const canvas = canvasRefs[canvasId].current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    const barWidth = 3
    const barGap = 2
    const barCount = Math.floor(width / (barWidth + barGap))

    // 如果没有该轨道的静态波形数据，则生成
    if (!barHeights.current[canvasId]) {
      barHeights.current[canvasId] = generateStaticWaveform(barCount)
    }

    const drawBars = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < barCount; i++) {
        let barHeight
        if (isActive) {
          // 播放时在静态高度基础上添加小幅随机波动
          const staticHeight = barHeights.current[canvasId][i]
          barHeight = height * (staticHeight + Math.random() * 0.1) * 0.8
        } else {
          // 暂停时使用静态高度
          barHeight = height * barHeights.current[canvasId][i] * 0.8
        }

        const x = i * (barWidth + barGap)
        const y = (height - barHeight) / 2

        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight)
        if (isActive) {
          gradient.addColorStop(0, '#EC4899') // pink-500
          gradient.addColorStop(1, '#A855F7') // purple-500
        } else {
          gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)')
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0.3)')
        }

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth, barHeight)
      }

      if (isActive) {
        animationFrames.current[canvasId] = requestAnimationFrame(drawBars)
      }
    }

    drawBars()
  }

  const handlePlay = (type) => {
    Object.entries(audioRefs).forEach(([key, audio]) => {
      if (key !== type && audio) {
        audio.pause()
        setIsPlaying((prev) => ({ ...prev, [key]: false }))
      }
    })

    if (audioRefs[type]) {
      if (isPlaying[type]) {
        audioRefs[type].pause()
      } else {
        audioRefs[type].play()
      }
      setIsPlaying((prev) => ({ ...prev, [type]: !prev[type] }))
    }
  }

  useEffect(() => {
    // 初始化 Canvas 尺寸和静态波形
    Object.keys(canvasRefs).forEach((key) => {
      const canvas = canvasRefs[key].current
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        drawWaveform(key, isPlaying[key])
      }
    })

    // 清理动画
    return () => {
      Object.values(animationFrames.current).forEach((frame) => {
        cancelAnimationFrame(frame)
      })
    }
  }, [isPlaying])
  const tracks = [
    {
      id: 'original',
      label: 'Original',
      url: '/origin_1.mp3'
    },
    {
      id: 'vocals',
      label: 'Vocals',
      url: '/vacls_1.mp3'
    },
    {
      id: 'instrumental',
      label: 'Instrumentals',
      url: '/ins_1.mp3'
    }
  ]

  return (
    <div className='bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50'>
      <h4 className='text-2xl font-bold mb-8'>Listen to our demo:</h4>
      <div className='space-y-6'>
        {tracks.map((track) => (
          <div key={track.id} className='space-y-2'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-gray-300'>{track.label}</span>
              <button
                className='flex items-center gap-2 px-4 py-1 rounded-full border border-pink-500/30 hover:bg-pink-500/10'
                onClick={() => handlePlay(track.id)}>
                <span className='text-gray-300'>{isPlaying[track.id] ? 'Pause' : 'Play'}</span>
                <svg className='w-4 h-4 text-pink-500' fill='currentColor' viewBox='0 0 24 24'>
                  <path d={isPlaying[track.id] ? 'M6 4h4v16H6zm8 0h4v16h-4z' : 'M8 5v14l11-7z'} />
                </svg>
              </button>
            </div>
            <div className='h-16 bg-gray-900/50 rounded-lg overflow-hidden relative'>
              <audio
                ref={(el) => (audioRefs[track.id] = el)}
                src={track.url}
                onEnded={() => setIsPlaying((prev) => ({ ...prev, [track.id]: false }))}
              />
              <canvas ref={canvasRefs[track.id]} className='w-full h-full' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AudioPlayer
