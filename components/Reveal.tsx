'use client'
import { useEffect, useRef, useState } from 'react'

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1),
                     transform ${duration}s cubic-bezier(0.16,1,0.3,1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
