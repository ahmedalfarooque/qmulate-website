'use client'
import { useEffect, useState } from 'react'

type PageVariant = 'home' | 'about' | 'services' | 'solutions' | 'projects' | 'contact'

export function PageBackground({ variant }: { variant: PageVariant }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isBlue = ['home', 'about', 'solutions', 'contact'].includes(variant)
  const accentA = isBlue ? '91,124,250' : '0,196,204'
  const accentB = isBlue ? '0,196,204' : '91,124,250'

  return (
    <>
      <style>{`
        @keyframes qbg-glow {
          0%,100%{opacity:0.08} 50%{opacity:0.22}
        }
        @keyframes qbg-cube-bob {
          0%,100%{transform:translateY(0px) rotate(0deg)}
          33%{transform:translateY(-16px) rotate(10deg)}
          66%{transform:translateY(-8px) rotate(-6deg)}
        }
        @keyframes qbg-cube-spin {
          0%,100%{transform:translateY(0px) rotateY(0deg) rotateZ(0deg)}
          50%{transform:translateY(-20px) rotateY(180deg) rotateZ(15deg)}
        }
        @keyframes qbg-cube-drift {
          0%,100%{transform:translate(0,0) rotateZ(0deg)}
          25%{transform:translate(10px,-14px) rotateZ(8deg)}
          75%{transform:translate(-8px,-10px) rotateZ(-6deg)}
        }
        @keyframes qbg-diamond-spin {
          0%,100%{transform:rotate(45deg) translateY(0px) scale(1)}
          50%{transform:rotate(225deg) translateY(-12px) scale(1.08)}
        }
        @keyframes qbg-diamond-pulse {
          0%,100%{transform:rotate(45deg) scale(1);opacity:0.5}
          50%{transform:rotate(45deg) scale(1.15);opacity:0.9}
        }
        .qbg-root {
          position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;perspective:1400px;
        }
        .qbg-shape {
          position:absolute;transform-style:preserve-3d;will-change:transform,opacity;
        }
        @media(prefers-reduced-motion:reduce){.qbg-root *{animation:none!important}}
        @media(max-width:768px){.qbg-root{opacity:0.55}}
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

        {/* ── FLOATING 3D GLASS CUBES ── */}
        <div className="qbg-shape" style={{
          top:'8%', left:'4%', width:72, height:72, borderRadius:16,
          background:`linear-gradient(135deg, rgba(${accentA},0.16) 0%, rgba(${accentA},0.05) 100%)`,
          border:`1px solid rgba(${accentA},0.28)`,
          backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
          boxShadow:`0 0 24px rgba(${accentA},0.18), inset 0 1px 0 rgba(255,255,255,0.12)`,
          animation:'qbg-cube-bob 7s ease-in-out infinite',
        }}/>
        <div className="qbg-shape" style={{
          top:'12%', right:'6%', width:52, height:52, borderRadius:11,
          background:`linear-gradient(135deg, rgba(${accentB},0.14) 0%, rgba(${accentB},0.04) 100%)`,
          border:`1px solid rgba(${accentB},0.25)`,
          backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
          boxShadow:`0 0 18px rgba(${accentB},0.16)`,
          animation:'qbg-cube-spin 9s ease-in-out infinite',
          animationDelay:'1s',
        }}/>
        <div className="qbg-shape" style={{
          top:'45%', left:'2%', width:36, height:36, borderRadius:8,
          background:`linear-gradient(135deg, rgba(${accentA},0.12) 0%, transparent 100%)`,
          border:`1px solid rgba(${accentA},0.20)`,
          backdropFilter:'blur(6px)',
          animation:'qbg-cube-drift 11s ease-in-out infinite',
          animationDelay:'2s',
        }}/>
        <div className="qbg-shape" style={{
          top:'52%', right:'3%', width:28, height:28, borderRadius:6,
          background:`linear-gradient(135deg, rgba(${accentB},0.12) 0%, transparent 100%)`,
          border:`1px solid rgba(${accentB},0.20)`,
          backdropFilter:'blur(6px)',
          animation:'qbg-cube-bob 6s ease-in-out infinite',
          animationDelay:'0.5s',
        }}/>
        <div className="qbg-shape" style={{
          bottom:'15%', left:'8%', width:22, height:22, borderRadius:5,
          background:`linear-gradient(135deg, rgba(${accentA},0.10) 0%, transparent 100%)`,
          border:`1px solid rgba(${accentA},0.18)`,
          backdropFilter:'blur(4px)',
          animation:'qbg-cube-drift 13s ease-in-out infinite',
          animationDelay:'4s',
        }}/>
        <div className="qbg-shape" style={{
          bottom:'8%', right:'7%', width:44, height:44, borderRadius:10,
          background:`linear-gradient(135deg, rgba(${accentB},0.13) 0%, rgba(${accentA},0.04) 100%)`,
          border:`1px solid rgba(${accentB},0.22)`,
          backdropFilter:'blur(8px)',
          boxShadow:`0 0 16px rgba(${accentB},0.14)`,
          animation:'qbg-cube-spin 10s ease-in-out infinite',
          animationDelay:'3s',
        }}/>

        {/* ── FLOATING 3D DIAMOND SHAPES ── */}
        <div className="qbg-shape" style={{
          top:'35%', left:'10%', width:40, height:40,
          background:`linear-gradient(135deg, rgba(${accentA},0.18) 0%, rgba(${accentB},0.08) 100%)`,
          border:`1px solid rgba(${accentA},0.32)`,
          backdropFilter:'blur(8px)',
          boxShadow:`0 0 20px rgba(${accentA},0.20), inset 0 1px 0 rgba(255,255,255,0.14)`,
          animation:'qbg-diamond-spin 8s ease-in-out infinite',
          transform:'rotate(45deg)',
        }}/>
        <div className="qbg-shape" style={{
          top:'18%', left:'50%', width:28, height:28,
          background:`linear-gradient(135deg, rgba(${accentB},0.16) 0%, rgba(${accentA},0.06) 100%)`,
          border:`1px solid rgba(${accentB},0.28)`,
          backdropFilter:'blur(6px)',
          boxShadow:`0 0 14px rgba(${accentB},0.18)`,
          animation:'qbg-diamond-pulse 6s ease-in-out infinite',
          transform:'rotate(45deg)',
          animationDelay:'1.5s',
        }}/>
        <div className="qbg-shape" style={{
          top:'60%', right:'12%', width:22, height:22,
          background:`linear-gradient(135deg, rgba(${accentA},0.14) 0%, transparent 100%)`,
          border:`1px solid rgba(${accentA},0.24)`,
          backdropFilter:'blur(4px)',
          animation:'qbg-diamond-spin 10s ease-in-out infinite',
          transform:'rotate(45deg)',
          animationDelay:'3s',
        }}/>
        <div className="qbg-shape" style={{
          bottom:'20%', left:'55%', width:32, height:32,
          background:`linear-gradient(135deg, rgba(${accentB},0.12) 0%, transparent 100%)`,
          border:`1px solid rgba(${accentB},0.22)`,
          backdropFilter:'blur(6px)',
          animation:'qbg-diamond-pulse 9s ease-in-out infinite',
          transform:'rotate(45deg)',
          animationDelay:'2s',
        }}/>

      </div>
    </>
  )
}
