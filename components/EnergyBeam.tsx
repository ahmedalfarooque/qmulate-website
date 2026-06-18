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
          0%   { transform: translateY(-280px); opacity: 0; }
          3%   { opacity: 1; }
          92%  { opacity: 0.90; }
          100% { transform: translateY(calc(100vh + 280px)); opacity: 0; }
        }
        @keyframes beam-core-pulse {
          0%, 100% { filter: brightness(1) blur(0px); }
          35%       { filter: brightness(1.22) blur(0.3px); }
          65%       { filter: brightness(1.08) blur(0px); }
        }
        @keyframes beam-outer-pulse {
          0%, 100% { opacity: 0.12; }
          50%       { opacity: 0.24; }
        }
        .energy-beam-wrap {
          position: fixed;
          left: calc(50% - 1px);
          top: 0;
          width: 2px;
          height: 0;
          z-index: 8;
          pointer-events: none;
        }
        /* Outer bloom — widest, most subtle */
        .energy-beam-outer {
          position: fixed;
          left: calc(50% - 55px);
          top: 0;
          width: 110px;
          height: 280px;
          z-index: 7;
          pointer-events: none;
          background: radial-gradient(
            ellipse 55px 140px at 50% 50%,
            rgba(0,212,255,0.045) 0%,
            transparent 100%
          );
          animation: beam-descend 5.5s linear infinite,
                     beam-outer-pulse 2.2s ease-in-out infinite;
          will-change: transform, opacity;
        }
        /* Mid glow */
        .energy-beam-mid {
          position: fixed;
          left: calc(50% - 18px);
          top: 0;
          width: 36px;
          height: 280px;
          z-index: 7;
          pointer-events: none;
          background: radial-gradient(
            ellipse 18px 140px at 50% 50%,
            rgba(0,212,255,0.15) 0%,
            rgba(77,141,255,0.07) 55%,
            transparent 100%
          );
          animation: beam-descend 5.5s linear infinite;
          animation-delay: 0s;
          will-change: transform, opacity;
        }
        /* Inner glow */
        .energy-beam-inner {
          position: fixed;
          left: calc(50% - 7px);
          top: 0;
          width: 14px;
          height: 280px;
          z-index: 8;
          pointer-events: none;
          border-radius: 7px;
          background: radial-gradient(
            ellipse 7px 140px at 50% 50%,
            rgba(0,212,255,0.55) 0%,
            rgba(0,212,255,0.25) 45%,
            transparent 100%
          );
          animation: beam-descend 5.5s linear infinite;
          will-change: transform, opacity;
        }
        /* Core beam — sharpest */
        .energy-beam-core {
          position: fixed;
          left: calc(50% - 2px);
          top: 0;
          width: 4px;
          height: 280px;
          z-index: 9;
          pointer-events: none;
          border-radius: 4px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0,212,255,0) 3%,
            rgba(0,212,255,0.80) 20%,
            rgba(0,212,255,1.00) 40%,
            rgba(120,240,255,1.00) 50%,
            rgba(77,141,255,0.92) 66%,
            rgba(0,212,255,0.50) 82%,
            rgba(0,212,255,0) 97%,
            transparent 100%
          );
          box-shadow:
            0 0 1px 0px rgba(255,255,255,1.00),
            0 0 4px 1px rgba(0,212,255,1.00),
            0 0 12px 4px rgba(0,212,255,0.70),
            0 0 28px 9px rgba(0,212,255,0.35),
            0 0 60px 18px rgba(0,212,255,0.14),
            0 0 110px 32px rgba(0,212,255,0.06);
          animation: beam-descend 5.5s linear infinite,
                     beam-core-pulse 1.8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        /* Light-mode variants */
        [data-theme="light"] .energy-beam-core {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(2,132,199,0) 3%,
            rgba(2,132,199,0.70) 20%,
            rgba(2,132,199,0.92) 40%,
            rgba(14,165,233,1.00) 50%,
            rgba(29,78,216,0.88) 66%,
            rgba(2,132,199,0.42) 82%,
            rgba(2,132,199,0) 97%,
            transparent 100%
          );
          box-shadow:
            0 0 1px 0px rgba(255,255,255,0.98),
            0 0 4px 1px rgba(2,132,199,0.90),
            0 0 12px 4px rgba(2,132,199,0.50),
            0 0 28px 9px rgba(2,132,199,0.22),
            0 0 60px 18px rgba(2,132,199,0.09),
            0 0 110px 32px rgba(2,132,199,0.04);
        }
        [data-theme="light"] .energy-beam-outer,
        [data-theme="light"] .energy-beam-mid,
        [data-theme="light"] .energy-beam-inner {
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(2,132,199,0.10) 0%,
            transparent 100%
          );
        }
        @media (prefers-reduced-motion: reduce) {
          .energy-beam-core,
          .energy-beam-inner,
          .energy-beam-mid,
          .energy-beam-outer { display: none; }
        }
        /* Hide on mobile/tablet — too many GPU compositing layers + box-shadow stacking */
        @media (max-width: 1023px) {
          .energy-beam-core,
          .energy-beam-inner,
          .energy-beam-mid,
          .energy-beam-outer { display: none !important; }
        }
      `}</style>
      <div className="energy-beam-outer" aria-hidden="true" />
      <div className="energy-beam-mid"   aria-hidden="true" />
      <div className="energy-beam-inner" aria-hidden="true" />
      <div className="energy-beam-core"  aria-hidden="true" />
    </>
  );
}
