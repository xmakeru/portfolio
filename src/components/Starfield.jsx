'use client'
import { useEffect, useRef } from 'react'

const Starfield = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = []
    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speed: Math.random() * 0.3,
      })
    }

    const cometColors = ['#a855f7', '#f97316', '#22c55e', '#ec4899', '#3b82f6']

    let comet = null
    const spawnComet = () => {
      const startY = Math.random() * canvas.height * 0.5
      const color = cometColors[Math.floor(Math.random() * cometColors.length)]
      comet = {
        x: -100,
        y: startY,
        vx: 6,
        vy: 1.2,
        trail: [],
        color,
      }
    }

    const cometInterval = setInterval(spawnComet, 10000)
    spawnComet()

    const animate = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'white'
      stars.forEach(star => {
        star.x += star.speed
        star.y += star.speed

        if (star.x > canvas.width) star.x = 0
        if (star.y > canvas.height) star.y = 0

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (comet) {
        comet.trail.unshift({ x: comet.x, y: comet.y })
        if (comet.trail.length > 30) comet.trail.pop()

        comet.x += comet.vx
        comet.y += comet.vy

        for (let i = 0; i < comet.trail.length; i++) {
          const t = comet.trail[i]
          ctx.beginPath()
          ctx.fillStyle = `${comet.color}CC`
          ctx.globalAlpha = 1 - i / comet.trail.length
          ctx.arc(t.x, t.y, 3, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.fillStyle = comet.color
        ctx.arc(comet.x, comet.y, 5, 0, Math.PI * 2)
        ctx.fill()

        if (comet.x > canvas.width + 100 || comet.y > canvas.height + 100) {
          comet = null
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(cometInterval)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  )
}

export default Starfield
