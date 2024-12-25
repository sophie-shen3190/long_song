// components/AudioVisualizer/index.tsx
import { useEffect, useRef } from 'react'
import styles from './index.module.css'

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ... 之前的粒子动画逻辑 ...
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} width={window.innerWidth} height={window.innerHeight} />
}

export default AudioVisualizer
