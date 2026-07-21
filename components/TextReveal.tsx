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
  const inView = useInView(ref, { once: true, margin: '-30px' })

  const variants = {
    up:   { hidden: { opacity: 0, y: 20, willChange: "opacity, transform" },  visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -20, willChange: "opacity, transform" }, visible: { opacity: 1, x: 0 } },
    fade: { hidden: { opacity: 0, willChange: "opacity" },                     visible: { opacity: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.32, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* Line reveal — overflow:hidden parent + translateY child.
   This is the signature luxury animation: text rises from beneath the clip. */
export function LineReveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: '105%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* SplitRevealLines — reveals each string line independently with stagger */
export function SplitRevealLines({
  lines,
  className,
  lineClassName,
  baseDelay = 0,
  stagger = 0.1,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  baseDelay?: number
  stagger?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, delay: baseDelay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export function StaggerHeadline({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, willChange: "opacity, transform" }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.05, duration: 0.30, ease: [0.2, 0.8, 0.2, 1] }}
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

/* ImageReveal — luxury wipe reveal: coloured panel slides up to expose the image */
export function ImageReveal({
  children,
  delay = 0,
  className,
  style,
  color = 'var(--bg-1)',
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  color?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ scale: 1.07 }}
        animate={inView ? { scale: 1.0 } : {}}
        transition={{ duration: 1.4, delay: delay + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ y: '0%' }}
        animate={inView ? { y: '-101%' } : {}}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: color,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
