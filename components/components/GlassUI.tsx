"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { StrataMark } from "./StrataMark";

/* ────────────────────────────────────────────────
   SceneBg — section background (3 layers + aurora)
   ──────────────────────────────────────────────── */
export function SceneBg({ cyan=false }:{cyan?:boolean}){
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden",zIndex:0,pointerEvents:"none"}}>
      <div className="bg-mesh" style={{position:"absolute",inset:0}}/>
      <div className="bg-aurora"/>
      <div className="bg-orbs"/>
      <div className="bg-grid"/>
      <div className="orb-c" style={{width:600,height:600,top:"20%",left:"55%",
        background:`radial-gradient(circle,${cyan?"rgba(0,212,255,0.10)":"rgba(91,124,250,0.09)"} 0%,transparent 65%)`}}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   HeroBg — parallax hero background with particles
   ───────────────────────────────────────────────────────── */
export function HeroBg({ scrollProgress }:{scrollProgress:any}){
  const y = useTransform(scrollProgress,[0,1],["0%","24%"]);
  return(
    <motion.div style={{position:"absolute",inset:0,y,zIndex:0,pointerEvents:"none"}}>
      <div className="bg-mesh" style={{position:"absolute",inset:0}}/>
      <div className="bg-aurora"/>
      <div className="bg-particles"/>
      <div className="bg-orbs"/>
      <div className="bg-grid"/>
      <div className="orb-c" style={{width:700,height:700,top:"15%",left:"52%",
        background:"radial-gradient(circle,rgba(0,212,255,0.12) 0%,transparent 65%)"}}/>
      <div className="orb-c" style={{width:500,height:500,top:"55%",left:"5%",
        background:"radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 65%)",
        animationDelay:"-10s"}}/>
      {/* Rotating geometry rings */}
      <div className="geom-ring" style={{width:520,height:520,top:"8%",right:"-8%",opacity:0.06}}/>
      <div className="geom-ring-b" style={{width:320,height:320,bottom:"15%",left:"3%",opacity:0.05}}/>
      {/* Scan line */}
      <div style={{position:"absolute",left:0,right:0,height:1,
        background:"linear-gradient(90deg,transparent,rgba(0,212,255,.5),rgba(110,231,255,.3),transparent)",
        animation:"scanLine 8s linear infinite",zIndex:2}}/>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   StrataEcho — decorative brand bars
   ────────────────────────────────────────────── */
export function StrataEcho({top,right,left,rotate=0,opacity=0.04}:{
  top:string;right?:string;left?:string;rotate?:number;opacity?:number
}){
  return(
    <div className="strata-echo" style={{
      position:"absolute",top,right:right||"auto",left:left||"auto",
      width:"42%",transform:`rotate(${rotate}deg)`,opacity
    }}>
      <span/><span/><span/><span/>
    </div>
  );
}

/* ────────────────────────────────────────
   PageHero — sub-page hero shell
   ──────────────────────────────────────── */
export function PageHero({children,minH="64vh",particles=true}:{children:React.ReactNode;minH?:string;particles?:boolean}){
  return(
    <section style={{position:"relative",overflow:"hidden",minHeight:minH,display:"flex",alignItems:"flex-end"}}>
      <div style={{position:"absolute",inset:0,overflow:"hidden",zIndex:0,pointerEvents:"none"}}>
        <div className="bg-mesh" style={{position:"absolute",inset:0}}/>
        <div className="bg-aurora"/>
        {particles&&<div className="bg-particles"/>}
        <div className="bg-orbs"/>
        <div className="bg-grid"/>
        <div className="orb-c" style={{width:600,height:600,top:"10%",left:"55%",
          background:"radial-gradient(circle,rgba(0,212,255,0.10) 0%,transparent 65%)"}}/>
        <div className="orb-c" style={{width:400,height:400,top:"60%",left:"5%",
          background:"radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 65%)",
          animationDelay:"-12s"}}/>
        <div className="geom-ring" style={{width:480,height:480,top:"5%",right:"-6%",opacity:0.05}}/>
        <div className="geom-ring-b" style={{width:280,height:280,bottom:"20%",left:"2%",opacity:0.04}}/>
      </div>
      <StrataEcho top="18%" right="5%"/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"45%",
        background:"linear-gradient(transparent,var(--bg-0))",pointerEvents:"none",zIndex:1}}/>
      <div style={{position:"relative",zIndex:2,width:"100%",paddingBottom:88}}>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────
   SectionHead — centred / left header
   ───────────────────────────────── */
export function SectionHead({badge,h2,sub,left=false,cyan=false}:{
  badge:string;h2:React.ReactNode;sub?:string;left?:boolean;cyan?:boolean
}){
  const FU={initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:true},transition:{duration:.8}};
  const FI={initial:{opacity:0},whileInView:{opacity:1},viewport:{once:true},transition:{duration:.7}};
  return(
    <div style={{textAlign:left?"left":"center",marginBottom:72}}>
      <motion.div {...FI as any} style={{marginBottom:22,justifyContent:left?"flex-start":"center",display:"flex"}}>
        <span className="badge">{badge}</span>
      </motion.div>
      <motion.h2 {...FU as any} className="t-h2" style={{
        maxWidth:640,margin:left?"0 0 16px":"0 auto 16px",
        background:"linear-gradient(160deg,#fff 25%,#94A3B8 100%)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"
      }}>{h2}</motion.h2>
      {sub&&<motion.p {...FU as any} className="t-lg" style={{
        color:"#64748B",maxWidth:500,margin:left?"0":"0 auto"
      }}>{sub}</motion.p>}
    </div>
  );
}

/* ───────────────────────
   KpiCard — metric display
   ─────────────────────── */
export function KpiCard({value,label,sub,accent="#00D4FF",icon}:{
  value:string;label:string;sub?:string;accent?:string;icon?:string
}){
  return(
    <div className="gc" style={{padding:"36px 30px",borderRadius:20,textAlign:"center"}}>
      {icon&&<div style={{fontSize:28,marginBottom:14,animation:"floatY 5s ease-in-out infinite",
        filter:`drop-shadow(0 0 14px ${accent}88)`}}>{icon}</div>}
      <div style={{fontSize:"clamp(32px,3.5vw,50px)",fontWeight:900,color:accent,
        fontVariantNumeric:"tabular-nums",letterSpacing:"-0.04em",lineHeight:1,
        filter:`drop-shadow(0 0 20px ${accent}55)`}}>{value}</div>
      <div style={{fontSize:14,fontWeight:600,color:"#F1F5F9",marginTop:10}}>{label}</div>
      {sub&&<div style={{fontSize:12,color:"#64748B",marginTop:4,fontFamily:"var(--font-geist-mono,monospace)"}}>{sub}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────
   FloatingOrb — decorative animated orb
   ─────────────────────────────────────────*/
export function FloatingOrb({size=300,color="rgba(0,212,255,0.08)",top,left,right,bottom,delay=0}:{
  size?:number;color?:string;top?:string;left?:string;right?:string;bottom?:string;delay?:number
}){
  return(
    <div style={{
      position:"absolute",
      width:size,height:size,borderRadius:"50%",
      background:`radial-gradient(circle,${color} 0%,transparent 70%)`,
      filter:"blur(60px)",
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      animation:`driftC 24s ease-in-out ${delay}s infinite`,
      pointerEvents:"none",zIndex:0
    }}/>
  );
}

/* ───────────────────────────────────────────────────────────
   GlassDashboard — the animated portfolio overview card
   ─────────────────────────────────────────────────────────── */
export function GlassDashboard(){
  const bars=[
    {l:"Real Estate",v:"SAR 21.4m",p:44,c:"var(--cyan)"},
    {l:"Equities",v:"SAR 15.8m",p:33,c:"var(--blue)"},
    {l:"Holdings",v:"SAR 11.0m",p:23,c:"var(--violet)"},
  ];
  return(
    <div className="gp" style={{borderRadius:28,padding:3,
      background:"linear-gradient(135deg,rgba(0,212,255,0.18),rgba(91,124,250,0.08),transparent)"}}>
      <div style={{background:"rgba(2,4,10,0.88)",backdropFilter:"blur(32px)",
        borderRadius:26,overflow:"hidden"}}>
        {/* Status bar */}
        <div style={{background:"rgba(6,11,20,0.95)",padding:"11px 20px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          borderBottom:"1px solid rgba(0,212,255,0.07)"}}>
          <span style={{fontSize:11,color:"#1E293B",fontFamily:"var(--font-geist-mono,monospace)"}}>9:41</span>
          <span className="badge" style={{padding:"3px 10px",fontSize:9,gap:5}}>
            <span className="dot-live" style={{width:4,height:4}}/>QMULATE LIVE
          </span>
          <div style={{display:"flex",gap:3,alignItems:"flex-end"}}>
            {[6,9,12,15].map((h,i)=><div key={i} style={{width:3,height:h,borderRadius:1,
              background:i===3?"var(--cyan)":"rgba(255,255,255,0.18)"}}/>)}
          </div>
        </div>
        <div style={{padding:"28px 24px"}}>
          <div className="t-xs" style={{color:"#334155",marginBottom:8}}>TOTAL WEALTH · QTD</div>
          <div style={{fontSize:34,fontWeight:900,color:"#F1F5F9",letterSpacing:"-0.04em",
            fontVariantNumeric:"tabular-nums",marginBottom:6}}>SAR 48.2m</div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,
            background:"rgba(0,212,255,0.09)",border:"1px solid rgba(0,212,255,0.22)",
            borderRadius:100,padding:"3px 12px",fontSize:12,color:"var(--cyan)",marginBottom:24}}>
            ▲ 2.4% this quarter
          </div>
          {bars.map((b,i)=>(
            <div key={b.l} style={{marginBottom:i<bars.length-1?16:0}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12}}>
                <span style={{color:"#475569"}}>{b.l}</span>
                <span style={{color:"#F1F5F9",fontFamily:"var(--font-geist-mono,monospace)"}}>{b.v}</span>
              </div>
              <div className="prog-bar">
                <motion.div className="prog-fill" initial={{width:0}} whileInView={{width:`${b.p}%`}}
                  viewport={{once:true}} transition={{duration:1.8,delay:.2+i*.15}}
                  style={{background:`linear-gradient(90deg,${b.c},${b.c}99)`,
                    boxShadow:`0 0 8px ${b.c}55`}}/>
              </div>
            </div>
          ))}
          <div style={{paddingTop:16,marginTop:16,borderTop:"1px solid rgba(255,255,255,0.05)",
            display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span className="t-xs" style={{color:"#1E293B"}}>Updated just now</span>
            <span className="t-xs" style={{color:"var(--cyan)"}}>Request access →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   GlassArchDiagram — 4-layer governance architecture visual
   ────────────────────────────────────────────────────────── */
export function GlassArchDiagram(){
  const layers=[
    {n:"04",l:"Advisory Layer",c:"rgba(168,85,247,0.14)",bc:"rgba(168,85,247,0.3)",tc:"#A855F7",w:"100%"},
    {n:"03",l:"Intelligence Layer",c:"rgba(91,124,250,0.14)",bc:"rgba(91,124,250,0.3)",tc:"#5B7CFA",w:"88%"},
    {n:"02",l:"Operations Layer",c:"rgba(0,212,255,0.10)",bc:"rgba(0,212,255,0.28)",tc:"#00D4FF",w:"76%"},
    {n:"01",l:"Governance Layer",c:"rgba(0,212,255,0.18)",bc:"rgba(0,212,255,0.45)",tc:"#00D4FF",w:"64%"},
  ];
  return(
    <div className="gc" style={{padding:32,borderRadius:24}}>
      <div className="t-xs" style={{color:"var(--cyan)",marginBottom:22}}>ARCHITECTURE — FOUR LAYERS</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"center"}}>
        {layers.map((l,i)=>(
          <motion.div key={l.n} initial={{opacity:0,scaleX:.8}} whileInView={{opacity:1,scaleX:1}}
            viewport={{once:true}} transition={{duration:.7,delay:i*.12}}
            style={{
              width:l.w,background:l.c,border:`1px solid ${l.bc}`,
              borderRadius:10,padding:"12px 18px",
              display:"flex",alignItems:"center",gap:12,
              backdropFilter:"blur(16px)",
            }}>
            <span style={{fontSize:10,fontWeight:700,color:l.tc,
              fontFamily:"var(--font-geist-mono,monospace)",opacity:.8}}>{l.n}</span>
            <span style={{fontSize:13,fontWeight:600,color:"#F1F5F9"}}>{l.l}</span>
            <div style={{marginLeft:"auto",display:"flex",gap:4}}>
              {[...Array(3)].map((_,j)=>(
                <div key={j} style={{width:4,height:4,borderRadius:1,background:l.tc,opacity:.4+j*.2}}/>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{marginTop:18,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.06)",
        display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span className="t-xs" style={{color:"#1E293B"}}>Single governed framework</span>
        <div style={{width:6,height:6,borderRadius:"50%",background:"var(--cyan)",
          animation:"glowPulse 2s ease-in-out infinite"}}/>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   MouseGlow — follows cursor with a soft glow (client-only)
   ─────────────────────────────────────────────────────── */
export function MouseGlow(){
  const [pos,setPos]=useState({x:-200,y:-200});
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{
    setMounted(true);
    const move=(e:MouseEvent)=>setPos({x:e.clientX,y:e.clientY});
    window.addEventListener("mousemove",move);
    return()=>window.removeEventListener("mousemove",move);
  },[]);
  if(!mounted)return null;
  return(
    <div style={{
      position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:0,
      width:320,height:320,borderRadius:"50%",
      background:"radial-gradient(circle,rgba(0,212,255,0.055) 0%,transparent 70%)",
      transform:`translate(${pos.x-160}px,${pos.y-160}px)`,
      transition:"transform 0.12s ease-out",
      filter:"blur(20px)",
    }}/>
  );
}

/* ──────────────────────────────────────────────────────────
   GlassTimeline — animated vertical / horizontal timeline
   ────────────────────────────────────────────────────────── */
export function GlassTimeline({items,accent="#00D4FF"}:{
  items:{year:string;title:string;desc:string;tag?:string}[];accent?:string
}){
  return(
    <div style={{position:"relative",paddingLeft:40}}>
      <div style={{position:"absolute",left:11,top:8,bottom:8,width:1,
        background:`linear-gradient(to bottom,${accent},rgba(0,212,255,0.15),transparent)`}}/>
      {items.map((t,i)=>(
        <motion.div key={t.year} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
          viewport={{once:true}} transition={{duration:.7,delay:.08+i*.1}}
          style={{position:"relative",paddingBottom:32,display:"flex",gap:28,alignItems:"flex-start"}}>
          <div style={{position:"absolute",left:-40,top:8,width:10,height:10,borderRadius:"50%",
            background:i===items.length-1?accent:"rgba(0,212,255,0.35)",
            boxShadow:i===items.length-1?`0 0 14px ${accent}bb`:undefined,flexShrink:0}}/>
          <div style={{flexShrink:0,minWidth:48}}>
            <div style={{fontSize:13,fontWeight:800,color:accent,
              fontFamily:"var(--font-geist-mono,monospace)"}}>{t.year}</div>
          </div>
          <div className="gc" style={{flex:1,padding:"20px 26px",borderRadius:14}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <div style={{fontSize:15,fontWeight:700,color:"#F1F5F9"}}>{t.title}</div>
              {t.tag&&<span className="badge" style={{fontSize:9,padding:"2px 9px"}}>{t.tag}</span>}
            </div>
            <p className="t-sm" style={{color:"#475569",lineHeight:1.72}}>{t.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   ProcessSteps — 4-step process with connecting line
   ───────────────────────────────────────────────────── */
export function ProcessSteps({steps,accent="#00D4FF"}:{
  steps:{n:string;l:string;d:string;icon:string}[];accent?:string
}){
  return(
    <div style={{position:"relative"}}>
      <div style={{position:"absolute",top:44,left:"12.5%",right:"12.5%",height:1,
        background:`linear-gradient(90deg,transparent,${accent}66,${accent}66,transparent)`}} className="proc-ln"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}} className="fc4">
        {steps.map((s,i)=>(
          <motion.div key={s.n} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.7,delay:.08+i*.12}}
            style={{textAlign:"center",position:"relative",zIndex:1}}>
            <div className="gc" style={{
              width:88,height:88,borderRadius:"50%",margin:"0 auto 22px",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
              boxShadow:`0 0 0 1px ${accent}33,var(--sh-card)`,
              animation:`floatY ${5+i}s ease-in-out infinite`,animationDelay:`${i*.4}s`,
            }}>{s.icon}</div>
            <div className="t-xs" style={{color:accent,display:"block",marginBottom:8}}>{s.n}</div>
            <div style={{fontSize:16,fontWeight:700,color:"#F1F5F9",marginBottom:9}}>{s.l}</div>
            <p className="t-sm" style={{color:"#475569",lineHeight:1.72}}>{s.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────
   CapabilityGrid — animated icon cards
   ─────────────────────────────────────────────────── */
export function CapabilityGrid({items}:{items:{icon:string;label:string;sub:string}[]}){
  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}} className="cap-grid">
      {items.map((c,i)=>(
        <motion.div key={c.label} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.7,delay:.05+i*.07}}
          className="gc" style={{padding:"34px 30px",borderRadius:20}}>
          <div style={{width:50,height:50,borderRadius:13,background:"rgba(0,212,255,0.08)",
            border:"1px solid rgba(0,212,255,0.2)",display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:22,color:"var(--cyan)",marginBottom:20,
            animation:`floatY ${5+i%3}s ease-in-out ${i*.3}s infinite`}}>{c.icon}</div>
          <div style={{fontSize:16,fontWeight:700,color:"#F1F5F9",marginBottom:8}}>{c.label}</div>
          <p className="t-sm" style={{color:"#475569",lineHeight:1.7}}>{c.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MorphingBlob — liquid 3D gradient shape (ref: images 1 & 2)
   ───────────────────────────────────────────────────────────── */
export function MorphingBlob({
  size=400,gradient="cyan-purple",cls="morph",
  top,left,right,bottom,zIndex=0,opacity=0.55,
}:{size?:number;gradient?:string;cls?:string;
   top?:string;left?:string;right?:string;bottom?:string;zIndex?:number;opacity?:number}){
  return(
    <div style={{
      position:"absolute",width:size,height:size,
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      zIndex,pointerEvents:"none",opacity,
    }}>
      <div className={`blob blob-lg blob-${gradient} ${cls}`} style={{width:"100%",height:"100%"}}/>
    </div>
  );
}

/* ─────────────────────────────────────────
   FloatingBubbles — translucent glass orbs
   ───────────────────────────────────────── */
export function FloatingBubbles(){
  const bubbles=[
    {sz:90,top:"8%",left:"6%",cls:"bubble-a",opacity:.55},
    {sz:140,top:"65%",left:"2%",cls:"bubble-b",opacity:.4},
    {sz:60,top:"22%",left:"88%",cls:"bubble-c",opacity:.5},
    {sz:110,top:"78%",left:"85%",cls:"bubble-a",opacity:.45},
    {sz:45,top:"45%",left:"92%",cls:"bubble-d",opacity:.6},
    {sz:75,top:"15%",left:"50%",cls:"bubble-b",opacity:.35},
  ];
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      {bubbles.map((b,i)=>(
        <div key={i} className={`bubble ${b.cls}`} style={{
          width:b.sz,height:b.sz,
          top:b.top,left:b.left,opacity:b.opacity,
        }}/>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HeroGlassPanel — large central frosted glass hero container
   (ref: images 1, 2, 3 — the big glass rectangle that zooms in)
   ───────────────────────────────────────────────────────────── */
export function HeroGlassPanel({children,right=false}:{children:React.ReactNode;right?:boolean}){
  return(
    <div className="hero-glass glass-zoom" style={{
      padding:"44px 48px",height:"100%",
      display:"flex",flexDirection:"column",justifyContent:"center",
    }}>
      {/* Scan line inside glass */}
      <div style={{position:"absolute",left:0,right:0,height:1,top:"12%",
        background:"linear-gradient(90deg,transparent,rgba(0,212,255,0.2),rgba(255,255,255,0.1),transparent)",
        pointerEvents:"none"}}/>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   GlobeViz — abstract investment network (ref: image 3)
   ───────────────────────────────────────────────────── */
export function GlobeViz(){
  const nodes=[
    {r:40,delay:0,c:"var(--cyan)"},
    {r:70,delay:.8,c:"var(--violet)"},
    {r:100,delay:1.6,c:"var(--blue)"},
    {r:130,delay:2.4,c:"rgba(255,110,199,0.6)"},
  ];
  return(
    <div style={{position:"relative",width:280,height:280,margin:"0 auto"}}>
      {nodes.map((n,i)=>(
        <div key={i} style={{
          position:"absolute",top:"50%",left:"50%",
          width:n.r*2,height:n.r*2,
          transform:"translate(-50%,-50%)",
          borderRadius:"50%",
          border:`1px solid ${n.c}44`,
          animation:`rotateSlow ${14+i*5}s linear ${n.delay}s infinite`,
        }}>
          <div style={{
            position:"absolute",top:-4,left:"50%",transform:"translateX(-50%)",
            width:8,height:8,borderRadius:"50%",background:n.c,
            boxShadow:`0 0 14px ${n.c}`,
          }}/>
        </div>
      ))}
      {/* Core */}
      <div style={{
        position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
        width:52,height:52,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(0,212,255,0.45) 0%,rgba(0,212,255,0.12) 60%,transparent 100%)",
        boxShadow:"0 0 40px rgba(0,212,255,0.6)",
        animation:"glowPulse 2.5s ease-in-out infinite",
      }}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   StackedGlassCards — stacked depth cards (ref: image 3)
   ───────────────────────────────────────────────────────── */
export function StackedGlassCards({items}:{items:{label:string;value:string;icon:string;c:string}[]}){
  return(
    <div style={{position:"relative",height:240}}>
      {items.map((item,i)=>(
        <motion.div key={i}
          initial={{opacity:0,y:30,rotate:i%2===0?3:-3}}
          whileInView={{opacity:1,y:0,rotate:i%2===0?3:-3}}
          viewport={{once:true}}
          transition={{duration:.8,delay:i*.15}}
          style={{
            position:"absolute",
            top:i*28,right:i*20,
            width:220,
            background:`rgba(255,255,255,${0.06+i*.02})`,
            backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",
            border:"1px solid rgba(255,255,255,0.13)",
            borderRadius:20,padding:"18px 22px",
            boxShadow:`0 ${12+i*8}px ${32+i*12}px rgba(0,0,0,${0.4+i*.08})`,
            transform:`rotate(${i%2===0?3:-3}deg)`,
          }}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <span style={{fontSize:18,color:item.c,filter:`drop-shadow(0 0 8px ${item.c})`}}>{item.icon}</span>
            <span style={{fontSize:11,color:"#64748B",fontFamily:"var(--font-geist-mono,monospace)",textTransform:"uppercase",letterSpacing:"0.08em"}}>{item.label}</span>
          </div>
          <div style={{fontSize:22,fontWeight:800,color:"#F1F5F9",fontVariantNumeric:"tabular-nums"}}>{item.value}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   IridescentBlob — the oil-slick multicolor sphere from Image 2
   ───────────────────────────────────────────────────────────────── */
export function IridescentBlob({
  size=420,top,left,right,bottom,zIndex=0,cls="morph",delay=0
}:{size?:number;top?:string;left?:string;right?:string;bottom?:string;zIndex?:number;cls?:string;delay?:number}){
  return(
    <div style={{
      position:"absolute",width:size,height:size,borderRadius:"50%",
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      zIndex,pointerEvents:"none",
    }}>
      <div className={`blob-iridescent ${cls}`} style={{
        width:"100%",height:"100%",borderRadius:"50%",
        filter:"blur(0px) saturate(180%)",
        animationDelay:`${delay}s`,
      }}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GoldBlob — warm 3D gold blob from Image 1 (outside glass)
   ───────────────────────────────────────────────────────────────── */
export function GoldBlob({
  size=300,top,left,right,bottom,zIndex=0,
}:{size?:number;top?:string;left?:string;right?:string;bottom?:string;zIndex?:number}){
  return(
    <div style={{
      position:"absolute",width:size,height:size,
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      zIndex,pointerEvents:"none",
    }}>
      <div className="blob-sphere-gold blob-lg morph-b" style={{
        width:"100%",height:"100%",
      }}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RippleSphere — blue sphere with concentric ripple rings (Image 1)
   ───────────────────────────────────────────────────────────────── */
export function RippleSphere({size=180,style={}}:{size?:number;style?:React.CSSProperties}){
  return(
    <div className="ripple-sphere-wrap" style={{width:size,height:size,...style}}>
      {[1,2,3].map(i=>(
        <div key={i} className="ripple-ring" style={{
          width:size*(.85+i*.45),
          height:size*(.85+i*.45),
          borderColor:`rgba(0,212,255,${.4-.1*i})`,
          boxShadow:`0 0 ${8+i*4}px rgba(0,212,255,${.25-.06*i})`,
        }}/>
      ))}
      <div className="ripple-core" style={{width:size,height:size,zIndex:2}}/>
      {/* Inner glow overlay */}
      <div style={{
        position:"absolute",inset:0,borderRadius:"50%",zIndex:3,
        background:"radial-gradient(circle at 35% 30%,rgba(200,240,255,0.4) 0%,transparent 55%)",
        pointerEvents:"none",
      }}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LargeBubbles — ref image 2 style large translucent glass orbs
   ───────────────────────────────────────────────────────────────── */
export function LargeBubbles(){
  const bubbles=[
    {sz:200,top:"5%",left:"8%",cls:"bubble-large-a",opacity:.65},
    {sz:280,top:"60%",left:"1%",cls:"bubble-large-b",opacity:.5},
    {sz:160,top:"15%",left:"80%",cls:"bubble-large-c",opacity:.6},
    {sz:240,top:"70%",left:"78%",cls:"bubble-large-d",opacity:.45},
    {sz:120,top:"38%",left:"92%",cls:"bubble-large-a",opacity:.55},
    {sz:90, top:"50%",left:"12%",cls:"bubble-large-b",opacity:.5},
    {sz:350,top:"25%",left:"40%",cls:"bubble-large-c",opacity:.25},
  ];
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      {bubbles.map((b,i)=>(
        <div key={i} className={`bubble-large ${b.cls}`} style={{
          width:b.sz,height:b.sz,
          top:b.top,left:b.left,opacity:b.opacity,
        }}/>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SmoothOrbs — ref image 3 style large soft background orbs
   ───────────────────────────────────────────────────────────────── */
export function SmoothOrbs(){
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      <div className="bg-orb-smooth bg-orb-purple" style={{width:600,height:600,top:"-10%",left:"-5%"}}/>
      <div className="bg-orb-smooth bg-orb-magenta" style={{width:500,height:500,top:"30%",right:"-8%",animationDelay:"-8s"}}/>
      <div className="bg-orb-smooth bg-orb-orange" style={{width:400,height:400,bottom:"-10%",left:"30%",animationDelay:"-15s"}}/>
      <div className="bg-orb-smooth bg-orb-cyan" style={{width:350,height:350,top:"10%",left:"55%",animationDelay:"-4s"}}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ViewportGlassHero — the large glass panel containing all content
   (Images 1 & 2: the main rectangle that zooms in 0.8→1.0 on load)
   ───────────────────────────────────────────────────────────────── */
export function ViewportGlassHero({children}:{children:React.ReactNode}){
  return(
    <div className="viewport-glass glass-zoom" style={{
      width:"100%",position:"relative",zIndex:5,
      padding:"0",
    }}>
      {/* Top shimmer line */}
      <div style={{position:"absolute",top:0,left:"5%",right:"5%",height:1,
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),rgba(0,212,255,0.5),rgba(255,255,255,0.4),transparent)",
        zIndex:10}}/>
      {/* Diagonal light beam (ref 1) */}
      <div className="light-beam" style={{
        position:"absolute",top:"-20%",left:"-10%",
        width:"40%",height:"180%",zIndex:0,opacity:.45,
      }}/>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TubeOrnament — the orange tube/ribbon shape from Image 1
   ───────────────────────────────────────────────────────────────── */
export function TubeOrnament({color="#FF9A3C",x=0,y=0,scale=1,rotate=0,opacity=0.8}:{
  color?:string;x?:number;y?:number;scale?:number;rotate?:number;opacity?:number
}){
  return(
    <svg width={200*scale} height={120*scale} viewBox="0 0 200 120"
      style={{position:"absolute",transform:`translate(${x}px,${y}px) rotate(${rotate}deg)`,
        pointerEvents:"none",zIndex:1,opacity,filter:`drop-shadow(0 0 20px ${color}88)`,
        animation:"floatY 7s ease-in-out infinite"}}>
      <defs>
        <linearGradient id={`tube-${rotate}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity=".95"/>
          <stop offset="50%" stopColor="#FFE08A" stopOpacity=".85"/>
          <stop offset="100%" stopColor="#FF6B35" stopOpacity=".9"/>
        </linearGradient>
      </defs>
      <path d="M10,100 Q70,20 130,60 Q190,100 180,30"
        fill="none" stroke={`url(#tube-${rotate})`} strokeWidth="26"
        strokeLinecap="round" strokeLinejoin="round"
        style={{filter:`drop-shadow(0 4px 12px ${color}66)`}}/>
    </svg>
  );
}
