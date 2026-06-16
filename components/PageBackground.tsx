'use client'
import { useEffect, useState } from 'react'

type PageVariant = 'home' | 'about' | 'services' | 'solutions' | 'projects' | 'contact'

export function PageBackground({ variant }: { variant: PageVariant }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isBlue = variant === 'home' || variant === 'about' || variant === 'solutions' || variant === 'contact'
  const accentA = isBlue ? '91,124,250' : '0,196,204'
  const accentB = isBlue ? '0,196,204' : '91,124,250'

  return (
    <>
      <style>{`
        @keyframes qbg-floatY {
          0%,100%{transform:translateY(0) rotateX(0deg) rotateY(0deg)}
          33%{transform:translateY(-38px) rotateX(7deg) rotateY(5deg)}
          66%{transform:translateY(-18px) rotateX(-4deg) rotateY(-7deg)}
        }
        @keyframes qbg-floatX {
          0%,100%{transform:translateX(0) rotateY(0deg)}
          50%{transform:translateX(28px) rotateY(10deg)}
        }
        @keyframes qbg-breathe {
          0%,100%{transform:scale(1);opacity:0.14}
          50%{transform:scale(1.10);opacity:0.26}
        }
        @keyframes qbg-spin {
          0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
          33%{transform:rotateX(12deg) rotateY(20deg) rotateZ(8deg)}
          66%{transform:rotateX(-8deg) rotateY(-12deg) rotateZ(18deg)}
          100%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
        }
        @keyframes qbg-glow {
          0%,100%{opacity:0.08}
          50%{opacity:0.20}
        }
        @keyframes qbg-shimmer {
          0%,100%{opacity:0.04}
          50%{opacity:0.18}
        }
        @keyframes qbg-line-r {
          0%{transform:translateX(-110%) scaleX(0.4);opacity:0}
          8%{opacity:1;transform:translateX(-60%) scaleX(1)}
          92%{opacity:1;transform:translateX(60%) scaleX(1)}
          100%{transform:translateX(110%) scaleX(0.4);opacity:0}
        }
        @keyframes qbg-line-l {
          0%{transform:translateX(110%);opacity:0}
          8%{opacity:1}
          92%{opacity:1}
          100%{transform:translateX(-110%);opacity:0}
        }
        @keyframes qbg-line-d {
          0%{transform:translateY(-110%);opacity:0}
          8%{opacity:1}
          92%{opacity:1}
          100%{transform:translateY(110%);opacity:0}
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
        .qbg-root {
          position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;perspective:1400px;
        }
        .qbg-shape {
          position:absolute;transform-style:preserve-3d;will-change:transform,opacity;
        }
        @media(prefers-reduced-motion:reduce){.qbg-root *{animation:none!important}}
        @media(max-width:768px){.qbg-root{opacity:0.6}}
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

        {/* ── LIGHTNING LINES ── */}
        <div style={{
          position:'absolute', top:'22%', left:0, right:0, height:'1px',
          background:`linear-gradient(90deg, transparent 0%, rgba(${accentA},0.7) 30%, rgba(${accentB},1) 50%, rgba(${accentA},0.7) 70%, transparent 100%)`,
          boxShadow:`0 0 10px rgba(${accentB},0.9), 0 0 30px rgba(${accentA},0.4)`,
          animation:'qbg-line-r 4s ease-in-out infinite',
        }}/>
        <div style={{
          position:'absolute', top:'68%', left:0, right:0, height:'1px',
          background:`linear-gradient(90deg, transparent 0%, rgba(${accentB},0.6) 40%, rgba(${accentA},0.9) 50%, rgba(${accentB},0.6) 60%, transparent 100%)`,
          boxShadow:`0 0 8px rgba(${accentA},0.8)`,
          animation:'qbg-line-l 5.5s ease-in-out infinite',
          animationDelay:'1.8s',
        }}/>
        <div style={{
          position:'absolute', left:'38%', top:0, bottom:0, width:'1px',
          background:`linear-gradient(180deg, transparent 0%, rgba(${accentA},0.35) 30%, rgba(${accentB},0.55) 50%, rgba(${accentA},0.35) 70%, transparent 100%)`,
          boxShadow:`0 0 6px rgba(${accentB},0.5)`,
          animation:'qbg-line-d 6s ease-in-out infinite',
          animationDelay:'0.6s',
        }}/>
        <div style={{
          position:'absolute', right:'25%', top:0, bottom:0, width:'1px',
          background:`linear-gradient(180deg, transparent 0%, rgba(${accentB},0.30) 40%, rgba(${accentA},0.45) 50%, rgba(${accentB},0.30) 60%, transparent 100%)`,
          animation:'qbg-line-d 8s ease-in-out infinite',
          animationDelay:'3s',
        }}/>

        {/* ── 3D GLASS CUBES ── */}
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
          animationDelay:'3.5s',
        }}/>
        <div className="qbg-shape" style={{
          bottom:'8%', right:'5%', width:64, height:64, borderRadius:14,
          background:`linear-gradient(135deg, rgba(${accentA},0.14) 0%, rgba(${accentB},0.06) 100%)`,
          border:`1px solid rgba(${accentA},0.22)`,
          backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
          boxShadow:`0 0 20px rgba(${accentA},0.15), inset 0 1px 0 rgba(255,255,255,0.10)`,
          animation:'qbg-cube-drift 8s ease-in-out infinite',
          animationDelay:'1.5s',
        }}/>
        <div className="qbg-shape" style={{
          bottom:'15%', left:'5%', width:44, height:44, borderRadius:10,
          background:`linear-gradient(135deg, rgba(${accentB},0.13) 0%, transparent 100%)`,
          border:`1px solid rgba(${accentB},0.22)`,
          backdropFilter:'blur(7px)',
          animation:'qbg-cube-spin 12s ease-in-out infinite',
          animationDelay:'0.5s',
        }}/>
        <div className="qbg-shape" style={{
          top:'5%', left:'48%', width:20, height:20, borderRadius:4,
          background:`rgba(${accentA},0.18)`,
          border:`1px solid rgba(${accentA},0.35)`,
          boxShadow:`0 0 12px rgba(${accentA},0.4)`,
          animation:'qbg-cube-bob 5s ease-in-out infinite',
          animationDelay:'4s',
        }}/>

        {/* ── PAGE-SPECIFIC SHAPES ── */}

        {variant === 'home' && <>
          <div className="qbg-shape" style={{
            top:-40, left:-60, width:560, height:340,
            animation:'qbg-floatY 14s ease-in-out infinite',
          }}>
            <svg width="560" height="340" viewBox="0 0 560 340" fill="none">
              <defs>
                <linearGradient id="h-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.22"/>
                  <stop offset="100%" stopColor="#5B7CFA" stopOpacity="0.03"/>
                </linearGradient>
              </defs>
              {Array.from({length:7}).map((_,row)=>Array.from({length:11}).map((_,col)=>{
                const glow=(row+col)%3===0?0.20:(row+col)%2===0?0.09:0.03
                return <rect key={`${row}-${col}`} x={col*50+3} y={row*46+3} width={42} height={38} rx={8}
                  fill={`rgba(91,124,250,${glow})`} stroke="rgba(91,124,250,0.12)" strokeWidth="0.5"
                  style={{animation:`qbg-shimmer ${10+(row+col)*0.4}s ease-in-out infinite`,animationDelay:`${(row+col)*0.15}s`}}/>
              }))}
              <rect x="0" y="0" width="560" height="340" rx="18"
                fill="url(#h-g1)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            </svg>
          </div>

          <div className="qbg-shape" style={{
            top:'10%', right:-30, width:300, height:400,
            animation:'qbg-floatX 10s ease-in-out infinite',
            animationDelay:'2s',
          }}>
            <svg width="300" height="400" viewBox="0 0 300 400" fill="none">
              <defs>
                <linearGradient id="h-g2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0"/>
                  <stop offset="40%" stopColor="#5B7CFA" stopOpacity="0.22"/>
                  <stop offset="70%" stopColor="#00C4CC" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length:12}).map((_,i)=>(
                <rect key={i} x={i*24+3} y={20} width={16} height={360} rx={8}
                  fill={`rgba(91,124,250,${0.05+(i%3)*0.05})`}
                  stroke="rgba(91,124,250,0.14)" strokeWidth="0.5"
                  style={{animation:`qbg-shimmer ${8+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.2}s`}}/>
              ))}
              <rect x="0" y="0" width="300" height="400" fill="url(#h-g2)"/>
            </svg>
          </div>

          <div className="qbg-shape" style={{
            bottom:-30, left:'18%', width:480, height:280,
            animation:'qbg-breathe 16s ease-in-out infinite',
            animationDelay:'4s',
          }}>
            <svg width="480" height="280" viewBox="0 0 480 280" fill="none">
              {Array.from({length:9}).map((_,row)=>Array.from({length:15}).map((_,col)=>{
                const cx=col*32+(row%2)*16, cy=row*28
                return <polygon key={`${row}-${col}`}
                  points={`${cx},${cy-13} ${cx+15},${cy} ${cx},${cy+13} ${cx-15},${cy}`}
                  fill="rgba(91,124,250,0.04)" stroke="rgba(91,124,250,0.14)" strokeWidth="0.5"/>
              }))}
            </svg>
          </div>
        </>}

        {variant === 'about' && <>
          <div className="qbg-shape" style={{
            top:-60, left:'8%', width:580, height:340,
            animation:'qbg-spin 22s ease-in-out infinite', opacity:0.65,
          }}>
            <svg width="580" height="340" viewBox="0 0 580 340" fill="none">
              {Array.from({length:11}).map((_,row)=>Array.from({length:18}).map((_,col)=>{
                const cx=col*32+(row%2)*16, cy=row*28
                return <polygon key={`${row}-${col}`}
                  points={`${cx},${cy-12} ${cx+14},${cy} ${cx},${cy+12} ${cx-14},${cy}`}
                  fill="rgba(91,124,250,0.04)" stroke="rgba(91,124,250,0.14)" strokeWidth="0.5"/>
              }))}
            </svg>
          </div>
          <div className="qbg-shape" style={{
            top:'20%', right:-50, width:260, height:360,
            animation:'qbg-floatY 12s ease-in-out infinite', animationDelay:'3s',
          }}>
            <svg width="260" height="360" viewBox="0 0 260 360" fill="none">
              {Array.from({length:10}).map((_,i)=>(
                <rect key={i} x={i*25+3} y={30} width={17} height={300} rx={8}
                  fill={`rgba(91,124,250,${0.05+(i%4)*0.04})`}
                  stroke="rgba(91,124,250,0.12)" strokeWidth="0.5"/>
              ))}
            </svg>
          </div>
        </>}

        {variant === 'services' && <>
          <div className="qbg-shape" style={{
            top:-40, right:'3%', width:460, height:340,
            animation:'qbg-floatX 11s ease-in-out infinite',
          }}>
            <svg width="460" height="340" viewBox="0 0 460 340" fill="none">
              <defs>
                <linearGradient id="sv-g1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00C4CC" stopOpacity="0"/>
                  <stop offset="40%" stopColor="#00C4CC" stopOpacity="0.20"/>
                  <stop offset="60%" stopColor="#5B7CFA" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length:17}).map((_,i)=>(
                <rect key={i} x={i*26+3} y={20} width={18} height={300} rx={9}
                  fill={`rgba(0,196,204,${0.04+(i%4)*0.05})`}
                  stroke="rgba(0,196,204,0.14)" strokeWidth="0.5"
                  style={{animation:`qbg-shimmer ${9+i*0.25}s ease-in-out infinite`,animationDelay:`${i*0.18}s`}}/>
              ))}
              <rect x="0" y="0" width="460" height="340" fill="url(#sv-g1)"/>
            </svg>
          </div>
          <div className="qbg-shape" style={{
            top:'28%', left:-50, width:400, height:260,
            animation:'qbg-floatY 15s ease-in-out infinite', animationDelay:'3s',
          }}>
            <svg width="400" height="260" viewBox="0 0 400 260" fill="none">
              {Array.from({length:9}).map((_,row)=>Array.from({length:12}).map((_,col)=>{
                const cx=col*33+(row%2)*16, cy=row*26
                return <polygon key={`${row}-${col}`}
                  points={`${cx},${cy-12} ${cx+14},${cy} ${cx},${cy+12} ${cx-14},${cy}`}
                  fill="rgba(0,196,204,0.04)" stroke="rgba(0,196,204,0.15)" strokeWidth="0.5"/>
              }))}
            </svg>
          </div>
        </>}

        {variant === 'solutions' && <>
          <div className="qbg-shape" style={{
            top:-80, left:'12%', width:600, height:360,
            animation:'qbg-floatY 13s ease-in-out infinite',
          }}>
            <svg width="600" height="360" viewBox="0 0 600 360" fill="none">
              <defs>
                <radialGradient id="sol-g1" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.20"/>
                  <stop offset="100%" stopColor="transparent"/>
                </radialGradient>
              </defs>
              {Array.from({length:8}).map((_,row)=>Array.from({length:12}).map((_,col)=>{
                const dist=Math.sqrt(Math.pow(col-6,2)+Math.pow(row-4,2))
                const alpha=Math.max(0,0.22-dist*0.025)
                return <rect key={`${row}-${col}`} x={col*49+3} y={row*43+3} width={41} height={35} rx={7}
                  fill={`rgba(91,124,250,${alpha})`} stroke="rgba(91,124,250,0.10)" strokeWidth="0.5"/>
              }))}
              <rect x="0" y="0" width="600" height="360" fill="url(#sol-g1)" rx="18"/>
            </svg>
          </div>
        </>}

        {variant === 'projects' && <>
          <div className="qbg-shape" style={{
            top:-60, right:'8%', width:540, height:340,
            animation:'qbg-spin 24s ease-in-out infinite', opacity:0.60,
          }}>
            <svg width="540" height="340" viewBox="0 0 540 340" fill="none">
              <defs>
                <linearGradient id="pr-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C4CC" stopOpacity="0.16"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length:12}).map((_,row)=>Array.from({length:17}).map((_,col)=>{
                const cx=col*32+(row%2)*16, cy=row*26
                return <polygon key={`${row}-${col}`}
                  points={`${cx},${cy-12} ${cx+14},${cy} ${cx},${cy+12} ${cx-14},${cy}`}
                  fill="rgba(0,196,204,0.04)" stroke="rgba(0,196,204,0.14)" strokeWidth="0.5"/>
              }))}
              <rect x="0" y="0" width="540" height="340" fill="url(#pr-g1)" rx="18"/>
            </svg>
          </div>
        </>}

        {variant === 'contact' && <>
          <div className="qbg-shape" style={{
            top:-20, left:-50, width:380, height:460,
            animation:'qbg-floatX 16s ease-in-out infinite',
          }}>
            <svg width="380" height="460" viewBox="0 0 380 460" fill="none">
              <defs>
                <linearGradient id="ct-g1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0"/>
                  <stop offset="40%" stopColor="#5B7CFA" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length:14}).map((_,i)=>(
                <rect key={i} x={i*26+3} y={30} width={18} height={400} rx={9}
                  fill={`rgba(91,124,250,${0.04+(i%5)*0.03})`}
                  stroke="rgba(91,124,250,0.12)" strokeWidth="0.5"/>
              ))}
              <rect x="0" y="0" width="380" height="460" fill="url(#ct-g1)"/>
            </svg>
          </div>
        </>}

      </div>
    </>
  )
}
