'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Logo3D({ size = 200 }: { size?: number }) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (!mounted) return null

  const s = size

  if (isMobile) {
    return (
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src="/Logo.png"
          alt="QMULATE"
          width={s}
          height={s}
          style={{ objectFit: 'contain', display: 'block', filter: 'none' }}
        />
      </motion.div>
    )
  }

  return (
    <div style={{ position: 'relative', width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{
          translateY: [0, -14, -8, -18, -6, -16, -4, -12, 0],
          rotateX: [0, 8, -5, 12, -8, 6, -10, 4, 0],
          rotateY: [0, 14, 22, -8, -18, 10, 20, -12, 0],
          rotateZ: [0, 2, -3, 4, -2, 3, -4, 1, 0],
        }}
        transition={{
          duration: 12, repeat: Infinity, ease: 'easeInOut',
          times: [0, 0.12, 0.25, 0.38, 0.50, 0.63, 0.75, 0.88, 1],
        }}
        style={{
          position: 'relative', zIndex: 3,
          transformStyle: 'preserve-3d', perspective: '900px',
          filter: 'none',
        }}
      >
        <img src="/Logo.png" alt="QMULATE" width={s} height={s}
          style={{ objectFit: 'contain', display: 'block', background: 'transparent', mixBlendMode: 'screen' }}
        />
      </motion.div>
    </div>
  )
}
