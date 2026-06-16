"use client";
import { useEffect, useState } from "react";

export function EnergyBeam() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes beam-descend {
          0%   { transform: translateY(-220px); opacity: 0; }
          4%   { opacity: 1; }
          93%  { opacity: 0.85; }
          100% { transform: translateY(calc(100vh + 220px)); opacity: 0; }
        }
        @keyframes beam-core-pulse {
          0%, 100% { filter: brightness(1); }
          50%       { filter: brightness(1.18); }
        }
        .energy-beam-track {
          position: fixed;
          left: calc(50% - 1.5px);
          top: 0;
          width: 3px;
          height: 220px;
          z-index: 8;
          pointer-events: none;
          border-radius: 3px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0,212,255,0) 4%,
            rgba(0,212,255,0.75) 22%,
            rgba(0,212,255,1) 42%,
            rgba(110,231,255,1) 50%,
            rgba(77,141,255,0.9) 68%,
            rgba(0,212,255,0.45) 82%,
            rgba(0,212,255,0) 96%,
            transparent 100%
          );
          box-shadow:
            0 0 2px 0.5px rgba(255,255,255,0.85),
            0 0 6px 2px rgba(0,212,255,0.95),
            0 0 18px 6px rgba(0,212,255,0.50),
            0 0 40px 14px rgba(0,212,255,0.18),
            0 0 90px 28px rgba(0,212,255,0.07);
          animation: beam-descend 5.5s linear infinite,
                     beam-core-pulse 1.8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        [data-theme="light"] .energy-beam-track,
        .light .energy-beam-track {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(2,132,199,0) 4%,
            rgba(2,132,199,0.65) 22%,
            rgba(2,132,199,0.9) 42%,
            rgba(14,165,233,1) 50%,
            rgba(29,78,216,0.85) 68%,
            rgba(2,132,199,0.38) 82%,
            rgba(2,132,199,0) 96%,
            transparent 100%
          );
          box-shadow:
            0 0 2px 0.5px rgba(255,255,255,0.95),
            0 0 6px 2px rgba(2,132,199,0.85),
            0 0 18px 6px rgba(2,132,199,0.35),
            0 0 40px 14px rgba(2,132,199,0.12),
            0 0 90px 28px rgba(2,132,199,0.05);
        }
        @media (prefers-reduced-motion: reduce) {
          .energy-beam-track { display: none; }
        }
      `}</style>
      <div className="energy-beam-track" aria-hidden="true" />
    </>
  );
}
