'use client'
import type { ReactNode, CSSProperties } from 'react'

interface GlassIconProps {
  children: ReactNode
  size?: number
  color?: 'blue' | 'cyan' | 'white'
  glow?: boolean
  style?: CSSProperties
}

export function GlassIcon({ children, size = 48, color = 'blue', glow = true, style }: GlassIconProps) {
  const colorMap = {
    blue:  { rgb: '91,124,250',  border: 'rgba(91,124,250,0.30)' },
    cyan:  { rgb: '0,196,204',   border: 'rgba(0,196,204,0.28)'  },
    white: { rgb: '255,255,255', border: 'rgba(255,255,255,0.18)' },
  }
  const c = colorMap[color]
  const r = size * 0.28

  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      borderRadius: r,
      background: `linear-gradient(135deg, rgba(${c.rgb},0.16) 0%, rgba(${c.rgb},0.05) 100%)`,
      border: `1px solid ${c.border}`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: glow
        ? `0 0 20px rgba(${c.rgb},0.22), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.14)`
        : `0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.10)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
      ...style,
    }}>
      {/* Glass shine top-left */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '55%', height: '45%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
        borderRadius: `${r}px ${r}px 0 0`,
        pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative', zIndex: 1, fontSize: size * 0.42, lineHeight: 1 }}>
        {children}
      </div>
    </div>
  )
}
