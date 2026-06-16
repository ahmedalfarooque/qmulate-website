"use client";
/**
 * QMULATE Architectural Visual System
 * Inspired by: Design Guideline — Glass Façade, Structural Lattice, Vertical Fins, Strata
 *
 * Replaces: Bubbles, OrbBg, IrisBlob, GoldBlobComp, RippleSphere
 *
 * All elements are:
 * - SVG-based for precision
 * - Very low opacity (institutional restraint)
 * - GPU-accelerated (transform, opacity only)
 * - Reduced-motion aware
 * - Themed for dark and light mode
 */

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ─── Brand Accent ───────────────────────────────────────────────
export const BRAND_BLUE = "#5B7CFA";

// ─── 1. STRATA STACK — The QMULATE mark expanded to full section ─
export function StrataStack({
  opacity=0.08, side="left", size=480, style={},
}:{opacity?:number; side?:"left"|"right"|"center"; size?:number; style?:React.CSSProperties}) {
  const pref = useReducedMotion();
  const bars = [
    {w:"100%",c:"rgba(255,255,255,0.55)",h:12},
    {w:"80%", c:"rgba(255,255,255,0.42)",h:12},
    {w:"63%", c:"rgba(255,255,255,0.32)",h:12},
    {w:"46%", c:BRAND_BLUE,             h:12},
  ];
  const gap = 8;
  const totalH = bars.length*12 + (bars.length-1)*gap;

  return (
    <motion.div
      style={{
        position:"absolute",
        width:size,
        height:totalH,
        opacity,
        pointerEvents:"none",
        left: side==="left" ? "clamp(-80px,-4%,0)" : side==="center" ? "50%" : "auto",
        right: side==="right" ? "clamp(-80px,-4%,0)" : "auto",
        transform: side==="center" ? "translateX(-50%)" : undefined,
        ...style,
      }}
      animate={pref ? {} : {
        y:[0,-10,5,0],
        opacity:[opacity, opacity*1.18, opacity*0.88, opacity],
      }}
      transition={{duration:22, repeat:Infinity, ease:"easeInOut"}}
    >
      <div style={{display:"flex",flexDirection:"column",gap}}>
        {bars.map((b,i)=>(
          <motion.div
            key={i}
            style={{
              width:b.w, height:b.h,
              background:b.c,
              borderRadius:2,
              backdropFilter:b.c===BRAND_BLUE ? undefined : "blur(1px)",
            }}
            animate={pref ? {} : {
              opacity:[1,.7,1],
              scaleX:[1,.96,1],
            }}
            transition={{
              duration:14+i*2, repeat:Infinity, ease:"easeInOut",
              delay:i*1.5,
            }}

          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── 2. STRUCTURAL LATTICE — Diagonal cross-hatch (from design guide) ─
export function StructuralLattice({
  width=400, height=300, opacity=0.045,
  color="rgba(255,255,255,1)",
  style={},
}:{width?:number;height?:number;opacity?:number;color?:string;style?:React.CSSProperties}) {
  const pref = useReducedMotion();
  const cellSize = 28;
  const lines: React.ReactNode[] = [];
  // Diagonal lines going ↗
  for (let x = -height; x < width + height; x += cellSize) {
    lines.push(
      <line key={`d1-${x}`} x1={x} y1={height} x2={x+height} y2={0}
        stroke={color} strokeWidth={0.6} opacity={0.6}/>
    );
  }
  // Diagonal lines going ↘
  for (let x = -height; x < width + height; x += cellSize) {
    lines.push(
      <line key={`d2-${x}`} x1={x} y1={0} x2={x+height} y2={height}
        stroke={color} strokeWidth={0.6} opacity={0.6}/>
    );
  }

  return (
    <motion.svg
      width={width} height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ opacity, pointerEvents:"none", ...style }}
      animate={pref ? {} : { opacity:[opacity, opacity*1.3, opacity] }}
      transition={{duration:16, repeat:Infinity, ease:"easeInOut"}}
    >
      {lines}
    </motion.svg>
  );
}

// ─── 3. VERTICAL FINS — Architectural vertical lines ─
export function VerticalFins({
  count=16, height=200, opacity=0.06,
  color="rgba(255,255,255,1)",
  style={},
}:{count?:number;height?:number;opacity?:number;color?:string;style?:React.CSSProperties}) {
  const pref = useReducedMotion();
  const w = count * 14;

  return (
    <motion.svg
      width={w} height={height}
      viewBox={`0 0 ${w} ${height}`}
      style={{ opacity, pointerEvents:"none", ...style }}
      animate={pref ? {} : { opacity:[opacity,opacity*1.4,opacity] }}
      transition={{duration:20, repeat:Infinity, ease:"easeInOut"}}
    >
      {Array.from({length:count},(_,i)=>(
        <motion.line
          key={i}
          x1={i*14+7} y1={0}
          x2={i*14+7} y2={height}
          stroke={color}
          strokeWidth={0.75}
          initial={{ pathLength:0, opacity:0 }}
          animate={{ pathLength:1, opacity:[0,.7,1,1,.8] }}
          transition={{
            duration:1.8, delay:i*0.04,
            ease:[0.2,0.8,0.2,1],
            opacity:{duration:2.2, delay:i*0.04},
          }}
        />
      ))}
    </motion.svg>
  );
}

// ─── 4. GLASS FAÇADE — Grid of glass panels (from design guide) ─
export function GlassFacade({
  cols=10, rows=7,
  cellW=36, cellH=28,
  gap=3,
  opacity=0.07,
  accent=BRAND_BLUE,
  style={},
}:{cols?:number;rows?:number;cellW?:number;cellH?:number;gap?:number;opacity?:number;accent?:string;style?:React.CSSProperties}) {
  const pref = useReducedMotion();
  const W = cols*(cellW+gap)-gap;
  const H = rows*(cellH+gap)-gap;

  // Random opacity map for visual texture
  const opacities = Array.from({length:cols*rows},()=>
    0.2 + Math.random() * 0.6
  );
  // A few "lit" cells (blue accent)
  const litCells = new Set([2,5,11,22,37,44]);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      style={{opacity, pointerEvents:"none", ...style}}>
      {Array.from({length:rows},(_,r)=>
        Array.from({length:cols},(_,c)=>{
          const idx = r*cols+c;
          const isLit = litCells.has(idx);
          const xp = c*(cellW+gap);
          const yp = r*(cellH+gap);
          return (
            <motion.rect
              key={idx}
              x={xp} y={yp}
              width={cellW} height={cellH}
              rx={1}
              fill={isLit ? accent : "rgba(255,255,255,1)"}
              opacity={opacities[idx] * (isLit ? 0.8 : 0.28)}
              animate={pref ? {} : isLit ? {
                opacity:[opacities[idx]*0.5,opacities[idx]*0.9,opacities[idx]*0.5],
              } : {
                opacity:[opacities[idx]*0.28, opacities[idx]*0.18, opacities[idx]*0.28],
              }}
              transition={{
                duration:8+idx*0.07, repeat:Infinity,
                ease:"easeInOut", delay:idx*0.02,
              }}
            />
          );
        })
      )}
    </svg>
  );
}

// ─── 5. GOVERNANCE PULSE — ECG-inspired structural line ─
export function GovernancePulse({
  width=600, height=80, opacity=0.18,
  color=BRAND_BLUE,
  style={},
}:{width?:number;height?:number;opacity?:number;color?:string;style?:React.CSSProperties}) {
  const pref = useReducedMotion();
  const mid = height/2;

  // Governance/ECG path — architectural, measured
  const path = `
    M 0 ${mid}
    L ${width*0.08} ${mid}
    L ${width*0.12} ${mid-height*0.3}
    L ${width*0.16} ${mid+height*0.3}
    L ${width*0.20} ${mid-height*0.15}
    L ${width*0.24} ${mid}
    L ${width*0.38} ${mid}
    L ${width*0.42} ${mid-height*0.22}
    L ${width*0.46} ${mid+height*0.22}
    L ${width*0.50} ${mid-height*0.10}
    L ${width*0.53} ${mid}
    L ${width*0.70} ${mid}
    L ${width*0.73} ${mid-height*0.18}
    L ${width*0.76} ${mid+height*0.18}
    L ${width*0.79} ${mid}
    L ${width} ${mid}
  `;

  return (
    <motion.svg
      width={width} height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ opacity, pointerEvents:"none", ...style }}
    >
      {/* Background trace */}
      <path d={path} fill="none" stroke="rgba(255,255,255,0.08)"
        strokeWidth={1} strokeLinecap="round" strokeLinejoin="round"/>
      {/* Animated trace */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength:0, opacity:0 }}
        animate={pref ? {} : {
          pathLength:[0,1,1,0],
          opacity:[0,1,0.6,0],
        }}
        transition={{
          duration:7, repeat:Infinity,
          ease:[0.2,0.8,0.2,1],
          delay:0,
          times:[0,0.5,0.9,1],
        }}
      />
    </motion.svg>
  );
}

// ─── 6. HORIZONTAL STRATA LINES — Fine architectural rhythm ─
export function StrataLines({
  count=8, width=600, opacity=0.06,
  color="rgba(255,255,255,1)",
  style={},
}:{count?:number;width?:number;opacity?:number;color?:string;style?:React.CSSProperties}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const H = count * 20;
  const widths = [100,82,68,56,45,36,28,20].map(p=>`${p}%`);

  return (
    <svg width={width} height={H} viewBox={`0 0 ${width} ${H}`}
      style={{opacity, pointerEvents:"none", ...style}}>
      {Array.from({length:count},(_,i)=>{
        const lineWidth = (parseFloat(widths[i]||"100")/100)*width;
        const isFirst = i === 0;
        const lineOpacity = isFirst ? 0.8 : 0.4;

        // Before mount: plain <line> at final opacity — matches SSR exactly, no mismatch.
        // After mount: <motion.line> animates in from scaleX:0.
        if (!mounted) {
          return (
            <line
              key={i}
              x1={0} y1={i*20+2}
              x2={lineWidth} y2={i*20+2}
              stroke={isFirst ? BRAND_BLUE : color}
              strokeWidth={isFirst ? 1.5 : 1}
              opacity={lineOpacity}
              style={{ transformOrigin:"left" }}
            />
          );
        }

        return (
          <motion.line
            key={i}
            x1={0} y1={i*20+2}
            x2={lineWidth} y2={i*20+2}
            stroke={isFirst ? BRAND_BLUE : color}
            strokeWidth={isFirst ? 1.5 : 1}
            opacity={lineOpacity}
            initial={{ scaleX:0, opacity:0 }}
            animate={{ scaleX:1, opacity:lineOpacity }}
            style={{ transformOrigin:"left" }}
            transition={{ duration:0.9, delay:i*0.08, ease:[0.2,0.8,0.2,1] }}
          />
        );
      })}
    </svg>
  );
}

// ─── 7. ARCHITECTURAL BACKGROUND — Combines elements ─────────────

type BgVariant = "strata-left"|"strata-right"|"lattice"|"fins"|"facade"|"pulse"|"mixed";

export function ArchitecturalBg({
  variant="mixed", className="", style={},
}:{variant?:BgVariant; className?:string; style?:React.CSSProperties}) {
  return (
    <div
      className={className}
      style={{
        position:"absolute",inset:0,overflow:"hidden",
        pointerEvents:"none",zIndex:0,
        ...style,
      }}
    >
      {(variant==="strata-left"||variant==="mixed") && (
        <StrataStack opacity={0.07} side="left"
          size={320}
          style={{top:"50%",transform:"translateY(-50%)"}}/>
      )}
      {(variant==="strata-right"||variant==="mixed") && (
        <StrataStack opacity={0.06} side="right"
          size={280}
          style={{bottom:"20%"}}/>
      )}
      {(variant==="lattice"||variant==="mixed") && (
        <StructuralLattice
          width={360} height={300} opacity={0.045}
          style={{position:"absolute",right:-60,top:"10%"}}/>
      )}
      {(variant==="fins"||variant==="mixed") && (
        <VerticalFins
          count={14} height={200} opacity={0.055}
          style={{position:"absolute",left:"5%",bottom:"8%"}}/>
      )}
      {variant==="facade" && (
        <GlassFacade opacity={0.08}
          style={{position:"absolute",right:"5%",top:"10%"}}/>
      )}
      {(variant==="pulse"||variant==="mixed") && (
        <GovernancePulse
          opacity={0.14}
          style={{position:"absolute",bottom:"12%",left:0,right:0,width:"80%",margin:"0 auto"}}/>
      )}
    </div>
  );
}

// ─── 8. STRATA HERO SCULPTURE — 3D-esque layered mark ─────────────
export function StrataSculpture({
  size=380, opacity=0.12, style={},
}:{size?:number;opacity?:number;style?:React.CSSProperties}) {
  const pref = useReducedMotion();

  const layers = [
    {w:"100%",h:14,y:0,  blur:0,  fill:"rgba(255,255,255,0.09)"},
    {w:"88%", h:12,y:22, blur:0,  fill:"rgba(255,255,255,0.13)"},
    {w:"76%", h:12,y:42, blur:0,  fill:"rgba(255,255,255,0.16)"},
    {w:"64%", h:12,y:62, blur:0,  fill:"rgba(255,255,255,0.20)"},
    {w:"52%", h:12,y:82, blur:0,  fill:"rgba(255,255,255,0.26)"},
    {w:"40%", h:12,y:102,blur:0,  fill:"rgba(255,255,255,0.32)"},
    {w:"28%", h:12,y:122,blur:0,  fill:BRAND_BLUE},
  ];

  return (
    <motion.div
      style={{
        position:"absolute",
        width:size,
        height:148,
        opacity,
        pointerEvents:"none",
        ...style,
      }}
      animate={pref ? {} : {
        y:[0,-12,6,0],
        rotateX:[-2,2,-2],
        perspective:800,
      }}
      transition={{duration:28, repeat:Infinity, ease:"easeInOut"}}
    >
      {layers.map((l,i)=>(
        <motion.div
          key={i}
          style={{
            position:"absolute",
            top:l.y,
            left:0,
            width:l.w,
            height:l.h,
            background:l.fill,
            borderRadius:2,
            backdropFilter:"blur(4px)",
          }}
          animate={pref ? {} : {
            opacity:[1,.75,1],
            translateX:[0, i*1.5, 0],
          }}
          transition={{
            duration:18+i*2, repeat:Infinity, ease:"easeInOut",
            delay:i*0.8,
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── 9. Light mode variants ───────────────────────────────────────
export function ArchitecturalBgLight({
  variant="mixed", className="", style={},
}:{variant?:BgVariant; className?:string; style?:React.CSSProperties}) {
  return (
    <div className={className}
      style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0,...style}}>
      {(variant==="strata-left"||variant==="mixed") && (
        <StrataStack opacity={0.05} side="left" size={300}
          style={{top:"50%",transform:"translateY(-50%)"}}/>
      )}
      {(variant==="lattice"||variant==="mixed") && (
        <StructuralLattice
          width={320} height={260} opacity={0.04}
          color="rgba(0,0,0,1)"
          style={{position:"absolute",right:-40,top:"15%"}}/>
      )}
      {(variant==="fins"||variant==="mixed") && (
        <VerticalFins
          count={12} height={180} opacity={0.04}
          color="rgba(0,0,0,1)"
          style={{position:"absolute",left:"5%",bottom:"10%"}}/>
      )}
      {(variant==="pulse"||variant==="mixed") && (
        <GovernancePulse
          opacity={0.10} color={BRAND_BLUE}
          style={{position:"absolute",bottom:"12%",left:0,right:0,width:"80%",margin:"0 auto"}}/>
      )}
    </div>
  );
}
