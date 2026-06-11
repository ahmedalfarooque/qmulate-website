"use client";
import { motion } from "framer-motion";

/* ── Motion helpers (FM v12 safe — no ease array) ── */
export const fu = (d=0) => ({
  initial:{ opacity:0, y:32 },
  whileInView:{ opacity:1, y:0 },
  viewport:{ once:true },
  transition:{ duration:.75, delay:d },
});
export const fi = (d=0) => ({
  initial:{ opacity:0 },
  whileInView:{ opacity:1 },
  viewport:{ once:true },
  transition:{ duration:.6, delay:d },
});
export const fs = (d=0) => ({
  initial:{ opacity:0, scale:.95 },
  whileInView:{ opacity:1, scale:1 },
  viewport:{ once:true },
  transition:{ duration:.8, delay:d },
});

/* ── Scene background (procedural, no images) ── */
export function Scene({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:0, pointerEvents:"none" }}>
      <div className="bg-orbs" />
      <div className="bg-grid" />
      <div className="orb c" style={{ width:600, height:600, top:"15%", right:"-8%"  }} />
      <div className="orb p" style={{ width:500, height:500, bottom:"5%",left:"3%" }} />
      {children}
    </div>
  );
}

/* ── Decorative geometric rings ── */
export function Rings({ size, top, left, right, opacity=0.12 }:{
  size:number; top:string; left?:string; right?:string; opacity?:number;
}) {
  return (
    <div style={{ position:"absolute", top, left:left||"auto", right:right||"auto",
      width:size, height:size, pointerEvents:"none", zIndex:0 }}>
      {[1, 0.7, 0.45].map((s,i) => (
        <div key={i} className="ring" style={{
          position:"absolute",
          inset:`${(1-s)*50}%`,
          opacity: opacity*(1-i*.3),
          animationDelay:`${i*2.5}s`,
        }} />
      ))}
    </div>
  );
}

/* ── Page hero shell ── */
export function PageHero({
  badge, badgeCls="", h1, sub, arSub="",
}: { badge:string; badgeCls?:string; h1:React.ReactNode; sub:string; arSub?:string; }) {
  return (
    <section className="bg-mesh" style={{
      position:"relative", overflow:"hidden",
      paddingTop:"clamp(120px,19vh,200px)",
      paddingBottom:"clamp(80px,12vh,140px)",
    }}>
      <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:0, pointerEvents:"none" }}>
        <div className="bg-orbs" /><div className="bg-grid" />
        <div className="scan" />
        <div className="orb c" style={{ width:700,height:700,top:"-15%",right:"-5%" }} />
        <div className="orb p" style={{ width:400,height:400,bottom:0,left:"5%" }} />
        <Rings size={380} top="18%" right="7%" opacity={.09} />
        <div className="bot-fade" style={{ height:"38%" }} />
      </div>
      <div className="container" style={{ position:"relative", zIndex:2 }}>
        {badge && (
          <motion.div {...fi(.18)} style={{ marginBottom:22 }}>
            <span className={`badge${badgeCls?" "+badgeCls:""}`}>{badge}</span>
          </motion.div>
        )}
        <motion.div {...fu(.28)} className="t-h1" style={{ maxWidth:800, marginBottom:24 }}>
          {h1}
        </motion.div>
        <motion.p {...fu(.38)} className="t-ld" style={{ color:"var(--t-2)", maxWidth:540, marginBottom:arSub?12:0 }}>
          {sub}
        </motion.p>
        {arSub && (
          <motion.p {...fi(.45)} style={{
            fontFamily:"'IBM Plex Sans Arabic',sans-serif",
            fontSize:14, color:"var(--t-3)", direction:"rtl", maxWidth:380,
          }}>{arSub}</motion.p>
        )}
      </div>
    </section>
  );
}

/* ── Counter ── */
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
export function Num({ to, suf="", pre="", dec=0 }:{to:number;suf?:string;pre?:string;dec?:number}) {
  const [v,setV] = useState(0);
  const ref = useRef(null);
  const iv = useInView(ref, { once:true });
  useEffect(() => {
    if (!iv) return;
    const inc = to/70; let c = 0;
    const t = setInterval(() => {
      c = Math.min(c+inc, to); setV(+c.toFixed(dec));
      if (c >= to) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
  }, [iv, to, dec]);
  return <span ref={ref} className="tab">{pre}{dec?v.toFixed(dec):Math.round(v)}{suf}</span>;
}
