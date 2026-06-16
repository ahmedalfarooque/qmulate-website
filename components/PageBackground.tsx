'use client'
import { useEffect, useState } from 'react'

type PageVariant = 'home' | 'about' | 'services' | 'solutions' | 'projects' | 'contact'

export function PageBackground({ variant }: { variant: PageVariant }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          33% { transform: translateY(-40px) rotateX(8deg) rotateY(5deg); }
          66% { transform: translateY(-20px) rotateX(-5deg) rotateY(-8deg); }
        }
        @keyframes floatX {
          0%, 100% { transform: translateX(0px) rotateY(0deg) rotateZ(0deg); }
          50% { transform: translateX(30px) rotateY(12deg) rotateZ(3deg); }
        }
        @keyframes floatDiag {
          0%, 100% { transform: translate(0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          25% { transform: translate(20px,-30px) rotateX(6deg) rotateY(-8deg) rotateZ(4deg); }
          75% { transform: translate(-15px,-20px) rotateX(-4deg) rotateY(10deg) rotateZ(-3deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1) rotateX(0deg) rotateZ(0deg); opacity: 0.18; }
          50% { transform: scale(1.12) rotateX(6deg) rotateZ(4deg); opacity: 0.28; }
        }
        @keyframes spinSlow {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          33% { transform: rotateX(15deg) rotateY(25deg) rotateZ(10deg); }
          66% { transform: rotateX(-10deg) rotateY(-15deg) rotateZ(20deg); }
          100% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.10; }
          50% { opacity: 0.22; }
        }
        @keyframes shimmer {
          0% { opacity: 0.05; }
          50% { opacity: 0.20; }
          100% { opacity: 0.05; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(15px,-25px) rotate(5deg); }
          75% { transform: translate(-10px,-15px) rotate(-3deg); }
        }
        .qbg-wrap {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          perspective: 1200px;
        }
        .qbg-shape {
          position: absolute;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }
        .qbg-glass {
          filter: blur(0px);
        }
        @media (prefers-reduced-motion: reduce) {
          .qbg-shape { animation: none !important; }
        }
      `}</style>

      <div className="qbg-wrap" aria-hidden="true">

        {/* AMBIENT GLOW */}
        <div style={{
          position: 'absolute',
          top: '10%', left: '20%',
          width: 800, height: 600,
          borderRadius: '50%',
          background: variant === 'services' || variant === 'projects'
            ? 'radial-gradient(ellipse, rgba(0,196,204,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(91,124,250,0.14) 0%, transparent 70%)',
          animation: 'glowPulse 8s ease-in-out infinite',
        }}/>

        {/* ── HOME PAGE ─────────────────────────────────── */}
        {variant === 'home' && <>

          {/* Shape 1 — GLASS FAÇADE — large, top-left, floatY */}
          <div className="qbg-shape" style={{
            top: -60, left: -80, width: 580, height: 380,
            animation: 'floatY 14s ease-in-out infinite',
          }}>
            <svg width="580" height="380" viewBox="0 0 580 380" fill="none">
              <defs>
                <filter id="gf1" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="18" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
                <linearGradient id="gg1a" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.35"/>
                  <stop offset="50%" stopColor="#00C4CC" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#5B7CFA" stopOpacity="0.05"/>
                </linearGradient>
                <linearGradient id="gg1b" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.18)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0.02)"/>
                </linearGradient>
              </defs>
              {Array.from({length: 8}).map((_, row) =>
                Array.from({length: 12}).map((_, col) => {
                  const brightness = (row + col) % 3 === 0 ? 0.22 : (row + col) % 2 === 0 ? 0.10 : 0.04
                  return (
                    <rect key={`${row}-${col}`}
                      x={col * 48 + 4} y={row * 46 + 4} width={40} height={38} rx={7}
                      fill={`rgba(91,124,250,${brightness})`}
                      stroke="rgba(91,124,250,0.12)" strokeWidth="0.5"
                      style={{
                        animation: `shimmer ${10 + (row + col) * 0.4}s ease-in-out infinite`,
                        animationDelay: `${(row + col) * 0.15}s`,
                      }}
                    />
                  )
                })
              )}
              <rect x="0" y="0" width="580" height="380" rx="20"
                fill="url(#gg1b)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
            </svg>
          </div>

          {/* Shape 2 — VERTICAL FINS — right side, floatX */}
          <div className="qbg-shape" style={{
            top: '15%', right: -40, width: 320, height: 420,
            animation: 'floatX 10s ease-in-out infinite',
            animationDelay: '2s',
          }}>
            <svg width="320" height="420" viewBox="0 0 320 420" fill="none">
              <defs>
                <linearGradient id="gf2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.0"/>
                  <stop offset="30%" stopColor="#5B7CFA" stopOpacity="0.25"/>
                  <stop offset="70%" stopColor="#00C4CC" stopOpacity="0.20"/>
                  <stop offset="100%" stopColor="#5B7CFA" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {Array.from({length: 14}).map((_, i) => (
                <rect key={i}
                  x={i * 22 + 4} y={20} width={14} height={380} rx={7}
                  fill={`rgba(91,124,250,${0.06 + (i % 3) * 0.05})`}
                  stroke="rgba(91,124,250,0.15)" strokeWidth="0.5"
                  style={{
                    animation: `shimmer ${8 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
              <rect x="0" y="0" width="320" height="420"
                fill="url(#gf2)" stroke="none"/>
            </svg>
          </div>

          {/* Shape 3 — STRUCTURAL LATTICE — bottom, breathe */}
          <div className="qbg-shape" style={{
            bottom: -40, left: '20%', width: 500, height: 300,
            animation: 'breathe 16s ease-in-out infinite',
            animationDelay: '4s',
          }}>
            <svg width="500" height="300" viewBox="0 0 500 300" fill="none">
              <defs>
                <linearGradient id="gl3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#00C4CC" stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              {Array.from({length: 10}).map((_, row) =>
                Array.from({length: 16}).map((_, col) => {
                  const cx = col * 32 + (row % 2) * 16
                  const cy = row * 28
                  return (
                    <polygon key={`${row}-${col}`}
                      points={`${cx},${cy-14} ${cx+16},${cy} ${cx},${cy+14} ${cx-16},${cy}`}
                      fill="none"
                      stroke="rgba(91,124,250,0.18)"
                      strokeWidth="0.6"
                    />
                  )
                })
              )}
              <rect x="0" y="0" width="500" height="300" rx="16"
                fill="url(#gl3)" stroke="rgba(91,124,250,0.10)" strokeWidth="0.5"/>
            </svg>
          </div>

          {/* Extra glow orb — right bottom */}
          <div style={{
            position: 'absolute', bottom: '10%', right: '5%',
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,196,204,0.12) 0%, transparent 70%)',
            animation: 'breathe 12s ease-in-out infinite',
            animationDelay: '3s',
          }}/>
        </>}

        {/* ── ABOUT PAGE ────────────────────────────────── */}
        {variant === 'about' && <>

          <div className="qbg-shape" style={{
            top: -80, left: '10%', width: 600, height: 360,
            animation: 'spinSlow 20s ease-in-out infinite',
            opacity: 0.7,
          }}>
            <svg width="600" height="360" viewBox="0 0 600 360" fill="none">
              <defs>
                <linearGradient id="al1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length: 12}).map((_, row) =>
                Array.from({length: 19}).map((_, col) => {
                  const cx = col * 32 + (row % 2) * 16
                  const cy = row * 28
                  return (
                    <polygon key={`${row}-${col}`}
                      points={`${cx},${cy-13} ${cx+15},${cy} ${cx},${cy+13} ${cx-15},${cy}`}
                      fill="rgba(91,124,250,0.04)"
                      stroke="rgba(91,124,250,0.14)"
                      strokeWidth="0.5"
                    />
                  )
                })
              )}
              <rect x="0" y="0" width="600" height="360" rx="20"
                fill="url(#al1)" stroke="rgba(91,124,250,0.08)" strokeWidth="0.5"/>
            </svg>
          </div>

          <div className="qbg-shape" style={{
            top: '25%', right: -60, width: 280, height: 380,
            animation: 'floatY 12s ease-in-out infinite',
            animationDelay: '3s',
          }}>
            <svg width="280" height="380" viewBox="0 0 280 380" fill="none">
              {Array.from({length: 11}).map((_, i) => (
                <rect key={i}
                  x={i * 24 + 4} y={30} width={16} height={320} rx={8}
                  fill={`rgba(91,124,250,${0.05 + (i % 4) * 0.04})`}
                  stroke="rgba(91,124,250,0.12)" strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>

          <div className="qbg-shape" style={{
            bottom: '5%', right: '8%', width: 340, height: 220,
            animation: 'breathe 14s ease-in-out infinite',
            animationDelay: '2s',
            opacity: 0.6,
            transform: 'rotate(90deg)',
          }}>
            <svg width="340" height="220" viewBox="0 0 340 220" fill="none">
              {Array.from({length: 5}).map((_, row) =>
                Array.from({length: 7}).map((_, col) => (
                  <rect key={`${row}-${col}`}
                    x={col * 48 + 4} y={row * 42 + 4} width={40} height={34} rx={7}
                    fill={`rgba(0,196,204,${0.06 + (row + col) % 3 * 0.04})`}
                    stroke="rgba(0,196,204,0.10)" strokeWidth="0.5"
                  />
                ))
              )}
            </svg>
          </div>
        </>}

        {/* ── SERVICES PAGE ─────────────────────────────── */}
        {variant === 'services' && <>

          <div className="qbg-shape" style={{
            top: -50, right: '5%', width: 480, height: 360,
            animation: 'floatX 11s ease-in-out infinite',
          }}>
            <svg width="480" height="360" viewBox="0 0 480 360" fill="none">
              <defs>
                <linearGradient id="sf1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00C4CC" stopOpacity="0.0"/>
                  <stop offset="40%" stopColor="#00C4CC" stopOpacity="0.20"/>
                  <stop offset="60%" stopColor="#5B7CFA" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length: 18}).map((_, i) => (
                <rect key={i}
                  x={i * 26 + 4} y={20} width={18} height={320} rx={9}
                  fill={`rgba(0,196,204,${0.04 + (i % 4) * 0.05})`}
                  stroke="rgba(0,196,204,0.15)" strokeWidth="0.5"
                  style={{
                    animation: `shimmer ${9 + i * 0.25}s ease-in-out infinite`,
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))}
              <rect x="0" y="0" width="480" height="360"
                fill="url(#sf1)" stroke="none"/>
            </svg>
          </div>

          <div className="qbg-shape" style={{
            top: '30%', left: -60, width: 420, height: 280,
            animation: 'floatDiag 15s ease-in-out infinite',
            animationDelay: '3s',
          }}>
            <svg width="420" height="280" viewBox="0 0 420 280" fill="none">
              {Array.from({length: 10}).map((_, row) =>
                Array.from({length: 13}).map((_, col) => {
                  const cx = col * 33 + (row % 2) * 16
                  const cy = row * 26
                  return (
                    <polygon key={`${row}-${col}`}
                      points={`${cx},${cy-12} ${cx+14},${cy} ${cx},${cy+12} ${cx-14},${cy}`}
                      fill="rgba(0,196,204,0.04)"
                      stroke="rgba(0,196,204,0.15)"
                      strokeWidth="0.5"
                    />
                  )
                })
              )}
            </svg>
          </div>

          <div className="qbg-shape" style={{
            bottom: '-20px', left: '20%', width: 460, height: 280,
            animation: 'breathe 13s ease-in-out infinite',
            animationDelay: '6s',
          }}>
            <svg width="460" height="280" viewBox="0 0 460 280" fill="none">
              {Array.from({length: 6}).map((_, row) =>
                Array.from({length: 9}).map((_, col) => (
                  <rect key={`${row}-${col}`}
                    x={col * 50 + 4} y={row * 44 + 4} width={42} height={36} rx={8}
                    fill={`rgba(91,124,250,${0.04 + (row * col) % 4 * 0.03})`}
                    stroke="rgba(91,124,250,0.10)" strokeWidth="0.5"
                  />
                ))
              )}
            </svg>
          </div>
        </>}

        {/* ── SOLUTIONS PAGE ────────────────────────────── */}
        {variant === 'solutions' && <>

          <div className="qbg-shape" style={{
            top: -100, left: '15%', width: 620, height: 380,
            animation: 'floatY 13s ease-in-out infinite',
          }}>
            <svg width="620" height="380" viewBox="0 0 620 380" fill="none">
              <defs>
                <radialGradient id="solg1" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.20"/>
                  <stop offset="100%" stopColor="transparent"/>
                </radialGradient>
              </defs>
              {Array.from({length: 8}).map((_, row) =>
                Array.from({length: 13}).map((_, col) => {
                  const dist = Math.sqrt(Math.pow(col - 6, 2) + Math.pow(row - 4, 2))
                  const alpha = Math.max(0, 0.22 - dist * 0.025)
                  return (
                    <rect key={`${row}-${col}`}
                      x={col * 47 + 4} y={row * 45 + 4} width={39} height={37} rx={7}
                      fill={`rgba(91,124,250,${alpha})`}
                      stroke="rgba(91,124,250,0.10)" strokeWidth="0.5"
                    />
                  )
                })
              )}
              <rect x="0" y="0" width="620" height="380"
                fill="url(#solg1)" stroke="rgba(91,124,250,0.08)" strokeWidth="0.5" rx="20"/>
            </svg>
          </div>

          <div className="qbg-shape" style={{
            top: '15%', right: -60, width: 400, height: 300,
            animation: 'breathe 10s ease-in-out infinite',
            animationDelay: '4s',
          }}>
            <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
              {Array.from({length: 11}).map((_, row) =>
                Array.from({length: 13}).map((_, col) => {
                  const cx = col * 32 + (row % 2) * 16
                  const cy = row * 26
                  return (
                    <polygon key={`${row}-${col}`}
                      points={`${cx},${cy-12} ${cx+14},${cy} ${cx},${cy+12} ${cx-14},${cy}`}
                      fill="rgba(91,124,250,0.05)"
                      stroke="rgba(91,124,250,0.16)"
                      strokeWidth="0.6"
                    />
                  )
                })
              )}
            </svg>
          </div>

          <div className="qbg-shape" style={{
            bottom: '10%', left: -40, width: 360, height: 300,
            animation: 'floatX 14s ease-in-out infinite',
            animationDelay: '2s',
            transform: 'rotate(270deg)',
          }}>
            <svg width="360" height="300" viewBox="0 0 360 300" fill="none">
              {Array.from({length: 13}).map((_, i) => (
                <rect key={i}
                  x={i * 26 + 4} y={20} width={18} height={260} rx={9}
                  fill={`rgba(91,124,250,${0.04 + (i % 3) * 0.04})`}
                  stroke="rgba(91,124,250,0.12)" strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>
        </>}

        {/* ── PROJECTS PAGE ─────────────────────────────── */}
        {variant === 'projects' && <>

          <div className="qbg-shape" style={{
            top: -80, right: '10%', width: 560, height: 360,
            animation: 'spinSlow 22s ease-in-out infinite',
            opacity: 0.65,
          }}>
            <svg width="560" height="360" viewBox="0 0 560 360" fill="none">
              <defs>
                <linearGradient id="prg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C4CC" stopOpacity="0.16"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length: 13}).map((_, row) =>
                Array.from({length: 18}).map((_, col) => {
                  const cx = col * 32 + (row % 2) * 16
                  const cy = row * 26
                  return (
                    <polygon key={`${row}-${col}`}
                      points={`${cx},${cy-12} ${cx+15},${cy} ${cx},${cy+12} ${cx-15},${cy}`}
                      fill="rgba(0,196,204,0.04)"
                      stroke="rgba(0,196,204,0.14)"
                      strokeWidth="0.5"
                    />
                  )
                })
              )}
              <rect x="0" y="0" width="560" height="360"
                fill="url(#prg1)" stroke="rgba(0,196,204,0.08)" strokeWidth="0.5" rx="20"/>
            </svg>
          </div>

          <div className="qbg-shape" style={{
            top: '40%', left: -100, width: 440, height: 280,
            animation: 'floatDiag 12s ease-in-out infinite',
            animationDelay: '5s',
          }}>
            <svg width="440" height="280" viewBox="0 0 440 280" fill="none">
              {Array.from({length: 6}).map((_, row) =>
                Array.from({length: 9}).map((_, col) => (
                  <rect key={`${row}-${col}`}
                    x={col * 48 + 4} y={row * 44 + 4} width={40} height={36} rx={7}
                    fill={`rgba(0,196,204,${0.05 + (col + row) % 3 * 0.04})`}
                    stroke="rgba(0,196,204,0.10)" strokeWidth="0.5"
                  />
                ))
              )}
            </svg>
          </div>

          <div className="qbg-shape" style={{
            bottom: '5%', right: -50, width: 300, height: 360,
            animation: 'floatY 17s ease-in-out infinite',
            animationDelay: '3s',
            transform: 'rotate(180deg)',
          }}>
            <svg width="300" height="360" viewBox="0 0 300 360" fill="none">
              {Array.from({length: 11}).map((_, i) => (
                <rect key={i}
                  x={i * 26 + 4} y={20} width={18} height={320} rx={9}
                  fill={`rgba(0,196,204,${0.04 + (i % 4) * 0.04})`}
                  stroke="rgba(0,196,204,0.12)" strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>
        </>}

        {/* ── CONTACT PAGE ──────────────────────────────── */}
        {variant === 'contact' && <>

          <div className="qbg-shape" style={{
            top: '-30px', left: -60, width: 400, height: 480,
            animation: 'floatX 16s ease-in-out infinite',
          }}>
            <svg width="400" height="480" viewBox="0 0 400 480" fill="none">
              <defs>
                <linearGradient id="cfg1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5B7CFA" stopOpacity="0.0"/>
                  <stop offset="40%" stopColor="#5B7CFA" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
              {Array.from({length: 15}).map((_, i) => (
                <rect key={i}
                  x={i * 26 + 4} y={30} width={18} height={420} rx={9}
                  fill={`rgba(91,124,250,${0.04 + (i % 5) * 0.03})`}
                  stroke="rgba(91,124,250,0.12)" strokeWidth="0.5"
                />
              ))}
              <rect x="0" y="0" width="400" height="480"
                fill="url(#cfg1)" stroke="none"/>
            </svg>
          </div>

          <div className="qbg-shape" style={{
            top: '-40px', right: -60, width: 380, height: 280,
            animation: 'breathe 11s ease-in-out infinite',
            animationDelay: '3s',
          }}>
            <svg width="380" height="280" viewBox="0 0 380 280" fill="none">
              {Array.from({length: 10}).map((_, row) =>
                Array.from({length: 12}).map((_, col) => {
                  const cx = col * 32 + (row % 2) * 16
                  const cy = row * 26
                  return (
                    <polygon key={`${row}-${col}`}
                      points={`${cx},${cy-12} ${cx+14},${cy} ${cx},${cy+12} ${cx-14},${cy}`}
                      fill="rgba(91,124,250,0.04)"
                      stroke="rgba(91,124,250,0.14)"
                      strokeWidth="0.5"
                    />
                  )
                })
              )}
            </svg>
          </div>

          <div className="qbg-shape" style={{
            bottom: '5%', left: '20%', width: 420, height: 260,
            animation: 'floatDiag 14s ease-in-out infinite',
            animationDelay: '6s',
            opacity: 0.7,
          }}>
            <svg width="420" height="260" viewBox="0 0 420 260" fill="none">
              {Array.from({length: 5}).map((_, row) =>
                Array.from({length: 8}).map((_, col) => (
                  <rect key={`${row}-${col}`}
                    x={col * 52 + 4} y={row * 48 + 4} width={44} height={40} rx={8}
                    fill={`rgba(91,124,250,${0.05 + (row + col) % 4 * 0.03})`}
                    stroke="rgba(91,124,250,0.10)" strokeWidth="0.5"
                  />
                ))
              )}
            </svg>
          </div>
        </>}

      </div>
    </>
  )
}
