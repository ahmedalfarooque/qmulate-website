"use client";
import { CapabilityIcon } from "@/components/icons/GlassIcons";
import { CardTilt3D, HoverLift, AnimatedNumber, SPRING, EASE, DUR } from "@/components/Motion";
/**
 * QMULATE Design System — Shared Components
 * Full dual-theme (dark + light) support via CSS variables
 */
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { StrataMark } from "./StrataMark";

/* ─── Animation Presets ─── */
export const FU = (delay=0,distance=28) => ({
  initial:{opacity:0,y:distance},
  whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-80px"},
  transition:{duration:.85,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});
export const FI = (delay=0) => ({
  initial:{opacity:0},
  whileInView:{opacity:1},
  viewport:{once:true,margin:"-60px"},
  transition:{duration:.7,delay},
});
export const FS = (delay=0) => ({
  initial:{opacity:0,scale:.92} as {opacity:number,scale:number},
  whileInView:{opacity:1,scale:1},
  viewport:{once:true,margin:"-60px"},
  transition:{duration:.9,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});
export const FL = (delay=0) => ({
  initial:{opacity:0,x:-32},
  whileInView:{opacity:1,x:0},
  viewport:{once:true,margin:"-60px"},
  transition:{duration:.85,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});

/* ─── Animated Counter ─── */
export function Counter({to,prefix="",suffix="",decimals=0,duration=2.2,className=""}:{
  to:number;prefix?:string;suffix?:string;decimals?:number;duration?:number;className?:string
}) {
  const [value,setValue]=useState(0);
  const ref=useRef<HTMLSpanElement>(null);
  const inView=useInView(ref,{once:true,margin:"-100px"});
  useEffect(()=>{
    if(!inView)return;
    const steps=60*duration;const step=to/steps;let current=0;
    const timer=setInterval(()=>{
      current=Math.min(current+step,to);setValue(current);
      if(current>=to)clearInterval(timer);
    },1000/60);
    return()=>clearInterval(timer);
  },[inView,to,duration]);
  const display=decimals>0?value.toFixed(decimals):Math.floor(value).toLocaleString();
  return<span ref={ref} className={className}>{prefix}{display}{suffix}</span>;
}

/* ─── Section Heading ─── */
export function SectionHeading({eyebrow,title,subtitle,center=false,className=""}:{
  eyebrow?:string;title:React.ReactNode;subtitle?:string;center?:boolean;className?:string
}) {
  return(
    <div className={className} style={{textAlign:center?"center":"left",maxWidth:center?680:720}}>
      {eyebrow&&(
        <motion.div {...FI(0)} style={{marginBottom:16}}>
          <span className="pill pill-c"><span className="dot-live"/>{eyebrow}</span>
        </motion.div>
      )}
      <motion.h2 {...FU(0.05)} className="t-h2 gt-w" style={{marginBottom:subtitle?16:0}}>
        {title}
      </motion.h2>
      {subtitle&&(
        <motion.p {...FU(0.12)} className="t-lg" style={{color:"var(--text-3)",marginTop:16,lineHeight:1.75}}>
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ─── Glass Card ─── */
export function GlassCard({children,className="",style={},hover=true,onClick,tilt=true}:{
  children:React.ReactNode;className?:string;style?:React.CSSProperties;
  hover?:boolean;onClick?:()=>void;tilt?:boolean;
}) {
  if (!hover) return <div className={`gc noise ${className}`} style={style} onClick={onClick}>{children}</div>;
  if (tilt) return (
    <CardTilt3D className={`gc noise ${className}`} style={style} maxTilt={5} scale={1.012}>
      <div onClick={onClick}>{children}</div>
    </CardTilt3D>
  );
  return (
    <HoverLift className={`gc noise ${className}`} style={style} lift={6}>
      <div onClick={onClick}>{children}</div>
    </HoverLift>
  );
}

/* ─── Metric Card ─── */
export function MetricCard({value,label,sub,prefix="",suffix="",accent}:{
  value:number;label:string;sub?:string;prefix?:string;suffix?:string;accent?:string
}) {
  const a=accent||"var(--cyan)";
  return(
    <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
      <div style={{
        fontSize:"clamp(36px,4.5vw,64px)",fontWeight:900,letterSpacing:"-0.04em",
        color:a,filter:`drop-shadow(0 0 24px ${a}55)`,
        fontVariantNumeric:"tabular-nums",lineHeight:1,marginBottom:8,
      }}>
        <Counter to={value} prefix={prefix} suffix={suffix}/>
      </div>
      <div className="t-sm" style={{color:"var(--text-2)",fontWeight:500,marginBottom:sub?4:0}}>{label}</div>
      {sub&&<div className="t-xs" style={{color:"var(--text-4)"}}>{sub}</div>}
    </GlassCard>
  );
}

/* ─── Feature Card ─── */
export function FeatureCard({icon,title,desc,accent,index=0}:{
  icon:string;title:string;desc:string;accent?:string;index?:number
}) {
  return(
    <motion.div {...FU(index*0.08)}>
      <GlassCard style={{padding:"clamp(24px,3vw,36px)",height:"100%"}}>
        <div style={{marginBottom:20}}>
          <CapabilityIcon index={index} size="md"/>
        </div>
        <h3 className="t-h4" style={{marginBottom:10,color:"var(--text-1)"}}>{title}</h3>
        <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.72}}>{desc}</p>
      </GlassCard>
    </motion.div>
  );
}

/* ─── Orb Background ─── */
export function OrbBg({cyan=true,violet=true,blue=false,warm=false}:{
  cyan?:boolean;violet?:boolean;blue?:boolean;warm?:boolean
}) {
  return(
    <div className="bg-mesh" style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
      <div className="bg-aurora"/>
      {cyan&&<div className="orb orb-c" style={{width:700,height:700,top:"-10%",left:"-5%",animation:"float-y 22s ease-in-out infinite"}}/>}
      {violet&&<div className="orb orb-v" style={{width:600,height:600,bottom:"-15%",right:"-8%",animation:"float-y 28s ease-in-out 8s infinite"}}/>}
      {blue&&<div className="orb orb-b" style={{width:500,height:500,top:"40%",left:"45%",animation:"float-y 18s ease-in-out 4s infinite"}}/>}
      {warm&&<div className="orb orb-g" style={{width:400,height:400,top:"20%",right:"20%",animation:"float-y 24s ease-in-out 6s infinite"}}/>}
    </div>
  );
}

/* ─── Iridescent Blob ─── */
export function IrisBlob({size=400,top,left,right,bottom,delay=0,morph="blob-morph",opacity=0.55}:{
  size?:number;top?:string;left?:string;right?:string;bottom?:string;delay?:number;morph?:string;opacity?:number
}) {
  return(
    <div style={{position:"absolute",width:size,height:size,borderRadius:"50%",
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      pointerEvents:"none",zIndex:0}}>
      <div className={`blob blob-iris ${morph}`} style={{
        width:"100%",height:"100%",borderRadius:"50%",opacity,
        filter:"blur(2px) saturate(180%)",animationDelay:`${delay}s`,
      }}/>
    </div>
  );
}

/* ─── Gold Blob ─── */
export function GoldBlobComp({size=300,top,left,right,bottom,delay=0}:{
  size?:number;top?:string;left?:string;right?:string;bottom?:string;delay?:number
}) {
  return(
    <div style={{position:"absolute",width:size,height:size,borderRadius:"50%",
      top:top||"auto",left:left||"auto",right:right||"auto",bottom:bottom||"auto",
      pointerEvents:"none",zIndex:0}}>
      <div className="blob blob-gold blob-morph-b" style={{
        width:"100%",height:"100%",borderRadius:"50%",opacity:0.5,
        filter:"blur(60px) saturate(160%)",animationDelay:`${delay}s`,
      }}/>
    </div>
  );
}

/* ─── Bubbles ─── */
export function Bubbles() {
  const sizes=[220,160,110,280,80,140,190];
  const positions=[
    {top:"8%",left:"5%"},{top:"70%",left:"2%"},{top:"18%",left:"85%"},
    {top:"75%",left:"80%"},{top:"45%",left:"92%"},{top:"35%",left:"8%"},{top:"55%",left:"50%"},
  ];
  const classes=["bubble-a","bubble-b","bubble-c","bubble-d","bubble-a","bubble-b","bubble-c"];
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {sizes.map((s,i)=>(
        <div key={i} className={`bubble ${classes[i]}`} style={{
          width:s,height:s,...positions[i],opacity:.45+i*.04,
        }}/>
      ))}
    </div>
  );
}

/* ─── Ripple Sphere ─── */
export function RippleSphere({size=160,style={}}:{size?:number;style?:React.CSSProperties}) {
  return(
    <div style={{position:"relative",width:size,height:size,...style}}>
      {[1,2,3].map(i=>(
        <div key={i} className="ripple-ring" style={{
          width:size*(0.9+i*.5),height:size*(0.9+i*.5),
          borderColor:`rgba(0,212,255,${.4-.12*i})`,
          boxShadow:`0 0 ${8+i*6}px rgba(0,212,255,${.25-.07*i})`,
        }}/>
      ))}
      <div className="sphere" style={{position:"absolute",inset:0,zIndex:2}}/>
    </div>
  );
}

/* ─── Mouse Glow ─── */
export function MouseGlow() {
  const [pos,setPos]=useState({x:-500,y:-500});
  useEffect(()=>{
    const fn=(e:MouseEvent)=>setPos({x:e.clientX,y:e.clientY});
    window.addEventListener("mousemove",fn,{passive:true});
    return()=>window.removeEventListener("mousemove",fn);
  },[]);
  return(
    <div style={{
      position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9990,
      width:400,height:400,borderRadius:"50%",
      background:"radial-gradient(circle,rgba(0,212,255,.05) 0%,transparent 70%)",
      transform:`translate(${pos.x-200}px,${pos.y-200}px)`,
      transition:"transform .12s ease-out",filter:"blur(20px)",
    }}/>
  );
}

/* ─── Hero Glass ─── */
export function HeroGlass({children,style={}}:{children:React.ReactNode;style?:React.CSSProperties}) {
  return(
    <motion.div
      initial={{opacity:0,scale:.82,filter:"blur(8px)"}}
      animate={{opacity:1,scale:1,filter:"blur(0px)"}}
      transition={{duration:1.1,ease:[.34,1.08,.64,1]}}
      className="gf noise hero-panel"
      style={{position:"relative",overflow:"hidden",...style}}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,
        background:"linear-gradient(90deg,transparent 5%,var(--glass-shine) 35%,rgba(0,212,255,.3) 65%,transparent 95%)",zIndex:10}}/>
      <div className="scan-line"/>
      <div style={{position:"absolute",top:"-20%",left:"-10%",width:"40%",height:"180%",
        background:"linear-gradient(135deg,var(--orb-b),transparent 80%)",
        transform:"rotate(-15deg)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"relative",zIndex:5}}>{children}</div>
    </motion.div>
  );
}

/* ─── Floating Badge ─── */
export function FloatingBadge({children,accent,top,right,left,bottom,delay=0,rotate=0}:{
  children:React.ReactNode;accent?:string;top?:string;right?:string;left?:string;bottom?:string;delay?:number;rotate?:number
}) {
  const a=accent||"var(--cyan)";
  return(
    <motion.div
      initial={{opacity:0,scale:.7,y:20}}
      animate={{opacity:1,scale:1,y:0}}
      transition={{duration:.9,delay,ease:[.34,1.56,.64,1]}}
      style={{
        position:"absolute",top,right,left,bottom,
        background:"var(--g4)",
        backdropFilter:"blur(32px)",WebkitBackdropFilter:"blur(32px)",
        border:`1px solid color-mix(in srgb,${a} 44%,var(--glass-border))`,
        borderRadius:16,padding:"12px 16px",
        boxShadow:`var(--sh-card),0 0 20px color-mix(in srgb,${a} 22%,transparent)`,
        animation:`float-y ${5+delay}s ease-in-out infinite`,
        transform:`rotate(${rotate}deg)`,zIndex:10,
      }}
    >{children}</motion.div>
  );
}

/* ─── Divider ─── */
export function Divider({style={}}:{style?:React.CSSProperties}) {
  return<div className="hr-glow" style={{margin:"0",opacity:.6,...style}}/>;
}

/* ─── Tab Switch ─── */
export function TabSwitch({tabs,active,onChange,accent}:{
  tabs:string[];active:number;onChange:(i:number)=>void;accent?:string
}) {
  const a=accent||"var(--cyan)";
  return(
    <div style={{display:"inline-flex",background:"var(--g2)",border:"1px solid var(--glass-border)",borderRadius:100,padding:4,gap:2}}>
      {tabs.map((t,i)=>(
        <button key={t} onClick={()=>onChange(i)} style={{
          padding:"7px 20px",borderRadius:100,fontSize:13,fontWeight:500,
          background:active===i?a:"transparent",
          color:active===i?"#020408":"var(--text-3)",
          transition:"all .25s",border:"none",cursor:"pointer",
        }}>{t}</button>
      ))}
    </div>
  );
}
