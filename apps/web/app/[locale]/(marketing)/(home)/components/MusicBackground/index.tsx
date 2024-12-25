'use client'
import { useEffect, useRef } from 'react'
import styles from './MusicBackground.module.css'

const MusicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 音乐元素数组
    const musicElements = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 25 + 15,
      speed: Math.random() * 1.2 + 0.6,
      opacity: Math.random(),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      type: Math.floor(Math.random() * 5),
      color: ['rgba(147, 51, 234, 0.8)', 'rgba(219, 39, 119, 0.8)', 'rgba(124, 58, 237, 0.8)', 'rgba(236, 72, 153, 0.8)'][
        Math.floor(Math.random() * 4)
      ],
      scale: Math.random() * 0.5 + 0.5
    }))

    // 新增：霓虹球数组
    const neonOrbs = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 100 + 50,
      baseRadius: Math.random() * 100 + 50, // 基础半径，用于脉冲效果
      color: [
        ['rgba(147, 51, 234, ', 'rgba(219, 39, 119, '], // 紫色到粉色
        ['rgba(124, 58, 237, ', 'rgba(236, 72, 153, '], // 靛蓝到玫红
        ['rgba(139, 92, 246, ', 'rgba(244, 114, 182, '], // 紫罗兰到粉红
        ['rgba(168, 85, 247, ', 'rgba(251, 113, 133, '] // 深紫到珊瑚
      ][Math.floor(Math.random() * 4)],
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      moveSpeed: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      }
    }))

    // 绘制不同的音乐元素
    const drawMusicElement = (ctx: CanvasRenderingContext2D, element: any) => {
      switch (element.type) {
        case 0: // 音符
          ctx.beginPath()
          ctx.fillStyle = element.color
          ctx.ellipse(0, 0, element.size * 0.6, element.size, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.rect(element.size * 0.6, -element.size * 0.7, element.size * 0.8, element.size * 0.15)
          ctx.fill()
          break

        case 1: // 波浪线
          ctx.beginPath()
          ctx.strokeStyle = element.color
          ctx.lineWidth = element.size * 0.2
          ctx.moveTo(-element.size, 0)
          for (let i = 0; i < 2; i++) {
            ctx.quadraticCurveTo(-element.size / 2 + i * element.size, -element.size / 2, 0 + i * element.size, 0)
          }
          ctx.stroke()
          break

        case 2: // 音量图标
          ctx.beginPath()
          ctx.fillStyle = element.color
          for (let i = 0; i < 3; i++) {
            ctx.roundRect(
              i * element.size * 0.4,
              -element.size * (0.3 + i * 0.2),
              element.size * 0.2,
              element.size * (0.6 + i * 0.4),
              element.size * 0.1
            )
          }
          ctx.fill()
          break

        case 3: // 圆形波纹
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            ctx.strokeStyle = element.color
            ctx.lineWidth = element.size * 0.1
            ctx.arc(0, 0, element.size * (0.5 + i * 0.3), 0, Math.PI * 2)
            ctx.stroke()
          }
          break

        case 4: // 音符组
          const notePositions = [
            [0, 0],
            [element.size * 0.8, -element.size * 0.3],
            [element.size * 1.6, element.size * 0.2]
          ]
          notePositions.forEach(([x, y]) => {
            ctx.beginPath()
            ctx.fillStyle = element.color
            ctx.ellipse(x, y, element.size * 0.3, element.size * 0.5, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.rect(x + element.size * 0.3, y - element.size * 0.5, element.size * 0.5, element.size * 0.1)
            ctx.fill()
          })
          break
      }
    }

    // 新增：绘制霓虹球函数
    const drawNeonOrb = (ctx: CanvasRenderingContext2D, orb: any) => {
      // 脉冲效果
      const pulse = Math.sin(orb.phase) * 0.2 + 0.8
      const currentRadius = orb.baseRadius * pulse

      // 创建径向渐变
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius)

      // 计算渐变透明度
      const innerOpacity = 0.4 + Math.sin(orb.phase) * 0.2
      const outerOpacity = 0.1 + Math.sin(orb.phase) * 0.05

      // 使用两种颜色交替
      const color1 = orb.color[0]
      const color2 = orb.color[1]

      gradient.addColorStop(0, color1 + innerOpacity + ')')
      gradient.addColorStop(0.3, color2 + innerOpacity * 0.7 + ')')
      gradient.addColorStop(0.7, color1 + outerOpacity * 0.5 + ')')
      gradient.addColorStop(1, color2 + '0)')

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制霓虹球
      neonOrbs.forEach((orb) => {
        // 更新相位
        orb.phase += orb.pulseSpeed

        // 更新位置
        orb.x += orb.moveSpeed.x
        orb.y += orb.moveSpeed.y

        // 边界检查与反弹
        if (orb.x - orb.radius <= 0 || orb.x + orb.radius >= canvas.width) {
          orb.moveSpeed.x *= -1
        }
        if (orb.y - orb.radius <= 0 || orb.y + orb.radius >= canvas.height) {
          orb.moveSpeed.y *= -1
        }

        drawNeonOrb(ctx, orb)
      })

      // 绘制音乐元素
      musicElements.forEach((element) => {
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)
        ctx.scale(element.scale, element.scale)

        ctx.globalAlpha = 0.4 + Math.sin(element.opacity) * 0.3

        drawMusicElement(ctx, element)

        ctx.restore()

        element.y -= element.speed
        element.rotation += element.rotationSpeed
        element.opacity += 0.02

        if (element.y < -element.size) {
          element.y = canvas.height + element.size
          element.x = Math.random() * canvas.width
          element.speed = Math.random() * 1.2 + 0.6
          element.scale = Math.random() * 0.5 + 0.5
          element.type = Math.floor(Math.random() * 5)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.musicBackground} />
}

export default MusicBackground
