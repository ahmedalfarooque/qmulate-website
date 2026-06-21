"use client";
import { CapabilityIcon } from "@/components/icons/GlassIcons";
import { CardTilt3D, HoverLift } from "@/components/Motion";
import { BRAND_BLUE } from "@/components/Strata";
import { motion } from "framer-motion";

/* ─── Animation Presets ─── */
export const FU = (delay=0,distance=16) => ({
  initial:{opacity:0,y:distance,willChange:"opacity, transform"},
  whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-20px"},
  transition:{duration:.2,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});
export const FI = (delay=0) => ({
  initial:{opacity:0,willChange:"opacity"},
  whileInView:{opacity:1},
  viewport:{once:true,margin:"-20px"},
  transition:{duration:.2,delay},
});
export const FS = (delay=0) => ({
  initial:{opacity:0,scale:.97,willChange:"opacity, transform"} as {opacity:number,scale:number,willChange:string},
  whileInView:{opacity:1,scale:1},
  viewport:{once:true,margin:"-20px"},
  transition:{duration:.2,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});
export const FL = (delay=0) => ({
  initial:{opacity:0,x:-12,willChange:"opacity, transform"},
  whileInView:{opacity:1,x:0},
  viewport:{once:true,margin:"-20px"},
  transition:{duration:.2,delay,ease:[.25,.46,.45,.94] as [number,number,number,number]},
});

/* ─── Section Heading ─── */
export function SectionHeading({eyebrow,title,subtitle,center=false,wide=false,className=""}:{
  eyebrow?:string;title:React.ReactNode;subtitle?:string;center?:boolean;wide?:boolean;className?:string
}) {
  return(
    <div className={className} style={{textAlign:center?"center":"left",maxWidth:wide?"100%":center?680:720}}>
      {eyebrow&&(
        <motion.div {...FI(0)} style={{marginBottom:16}}>
          <span className="pill pill-c"><span style={{display:"inline-block",width:10,height:3,borderRadius:1,background:BRAND_BLUE,marginRight:8,verticalAlign:"middle"}}/>{eyebrow}</span>
        </motion.div>
      )}
      <motion.h2 {...FU(0.05)} className="t-h2 gt-w" style={{marginBottom:subtitle?16:0}}>
        {title}
      </motion.h2>
      {subtitle&&(
        <motion.p {...FU(0.08)} className="t-lg" style={{color:"var(--text-3)",marginTop:16,lineHeight:1.75}}>
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

/* ─── Feature Card ─── */
export function FeatureCard({title,desc,index=0}:{
  icon?:string;title:string;desc:string;accent?:string;index?:number
}) {
  return(
    <motion.div {...FU(index*0.04)}>
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

/* ─── Hero Glass ─── */
export function HeroGlass({children,style={}}:{children:React.ReactNode;style?:React.CSSProperties}) {
  return(
    <motion.div
      initial={{opacity:0,scale:.9,filter:"blur(4px)"}}
      animate={{opacity:1,scale:1,filter:"blur(0px)"}}
      transition={{duration:.35,ease:[.34,1.08,.64,1]}}
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
      transition={{duration:.3,delay,ease:[.34,1.56,.64,1]}}
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
