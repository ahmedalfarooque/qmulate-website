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

  /* Per-page lighting composition — each page keeps the same soft
     palette, opacity ceiling and blur discipline, but the glow shapes
     sit in different positions so each page reads with its own
     atmosphere while staying visually consistent with the rest of the
     site (no saturated colour, no layout ever repeats pixel-for-pixel). */
  type Glow = { top?:string; bottom?:string; left?:string; right?:string; w:number; h:number; color:string; opacity:number; blur:number; dur:number; delay?:number }
  const LAYOUTS: Record<string, Glow[]> = {
    home: [
      { top:'2%',  left:'18%', w:1000, h:820, color:pearl,   opacity:0.55, blur:70, dur:8 },
      { top:'5%',  left:'10%', w:1100, h:900, color:accentA, opacity:0.12, blur:60, dur:7 },
      { bottom:'5%', right:'5%', w:800, h:700, color:accentB, opacity:0.10, blur:60, dur:10, delay:3 },
      { top:'40%', right:'20%', w:600, h:600, color:accentA, opacity:0.08, blur:80, dur:12, delay:6 },
    ],
    about: [
      /* Centred, symmetric — mirrors the About page's centred 3-col composition */
      { top:'6%',  left:'50%',  w:1200, h:640, color:pearl,   opacity:0.45, blur:75, dur:9 },
      { top:'22%', left:'6%',   w:760,  h:760, color:accentA, opacity:0.10, blur:65, dur:8 },
      { top:'22%', right:'6%',  w:760,  h:760, color:accentB, opacity:0.10, blur:65, dur:11, delay:2 },
      { bottom:'4%', left:'50%', w:900, h:520, color:accentA, opacity:0.07, blur:70, dur:13, delay:5 },
    ],
    services: [
      /* Wide, horizontal spread — echoes the alternating left/right service rows */
      { top:'8%',   left:'4%',  w:820, h:700, color:accentA, opacity:0.11, blur:65, dur:8 },
      { top:'30%',  right:'6%', w:900, h:760, color:accentB, opacity:0.11, blur:70, dur:10, delay:2 },
      { bottom:'8%', left:'12%', w:760, h:640, color:accentA, opacity:0.08, blur:60, dur:9, delay:4 },
      { bottom:'-2%', right:'18%', w:640, h:600, color:pearl, opacity:0.30, blur:70, dur:12, delay:1 },
    ],
    contact: [
      /* Warm, lower-anchored — settles gently behind the form and logo panel */
      { top:'10%',  left:'8%',  w:820, h:680, color:pearl,   opacity:0.42, blur:72, dur:9 },
      { top:'18%',  right:'8%', w:900, h:760, color:accentA, opacity:0.10, blur:64, dur:8, delay:1 },
      { bottom:'6%', left:'22%', w:820, h:680, color:accentB, opacity:0.10, blur:66, dur:11, delay:3 },
      { bottom:'-4%', right:'10%', w:700, h:620, color:accentA, opacity:0.07, blur:70, dur:13, delay:5 },
    ],
  }
  const glows = LAYOUTS[variant] ?? LAYOUTS.home

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
        {glows.map((g,i)=>(
          <div key={i} style={{
            position:'absolute',
            top:g.top, bottom:g.bottom, left:g.left, right:g.right,
            width:g.w, height:g.h, borderRadius:'50%',
            transform: (g.left==='50%'||g.right==='50%') ? 'translateX(-50%)' : undefined,
            background:`radial-gradient(ellipse, rgba(${g.color},${g.opacity}) 0%, transparent 70%)`,
            filter:`blur(${g.blur}px)`,
            animation:`qbg-glow ${g.dur}s ease-in-out infinite`,
            animationDelay: g.delay ? `${g.delay}s` : undefined,
          }}/>
        ))}
      </div>
    </>
  )
}
