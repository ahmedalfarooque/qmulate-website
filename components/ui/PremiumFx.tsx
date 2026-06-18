'use client'
import { useEffect, useRef, useState } from 'react'
import { getAnimationLevel } from '@/lib/device'

/* ── Flowing Lines — RIGHT to LEFT groups ── */
export function FlowingLines({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [level, setLevel] = useState<string>('none')

  useEffect(() => {
    setLevel(getAnimationLevel())
  }, [])

  useEffect(() => {
    if (level !== 'canvas') return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = [
      'rgba(91,124,250,',
      'rgba(0,196,204,',
      'rgba(168,184,255,',
    ]

    type Line = {
      y: number
      amplitude: number
      frequency: number
      phase: number
      color: string
      width: number
      alpha: number
    }

    type Group = {
      lines: Line[]
      x: number
      speed: number
      active: boolean
    }

    const groups: Group[] = []
    let nextGroupTimer = 0

    const createGroup = () => {
      const lineCount = 4 + Math.floor(Math.random() * 4)
      const baseY = 60 + Math.random() * (canvas.height - 120)
      const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)]
      return {
        lines: Array.from({ length: lineCount }, (_, i) => ({
          y: baseY + (i - lineCount / 2) * (12 + Math.random() * 18),
          amplitude: 15 + Math.random() * 35,
          frequency: 0.004 + Math.random() * 0.003,
          phase: Math.random() * Math.PI * 2,
          color: colorBase,
          width: 0.4 + Math.random() * 1.2,
          alpha: 0.10 + Math.random() * 0.15,
        })),
        x: canvas.width + 100,
        speed: 1.0 + Math.random() * 0.8,
        active: true,
      }
    }

    groups.push(createGroup())
    nextGroupTimer = 180 + Math.floor(Math.random() * 120)

    let frame = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nextGroupTimer--
      if (nextGroupTimer <= 0) {
        groups.push(createGroup())
        nextGroupTimer = 200 + Math.floor(Math.random() * 150)
      }

      for (let g = groups.length - 1; g >= 0; g--) {
        const group = groups[g]
        group.x -= group.speed

        if (group.x + canvas.width + 200 < 0) {
          groups.splice(g, 1)
          continue
        }

        group.lines.forEach(line => {
          ctx.beginPath()
          ctx.lineWidth = line.width

          const progress = 1 - (group.x / canvas.width)
          const edgeFade = Math.min(
            Math.min(progress * 3, 1),
            Math.min((1 - progress + 0.3) * 2, 1)
          )

          for (let x = 0; x <= canvas.width; x += 3) {
            const worldX = x - group.x
            const y = line.y
              + Math.sin(worldX * line.frequency + line.phase + frame * 0.008)
              * line.amplitude
              + Math.sin(worldX * line.frequency * 0.4 + frame * 0.005)
              * (line.amplitude * 0.3)
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }

          const alpha = line.alpha * Math.max(0, edgeFade)
          ctx.strokeStyle = line.color + alpha + ')'
          ctx.stroke()
        })
      }

      frame++
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [level])

  if (level === 'css' || level === 'none') {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(91,124,250,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(0,196,204,0.05) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <canvas
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}

/* ── Floating Particles ── */
export function FloatingParticles({
  className = '',
  count = 25,
}: {
  className?: string
  count?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [level, setLevel] = useState<string>('none')

  useEffect(() => { setLevel(getAnimationLevel()) }, [])

  useEffect(() => {
    if (level !== 'canvas') return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.8 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.15 - Math.random() * 0.3,
      alpha: 0.08 + Math.random() * 0.25,
      color: Math.random() > 0.5 ? [91, 124, 250] : [0, 196, 204],
      pulse: Math.random() * Math.PI * 2,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += 0.02
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        const a = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3)
        const [r, g, b] = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [level, count])

  if (level === 'css' || level === 'none') {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(ellipse at 50% 80%, rgba(91,124,250,0.05) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <canvas
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}

/* ── Grid Pulse ── */
export function GridPulse({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [level, setLevel] = useState<string>('none')

  useEffect(() => { setLevel(getAnimationLevel()) }, [])

  useEffect(() => {
    if (level !== 'canvas') return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })

    const gridSize = 55
    let t = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cols = Math.ceil(canvas.width / gridSize) + 1
      const rows = Math.ceil(canvas.height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize
          const dist = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) +
            Math.pow(y - canvas.height / 2, 2)
          )
          const wave = Math.sin(dist * 0.015 - t * 0.025) * 0.5 + 0.5
          ctx.beginPath()
          ctx.arc(x, y, 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(91,124,250,${wave * 0.10})`
          ctx.fill()
        }
      }

      const scanY = ((t * 1.2) % (canvas.height + 80)) - 40
      const g = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30)
      g.addColorStop(0, 'rgba(0,196,204,0)')
      g.addColorStop(0.5, 'rgba(0,196,204,0.05)')
      g.addColorStop(1, 'rgba(0,196,204,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, scanY - 30, canvas.width, 60)

      t++
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [level])

  if (level === 'css' || level === 'none') {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(91,124,250,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,124,250,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '55px 55px',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <canvas
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}

/* ── Aurora Glow — CSS works everywhere, JS animation on desktop ── */
export function AuroraGlow({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [level, setLevel] = useState<string>('none')

  useEffect(() => { setLevel(getAnimationLevel()) }, [])

  useEffect(() => {
    if (level === 'none' || level === 'css') return
    const el = ref.current
    if (!el) return

    let t = 0
    let raf: number
    const animate = () => {
      t += 0.004
      const x1 = 25 + Math.sin(t) * 20
      const y1 = 35 + Math.cos(t * 0.7) * 15
      const x2 = 75 + Math.cos(t * 1.2) * 20
      const y2 = 65 + Math.sin(t * 0.9) * 15
      el.style.background = `
        radial-gradient(ellipse at ${x1}% ${y1}%, rgba(91,124,250,0.10) 0%, transparent 55%),
        radial-gradient(ellipse at ${x2}% ${y2}%, rgba(0,196,204,0.08) 0%, transparent 55%)
      `
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [level])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: level === 'css' || level === 'none' ? `
          radial-gradient(ellipse at 25% 35%, rgba(91,124,250,0.08) 0%, transparent 55%),
          radial-gradient(ellipse at 75% 65%, rgba(0,196,204,0.06) 0%, transparent 55%)
        ` : undefined,
        animation: level === 'css'
          ? 'auroraShift 8s ease-in-out infinite'
          : undefined,
      }}
      aria-hidden="true"
    />
  )
}
