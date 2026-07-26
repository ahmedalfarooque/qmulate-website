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

  // Soft luxury palette only — no saturated color "blobs". Sky-blue,
  // champagne, ice-blue, mist and pearl tones at low opacity so the ivory
  // page background stays bright while glass cards read clearly on top
  // of it. Each page draws from a slightly different slice of this
  // extended palette so the site feels illuminated with real atmospheric
  // variety, not the same two-color swap repeated on every page.
  // No coloured background washes — every glow is pearl white. The page
  // reads as clean white with only the faintest luminous depth, letting
  // photography, glass and text carry the design (per the "no background
  // colour" direction). Colour constants kept as pearl so all references
  // resolve to white.
  const pearl     = '255,255,255'   // pearl white
  const champagne = pearl, iceBlue = pearl, mist = pearl, slate = pearl
  const accentA = pearl
  const accentB = pearl

  /* Per-page lighting composition — each page keeps the same soft
     palette, opacity ceiling and blur discipline, but the glow shapes
     sit in different positions so each page reads with its own
     atmosphere while staying visually consistent with the rest of the
     site (no saturated colour, no layout ever repeats pixel-for-pixel). */
  type Glow = { top?:string; bottom?:string; left?:string; right?:string; w:number; h:number; color:string; opacity:number; blur:number; dur:number; delay?:number }
  // Opacities below were nearly doubled from an earlier pass that, on a bright
  // ivory canvas with 60-80px of blur, diluted down to something close to
  // imperceptible — reading as plain white rather than a distinct per-page
  // palette. Pearl "highlight" glows were pulled back slightly so the actual
  // hue underneath isn't washed out by it. Still soft light, not blobs.
  const LAYOUTS: Record<string, Glow[]> = {
    home: [
      { top:'2%',  left:'18%', w:1000, h:820, color:pearl,   opacity:0.40, blur:66, dur:8 },
      { top:'5%',  left:'10%', w:1100, h:900, color:accentA, opacity:0.22, blur:58, dur:7 },
      { bottom:'5%', right:'5%', w:800, h:700, color:accentB, opacity:0.19, blur:58, dur:10, delay:3 },
      { top:'40%', right:'20%', w:600, h:600, color:accentA, opacity:0.16, blur:76, dur:12, delay:6 },
    ],
    about: [
      /* Centred, symmetric, cool and architectural — ice-blue + mist rather
         than the warmer palette used elsewhere, echoing the institutional
         framing of the About page. */
      { top:'6%',  left:'50%',  w:1200, h:640, color:pearl,   opacity:0.32, blur:72, dur:9 },
      { top:'22%', left:'6%',   w:760,  h:760, color:iceBlue, opacity:0.21, blur:62, dur:8 },
      { top:'22%', right:'6%',  w:760,  h:760, color:mist,    opacity:0.24, blur:62, dur:11, delay:2 },
      { bottom:'4%', left:'50%', w:900, h:520, color:champagne, opacity:0.14, blur:68, dur:13, delay:5 },
    ],
    services: [
      /* Wide, horizontal spread — echoes the alternating left/right service
         rows, with one cool slate accent for a structured, less-warm feel. */
      { top:'8%',   left:'4%',  w:820, h:700, color:accentA, opacity:0.21, blur:62, dur:8 },
      { top:'30%',  right:'6%', w:900, h:760, color:iceBlue, opacity:0.21, blur:68, dur:10, delay:2 },
      { bottom:'8%', left:'12%', w:760, h:640, color:slate,  opacity:0.14, blur:58, dur:9, delay:4 },
      { bottom:'-2%', right:'18%', w:640, h:600, color:pearl, opacity:0.24, blur:68, dur:12, delay:1 },
    ],
    contact: [
      /* Warm, lower-anchored, with one ice-blue note for freshness — settles
         gently behind the form and logo panel. */
      { top:'10%',  left:'8%',  w:820, h:680, color:pearl,   opacity:0.30, blur:70, dur:9 },
      { top:'18%',  right:'8%', w:900, h:760, color:champagne, opacity:0.20, blur:62, dur:8, delay:1 },
      { bottom:'6%', left:'22%', w:820, h:680, color:iceBlue, opacity:0.18, blur:64, dur:11, delay:3 },
      { bottom:'-4%', right:'10%', w:700, h:620, color:mist, opacity:0.19, blur:68, dur:13, delay:5 },
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
