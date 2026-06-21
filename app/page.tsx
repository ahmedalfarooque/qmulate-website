"use client";
import {
  LocationIcon, EmailIcon, LockIcon, ClockIcon,
} from "@/components/icons/GlassIcons";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FU, FI, FS, SectionHeading,
  HeroGlass,
} from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";
import ScanLine from "@/components/ScanLine";

/* ─── TRUE GLASSMORPHISM SYSTEM ──────────────────────────────────────────── */
// Matches reference: dark semi-opaque panel, strong blur, thick bright top edge, deep shadow

const GLASS_BASE = {
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  borderRadius: '22px',
  position: 'relative' as const,
  overflow: 'hidden' as const,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Base glass — dark frosted, neutral
const glass = {
  ...GLASS_BASE,
  background: 'rgba(8, 14, 44, 0.62)',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow: `
    inset 0 1.5px 0 rgba(255,255,255,0.45),
    inset 1px 0 0 rgba(255,255,255,0.18),
    inset -1px 0 0 rgba(255,255,255,0.06),
    inset 0 -1px 0 rgba(255,255,255,0.04),
    0 24px 60px rgba(0,0,0,0.65),
    0 8px 20px rgba(0,0,0,0.45),
    0 0 0 1px rgba(255,255,255,0.06)
  `,
};

// Cyan-tinted glass
const glassCyan = {
  ...GLASS_BASE,
  background: 'rgba(0, 30, 80, 0.62)',
  border: '1px solid rgba(0,200,255,0.28)',
  boxShadow: `
    inset 0 1.5px 0 rgba(0,220,255,0.55),
    inset 1px 0 0 rgba(0,200,255,0.22),
    inset -1px 0 0 rgba(0,200,255,0.06),
    inset 0 -1px 0 rgba(0,200,255,0.04),
    0 24px 60px rgba(0,0,0,0.65),
    0 8px 20px rgba(0,10,60,0.50),
    0 0 0 1px rgba(0,200,255,0.10)
  `,
};

// Purple-tinted glass
const glassPurple = {
  ...GLASS_BASE,
  background: 'rgba(20, 8, 60, 0.62)',
  border: '1px solid rgba(140,90,255,0.28)',
  boxShadow: `
    inset 0 1.5px 0 rgba(160,110,255,0.55),
    inset 1px 0 0 rgba(140,90,255,0.22),
    inset -1px 0 0 rgba(140,90,255,0.06),
    inset 0 -1px 0 rgba(140,90,255,0.04),
    0 24px 60px rgba(0,0,0,0.65),
    0 8px 20px rgba(20,0,60,0.50),
    0 0 0 1px rgba(140,90,255,0.10)
  `,
};

// Heavy glass — contact form, large containers
const glassHeavy = {
  ...GLASS_BASE,
  borderRadius: '26px',
  background: 'rgba(6, 10, 36, 0.68)',
  border: '1px solid rgba(255,255,255,0.16)',
  boxShadow: `
    inset 0 2px 0 rgba(255,255,255,0.50),
    inset 1px 0 0 rgba(255,255,255,0.22),
    inset -1px 0 0 rgba(255,255,255,0.08),
    inset 0 -1px 0 rgba(255,255,255,0.04),
    0 32px 80px rgba(0,0,0,0.70),
    0 12px 32px rgba(0,0,0,0.50),
    0 0 0 1px rgba(255,255,255,0.08)
  `,
};

// Pill glass — small info rows
const glassPill = {
  backdropFilter: 'blur(16px) saturate(140%)',
  WebkitBackdropFilter: 'blur(16px) saturate(140%)',
  background: 'rgba(8, 14, 44, 0.55)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '14px',
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.35),
    inset 1px 0 0 rgba(255,255,255,0.10),
    0 8px 24px rgba(0,0,0,0.50)
  `,
  position: 'relative' as const,
  overflow: 'hidden' as const,
  transition: 'all 0.3s ease',
};

// Hover states
const glassHoverCyan = {
  background: 'rgba(0, 40, 100, 0.70)',
  border: '1px solid rgba(0,220,255,0.45)',
  boxShadow: `
    inset 0 1.5px 0 rgba(0,220,255,0.70),
    inset 1px 0 0 rgba(0,200,255,0.30),
    0 32px 80px rgba(0,0,0,0.70),
    0 0 60px rgba(0,150,255,0.20)
  `,
  transform: 'translateY(-5px)',
};

const glassHoverPurple = {
  background: 'rgba(30, 10, 80, 0.70)',
  border: '1px solid rgba(160,110,255,0.45)',
  boxShadow: `
    inset 0 1.5px 0 rgba(160,110,255,0.70),
    inset 1px 0 0 rgba(140,90,255,0.30),
    0 32px 80px rgba(0,0,0,0.70),
    0 0 60px rgba(120,60,255,0.20)
  `,
  transform: 'translateY(-5px)',
};

// True glass plate — very low opacity, strong blur, vivid edge highlights, deep 3D shadow stack
const glassLight3D = {
  backdropFilter: 'blur(48px) saturate(200%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.08)',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255,255,255,0.30)',
  borderRadius: '20px',
  position: 'relative' as const,
  overflow: 'hidden' as const,
  boxShadow: `
    inset 0 1.5px 0 rgba(255,255,255,0.55),
    inset 1px 0 0 rgba(255,255,255,0.22),
    inset -1px 0 0 rgba(255,255,255,0.08),
    inset 0 -1px 0 rgba(255,255,255,0.06),
    0 4px 0 rgba(0,0,0,0.22),
    0 8px 0 rgba(0,0,0,0.16),
    0 14px 0 rgba(0,0,0,0.10),
    0 22px 0 rgba(0,0,0,0.06),
    0 36px 80px rgba(0,0,0,0.65),
    0 12px 30px rgba(0,0,0,0.40)
  `,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Sub-card glass per client index (0=Corporates→cyan, 1=Endowments→purple, 2=Individuals→base)
const SUB_GLASS = [glassCyan, glassPurple, glass];
const SUB_HIGHLIGHT = ['rgba(0,220,255,0.55)', 'rgba(160,110,255,0.55)', 'rgba(255,255,255,0.40)'];

/* ─── GLASS DECORATOR COMPONENTS ─────────────────────────────────────────── */

function GlassHighlight({ color = 'rgba(255,255,255,0.25)' }: { color?: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
      background: `linear-gradient(90deg, transparent 0%, ${color} 30%, rgba(255,255,255,0.35) 50%, ${color} 70%, transparent 100%)`,
      pointerEvents: 'none', zIndex: 3,
    }} />
  );
}

function GlassLeftEdge({ color = 'rgba(255,255,255,0.12)' }: { color?: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '1px', bottom: 0,
      background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
      pointerEvents: 'none', zIndex: 3,
    }} />
  );
}

function GlassInnerGlow({ color = 'rgba(255,255,255,0.06)' }: { color?: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
      background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
      pointerEvents: 'none', zIndex: 0, borderRadius: 'inherit',
    }} />
  );
}

function GlassSheen() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, transparent 60%, rgba(0,0,0,0.05) 100%)',
      pointerEvents: 'none', zIndex: 0, borderRadius: 'inherit',
    }} />
  );
}

/* ─── AMBIENT BLOBS ───────────────────────────────────────────────────────── */
function AmbientBlobs({ cyan = true }: { cyan?: boolean }) {
  return (
    <>
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: '650px', height: '650px',
        background: `radial-gradient(circle, ${cyan ? 'rgba(0,160,255,0.38)' : 'rgba(130,70,255,0.34)'} 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0, filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '5%',
        width: '550px', height: '550px',
        background: `radial-gradient(circle, ${cyan ? 'rgba(110,60,255,0.30)' : 'rgba(0,160,255,0.28)'} 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0, filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: '20%',
        width: '400px', height: '400px',
        background: `radial-gradient(circle, ${cyan ? 'rgba(0,220,255,0.20)' : 'rgba(180,100,255,0.18)'} 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0, filter: 'blur(60px)',
      }} />
    </>
  );
}

/* ─── SERVICE ICONS (SVG) ─────────────────────────────────────────────────── */
const SERVICE_ICONS = [
  // Ownership Structuring — org/hierarchy network
  (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="1" width="6" height="5" rx="1.5"/>
      <line x1="12" y1="6" x2="12" y2="10"/>
      <line x1="4.5" y1="10" x2="19.5" y2="10"/>
      <line x1="4.5" y1="10" x2="4.5" y2="13"/>
      <line x1="19.5" y1="10" x2="19.5" y2="13"/>
      <rect x="1.5" y="13" width="6" height="5" rx="1.5"/>
      <rect x="16.5" y="13" width="6" height="5" rx="1.5"/>
    </svg>
  ),
  // Asset Management — building/property
  (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M5 21V7.5L12 3l7 4.5V21"/>
      <rect x="9" y="13" width="2.5" height="8"/>
      <rect x="12.5" y="13" width="2.5" height="8"/>
      <rect x="8.5" y="8.5" width="2" height="2" rx="0.4"/>
      <rect x="13.5" y="8.5" width="2" height="2" rx="0.4"/>
    </svg>
  ),
  // Development & Investment — trending growth
  (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 8.5 11 13 15.5 21 7"/>
      <polyline points="16 7 21 7 21 12"/>
      <line x1="3" y1="21" x2="21" y2="21"/>
    </svg>
  ),
];

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */
const HOME_SERVICES = [
  { id:"structuring", label:"Ownership Structuring & Governance", color:"var(--cyan)",
    body:"Organising ownership frameworks and decision-making structures for long-term clarity and control." },
  { id:"asset-management", label:"Real Estate Asset Management", color:"#8A5CFF",
    body:"Managing portfolios through leasing, operations, and maintenance to preserve and enhance value." },
  { id:"development", label:"Development & Investment", color:"#4D8DFF",
    body:"Identifying and executing opportunities for expansion, repositioning, and sustainable growth." },
];

const REGULATORS = [
  { name: "AWQAF", img: "/Regulatory%20Authorities/AWQAF%20LOGO.png" },
  { name: "EHKAAM", img: "/Regulatory%20Authorities/EHKAAM%20LOGO.png" },
  { name: "Ministry of Housing", img: "/Regulatory%20Authorities/Ministry%20of%20Housing%20Logo.png" },
  { name: "Real Estate General Authority", img: "/Regulatory%20Authorities/REAL%20ESTATE%20GENERAL%20AUTHORITY%20LOGO.png" },
  { name: "State Property General Authority", img: "/Regulatory%20Authorities/STATE%20PROPERTY%20OF%20GENERAL%20AUTHORITY%20LOGO.png" },
];

const SERVICES_DETAIL = [
  {
    num:"01", title:"Ownership Structuring & Governance", color:"var(--cyan)",
    clients:[
      { label:"Corporates", body:"Structuring ownership arrangements and organizing relationships between shareholders, partners, and investors to ensure clear authority, effective decision-making, and long-term business sustainability." },
      { label:"Endowments", body:"Establishing governance frameworks for endowment assets that support the fulfillment of endowment objectives, strengthen oversight, and ensure continuity across generations." },
      { label:"Individuals & Families", body:"Organizing personal assets and investments within a structured framework that supports governance, informed decision-making, and long-term planning." },
    ],
  },
  {
    num:"02", title:"Real Estate Asset Management", color:"#8A5CFF",
    clients:[
      { label:"Corporates", body:"Managing real estate portfolios through leasing, operations, maintenance, and collections to preserve asset value and enhance operational performance." },
      { label:"Endowments", body:"Managing and operating endowment assets to maximize their benefit while preserving value and ensuring long-term sustainability in line with the endowment's objectives." },
      { label:"Individuals & Families", body:"Managing personal and investment properties through a structured approach that provides performance visibility, protects asset value, and enhances returns." },
    ],
  },
  {
    num:"03", title:"Development & Investment", color:"#4D8DFF",
    clients:[
      { label:"Corporates", body:"Identifying opportunities for expansion, development, and asset repositioning to support growth and maximize investment returns." },
      { label:"Endowments", body:"Evaluating and developing endowment assets through sustainable investment opportunities that strengthen long-term impact and value creation." },
      { label:"Individuals & Families", body:"Assessing investment opportunities and identifying the most suitable path for development, retention, or exit in line with long-term financial objectives." },
    ],
  },
];

const AREAS = ["Ownership Structuring & Governance","Real Estate Asset Management","Development & Investment","General Enquiry"];

const WATERMARK = (
  <div aria-hidden="true" style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
    <img src="/Logo.png" alt="" style={{width:"55%",maxWidth:"580px",height:"auto",opacity:0.03,filter:"brightness(10) saturate(0)",userSelect:"none"}}/>
  </div>
);

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
export default function Home() {
  const [form, setForm] = useState({name:"",email:"",entity:"",reason:"",message:""});
  const [focus, setFocus] = useState<string|null>(null);
  const [sent, setSent] = useState(false);
  const [hoveredService, setHoveredService] = useState<number|null>(null);
  const [hoveredValue, setHoveredValue] = useState<number|null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({target:heroRef,offset:["start start","end start"]});
  const heroOpacity = useTransform(scrollYProgress,[0,.6],[1,0]);
  const heroY = useTransform(scrollYProgress,[0,1],["0%","20%"]);

  const wwaRef = useRef<HTMLDivElement>(null);
  const wwaVisible = useInView(wwaRef, { once: true, margin: "-20px" });

  const inp = (field:string):React.CSSProperties => ({
    width:"100%",
    background: focus===field ? 'rgba(0, 200, 255, 0.08)' : 'rgba(255, 255, 255, 0.06)',
    backdropFilter:"blur(20px)",
    WebkitBackdropFilter:"blur(20px)",
    border:`1px solid ${focus===field?"rgba(0, 220, 255, 0.45)":"rgba(255, 255, 255, 0.15)"}`,
    borderRadius:12,
    color:"#ffffff",
    padding:"12px 16px",
    fontSize:16,
    outline:"none",
    fontFamily:"'Inter',sans-serif",
    transition:"all 0.25s ease",
    boxShadow: focus===field
      ? '0 0 0 3px rgba(0,200,255,0.10), inset 0 1px 0 rgba(0,220,255,0.20)'
      : 'inset 0 1px 0 rgba(255,255,255,0.10)',
  });

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Introduction Request — QMULATE");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nFamily / Entity: ${form.entity}\nArea of Interest: ${form.reason}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:enquiries@qmulate.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="hero-page" style={{position:"relative"}}>
      <PageBackground variant="home"/>

      {/* ════════════════════════════════════════════════════════
          1. HERO
          ════════════════════════════════════════════════════════ */}
      <section id="home" ref={heroRef} style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)"}}>
        <ScanLine />
        {WATERMARK}
        <motion.div style={{position:"absolute",inset:0,y:heroY}} className="will-change-transform">
          <ArchitecturalBg variant="mixed"/>
        </motion.div>
        <motion.div style={{position:"relative",zIndex:10,width:"100%",maxWidth:1240,padding:"0 clamp(20px,4vw,48px)",opacity:heroOpacity}}>
          <HeroGlass style={{borderRadius:36,padding:"clamp(44px,6vw,80px)"}}>
            <div style={{position:"relative",width:"100%"}}>
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.6}} style={{marginBottom:32}}>
                <Logo3D size={220}/>
              </motion.div>
              <motion.h1 initial={{opacity:0,y:30,scale:.95}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.8,duration:1.1,ease:[.25,.46,.45,.94]}} className="t-d gt-w" style={{marginBottom:20,fontSize:"clamp(36px,4.5vw,68px)",lineHeight:1.05,letterSpacing:"-0.02em",marginTop:16,width:"100%"}}>
                Transforming Ownership into Enduring Value.
              </motion.h1>
              <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}} className="t-xl" style={{color:"var(--text-3)",maxWidth:"100%",marginBottom:44,lineHeight:1.75}}>
                A fully integrated real estate platform for families, businesses, and individuals, dedicated to managing assets, preserving value, and enabling sustainable long-term growth.
              </motion.p>
              <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.15,duration:.7}} style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                <a href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 34px"}}>Request an introduction →</a>
                <a href="#about" className="btn btn-ghost" style={{fontSize:15,padding:"14px 30px"}}>Our approach</a>
              </motion.div>
            </div>
          </HeroGlass>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. REGULATORY AUTHORITIES
          TODO: Replace the three placeholder cards below with actual regulatory
          authority logos when provided by the client.
          ════════════════════════════════════════════════════════ */}
      <section style={{background:"var(--bg-alt)",backdropFilter:"blur(40px)",borderTop:"1px solid var(--glass-border)",borderBottom:"1px solid var(--glass-border)",position:"relative",overflow:"hidden"}}>
        <ScanLine />
        <AmbientBlobs cyan={true} />
        <div className="container" style={{padding:"clamp(48px,6vw,80px) 0",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(32px,4vw,48px)"}}>
            <div className="t-xs" style={{color:"var(--cyan)",marginBottom:12}}>REGULATORY AUTHORITIES</div>
            <h2 className="t-h2" style={{color:"var(--text-1)"}}>Licensed and Regulated.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(220px,100%),1fr))",gap:"clamp(16px,2vw,24px)"}}>
            {REGULATORS.map((r,i)=>(
              <motion.div key={r.name} {...FU(i*0.07)} style={{position:"relative",paddingBottom:22}}>
                {/* 3D depth shadows — strictly below the card */}
                <div style={{position:"absolute",left:"4%",right:"4%",bottom:4,height:"80%",borderRadius:20,background:"rgba(0,0,0,0.40)",filter:"blur(12px)",zIndex:0,pointerEvents:"none"}}/>
                <div style={{position:"absolute",left:"8%",right:"8%",bottom:0,height:"60%",borderRadius:20,background:"rgba(0,0,0,0.25)",filter:"blur(20px)",zIndex:0,pointerEvents:"none"}}/>
                {/* Light frosted card */}
                <div style={{...glassLight3D,padding:"clamp(28px,3vw,44px) clamp(16px,2vw,28px)",textAlign:"center",position:"relative",zIndex:1,overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:160}}>
                  {/* Top highlight */}
                  <div style={{position:"absolute",top:0,left:0,right:0,height:"1.5px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.55) 30%,rgba(255,255,255,0.75) 50%,rgba(255,255,255,0.55) 70%,transparent)",zIndex:3,pointerEvents:"none"}}/>
                  <div style={{position:"relative",zIndex:2,width:"100%"}}>
                    <div style={{height:150,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.img} alt={r.name} style={{maxHeight:(i===0||i===4)?145:120,maxWidth:(i===0||i===4)?"100%":"90%",width:(i===0||i===4)?"100%":undefined,objectFit:"contain",transform:(i===0||i===4)?"scale(1.35)":"none",transformOrigin:"center center",filter:"brightness(1.1) drop-shadow(0 2px 16px rgba(0,160,255,0.35))"}}/>
                    </div>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.10em",textTransform:"uppercase",color:"rgba(255,255,255,0.88)",lineHeight:1.4}}>{r.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. WHO WE ARE
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ScanLine />
        <ArchitecturalBg variant="strata-left"/>
        <AmbientBlobs cyan={false} />
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="WHO WE ARE" title={<>An integrated real estate platform.</>} subtitle="We provide an integrated approach to real estate asset management and ownership structuring, helping clients manage their assets through clear governance, effective management, and a long-term perspective."/>
            </div>
            <motion.div
              ref={wwaRef}
              initial="hidden"
              animate={wwaVisible ? "visible" : "hidden"}
              variants={{ visible: { transition: { staggerChildren: 0.35 } } }}
              style={{position:"relative",display:"flex",flexDirection:"column"}}
            >
              {[
                {label:"Ownership Structuring", sub:"Clear frameworks · Decision governance · Long-term clarity", color:"var(--cyan)"},
                {label:"Asset Management",       sub:"Leasing · Operations · Maintenance · Value preservation",  color:"#8A5CFF"},
                {label:"Development & Investment",sub:"Expansion · Repositioning · Sustainable growth",          color:"#4D8DFF"},
              ].map((layer, i) => (
                <motion.div
                  key={layer.label}
                  variants={{
                    hidden:  { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
                  }}
                >
                  <div style={{...glass, padding:"20px 24px", borderLeft:`2px solid ${layer.color}66`}}>
                    <GlassHighlight /><GlassLeftEdge /><GlassInnerGlow /><GlassSheen />
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2}}>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:"#ffffff",marginBottom:4}}>{layer.label}</div>
                        <div className="t-xs" style={{color:"rgba(255,255,255,0.82)",textTransform:"none",letterSpacing:0,fontSize:12}}>{layer.sub}</div>
                      </div>
                      <div style={{width:12,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,flexShrink:0}}/>
                    </div>
                  </div>
                  {i < 2 && (
                    <motion.div
                      variants={{
                        hidden:  { scaleY: 0, opacity: 0 },
                        visible: { scaleY: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.45 } },
                      }}
                      style={{display:"flex",flexDirection:"column",alignItems:"center",transformOrigin:"top",overflow:"hidden"}}
                    >
                      <div style={{width:2,height:32,background:"linear-gradient(180deg,rgba(0,220,255,0.8) 0%,rgba(0,180,255,0.3) 100%)",boxShadow:"0 0 6px rgba(0,220,255,0.5)",borderRadius:2}}/>
                      <div style={{width:6,height:6,borderRadius:"50%",background:"rgba(0,220,255,0.7)",boxShadow:"0 0 8px rgba(0,220,255,0.6)"}}/>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. SERVICES PREVIEW
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ScanLine />
        <ArchitecturalBg variant="lattice"/>
        <AmbientBlobs cyan={true} />
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading wide eyebrow="OUR SERVICES" title="Structured for every type of ownership." subtitle="Our services cover the key aspects of real estate ownership, from structuring and governance to asset management, development, and investment, tailored to the unique needs of corporates, endowments, and individuals."/>
          </div>
          <div className="grid-3" style={{gap:"clamp(16px,2vw,24px)",marginBottom:"clamp(32px,4vw,48px)"}}>
            {HOME_SERVICES.map((s,i)=>(
              <motion.div key={s.id} {...FU(i*0.06)}>
                <div
                  style={{...glass,...(hoveredService===i?glassHoverCyan:{}),padding:"clamp(24px,3vw,40px)",height:"100%"}}
                  onMouseEnter={()=>setHoveredService(i)}
                  onMouseLeave={()=>setHoveredService(null)}
                >
                  <GlassHighlight />
                  <GlassLeftEdge />
                  <GlassInnerGlow />
                  <GlassSheen />
                  <div style={{position:"relative",zIndex:2}}>
                    <div style={{
                      width:48, height:48, borderRadius:14, marginBottom:20,
                      background:'rgba(255,255,255,0.07)',
                      backdropFilter:'blur(20px) saturate(160%)',
                      WebkitBackdropFilter:'blur(20px) saturate(160%)',
                      border:`1px solid ${s.color}55`,
                      boxShadow:`inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 16px rgba(0,0,0,0.40), 0 0 16px ${s.color}22`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      position:'relative', overflow:'hidden',
                    }}>
                      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,${s.color}99,rgba(255,255,255,0.45),transparent)`,zIndex:2}}/>
                      <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 50% 0%,${s.color}25 0%,transparent 70%)`,zIndex:0}}/>
                      <span style={{position:'relative',zIndex:1,filter:`drop-shadow(0 0 8px ${s.color}) drop-shadow(0 0 18px ${s.color}66)`}}>{SERVICE_ICONS[i](s.color)}</span>
                    </div>
                    <h3 style={{fontSize:16,fontWeight:700,color:"#ffffff",marginBottom:12,lineHeight:1.3}}>{s.label}</h3>
                    <p className="t-sm" style={{color:"rgba(255,255,255,0.82)",lineHeight:1.75}}>{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            <a href="#services" className="btn btn-ghost" style={{fontSize:15,padding:"14px 32px"}}>View all services →</a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. ABOUT
          ════════════════════════════════════════════════════════ */}
      <section id="about" style={{scrollMarginTop:64,position:"relative",overflow:"hidden"}} className="section">
        <ScanLine />
        <ArchitecturalBg variant="fins"/>
        {WATERMARK}
        <AmbientBlobs cyan={false} />
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c"><span className="dot-live"/>About</span>
          </motion.div>
          <motion.h2 {...FU(.08)} className="t-h1 gt-w" style={{marginBottom:24}}>
            We believe real estate is more than an asset.
          </motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:"100%",lineHeight:1.8,marginBottom:"clamp(48px,6vw,72px)"}}>
            We believe real estate is more than an asset to be owned—it is a value to be preserved, managed, and grown through informed stewardship and a long-term perspective. That is why we provide an integrated real estate platform that combines asset management, governance, and development, helping families, businesses, and individuals protect the value of their assets, enhance performance, and ensure sustainable growth over time.
          </motion.p>

          {/* Vision / Mission */}
          <div className="grid-2" style={{gap:"clamp(24px,3vw,40px)",marginBottom:"clamp(40px,5vw,64px)"}}>
            {[
              {label:"VISION",color:"var(--cyan)",title:"A trusted partner across generations.",body:"To be a trusted partner for families, businesses, and individuals in structuring real estate ownership, managing assets, and turning them into sustainable opportunities that preserve value and support growth across generations."},
              {label:"MISSION",color:"#8A5CFF",title:"Governed frameworks that endure.",body:"We develop and manage real estate assets through clear governance and management frameworks that preserve value, enhance returns, and support long-term investment sustainability."},
            ].map((item,i)=>(
              <motion.div key={item.label} {...FU(i*.1)}>
                <div style={{...(i===0?glassCyan:glassPurple), padding:"clamp(32px,4vw,52px)", height:"100%"}}>
                  <GlassHighlight color={i===0?"rgba(0,220,255,0.35)":"rgba(160,110,255,0.35)"} />
                  <GlassLeftEdge color={i===0?"rgba(0,220,255,0.18)":"rgba(150,100,255,0.18)"} />
                  <GlassInnerGlow color={i===0?"rgba(0,200,255,0.08)":"rgba(120,80,255,0.10)"} />
                  <GlassSheen />
                  <div style={{position:"relative",zIndex:2}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                      <span className="t-xs" style={{color:item.color}}>{item.label}</span>
                      <div style={{flex:1,height:1,background:`linear-gradient(90deg,${item.color}44,transparent)`}}/>
                    </div>
                    <h3 className="t-h3" style={{color:"#ffffff",marginBottom:16,lineHeight:1.3}}>{item.title}</h3>
                    <p className="t-md" style={{color:"rgba(255,255,255,0.82)",lineHeight:1.85}}>{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div style={{textAlign:"center",marginBottom:16}}>
            <div className="t-xs" style={{color:"var(--text-4)",marginBottom:"clamp(24px,3vw,36px)"}}>VALUES</div>
          </div>
          <div className="grid-3" style={{gap:"clamp(16px,2vw,24px)"}}>
            {[
              {title:"Compound",body:"Let structure, not noise, drive returns over decades.",color:"var(--cyan)",icon:"◈"},
              {title:"Protect",body:"Govern for the downside; preserve before we grow.",color:"#8A5CFF",icon:"⬡"},
              {title:"Transfer",body:"Carry intent — not just assets — between generations.",color:"#4D8DFF",icon:"◉"},
            ].map((v,i)=>(
              <motion.div key={v.title} {...FU(i*.1)}>
                <div
                  style={{...(i===1?glassPurple:glass),...(hoveredValue===i?(i===1?glassHoverPurple:glassHoverCyan):{}),padding:"clamp(28px,3.5vw,44px)",textAlign:"center",height:"100%"}}
                  onMouseEnter={()=>setHoveredValue(i)}
                  onMouseLeave={()=>setHoveredValue(null)}
                >
                  <GlassHighlight color={i===1?"rgba(160,110,255,0.28)":"rgba(255,255,255,0.22)"} />
                  <GlassLeftEdge />
                  <GlassInnerGlow color={i===1?"rgba(120,80,255,0.08)":"rgba(255,255,255,0.05)"} />
                  <GlassSheen />
                  <div style={{position:"relative",zIndex:2}}>
                    {/* Glass icon badge */}
                    <div style={{
                      width:64, height:64, borderRadius:18, margin:"0 auto 20px",
                      background:`rgba(255,255,255,0.07)`,
                      backdropFilter:'blur(20px) saturate(160%)',
                      WebkitBackdropFilter:'blur(20px) saturate(160%)',
                      border:`1px solid ${v.color}55`,
                      boxShadow:`inset 0 1px 0 rgba(255,255,255,0.35), inset 1px 0 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.50), 0 0 20px ${v.color}22`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      position:'relative', overflow:'hidden',
                    }}>
                      {/* Badge top highlight */}
                      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,${v.color}99,rgba(255,255,255,0.5),${v.color}99,transparent)`,zIndex:2}}/>
                      {/* Badge inner glow */}
                      <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 50% 0%, ${v.color}22 0%, transparent 70%)`,zIndex:0}}/>
                      <span style={{fontSize:26,color:v.color,filter:`drop-shadow(0 0 10px ${v.color}) drop-shadow(0 0 20px ${v.color}66)`,position:'relative',zIndex:1}}>{v.icon}</span>
                    </div>
                    <h3 style={{fontSize:18,fontWeight:700,color:"#ffffff",marginBottom:12}}>{v.title}</h3>
                    <p className="t-sm" style={{color:"rgba(255,255,255,0.82)",lineHeight:1.75}}>{v.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. SERVICES DETAIL
          ════════════════════════════════════════════════════════ */}
      <section id="services" style={{scrollMarginTop:64,position:"relative",overflow:"hidden"}}>
        <ScanLine />
        <div style={{background:"var(--bg-alt)",padding:"clamp(60px,8vw,96px) 0",position:"relative"}}>
          <ArchitecturalBg variant="mixed"/>
          <div className="container" style={{position:"relative",zIndex:1}}>
            <motion.div {...FI()} style={{marginBottom:24}}>
              <span className="pill pill-c"><span className="dot-live"/>Services</span>
            </motion.div>
            <motion.h2 {...FU(.08)} className="t-h1 gt-w" style={{marginBottom:24}}>
              Structured for every type of ownership.
            </motion.h2>
            <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:"100%",lineHeight:1.8,marginBottom:0}}>
              Our services cover the key aspects of real estate ownership, from structuring and governance to asset management, development, and investment.
            </motion.p>
          </div>
        </div>

        {SERVICES_DETAIL.map((svc,si)=>(
          <div key={svc.num} style={{background:"var(--bg-0)",position:"relative",overflow:"hidden"}}>
            {/* ── Section-specific glassmorphism orb backgrounds ── */}
            {si===0 && <>
              {/* Style A: cyan + purple floating orbs */}
              <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
                <div style={{position:"absolute",top:"-5%",left:"-5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,210,255,0.55) 0%,rgba(0,160,255,0.25) 40%,transparent 70%)",filter:"blur(60px)"}}/>
                <div style={{position:"absolute",top:"20%",right:"-8%",width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(150,80,255,0.50) 0%,rgba(120,60,240,0.22) 40%,transparent 70%)",filter:"blur(55px)"}}/>
                <div style={{position:"absolute",bottom:"-10%",left:"35%",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,200,255,0.40) 0%,transparent 65%)",filter:"blur(48px)"}}/>
                <div style={{position:"absolute",top:"50%",left:"15%",width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(120,60,255,0.45) 0%,transparent 70%)",filter:"blur(30px)"}}/>
              </div>
            </>}
            {si===1 && <>
              {/* Style B: large purple + teal orbs */}
              <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
                <div style={{position:"absolute",top:"-8%",left:"-6%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(150,80,255,0.58) 0%,rgba(120,50,240,0.28) 40%,transparent 70%)",filter:"blur(65px)"}}/>
                <div style={{position:"absolute",bottom:"-5%",right:"-5%",width:440,height:440,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,210,190,0.48) 0%,rgba(0,180,160,0.22) 40%,transparent 70%)",filter:"blur(58px)"}}/>
                <div style={{position:"absolute",top:"35%",left:"42%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(190,80,255,0.38) 0%,transparent 68%)",filter:"blur(36px)"}}/>
                <div style={{position:"absolute",top:"10%",right:"22%",width:160,height:160,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,230,200,0.42) 0%,transparent 70%)",filter:"blur(26px)"}}/>
              </div>
            </>}
            {si===2 && <>
              {/* Style C: deep blue + indigo spheres */}
              <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
                <div style={{position:"absolute",top:"-5%",right:"-5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(60,130,255,0.55) 0%,rgba(40,100,240,0.28) 40%,transparent 70%)",filter:"blur(62px)"}}/>
                <div style={{position:"absolute",bottom:"-8%",left:"-6%",width:460,height:460,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,190,255,0.48) 0%,rgba(0,160,240,0.22) 40%,transparent 70%)",filter:"blur(55px)"}}/>
                <div style={{position:"absolute",top:"30%",left:"30%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(80,80,240,0.42) 0%,transparent 68%)",filter:"blur(44px)"}}/>
                <div style={{position:"absolute",top:"15%",left:"8%",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(100,210,255,0.38) 0%,transparent 70%)",filter:"blur(30px)"}}/>
              </div>
            </>}
            <div className="container" style={{position:"relative",zIndex:1,padding:"clamp(48px,6vw,80px) 0"}}>
              <motion.div {...FI()} style={{marginBottom:12}}>
                <span style={{...glassPill,display:"inline-block",padding:"4px 14px",color:svc.color,fontFamily:"monospace",fontSize:12,letterSpacing:"0.10em"}}>
                  {svc.num}
                </span>
              </motion.div>
              <motion.h3 {...FU(.06)} className="t-h2" style={{color:"var(--text-1)",marginBottom:"clamp(40px,5vw,64px)",borderLeft:`3px solid ${svc.color}`,paddingLeft:20}}>
                {svc.title}
              </motion.h3>
              <motion.div
                className="grid-3"
                style={{gap:"clamp(20px,2.5vw,32px)"}}
                initial="hidden"
                whileInView="visible"
                viewport={{once:true, margin:"-30px", amount:0.1}}
                variants={{visible:{transition:{staggerChildren:0.1}}}}
              >
                {svc.clients.map((c,ci)=>(
                  <motion.div
                    key={c.label}
                    variants={{
                      hidden:  {opacity:0, x:-40},
                      visible: {opacity:1, x:0, transition:{duration:0.35, ease:[0.25,0.46,0.45,0.94]}},
                    }}
                    style={{position:"relative",paddingBottom:22}}
                  >
                    <div style={{position:"absolute",left:"4%",right:"4%",bottom:4,height:"80%",borderRadius:20,background:"rgba(0,0,0,0.40)",filter:"blur(12px)",zIndex:0,pointerEvents:"none"}}/>
                    <div style={{position:"absolute",left:"8%",right:"8%",bottom:0,height:"60%",borderRadius:20,background:"rgba(0,0,0,0.25)",filter:"blur(20px)",zIndex:0,pointerEvents:"none"}}/>
                    <div style={{...glassLight3D, padding:"clamp(24px,3vw,40px)", height:"100%", position:"relative", zIndex:1}}>
                      <div style={{position:"absolute",top:0,left:0,right:0,height:"1.5px",background:`linear-gradient(90deg,transparent,rgba(255,255,255,0.55) 30%,rgba(255,255,255,0.75) 50%,rgba(255,255,255,0.55) 70%,transparent)`,zIndex:3,pointerEvents:"none"}}/>
                      <div style={{position:"relative",zIndex:2}}>
                        <div style={{fontSize:11,color:svc.color,fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:16,filter:`drop-shadow(0 0 6px ${svc.color}88)`}}>{c.label}</div>
                        <p className="t-sm" style={{color:"rgba(255,255,255,0.90)",lineHeight:1.85}}>{c.body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════════════════════════
          7. CONTACT
          ════════════════════════════════════════════════════════ */}
      <section id="contact" style={{scrollMarginTop:64,position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 60%,var(--bg-0) 100%)"}}>
        <ScanLine />
        <ArchitecturalBg variant="strata-right"/>
        <AmbientBlobs cyan={true} />
        <div className="container" style={{position:"relative",zIndex:1,padding:"clamp(80px,10vw,120px) 0"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:"clamp(48px,6vw,96px)",alignItems:"start"}} className="grid-2">

            {/* ── Left column ── */}
            <div>
              <motion.div {...FI()} style={{marginBottom:24}}>
                <span className="pill pill-c"><span className="dot-live"/>CONTACT</span>
              </motion.div>
              <motion.h2 {...FU(.08)} className="t-h2 gt-w" style={{marginBottom:40,lineHeight:1.1}}>
                Private introductions only.
              </motion.h2>

              <motion.div {...FU(.14)} style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {Icon:LocationIcon,  label:"OFFICE",          value:"Jeddah, Saudi Arabia",          href:undefined},
                  {Icon:EmailIcon,     label:"ENQUIRIES",       value:"enquiries@qmulate.com",          href:"mailto:enquiries@qmulate.com"},
                  {Icon:null,          label:"PHONE",           value:"+966 53 333 9052",               href:"tel:+966533339052"},
                  {Icon:LockIcon,      label:"CONFIDENTIALITY", value:"All introductions are private",  href:undefined},
                  {Icon:ClockIcon,     label:"RESPONSE TIME",   value:"Within one business day",        href:undefined},
                ].map(({Icon,label,value,href})=>(
                  <div key={label} style={{...glassPill, padding:"16px 20px"}}>
                    <GlassHighlight color="rgba(255,255,255,0.20)" />
                    <div style={{display:"flex",gap:16,alignItems:"flex-start",position:"relative",zIndex:2}}>
                      <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {Icon ? <Icon size="sm"/> : <span style={{fontSize:15}}>📞</span>}
                      </div>
                      <div>
                        <div className="t-xs" style={{color:"var(--text-4)",marginBottom:4}}>{label}</div>
                        {href
                          ? <a href={href} style={{fontSize:14,color:"var(--cyan)",fontWeight:500}}>{value}</a>
                          : <div style={{fontSize:14,color:"rgba(255,255,255,0.82)",fontWeight:500}}>{value}</div>
                        }
                      </div>
                    </div>
                  </div>
                ))}

                {/* Address */}
                <div style={{...glassPill, padding:"16px 20px"}}>
                  <GlassHighlight color="rgba(255,255,255,0.20)" />
                  <div style={{position:"relative",zIndex:2}}>
                    <div className="t-xs" style={{color:"var(--text-4)",marginBottom:4}}>ADDRESS</div>
                    <p style={{fontSize:13,color:"rgba(255,255,255,0.82)",lineHeight:1.7}}>
                      King Abdulaziz Rd, Albasatin Dist.<br/>
                      P.O. Box 23718, Jeddah 9351<br/>
                      Kingdom of Saudi Arabia
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.p {...FU(.32)} style={{fontSize:11,color:"var(--text-5)",marginTop:28,fontFamily:"var(--font-geist-mono,'Courier New'),monospace"}}>
                Privileged &amp; Confidential · CR: 7054453274 · VAT: 314819612900003
              </motion.p>
            </div>

            {/* ── Right column — form ── */}
            <motion.div {...FU(.1)}>
              <div style={{...glassHeavy, padding:"clamp(32px,4vw,52px)"}}>
                <GlassHighlight color="rgba(255,255,255,0.30)" />
                <GlassLeftEdge color="rgba(255,255,255,0.15)" />
                <GlassInnerGlow color="rgba(255,255,255,0.07)" />
                <GlassSheen />
                <div style={{position:"relative",zIndex:2}}>
                  <div className="t-xs" style={{color:"var(--cyan)",marginBottom:28}}>INTRODUCTION REQUEST</div>

                  {sent ? (
                    <div style={{textAlign:"center",padding:"40px 0"}}>
                      <div style={{fontSize:32,marginBottom:16}}>✓</div>
                      <h3 style={{fontSize:20,fontWeight:700,color:"#ffffff",marginBottom:8}}>Request sent.</h3>
                      <p style={{fontSize:14,color:"rgba(255,255,255,0.82)"}}>We will be in touch within one business day.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:16}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}} className="form-grid">
                        <div>
                          <label style={{fontSize:11,color:"var(--text-4)",display:"block",marginBottom:6}}>FULL NAME *</label>
                          <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                            onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)}
                            style={inp("name")} placeholder="Your full name"/>
                        </div>
                        <div>
                          <label style={{fontSize:11,color:"var(--text-4)",display:"block",marginBottom:6}}>EMAIL ADDRESS *</label>
                          <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
                            onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)}
                            style={inp("email")} placeholder="you@example.com"/>
                        </div>
                      </div>
                      <div>
                        <label style={{fontSize:11,color:"var(--text-4)",display:"block",marginBottom:6}}>FAMILY / ENTITY NAME</label>
                        <input value={form.entity} onChange={e=>setForm(f=>({...f,entity:e.target.value}))}
                          onFocus={()=>setFocus("entity")} onBlur={()=>setFocus(null)}
                          style={inp("entity")} placeholder="Family name or organisation"/>
                      </div>
                      <div>
                        <label style={{fontSize:11,color:"var(--text-4)",display:"block",marginBottom:6}}>AREA OF INTEREST</label>
                        <select value={form.reason} onChange={e=>setForm(f=>({...f,reason:e.target.value}))}
                          onFocus={()=>setFocus("reason")} onBlur={()=>setFocus(null)}
                          style={{...inp("reason"),appearance:"none",cursor:"pointer"}}>
                          <option value="">Select an area</option>
                          {AREAS.map(a=><option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{fontSize:11,color:"var(--text-4)",display:"block",marginBottom:6}}>MESSAGE *</label>
                        <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                          onFocus={()=>setFocus("message")} onBlur={()=>setFocus(null)}
                          style={{...inp("message"),resize:"vertical",minHeight:120}} rows={5}
                          placeholder="Tell us about your portfolio and objectives"/>
                      </div>
                      <button type="submit" className="btn btn-primary btn-submit-full" style={{fontSize:15,padding:"14px",justifyContent:"center",width:"100%"}}>
                        Send introduction →
                      </button>
                      <p style={{fontSize:11,color:"var(--text-5)",textAlign:"center",lineHeight:1.6}}>
                        All introductions are private and confidential. We do not share your information.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.hero-grid,.grid-2,.form-grid{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
