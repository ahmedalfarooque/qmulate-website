'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { isIOS } from '@/lib/device'

export function Logo3D({ size = 200 }: { size?: number }) {
  const [mounted, setMounted] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    setMounted(true)
    setShowFallback(isIOS())
  }, [])

  if (!mounted) return null

  if (showFallback) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
      }}>
        <Image
          src="/Logo.png"
          alt="QMULATE"
          width={size}
          height={size}
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
    )
  }

  const s = size
  const fr = Math.round(s * 0.12)

  return (
    <div style={{ position: 'relative', width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* AURA LAYER 1 — zoom fade out */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: s * 1.9, height: s * 1.6, borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(91,124,250,0.30) 0%, rgba(0,196,204,0.10) 40%, transparent 70%)',
        filter: 'blur(32px)',
        animation: 'qlogo-aura-zoom 4s ease-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* AURA LAYER 2 — offset 2s */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: s * 1.4, height: s * 1.2, borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(0,196,204,0.22) 0%, rgba(91,124,250,0.08) 50%, transparent 75%)',
        filter: 'blur(22px)',
        animation: 'qlogo-aura-zoom 4s ease-out infinite',
        animationDelay: '2s',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* LIGHTNING LINE R */}
      <div style={{
        position: 'absolute', top: '22%', left: -fr, right: -fr, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(91,124,250,0.7) 30%, rgba(0,196,204,1) 50%, rgba(91,124,250,0.7) 70%, transparent 100%)',
        boxShadow: '0 0 10px rgba(0,196,204,0.9), 0 0 24px rgba(91,124,250,0.4)',
        animation: 'qlogo-line-r 3.5s ease-in-out infinite',
        zIndex: 1,
      }}/>

      {/* LIGHTNING LINE L */}
      <div style={{
        position: 'absolute', top: '72%', left: -fr, right: -fr, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,196,204,0.6) 40%, rgba(91,124,250,0.9) 50%, rgba(0,196,204,0.6) 60%, transparent 100%)',
        boxShadow: '0 0 8px rgba(91,124,250,0.8)',
        animation: 'qlogo-line-l 4.2s ease-in-out infinite',
        animationDelay: '1.5s',
        zIndex: 1,
      }}/>

      {/* LIGHTNING LINE D */}
      <div style={{
        position: 'absolute', top: -fr, bottom: -fr, left: '42%', width: '1px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(91,124,250,0.4) 30%, rgba(0,196,204,0.7) 50%, rgba(91,124,250,0.4) 70%, transparent 100%)',
        boxShadow: '0 0 8px rgba(0,196,204,0.5)',
        animation: 'qlogo-line-d 5s ease-in-out infinite',
        animationDelay: '0.8s',
        zIndex: 1,
      }}/>

      {/* 3D FLOATING LOGO */}
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
          filter: 'drop-shadow(0 0 32px rgba(91,124,250,0.85)) drop-shadow(0 0 64px rgba(91,124,250,0.35)) drop-shadow(0 0 8px rgba(0,196,204,0.60))',
        }}
      >
        <img src="/Logo.png" alt="QMULATE" width={s} height={s}
          style={{ objectFit: 'contain', display: 'block', background: 'transparent', mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* GROUND SHADOW GLOW */}
      <div style={{
        position: 'absolute', bottom: `${-(fr + 8)}px`, left: '50%',
        transform: 'translateX(-50%)',
        width: Math.round(s * 0.7), height: Math.round(s * 0.10), borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(91,124,250,0.55) 0%, transparent 70%)',
        filter: 'blur(10px)',
        animation: 'qlogo-shadow-pulse 12s ease-in-out infinite',
        zIndex: 2, pointerEvents: 'none',
      }}/>

      {/* CORNER DOTS */}
      {([
        { top: `${-(fr + 4)}px`,    left: `${-(fr + 4)}px`  },
        { top: `${-(fr + 4)}px`,    right: `${-(fr + 4)}px` },
        { bottom: `${-(fr + 4)}px`, left: `${-(fr + 4)}px`  },
        { bottom: `${-(fr + 4)}px`, right: `${-(fr + 4)}px` },
      ] as React.CSSProperties[]).map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: 7, height: 7, borderRadius: '50%',
          background: i % 2 === 0 ? 'rgba(91,124,250,0.8)' : 'rgba(0,196,204,0.8)',
          boxShadow: i % 2 === 0 ? '0 0 10px rgba(91,124,250,0.9)' : '0 0 10px rgba(0,196,204,0.9)',
          animation: 'qlogo-dot-blink 2s ease-in-out infinite',
          animationDelay: `${i * 0.5}s`,
          zIndex: 5,
        }}/>
      ))}

      {/* FLOATING GLASS CUBES */}
      {([
        { top: `${-fr}px`,           left: `${-(fr + 10)}px`,  size: Math.round(s * 0.18), c: '91,124,250', d: '0s',   a: 'qlogo-cube1' },
        { top: `${Math.round(s * 0.1)}px`,  right: `${-(fr + 14)}px`, size: Math.round(s * 0.13), c: '0,196,204',  d: '1s',   a: 'qlogo-cube2' },
        { bottom: `${Math.round(s * 0.08)}px`, left: `${-(fr + 10)}px`, size: Math.round(s * 0.11), c: '91,124,250', d: '2s',   a: 'qlogo-cube3' },
        { bottom: `${-fr}px`,        right: `${Math.round(s * 0.06)}px`, size: Math.round(s * 0.15), c: '0,196,204',  d: '0.5s', a: 'qlogo-cube1' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any[]).map((cube, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: cube.top, left: cube.left, right: cube.right, bottom: cube.bottom,
          width: cube.size, height: cube.size,
          borderRadius: Math.round(cube.size * 0.22),
          background: `linear-gradient(135deg, rgba(${cube.c},0.18) 0%, rgba(${cube.c},0.05) 100%)`,
          border: `1px solid rgba(${cube.c},0.32)`,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          boxShadow: `0 0 18px rgba(${cube.c},0.20), inset 0 1px 0 rgba(255,255,255,0.12)`,
          animation: `${cube.a} 7s ease-in-out infinite`,
          animationDelay: cube.d,
          zIndex: 4,
        }}/>
      ))}

      <style>{`
        @keyframes qlogo-aura-zoom {
          0%   { opacity: 0.5; transform: translate(-50%,-50%) scale(0.85); }
          40%  { opacity: 1.0; transform: translate(-50%,-50%) scale(1.0); }
          100% { opacity: 0;   transform: translate(-50%,-50%) scale(1.35); }
        }
        @keyframes qlogo-line-r {
          0%   { transform: translateX(-110%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(110%);  opacity: 0; }
        }
        @keyframes qlogo-line-l {
          0%   { transform: translateX(110%);  opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(-110%); opacity: 0; }
        }
        @keyframes qlogo-line-d {
          0%   { transform: translateY(-110%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(110%);  opacity: 0; }
        }
        @keyframes qlogo-scan {
          0%   { top: -4px; opacity: 1; }
          100% { top: 100%; opacity: 0.2; }
        }
        @keyframes qlogo-shadow-pulse {
          0%,100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50%     { opacity: 0.9; transform: translateX(-50%) scale(0.85); }
        }
        @keyframes qlogo-dot-blink {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%     { opacity: 1.0; transform: scale(1.4); }
        }
        @keyframes qlogo-cube1 {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%     { transform: translateY(-8px) rotate(6deg); }
          66%     { transform: translateY(4px) rotate(-4deg); }
        }
        @keyframes qlogo-cube2 {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%     { transform: translateY(6px) rotate(-5deg); }
          66%     { transform: translateY(-10px) rotate(8deg); }
        }
        @keyframes qlogo-cube3 {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%     { transform: translateY(-12px) rotate(10deg); }
        }
      `}</style>
    </div>
  )
}
