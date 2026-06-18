'use client'
import { useEffect, useState } from 'react'

type PageVariant = 'home' | 'about' | 'services' | 'solutions' | 'projects' | 'contact'

export function PageBackground({ variant }: { variant: PageVariant }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  // Skip on mobile — each backdropFilter:blur() creates a GPU compositing layer.
  // 10+ blurred elements simultaneously on a phone kills performance.
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  const isBlue = ['home', 'about', 'solutions', 'contact'].includes(variant)
  const accentA = isBlue ? '91,124,250' : '0,196,204'
  const accentB = isBlue ? '0,196,204' : '91,124,250'

  return (
    <>
      <style>{`
        @keyframes qbg-glow {
          0%,100%{opacity:0.08} 50%{opacity:0.22}
        }
        .qbg-root {
          position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;
        }
        @media(prefers-reduced-motion:reduce){.qbg-root *{animation:none!important}}
      `}</style>

      <div className="qbg-root" aria-hidden="true">

        {/* ── AMBIENT RADIAL GLOW ── */}
        <div style={{
          position:'absolute', top:'5%', left:'15%',
          width:900, height:700, borderRadius:'50%',
          background:`radial-gradient(ellipse, rgba(${accentA},0.13) 0%, rgba(${accentB},0.05) 40%, transparent 70%)`,
          filter:'blur(40px)',
          animation:'qbg-glow 7s ease-in-out infinite',
        }}/>
        <div style={{
          position:'absolute', bottom:'10%', right:'10%',
          width:500, height:400, borderRadius:'50%',
          background:`radial-gradient(ellipse, rgba(${accentB},0.09) 0%, transparent 70%)`,
          filter:'blur(50px)',
          animation:'qbg-glow 10s ease-in-out infinite',
          animationDelay:'3s',
        }}/>

      </div>
    </>
  )
}
