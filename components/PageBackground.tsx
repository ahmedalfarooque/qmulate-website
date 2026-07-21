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

  // Soft luxury palette only — no saturated color "blobs". Gentle sky-blue,
  // champagne and pearl tones at low opacity so the ivory page background
  // stays bright while glass cards read clearly on top of it.
  const isBlue = ['home', 'about', 'solutions', 'contact'].includes(variant)
  const skyBlue   = '186,210,232'   // soft sky blue
  const champagne = '224,201,157'   // soft champagne / brass-gold
  const pearl     = '255,255,255'   // pearl white
  const accentA = isBlue ? skyBlue : champagne
  const accentB = isBlue ? champagne : skyBlue

  return (
    <>
      <style>{`
        @keyframes qbg-glow {
          0%,100%{opacity:0.6} 50%{opacity:0.9}
        }
        .qbg-root {
          position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;
        }
        @media(prefers-reduced-motion:reduce){.qbg-root *{animation:none!important}}
      `}</style>

      <div className="qbg-root" aria-hidden="true">

        {/* ── Pearl ambient glow — soft white core, luxury sheen ── */}
        <div style={{
          position:'absolute', top:'2%', left:'18%',
          width:1000, height:820, borderRadius:'50%',
          background:`radial-gradient(ellipse, rgba(${pearl},0.55) 0%, rgba(${accentA},0.10) 45%, transparent 72%)`,
          filter:'blur(70px)',
          animation:'qbg-glow 8s ease-in-out infinite',
        }}/>

        {/* ── AMBIENT RADIAL GLOW — sky blue / champagne, kept subtle ── */}
        <div style={{
          position:'absolute', top:'5%', left:'10%',
          width:1100, height:900, borderRadius:'50%',
          background:`radial-gradient(ellipse, rgba(${accentA},0.12) 0%, rgba(${accentB},0.07) 40%, transparent 70%)`,
          filter:'blur(60px)',
          animation:'qbg-glow 7s ease-in-out infinite',
        }}/>
        <div style={{
          position:'absolute', bottom:'5%', right:'5%',
          width:800, height:700, borderRadius:'50%',
          background:`radial-gradient(ellipse, rgba(${accentB},0.10) 0%, transparent 70%)`,
          filter:'blur(60px)',
          animation:'qbg-glow 10s ease-in-out infinite',
          animationDelay:'3s',
        }}/>
        <div style={{
          position:'absolute', top:'40%', right:'20%',
          width:600, height:600, borderRadius:'50%',
          background:`radial-gradient(ellipse, rgba(${accentA},0.08) 0%, transparent 70%)`,
          filter:'blur(80px)',
          animation:'qbg-glow 12s ease-in-out infinite',
          animationDelay:'6s',
        }}/>

      </div>
    </>
  )
}
