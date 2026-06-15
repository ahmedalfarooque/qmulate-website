"use client";
/**
 * QMULATE Architectural Visual System v2.0
 *
 * Design basis: QMULATE Design Guideline
 * - Glass Façade (building window grid)
 * - Vertical Fins
 * - Structural Lattice (diagonal cross-hatch)
 * - Strata Accumulation (the brand mark pattern)
 *
 * KEY PRINCIPLE: Replace circles with MORE BEAUTIFUL architectural objects.
 * Every element uses genuine glass morphism:
 * - backdrop-filter blur
 * - layered transparency
 * - glass edge highlights
 * - architectural light sweeps
 * - depth shadows
 */

import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export const BRAND_BLUE = "#5B7CFA";
const EASE: [number,number,number,number] = [0.2,0.8,0.2,1];

// ════════════════════════════════════════════════════════════════
// CORE GLASS PANEL — the atomic building block
// Real frosted glass: blur + transparency + border highlights + shadow
// ════════════════════════════════════════════════════════════════
export function GlassPanel({
  width, height, x=0, y=0, opacity=1,
  accent=false, delay=0, style={},
  animated=true, duration=18,
}:{
  width:number|string; height:number; x?:number; y?:number;
  opacity?:number; accent?:boolean; delay?:number;
  style?:React.CSSProperties; animated?:boolean; duration?:number;
}) {
  const pref = useReducedMotion();
  const panelStyle: React.CSSProperties = {
    position:"absolute",
    width, height,
    left: x, top: y,
    borderRadius:2,
    // The glass effect
    background: accent
      ? `linear-gradient(135deg,${BRAND_BLUE}44,${BRAND_BLUE}22)`
      : "linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02),rgba(255,255,255,0.06))",
    backdropFilter: "blur(12px) saturate(140%)",
    WebkitBackdropFilter: "blur(12px) saturate(140%)",
    // Glass border — bright top/left (light from top-left)
    borderTop:    `1px solid ${accent ? `${BRAND_BLUE}88` : "rgba(255,255,255,0.18)"}`,
    borderLeft:   `1px solid ${accent ? `${BRAND_BLUE}55` : "rgba(255,255,255,0.11)"}`,
    borderRight:  "1px solid rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    // Depth shadow
    boxShadow: accent
      ? `0 4px 24px rgba(91,124,250,0.25),0 1px 0 rgba(255,255,255,0.10) inset`
      : "0 4px 28px rgba(0,0,0,0.30),0 1px 0 rgba(255,255,255,0.08) inset",
    overflow:"hidden",
    opacity,
    pointerEvents:"none",
    ...style,
  };

  if (!animated || pref) return <div style={panelStyle}/>;

  return (
    <motion.div
      style={panelStyle}
      animate={{
        opacity:[opacity, opacity*0.75, opacity*0.95, opacity],
        y:[y, y-8, y+4, y],
      }}
      transition={{duration, delay, repeat:Infinity, ease:"easeInOut"}}
    >
      {/* Glass light sweep */}
      {!accent && (
        <motion.div
          style={{
            position:"absolute",top:0,bottom:0,width:"40%",
            background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent)",
            borderRadius:"inherit",
          }}
          animate={{x:["-110%","220%"]}}
          transition={{duration:9,delay:delay+2,repeat:Infinity,repeatDelay:14,ease:"linear"}}
        />
      )}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// STRATA COMPOSITION — The core QMULATE visual element
// Multiple glass panels stacked like the brand mark, expanded
// ════════════════════════════════════════════════════════════════
export function StrataComposition({
  width=480, panelHeight=16, gap=10,
  opacity=1, panelCount=7, style={},
}:{
  width?:number; panelHeight?:number; gap?:number;
  opacity?:number; panelCount?:number; style?:React.CSSProperties;
}) {
  const pref = useReducedMotion();
  // Panel widths decrease from bottom to top (100% → ~42%)
  const widths = Array.from({length:panelCount},(_,i)=>{
    const frac = 1 - (i * 0.085);
    return Math.round(width * Math.max(0.42, frac));
  });
  const totalH = panelCount*panelHeight + (panelCount-1)*gap;

  return (
    <motion.div
      style={{
        position:"relative",width,height:totalH,
        opacity,pointerEvents:"none",...style,
      }}
      animate={pref ? {} : {
        y:[0,-14,7,0],
        rotateX:[-1.5,1.5,-1.5],
      }}

      transition={{duration:28,repeat:Infinity,ease:"easeInOut"}}
    >
      {/* Render bottom→top: widest first */}
      {widths.reverse().map((w,i)=>{
        const actualI = panelCount-1-i;
        const isTop = actualI === panelCount-1;
        const yPos = i*(panelHeight+gap);
        return (
          <GlassPanel
            key={i}
            width={w}
            height={panelHeight}
            x={0}
            y={yPos}
            accent={isTop}
            delay={i*0.6}
            duration={16+i*2}
            opacity={isTop ? 0.92 : 0.55 + i*0.05}
          />
        );
      })}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// HERO STRATA SCULPTURE — Large 3D-esque version for hero/CTA
// ════════════════════════════════════════════════════════════════
export function StrataSculpture({
  size=400, opacity=0.22, style={},
}:{size?:number; opacity?:number; style?:React.CSSProperties}) {
  const pref = useReducedMotion();
  const layers = [
    {w:"100%",h:18,dark:0.05},
    {w:"88%", h:15,dark:0.07},
    {w:"76%", h:15,dark:0.09},
    {w:"65%", h:15,dark:0.12},
    {w:"54%", h:14,dark:0.16},
    {w:"43%", h:14,dark:0.20},
    {w:"30%", h:14,accent:true},
  ];
  const gap = 12;
  const totalH = layers.reduce((s,l)=>s+l.h,0) + (layers.length-1)*gap;

  return (
    <motion.div
      style={{
        position:"absolute",width:size,height:totalH,
        opacity,pointerEvents:"none",...style,
      }}
      animate={pref ? {} : {
        y:[0,-18,9,0],
        rotateX:[-2,2,-2],
        rotateY:[-1,1,-1],
      }}
      transition={{duration:32,repeat:Infinity,ease:"easeInOut"}}
    >
      {layers.map((l,i)=>{
        let yPos = 0;
        for(let j=0;j<i;j++) yPos += layers[j].h + gap;
        const w = typeof l.w === "string"
          ? (parseFloat(l.w)/100)*size
          : l.w;
        return (
          <GlassPanel
            key={i}
            width={w}
            height={l.h}
            x={0}
            y={yPos}
            accent={l.accent}
            delay={i*0.7}
            duration={20+i*2}
            opacity={l.accent ? 1 : 1}
          />
        );
      })}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// STRUCTURAL LATTICE — Diagonal cross-hatch (from design guide)
// ════════════════════════════════════════════════════════════════
export function StructuralLattice({
  width=440, height=320, opacity=0.055, color="rgba(255,255,255,1)",
  animated=true, style={},
}:{
  width?:number;height?:number;opacity?:number;color?:string;
  animated?:boolean;style?:React.CSSProperties;
}) {
  const pref = useReducedMotion();
  const cell = 32;
  const lines: React.ReactNode[] = [];
  // ↗ diagonals
  for (let x=-height;x<width+height;x+=cell) {
    lines.push(<line key={`a${x}`} x1={x} y1={height} x2={x+height} y2={0}
      stroke={color} strokeWidth={0.7} opacity={0.65}/>);
  }
  // ↘ diagonals
  for (let x=-height;x<width+height;x+=cell) {
    lines.push(<line key={`b${x}`} x1={x} y1={0} x2={x+height} y2={height}
      stroke={color} strokeWidth={0.7} opacity={0.65}/>);
  }

  const el = (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      style={{opacity,pointerEvents:"none",...style}}>
      {lines}
    </svg>
  );
  if (!animated || pref) return el;
  return (
    <motion.svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      style={{opacity,pointerEvents:"none",...style}}
      animate={{opacity:[opacity,opacity*1.5,opacity*0.7,opacity]}}
      transition={{duration:20,repeat:Infinity,ease:"easeInOut"}}>
      {lines}
    </motion.svg>
  );
}

// ════════════════════════════════════════════════════════════════
// VERTICAL FINS — Architectural vertical lines
// ════════════════════════════════════════════════════════════════
export function VerticalFins({
  count=20, height=280, gap=18, opacity=0.065,
  color="rgba(255,255,255,1)", style={},
}:{
  count?:number;height?:number;gap?:number;opacity?:number;
  color?:string;style?:React.CSSProperties;
}) {
  const pref = useReducedMotion();
  const totalW = count*gap;
  return (
    <motion.svg width={totalW} height={height} viewBox={`0 0 ${totalW} ${height}`}
      style={{opacity,pointerEvents:"none",...style}}
      animate={pref?{}:{opacity:[opacity,opacity*1.45,opacity*0.65,opacity]}}
      transition={{duration:22,repeat:Infinity,ease:"easeInOut"}}>
      {Array.from({length:count},(_,i)=>(
        <motion.line key={i}
          x1={i*gap+gap/2} y1={0} x2={i*gap+gap/2} y2={height}
          stroke={color} strokeWidth={0.8}
          initial={{pathLength:0,opacity:0}}
          animate={{pathLength:1,opacity:[0,0.8,1,0.85]}}
          transition={{
            duration:2.2,delay:i*0.06,ease:EASE,
            opacity:{duration:2.8,delay:i*0.06},
          }}
        />
      ))}
    </motion.svg>
  );
}

// ════════════════════════════════════════════════════════════════
// GLASS FAÇADE GRID — Building window matrix
// ════════════════════════════════════════════════════════════════
export function GlassFacade({
  cols=12, rows=8, cellW=40, cellH=30, gap=4,
  opacity=0.1, style={},
}:{
  cols?:number;rows?:number;cellW?:number;cellH?:number;
  gap?:number;opacity?:number;style?:React.CSSProperties;
}) {
  const pref = useReducedMotion();
  const W = cols*(cellW+gap)-gap;
  const H = rows*(cellH+gap)-gap;
  const seed = 42;
  const opacities = Array.from({length:cols*rows},(_,i)=>
    0.15 + ((i*seed*7)%100)/100*0.65
  );
  const litCells = new Set([1,6,14,23,29,38,45,51,60,67]);
  const glowCells = new Set([14,38,60]);

  return (
    <motion.svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      style={{opacity,pointerEvents:"none",...style}}
      animate={pref?{}:{opacity:[opacity,opacity*1.4,opacity*0.7,opacity]}}
      transition={{duration:25,repeat:Infinity,ease:"easeInOut"}}>
      <defs>
        <linearGradient id="cellGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)"/>
        </linearGradient>
        <linearGradient id="cellBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${BRAND_BLUE}55`}/>
          <stop offset="100%" stopColor={`${BRAND_BLUE}22`}/>
        </linearGradient>
      </defs>
      {Array.from({length:rows},(_,r)=>
        Array.from({length:cols},(_,c)=>{
          const idx = r*cols+c;
          const isLit = litCells.has(idx);
          const isGlow = glowCells.has(idx);
          const xp = c*(cellW+gap);
          const yp = r*(cellH+gap);
          return (
            <motion.rect key={idx}
              x={xp} y={yp} width={cellW} height={cellH} rx={1}
              fill={isLit||isGlow ? "url(#cellBlue)" : "url(#cellGrad)"}
              opacity={opacities[idx]*(isGlow?1.4:isLit?1.1:1)}
              animate={pref?{}:{
                opacity:[
                  opacities[idx]*1,
                  opacities[idx]*(isGlow?0.6:0.5),
                  opacities[idx]*1,
                ],
              }}
              transition={{
                duration:8+(idx*37%12),repeat:Infinity,
                ease:"easeInOut",delay:idx*0.015,
              }}
            />
          );
        })
      )}
    </motion.svg>
  );
}

// ════════════════════════════════════════════════════════════════
// GOVERNANCE PULSE — ECG-inspired structural signal line
// ════════════════════════════════════════════════════════════════
export function GovernancePulse({
  width=700, height=90, opacity=0.22,
  color=BRAND_BLUE, style={},
}:{width?:number;height?:number;opacity?:number;color?:string;style?:React.CSSProperties}) {
  const pref = useReducedMotion();
  const mid = height/2;
  const path = `M0 ${mid} L${width*.06} ${mid} L${width*.10} ${mid-height*.32} L${width*.14} ${mid+height*.32} L${width*.17} ${mid-height*.16} L${width*.20} ${mid} L${width*.34} ${mid} L${width*.37} ${mid-height*.24} L${width*.40} ${mid+height*.24} L${width*.43} ${mid-height*.12} L${width*.46} ${mid} L${width*.65} ${mid} L${width*.68} ${mid-height*.19} L${width*.71} ${mid+height*.19} L${width*.74} ${mid} L${width} ${mid}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      style={{opacity,pointerEvents:"none",...style}}>
      <path d={path} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round"/>
      <motion.path d={path} fill="none" stroke={color} strokeWidth={1.4}
        strokeLinecap="round" strokeLinejoin="round"
        initial={{pathLength:0,opacity:0}}
        animate={pref?{}:{
          pathLength:[0,1,1,0],
          opacity:[0,0.9,0.6,0],
        }}
        transition={{duration:8,repeat:Infinity,ease:EASE,times:[0,.5,.9,1]}}
      />
      {/* Second trace at slight offset for depth */}
      <motion.path d={path} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={0.6}
        strokeLinecap="round" strokeLinejoin="round"
        initial={{pathLength:0,opacity:0}}
        animate={pref?{}:{
          pathLength:[0,1,1,0],
          opacity:[0,0.5,0.3,0],
        }}
        transition={{duration:8,repeat:Infinity,ease:EASE,times:[0,.5,.9,1],delay:0.3}}
      />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// STRATA FIELD — Rich multi-composition section background
// Replaces all orbs/bubbles/circles with architectural depth
// ════════════════════════════════════════════════════════════════
export function StrataField({ style={} }:{ style?:React.CSSProperties }) {
  const pref = useReducedMotion();
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",...style}}>

      {/* Layer 1 — Large strata composition, left-anchored */}
      <motion.div
        style={{position:"absolute",left:"clamp(-120px,-6%,-20px)",top:"10%",zIndex:1}}
        animate={pref?{}:{y:[0,-20,10,0],x:[0,8,-4,0]}}
        transition={{duration:34,repeat:Infinity,ease:"easeInOut"}}>
        <StrataComposition width={420} panelHeight={18} gap={12} panelCount={7} opacity={0.45}/>
      </motion.div>

      {/* Layer 2 — Smaller strata, right side, lower */}
      <motion.div
        style={{position:"absolute",right:"clamp(-100px,-5%,-10px)",bottom:"15%",zIndex:1}}
        animate={pref?{}:{y:[0,14,-7,0],x:[0,-6,3,0]}}
        transition={{duration:28,repeat:Infinity,ease:"easeInOut",delay:8}}>
        <StrataComposition width={300} panelHeight={14} gap={9} panelCount={5} opacity={0.35}/>
      </motion.div>

      {/* Layer 3 — Structural lattice, right upper */}
      <motion.div
        style={{position:"absolute",right:"-40px",top:"5%",zIndex:0}}
        animate={pref?{}:{opacity:[0.055,0.09,0.04,0.055]}}
        transition={{duration:20,repeat:Infinity,ease:"easeInOut",delay:4}}>
        <StructuralLattice width={360} height={300} opacity={1} animated={false}/>
      </motion.div>

      {/* Layer 4 — Vertical fins, bottom left */}
      <motion.div
        style={{position:"absolute",left:"4%",bottom:"5%",zIndex:0}}
        animate={pref?{}:{opacity:[0.065,0.1,0.04,0.065]}}
        transition={{duration:24,repeat:Infinity,ease:"easeInOut",delay:10}}>
        <VerticalFins count={18} height={220} gap={16} opacity={1}/>
      </motion.div>

      {/* Layer 5 — Fine horizontal strata lines, mid-right */}
      <div style={{position:"absolute",right:"8%",top:"35%",opacity:0.07,zIndex:0}}>
        {Array.from({length:8},(_,i)=>(
          <motion.div key={i}
            style={{
              height:2,
              width:`${100-i*10}%`,
              marginBottom:10,
              background:"rgba(255,255,255,0.6)",
              borderRadius:1,
            }}
            animate={pref?{}:{
              opacity:[0.6,0.3,0.6],
              scaleX:[1,0.93,1],
            }}
            transition={{duration:12+i*1.5,repeat:Infinity,ease:"easeInOut",delay:i*0.8}}
  
          />
        ))}
      </div>

      {/* Brand blue accent thread */}
      <motion.div
        style={{
          position:"absolute",top:"50%",left:0,right:0,height:1,
          background:`linear-gradient(90deg,transparent 5%,${BRAND_BLUE}33 25%,${BRAND_BLUE}66 50%,${BRAND_BLUE}33 75%,transparent 95%)`,
          transform:"translateY(-50%)",zIndex:0,
        }}
        animate={pref?{}:{opacity:[0.4,0.8,0.4],scaleX:[0.8,1,0.8]}}
        transition={{duration:16,repeat:Infinity,ease:"easeInOut"}}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION BACKGROUNDS — Unique per-section compositions
// ════════════════════════════════════════════════════════════════

type BgVariant = "hero"|"strata-left"|"strata-right"|"lattice"|"fins"|"facade"|"pulse"|"mixed"|"mission"|"contact"|"services";

export function ArchitecturalBg({
  variant="mixed", style={},
}:{variant?:BgVariant;style?:React.CSSProperties}) {
  const base: React.CSSProperties = {position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0};

  if (variant==="hero") return <StrataField style={{...base,...style}}/>;

  if (variant==="mission") return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",left:"-5%",top:"15%"}}
        animate={{y:[0,-16,8,0]}} transition={{duration:30,repeat:Infinity,ease:"easeInOut"}}>
        <StrataComposition width={380} panelHeight={16} gap={11} panelCount={6} opacity={0.42}/>
      </motion.div>
      <div style={{position:"absolute",right:"-20px",top:"10%"}}>
        <StructuralLattice width={320} height={280} opacity={0.05}/>
      </div>
    </div>
  );

  if (variant==="services") return (
    <div style={{...base,...style}}>
      <div style={{position:"absolute",left:"-30px",top:"20%"}}>
        <GlassFacade cols={10} rows={7} cellW={36} cellH={26} opacity={0.11}/>
      </div>
      <div style={{position:"absolute",right:"2%",bottom:"10%"}}>
        <VerticalFins count={16} height={240} gap={18} opacity={0.065}/>
      </div>
    </div>
  );

  if (variant==="facade") return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",left:"-40px",top:"5%"}}
        animate={{y:[0,-12,6,0]}} transition={{duration:26,repeat:Infinity,ease:"easeInOut"}}>
        <GlassFacade cols={12} rows={8} cellW={38} cellH={28} opacity={0.12}/>
      </motion.div>
      <div style={{position:"absolute",right:"-10px",bottom:"8%"}}>
        <StructuralLattice width={300} height={260} opacity={0.045}/>
      </div>
    </div>
  );

  if (variant==="lattice") return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",right:"-50px",top:"8%"}}
        animate={{opacity:[0.055,0.09,0.045,0.055]}} transition={{duration:18,repeat:Infinity,ease:"easeInOut"}}>
        <StructuralLattice width={420} height={360} opacity={1}/>
      </motion.div>
      <motion.div style={{position:"absolute",left:"-20px",bottom:"5%"}}
        animate={{y:[0,10,-5,0]}} transition={{duration:24,repeat:Infinity,ease:"easeInOut",delay:6}}>
        <StrataComposition width={280} panelHeight={12} gap={9} panelCount={5} opacity={0.38}/>
      </motion.div>
    </div>
  );

  if (variant==="fins") return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",left:"3%",top:"8%"}}
        animate={{opacity:[0.07,0.12,0.05,0.07]}} transition={{duration:20,repeat:Infinity,ease:"easeInOut"}}>
        <VerticalFins count={22} height={300} gap={20} opacity={1}/>
      </motion.div>
      <motion.div style={{position:"absolute",right:"-20px",top:"20%"}}
        animate={{y:[0,-10,5,0]}} transition={{duration:28,repeat:Infinity,ease:"easeInOut",delay:4}}>
        <StrataComposition width={320} panelHeight={13} gap={10} panelCount={6} opacity={0.38}/>
      </motion.div>
    </div>
  );

  if (variant==="strata-left") return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",left:"-5%",top:"50%",transform:"translateY(-50%)"}}
        animate={{y:["-50%","-52%","-49%","-50%"]}} transition={{duration:26,repeat:Infinity,ease:"easeInOut"}}>
        <StrataComposition width={400} panelHeight={18} gap={12} panelCount={7} opacity={0.44}/>
      </motion.div>
      <div style={{position:"absolute",right:"3%",bottom:"12%"}}>
        <StructuralLattice width={280} height={220} opacity={0.04}/>
      </div>
    </div>
  );

  if (variant==="strata-right") return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",right:"-5%",bottom:"15%"}}
        animate={{y:[0,14,-7,0]}} transition={{duration:28,repeat:Infinity,ease:"easeInOut"}}>
        <StrataComposition width={360} panelHeight={16} gap={11} panelCount={6} opacity={0.40}/>
      </motion.div>
      <div style={{position:"absolute",left:"4%",top:"10%"}}>
        <VerticalFins count={14} height={200} gap={18} opacity={0.06}/>
      </div>
    </div>
  );

  if (variant==="contact") return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",right:"-30px",top:"20%"}}
        animate={{y:[0,-10,5,0]}} transition={{duration:32,repeat:Infinity,ease:"easeInOut"}}>
        <StrataComposition width={260} panelHeight={12} gap={8} panelCount={5} opacity={0.32}/>
      </motion.div>
      <div style={{position:"absolute",left:"-20px",bottom:"15%"}}>
        <StructuralLattice width={240} height={200} opacity={0.04}/>
      </div>
    </div>
  );

  // Default: mixed (general purpose)
  return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",left:"-4%",top:"55%",transform:"translateY(-50%)"}}
        animate={{y:["-50%","-53%","-48%","-50%"]}} transition={{duration:30,repeat:Infinity,ease:"easeInOut"}}>
        <StrataComposition width={380} panelHeight={16} gap={11} panelCount={6} opacity={0.42}/>
      </motion.div>
      <motion.div style={{position:"absolute",right:"-3%",bottom:"10%"}}
        animate={{y:[0,12,-6,0]}} transition={{duration:26,repeat:Infinity,ease:"easeInOut",delay:9}}>
        <StrataComposition width={280} panelHeight={13} gap={9} panelCount={5} opacity={0.32}/>
      </motion.div>
      <div style={{position:"absolute",right:"-30px",top:"8%"}}>
        <StructuralLattice width={320} height={280} opacity={0.045}/>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// STRATA STACK (legacy — keep for Navbar use)
// ════════════════════════════════════════════════════════════════
export function StrataStack({
  opacity=0.12, side="left", size=320, style={},
}:{opacity?:number;side?:"left"|"right"|"center";size?:number;style?:React.CSSProperties}) {
  return (
    <motion.div
      style={{
        position:"absolute",
        left: side==="left" ? "clamp(-80px,-4%,0)" : side==="center" ? "50%" : "auto",
        right: side==="right" ? "clamp(-80px,-4%,0)" : "auto",
        transform: side==="center" ? "translateX(-50%)" : undefined,
        opacity,pointerEvents:"none",...style,
      }}
      animate={{y:[0,-12,6,0],opacity:[opacity,opacity*1.2,opacity*0.85,opacity]}}
      transition={{duration:24,repeat:Infinity,ease:"easeInOut"}}>
      <StrataComposition width={size} panelHeight={14} gap={10} panelCount={6} opacity={1}/>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// LIGHT MODE VARIANTS (slightly different palette)
// ════════════════════════════════════════════════════════════════
export function ArchitecturalBgLight({
  variant="mixed", style={},
}:{variant?:BgVariant;style?:React.CSSProperties}) {
  const base: React.CSSProperties = {position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0};
  // Light mode: use dark-tinted panels instead of white
  return (
    <div style={{...base,...style}}>
      <motion.div style={{position:"absolute",left:"-4%",top:"50%",transform:"translateY(-50%)"}}
        animate={{y:["-50%","-53%","-48%","-50%"]}} transition={{duration:30,repeat:Infinity,ease:"easeInOut"}}>
        <StrataComposition width={360} panelHeight={15} gap={10} panelCount={6} opacity={0.18}/>
      </motion.div>
      <div style={{position:"absolute",right:"-20px",top:"8%"}}>
        <StructuralLattice width={300} height={250} opacity={0.03} color="rgba(0,0,0,1)"/>
      </div>
      <div style={{position:"absolute",left:"4%",bottom:"8%"}}>
        <VerticalFins count={14} height={180} gap={16} opacity={0.03} color="rgba(0,0,0,1)"/>
      </div>
    </div>
  );
}

// ── Legacy aliases for backwards compatibility ──
export const StrataLines = GovernancePulse;
