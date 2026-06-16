"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number,number,number,number] = [0.2,0.8,0.2,1];

const STRATA = [
  { id:"s1", w:"100%", fill:"rgba(255,255,255,0.16)", delay:0.00 },
  { id:"s2", w:"80%",  fill:"rgba(255,255,255,0.24)", delay:0.14 },
  { id:"s3", w:"63%",  fill:"rgba(255,255,255,0.34)", delay:0.28 },
  { id:"s4", w:"46%",  fill:"#5B7CFA",               delay:0.42 },
];

interface StrataMarkProps {
  size?: number;
  animate?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function StrataMark({ size=32, animate=true, style={}, className="" }: StrataMarkProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const pref = useReducedMotion();
  const u = Math.max(3, size * 0.18);
  const gap = Math.max(2, size * 0.095);
  const totalH = 4*u + 3*gap;
  const totalW = size;

  return (
    <div
      className={className}
      role="img"
      aria-label="QMULATE mark"
      style={{ width: totalW, height: totalH, display:"flex", flexDirection:"column", gap, ...style }}
    >
      {[...STRATA].reverse().map((s) => {
        const barW = parseFloat(s.w) / 100 * totalW;
        const shouldAnimate = animate && mounted && !pref;
        if (!shouldAnimate) {
          return (
            <div key={s.id} style={{
              width: barW, height: u, borderRadius: u * 0.12,
              background: s.fill, flexShrink:0,
            }}/>
          );
        }
        return (
          <motion.div
            key={s.id}
            style={{
              width: barW, height: u, borderRadius: u * 0.12,
              background: s.fill, flexShrink:0,
              originX: 0,
            }}
            initial={{ scaleX:0, opacity:0, y:8 }}
            animate={{ scaleX:1, opacity:1, y:0 }}
            transition={{ duration:0.26, delay:s.delay, ease:EASE }}
          />
        );
      })}
    </div>
  );
}
