'use client'
import { useEffect, useRef, useState } from 'react'

export function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [duration, setDuration] = useState(0.45)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastTime = performance.now()

    const onScroll = () => {
      lastScrollY = window.scrollY
      lastTime = performance.now()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const now = performance.now()
          const dy = Math.abs(window.scrollY - lastScrollY)
          const dt = now - lastTime
          const velocity = dt > 0 ? dy / dt : 0

          const mapped =
            velocity < 0.5 ? 0.45
            : velocity < 1  ? 0.35
            : velocity < 2  ? 0.2
            : velocity < 4  ? 0.1
            : 0.05

          setDuration(mapped)
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10px 0px' }
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const hiddenTransform = {
    up:    'translateY(14px)',
    down:  'translateY(-14px)',
    left:  'translateX(14px)',
    right: 'translateX(-14px)',
  }[direction]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : hiddenTransform,
        transition: `opacity ${duration}s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     transform ${duration}s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
