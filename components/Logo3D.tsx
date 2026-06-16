'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Logo3D({ size = 336 }: { size?: number }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const s = size
  const barH = s * 0.13
  const gap = s * 0.07
  const r = s * 0.04

  const strata = [
    { w: s * 0.46, color: '#5B7CFA', glowColor: 'rgba(91,124,250,0.9)', delay: 0 },
    { w: s * 0.63, color: 'rgba(255,255,255,0.50)', glowColor: 'rgba(255,255,255,0.45)', delay: 0.1 },
    { w: s * 0.80, color: 'rgba(255,255,255,0.32)', glowColor: 'rgba(255,255,255,0.28)', delay: 0.2 },
    { w: s * 1.00, color: 'rgba(255,255,255,0.18)', glowColor: 'rgba(255,255,255,0.16)', delay: 0.3 },
  ]

  return (
    <div style={{ position: 'relative', width: s + 120, perspective: 900 }}>

      {/* ── AURA HALO GLOW ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: s * 1.8, height: s * 1.4,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(91,124,250,0.22) 0%, rgba(0,196,204,0.08) 45%, transparent 75%)',
        filter: 'blur(28px)',
        animation: 'qlogo-halo 5s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }}/>
      {/* Secondary aura layer */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: s * 2.2, height: s * 1.7,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(91,124,250,0.08) 0%, rgba(0,196,204,0.03) 50%, transparent 75%)',
        filter: 'blur(50px)',
        animation: 'qlogo-halo 7s ease-in-out infinite',
        animationDelay: '1s',
        pointerEvents: 'none',
        zIndex: 0,
      }}/>

      {/* ── LIGHTNING LINES AROUND LOGO ── */}
      <div style={{
        position: 'absolute',
        top: '15%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(91,124,250,0.7) 30%, rgba(0,196,204,1) 50%, rgba(91,124,250,0.7) 70%, transparent 100%)',
        boxShadow: '0 0 10px rgba(0,196,204,0.9), 0 0 24px rgba(91,124,250,0.4)',
        animation: 'qbg-line-r 3s ease-in-out infinite',
        zIndex: 0,
      }}/>
      <div style={{
        position: 'absolute',
        top: '82%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,196,204,0.6) 40%, rgba(91,124,250,0.9) 50%, rgba(0,196,204,0.6) 60%, transparent 100%)',
        boxShadow: '0 0 8px rgba(91,124,250,0.8)',
        animation: 'qbg-line-l 4s ease-in-out infinite',
        animationDelay: '1.2s',
        zIndex: 0,
      }}/>

      {/* ── GLASS PANEL BEHIND BARS ── */}
      <div style={{
        position: 'absolute',
        inset: `-${s * 0.12}px`,
        borderRadius: s * 0.08,
        background: 'linear-gradient(135deg, rgba(91,124,250,0.06) 0%, rgba(0,196,204,0.03) 100%)',
        border: '1px solid rgba(91,124,250,0.14)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 8px 64px rgba(91,124,250,0.10), inset 0 1px 0 rgba(255,255,255,0.07)',
        zIndex: 0,
      }}/>
      {/* Glass edge shimmer */}
      <div style={{
        position: 'absolute',
        top: `-${s * 0.12}px`, left: `-${s * 0.12}px`,
        width: '55%', height: '35%',
        borderRadius: `${s * 0.08}px ${s * 0.08}px 0 0`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
        zIndex: 0, pointerEvents: 'none',
      }}/>

      {/* ── 3D ROTATING STRATA BARS ── */}
      <motion.div
        animate={{
          rotateX: [0, 8, -5, 3, 0],
          rotateY: [0, 15, -10, 20, 5, 0],
          rotateZ: [0, 2, -3, 1, 0],
        }}
        transition={{
          duration: 18, repeat: Infinity, ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{
          position: 'relative', zIndex: 1,
          width: s,
          display: 'flex', flexDirection: 'column', gap,
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 0 48px rgba(91,124,250,0.40)) drop-shadow(0 0 18px rgba(0,196,204,0.20))',
          marginLeft: 60,
        }}
      >
        {strata.map((stratum, i) => (
          <motion.div key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: stratum.delay, duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              width: stratum.w, height: barH, borderRadius: r,
              background: i === 0
                ? 'linear-gradient(135deg, #8EAAFF 0%, #5B7CFA 40%, #4A6CE8 80%, #3A5CD8 100%)'
                : `linear-gradient(135deg, rgba(255,255,255,${0.10+(3-i)*0.07}) 0%, ${stratum.color} 45%, rgba(255,255,255,0.03) 100%)`,
              boxShadow: i === 0
                ? '0 0 36px rgba(91,124,250,0.65), 0 0 72px rgba(91,124,250,0.25), 0 0 4px rgba(0,196,204,0.40), inset 0 1.5px 0 rgba(255,255,255,0.40), inset 0 -1.5px 0 rgba(0,0,60,0.35)'
                : `0 0 14px ${stratum.glowColor}44, 0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.22)`,
              border: i === 0 ? '1px solid rgba(142,170,255,0.70)' : '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              flexShrink: 0, transformOrigin: '0% 50%',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{position:'absolute',top:0,left:0,width:'65%',height:'48%',background:'linear-gradient(135deg,rgba(255,255,255,0.30)0%,transparent 100%)',borderRadius:`${r}px ${r}px 0 0`,pointerEvents:'none'}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:'30%',background:'linear-gradient(to top,rgba(255,255,255,0.04)0%,transparent 100%)',pointerEvents:'none'}}/>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @keyframes qlogo-halo {
          0%,100%{opacity:0.7;transform:translate(-50%,-50%) scale(1)}
          50%{opacity:1.0;transform:translate(-50%,-50%) scale(1.10)}
        }
        @keyframes qbg-line-r {
          0%{transform:translateX(-110%);opacity:0}
          8%{opacity:1}92%{opacity:1}
          100%{transform:translateX(110%);opacity:0}
        }
        @keyframes qbg-line-l {
          0%{transform:translateX(110%);opacity:0}
          8%{opacity:1}92%{opacity:1}
          100%{transform:translateX(-110%);opacity:0}
        }
      `}</style>
    </div>
  )
}
