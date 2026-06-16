'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode, CSSProperties } from 'react'

export function TextReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'fade'
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const variants = {
    up:   { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
    fade: { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.70, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function StaggerHeadline({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export function ShimmerText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: 'linear-gradient(90deg, #5B7CFA 0%, #00C4CC 40%, #5B7CFA 80%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer-text 3s linear infinite',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  )
}
