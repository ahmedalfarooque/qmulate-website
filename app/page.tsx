"use client";
import { ServiceIcon, CapabilityIcon } from "@/components/icons/GlassIcons";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FU, FI, FS, FL, SectionHeading, GlassCard, FeatureCard,
  HeroGlass, Divider
} from "@/components/DS";
import {
  ArchitecturalBg, ArchitecturalBgLight, StrataStack, StrataLines,
  GovernancePulse, GlassFacade, VerticalFins, StructuralLattice,
  StrataSculpture, BRAND_BLUE
} from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";
import { GlassIcon } from "@/components/GlassIcon";

/* ── Service tabs ── */
const SERVICES = [
  { id:"stewardship", label:"Property Stewardship", icon:"◈", color:"var(--cyan)",
    title:"Professional oversight that preserves value across every cycle.",
    desc:"We manage your real estate portfolio as a unified, governed system — not a collection of fragmented assets. From daily operations to strategic positioning, every decision is made within a documented governance framework.",
    items:["Unified portfolio governance","Quarterly performance reporting","Multi-custodian consolidation","Benchmark attribution","Regulatory compliance","Strategic asset positioning"] },
  { id:"growth", label:"Governed Growth", icon:"⬡", color:"#8A5CFF",
    title:"Disciplined capital deployment within structural guardrails.",
    desc:"Growth without governance is speculation. We design investment mandates, acquisition criteria, and capital deployment frameworks that enable ambitious growth while maintaining structural integrity across market cycles.",
    items:["Investment mandate design","Capital deployment frameworks","Entity structure optimisation","Cross-border holding structures","Succession-proof architecture","Tax-efficient wrapper design"] },
  { id:"advisory", label:"Property Advisory", icon:"◉", color:"#4D8DFF",
    title:"Market intelligence converted into decisive action.",
    desc:"We convert raw market data into structured investment decisions. Our advisory practice covers deal origination, due diligence, valuation, and transaction execution — always governed by the family's long-term mandate.",
    items:["Deal origination & screening","Independent valuation","Due diligence management","Transaction governance","Market intelligence reports","Vendor & counterparty assessment"] },
  { id:"reporting", label:"Wealth Reporting", icon:"⬟", color:"#A855F7",
    title:"Complete visibility across every holding, every quarter.",
    desc:"Principals deserve a clear, accurate picture of their wealth. We produce consolidated reporting that covers performance, attribution, risk exposure, and governance compliance — structured for principals, trustees, and advisors.",
    items:["Consolidated quarterly packs","Performance attribution","Risk exposure mapping","Governance compliance reporting","Trustee-grade documentation","Custom dashboard access"] },
];

/* ── Capabilities ── */
const CAPABILITIES = [
  { icon:"🏛️", title:"Governance Architecture", desc:"Entity structures, holding frameworks, and constitutional documents built for permanence.", accent:"#00D4FF" },
  { icon:"📊", title:"Portfolio Intelligence", desc:"Real-time analytics across all holdings — performance, risk, liquidity, and attribution.", accent:"#8A5CFF" },
  { icon:"🔐", title:"Succession Engineering", desc:"Multi-generational ownership structures that carry intent — not just assets — across generations.", accent:"#4D8DFF" },
  { icon:"⚡", title:"AI-Driven Insights", desc:"Machine learning models surfacing anomalies, opportunities, and risk signals before they become events.", accent:"#A855F7" },
  { icon:"🌐", title:"Cross-Border Structures", desc:"Multi-jurisdiction holding frameworks with consolidated reporting and unified governance.", accent:"#FF6EC7" },
  { icon:"🛡️", title:"Risk Management", desc:"Systematic identification, measurement, and mitigation of concentration, liquidity, and market risk.", accent:"#FFB56B" },
];

/* ── Timeline ── */
const TIMELINE = [
  { year:"2019", title:"Foundation", desc:"QMULATE established to govern — not merely manage — real estate wealth across generations." },
  { year:"2020", title:"First Mandate", desc:"Inaugural family office engagement. Multi-custodian consolidation completed within 90 days." },
  { year:"2021", title:"Platform Build", desc:"Proprietary governance platform deployed. Real-time reporting across all asset classes launched." },
  { year:"2023", title:"GCC Expansion", desc:"Expanded advisory practice to UAE and KSA. Regional governance mandates established." },
  { year:"2024", title:"AI Integration", desc:"Machine learning risk engine integrated. Predictive analytics active across portfolio." },
  { year:"2026", title:"Today", desc:"Multiple generational mandates active. Stewardship structures spanning jurisdictions. Platform v7 live.", current:true },
];

/* ── FAQ ── */
const FAQ = [
  { q:"How is QMULATE different from a traditional wealth manager?", a:"We are a governance-first family office, not a product-selling wealth manager. Our mandate is to organise, protect, and transfer wealth — not to generate fee income from product recommendations. We operate fee-only, with no conflicts of interest." },
  { q:"What types of principals do you work with?", a:"We engage with families and principals for whom governance infrastructure is proportionate to their mandate — typically multi-generational real estate wealth requiring structured oversight. Reach out in confidence to discuss whether we are the right fit." },
  { q:"How do you handle multi-jurisdictional structures?", a:"We maintain governance frameworks across KSA, UAE, UK, and key offshore jurisdictions. Each structure is designed for succession clarity, tax efficiency, and operational simplicity — with consolidated reporting in a single view." },
  { q:"What does 'governed growth' mean in practice?", a:"It means every capital deployment decision is made within a pre-approved investment mandate — with documented rationale, risk parameters, and approval governance. Growth happens, but never at the expense of structural integrity." },
];

/* ── Governance Pillars (replaces numerical metrics) ── */
const PILLARS = [
  { label:"Property Stewardship", icon:"◈", color:"#00D4FF", desc:"Every asset governed by a documented policy framework, not individual discretion." },
  { label:"Governed Growth", icon:"⬡", color:"#8A5CFF", desc:"Structures built to outlast principals — transferring wealth and intent across generations." },
  { label:"Long-Term Preservation", icon:"◉", color:"#4D8DFF", desc:"Real-time analytics across all holdings. No surprises. Full transparency." },
  { label:"Generational Continuity", icon:"⬟", color:"#A855F7", desc:"Succession structures built from day one, not as an afterthought." },
];

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number|null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroOpacity = useTransform(scrollYProgress,[0,.6],[1,0]);
  const heroY = useTransform(scrollYProgress,[0,1],["0%","20%"]);

  return (
    <main className="hero-page" style={{ position: 'relative' }}>
      <PageBackground variant="home" />

      {/* ══════════════════════════════════════════════════
          HERO — Full-viewport glass experience
          ══════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)"}}>
        {/* Architectural background layers */}
        <motion.div style={{position:"absolute",inset:0,y:heroY}} className="will-change-transform">
          <ArchitecturalBg variant="mixed"/>
          <div className="bg-grid" style={{opacity:.5}}/>
          <div className="bg-aurora"/>
        </motion.div>

        {/* Hero glass panel */}
        <motion.div style={{position:"relative",zIndex:10,width:"100%",maxWidth:1240,padding:"0 clamp(20px,4vw,48px)",opacity:heroOpacity}}>
          <HeroGlass style={{borderRadius:36,padding:"clamp(44px,6vw,80px)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:"clamp(40px,5vw,80px)",alignItems:"center"}} className="hero-grid">
              {/* Left content */}
              <div>
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}} style={{marginBottom:28}}>
                  <span className="pill pill-c"><span className="dot-live"/>Real Estate Wealth Platform · Riyadh</span>
                </motion.div>

                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.6}} style={{marginBottom:24}}>
                  {/* Glass-framed Logo.png — hero left column */}
                  <div style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px 40px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(91,124,250,0.08) 0%, rgba(0,196,204,0.04) 100%)',
                    border: '1px solid rgba(91,124,250,0.20)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: `
                      0 0 60px rgba(91,124,250,0.15),
                      0 0 120px rgba(91,124,250,0.06),
                      inset 0 1px 0 rgba(255,255,255,0.10),
                      inset 0 -1px 0 rgba(0,0,0,0.20)
                    `,
                  }}>
                    {/* Aura glow behind logo */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      background: 'radial-gradient(ellipse at 40% 40%, rgba(91,124,250,0.18) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}/>
                    {/* Top-left glass shine */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '55%', height: '45%',
                      borderRadius: '20px 20px 0 0',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
                      pointerEvents: 'none',
                    }}/>
                    {/* Moving lightning sweep */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      overflow: 'hidden',
                      pointerEvents: 'none',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '60%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(91,124,250,0.15) 40%, rgba(0,196,204,0.20) 50%, rgba(91,124,250,0.15) 60%, transparent 100%)',
                        animation: 'logo-sweep 4s ease-in-out infinite',
                      }}/>
                    </div>
                    {/* The actual logo image */}
                    <img
                      src="/Logo.png"
                      alt="QMULATE"
                      style={{
                        width: '120px',
                        height: 'auto',
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 1,
                        filter: 'drop-shadow(0 0 20px rgba(91,124,250,0.6)) drop-shadow(0 0 40px rgba(91,124,250,0.25))',
                      }}
                    />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{opacity:0,y:30,scale:.95}} animate={{opacity:1,y:0,scale:1}}
                  transition={{delay:.8,duration:1.1,ease:[.25,.46,.45,.94]}}
                  className="t-d gt-w" style={{marginBottom:20,fontSize:"clamp(44px,6vw,88px)"}}
                >
                  Wealth,<br/>
                  <span className="gt-c">structured</span><br/>
                  to outlast<br/>
                  <span style={{color:"rgba(255,255,255,.25)"}}>its makers.</span>
                </motion.h1>

                <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}} className="t-xl" style={{color:"var(--text-3)",maxWidth:480,marginBottom:12,lineHeight:1.75}}>
                  We organise real estate wealth — property management, brokerage, advisory, and facilities — into one governed, perpetual system.
                </motion.p>

                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.05,duration:.7}}
                  style={{fontFamily:"'IBM Plex Sans Arabic',sans-serif",fontSize:14,color:"rgba(255,255,255,.2)",marginBottom:44,direction:"rtl"}}>
                  ثروة مبنية لتدوم بعد صانعيها.
                </motion.p>

                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.15,duration:.7}}
                  style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:52}}>
                  <Link href="/contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 34px"}}>Request an introduction →</Link>
                  <Link href="/about" className="btn btn-ghost" style={{fontSize:15,padding:"14px 30px"}}>Our approach</Link>
                </motion.div>

                {/* Governance indicators — qualitative, no numbers */}
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:.8}}
                  style={{display:"flex",gap:32,paddingTop:28,borderTop:"1px solid var(--glass-border)"}} className="hero-trust">
                  {[
                    {label:"Property Stewardship",icon:"◈",color:"#00D4FF"},
                    {label:"Governed Growth",icon:"⬡",color:"#8A5CFF"},
                    {label:"Generational Continuity",icon:"◉",color:"#4D8DFF"},
                  ].map(item=>(
                    <div key={item.label}>
                      <div style={{fontSize:"clamp(16px,1.5vw,20px)",fontWeight:800,color:item.color,letterSpacing:"-0.02em",filter:`drop-shadow(0 0 12px ${item.color}66)`,marginBottom:3}}>{item.icon}</div>
                      <div className="t-xs" style={{color:"var(--text-4)"}}>{item.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — 3D Glass Hero Visual */}
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:16}}>
                <motion.div initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{delay:1.0,duration:1.0,ease:[.34,1.56,.64,1]}}>
                  {/* 3D Glass Hero Visual */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '480px',
                    height: '460px',
                    marginLeft: 'auto',
                  }}>

                    {/* ── AURA — zoom-fade-out pulse ── */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '520px', height: '420px', borderRadius: '50%',
                      background: 'radial-gradient(ellipse, rgba(91,124,250,0.28) 0%, rgba(0,196,204,0.10) 40%, transparent 70%)',
                      filter: 'blur(36px)',
                      animation: 'aura-zoom-fade 4s ease-out infinite',
                      pointerEvents: 'none', zIndex: 0,
                    }}/>
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '380px', height: '320px', borderRadius: '50%',
                      background: 'radial-gradient(ellipse, rgba(0,196,204,0.18) 0%, rgba(91,124,250,0.06) 50%, transparent 75%)',
                      filter: 'blur(28px)',
                      animation: 'aura-zoom-fade 4s ease-out infinite',
                      animationDelay: '2s',
                      pointerEvents: 'none', zIndex: 0,
                    }}/>

                    {/* ── LIGHTNING LINES ── */}
                    <div style={{
                      position: 'absolute', top: '22%', left: 0, right: 0, height: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(91,124,250,0.6) 30%, rgba(0,196,204,1) 50%, rgba(91,124,250,0.6) 70%, transparent 100%)',
                      boxShadow: '0 0 10px rgba(0,196,204,0.9), 0 0 24px rgba(91,124,250,0.4)',
                      animation: 'line-move-r 3.5s ease-in-out infinite', zIndex: 1,
                    }}/>
                    <div style={{
                      position: 'absolute', top: '72%', left: 0, right: 0, height: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(0,196,204,0.6) 40%, rgba(91,124,250,0.9) 50%, rgba(0,196,204,0.6) 60%, transparent 100%)',
                      boxShadow: '0 0 8px rgba(91,124,250,0.8)',
                      animation: 'line-move-l 4.2s ease-in-out infinite',
                      animationDelay: '1.5s', zIndex: 1,
                    }}/>
                    <div style={{
                      position: 'absolute', top: 0, left: '42%', width: '1px', height: '100%',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(91,124,250,0.4) 30%, rgba(0,196,204,0.7) 50%, rgba(91,124,250,0.4) 70%, transparent 100%)',
                      boxShadow: '0 0 8px rgba(0,196,204,0.5)',
                      animation: 'line-move-d 5s ease-in-out infinite',
                      animationDelay: '0.8s', zIndex: 1,
                    }}/>

                    {/* ── OUTER GLASS FRAME — transparent, no solid background ── */}
                    <div style={{
                      position: 'absolute', inset: '16px', borderRadius: '28px',
                      background: 'linear-gradient(135deg, rgba(91,124,250,0.04) 0%, rgba(0,196,204,0.02) 100%)',
                      border: '1px solid rgba(91,124,250,0.18)',
                      backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 0 80px rgba(91,124,250,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
                      zIndex: 2, overflow: 'hidden', pointerEvents: 'none',
                    }}>
                      <div style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '45%', height: '38%', borderRadius: '28px 0 0 0',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
                      }}/>
                      <div style={{
                        position: 'absolute', top: '-4px', left: 0, right: 0, height: '3px',
                        background: 'linear-gradient(90deg, transparent, rgba(0,196,204,0.7), transparent)',
                        animation: 'scan-down 5s linear infinite',
                        boxShadow: '0 0 10px rgba(0,196,204,0.7)',
                      }}/>
                    </div>

                    {/* ── 3D FLOATING LOGO — transparent background ── */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      zIndex: 3,
                    }}>
                      <div style={{
                        animation: 'logo-3d-rotate 8s ease-in-out infinite',
                        transformStyle: 'preserve-3d', perspective: '900px',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute', bottom: '-24px', left: '50%',
                          transform: 'translateX(-50%)',
                          width: '160px', height: '28px', borderRadius: '50%',
                          background: 'radial-gradient(ellipse, rgba(91,124,250,0.55) 0%, transparent 70%)',
                          filter: 'blur(10px)',
                          animation: 'shadow-pulse 8s ease-in-out infinite',
                        }}/>
                        <img
                          src="/Logo.png"
                          alt="QMULATE"
                          className="logo-img"
                          style={{
                            width: '160px', height: 'auto',
                            objectFit: 'contain', display: 'block',
                            position: 'relative', zIndex: 1,
                            background: 'transparent',
                            mixBlendMode: 'screen',
                            filter: `
                              drop-shadow(0 0 28px rgba(91,124,250,0.80))
                              drop-shadow(0 0 60px rgba(91,124,250,0.35))
                              drop-shadow(0 0 6px rgba(0,196,204,0.55))
                            `,
                          }}
                        />
                      </div>
                    </div>

                    {/* ── CORNER ACCENT DOTS ── */}
                    {([
                      { top: '20px',   left: '20px'  },
                      { top: '20px',   right: '20px' },
                      { bottom: '20px',left: '20px'  },
                      { bottom: '20px',right: '20px' },
                    ] as React.CSSProperties[]).map((pos, i) => (
                      <div key={i} style={{
                        position: 'absolute', ...pos,
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: i % 2 === 0 ? 'rgba(91,124,250,0.7)' : 'rgba(0,196,204,0.7)',
                        boxShadow: i % 2 === 0 ? '0 0 10px rgba(91,124,250,0.9)' : '0 0 10px rgba(0,196,204,0.9)',
                        animation: 'corner-blink 2s ease-in-out infinite',
                        animationDelay: `${i * 0.5}s`, zIndex: 4,
                      }}/>
                    ))}

                    {/* ── FLOATING GLASS CUBES ── */}
                    {([
                      { top:'-10px',   left:'-10px',  size:44, c:'91,124,250', d:'0s',   a:'cube-float-1' },
                      { top:'28px',    right:'-14px', size:32, c:'0,196,204',  d:'1s',   a:'cube-float-2' },
                      { bottom:'22px', left:'-10px',  size:26, c:'91,124,250', d:'2s',   a:'cube-float-3' },
                      { bottom:'-8px', right:'18px',  size:38, c:'0,196,204',  d:'0.5s', a:'cube-float-1' },
                    ] as any[]).map((cube, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        top: cube.top, left: cube.left, right: cube.right, bottom: cube.bottom,
                        width: cube.size, height: cube.size,
                        borderRadius: Math.round(cube.size * 0.22),
                        background: `linear-gradient(135deg, rgba(${cube.c},0.16) 0%, rgba(${cube.c},0.04) 100%)`,
                        border: `1px solid rgba(${cube.c},0.30)`,
                        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                        boxShadow: `0 0 18px rgba(${cube.c},0.18), inset 0 1px 0 rgba(255,255,255,0.12)`,
                        animation: `${cube.a} 7s ease-in-out infinite`,
                        animationDelay: cube.d, zIndex: 4,
                      }}/>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </HeroGlass>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
          style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:10}}>
          <div className="t-xs" style={{color:"rgba(255,255,255,.2)"}}>SCROLL TO EXPLORE</div>
          <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:2}}
            style={{width:1,height:48,background:`linear-gradient(${BRAND_BLUE},transparent)`}}/>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          GOVERNANCE PILLARS — replaces numerical metrics
          ══════════════════════════════════════════════════ */}
      <section style={{background:"var(--bg-alt)",backdropFilter:"blur(40px)",borderTop:"1px solid var(--glass-border)",borderBottom:"1px solid var(--glass-border)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins" style={{opacity:0.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-4" style={{padding:"clamp(40px,5vw,64px) 0"}}>
            {PILLARS.map((p,i)=>(
              <motion.div key={p.label} {...FU(i*0.1)} style={{textAlign:"center",padding:"clamp(24px,3vw,40px) 16px"}}>
                <div style={{marginBottom:16,display:"flex",justifyContent:"center"}}>
                  <StrataLines count={4} width={72} opacity={0.25} color={p.color}/>
                </div>
                <div style={{marginBottom:10,display:"flex",justifyContent:"center"}}>
                  <GlassIcon size={52} color={p.color==="#00D4FF"||p.color==="var(--cyan)"?"cyan":"blue"}>
                    <span style={{color:p.color,filter:`drop-shadow(0 0 10px ${p.color}88)`}}>{p.icon}</span>
                  </GlassIcon>
                </div>
                <div style={{fontSize:14,color:"var(--text-2)",fontWeight:600,marginBottom:6}}>{p.label}</div>
                <div className="t-xs" style={{color:"var(--text-4)",textTransform:"none",letterSpacing:0,fontSize:12,fontFamily:"inherit"}}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT WE DO — platform overview
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <div>
              <SectionHeading
                eyebrow="The Platform"
                title={<>One system for all<br/>your real estate wealth.</>}
                subtitle="We don't manage investments. We organise wealth. Property management, brokerage, advisory, and facilities — unified into a single, governed, perpetual system."
              />
              <motion.div {...FU(.2)} style={{marginTop:36,display:"flex",flexDirection:"column",gap:14}}>
                {[
                  ["◈","Governance First","Every asset governed by a documented policy framework, not individual discretion."],
                  ["⬡","Perpetual Design","Structures built to outlast principals — transferring wealth and intent across generations."],
                  ["◉","Intelligence Layer","Real-time analytics across all holdings. No surprises. Full transparency."],
                ].map(([icon,title,desc])=>(
                  <div key={String(title)} style={{display:"flex",gap:16,padding:"18px 20px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:16}}>
                    <GlassIcon size={40} color="blue">{icon}</GlassIcon>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{title}</div>
                      <div className="t-sm" style={{color:"var(--text-3)"}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div {...FU(.32)} style={{marginTop:32}}>
                <Link href="/about" className="btn btn-ghost" style={{gap:8}}>Explore our approach →</Link>
              </motion.div>
            </div>

            {/* Visual — governance layers */}
            <motion.div {...FS(.12)} style={{position:"relative"}}>
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:12}}>
                {[
                  {label:"Governance Layer",sub:"Constitutional documents · Voting rights · Succession protocols",color:"var(--cyan)",h:72},
                  {label:"Operations Layer",sub:"Day-to-day management · Vendor governance · Compliance monitoring",color:"#8A5CFF",h:72},
                  {label:"Intelligence Layer",sub:"Performance analytics · Risk monitoring · Benchmark attribution",color:"#4D8DFF",h:72},
                  {label:"Advisory Layer",sub:"Deal sourcing · Market intelligence · Transaction governance",color:"#A855F7",h:72},
                ].map((layer,i)=>(
                  <motion.div key={layer.label} {...FU(.12+i*.08)}>
                    <GlassCard style={{padding:"20px 24px",borderLeft:`2px solid ${layer.color}44`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{layer.label}</div>
                          <div className="t-xs" style={{color:"var(--text-3)",textTransform:"none",letterSpacing:0,fontSize:12}}>{layer.sub}</div>
                        </div>
                        <div style={{width:12,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,flexShrink:0}}/>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
                <div style={{position:"absolute",left:-24,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,#00D4FF,#8A5CFF,#4D8DFF,#A855F7,transparent)"}}/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES — interactive tabs
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Services" title="Everything your wealth requires." center
              subtitle="From daily operations to generational succession — governed by one integrated system."/>
          </div>

          {/* Tab buttons */}
          <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap",justifyContent:"center"}}>
            {SERVICES.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveService(i)} whileHover={{scale:1.03}} whileTap={{scale:.98}}
                style={{
                  padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",
                  background:activeService===i?s.color:"rgba(255,255,255,.04)",
                  color:activeService===i?"#020408":"var(--text-3)",
                  border:`1px solid ${activeService===i?s.color:"rgba(255,255,255,.08)"}`,
                  transition:"all .25s",
                }}>
                <ServiceIcon id={s.id} size="xs"/><span style={{marginLeft:4}}>{s.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeService}
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
              transition={{duration:.4}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(32px,4vw,64px)",alignItems:"start"}} className="grid-2">
                <div>
                  <div style={{marginBottom:16}}><ServiceIcon id={SERVICES[activeService].id} size="lg"/></div>
                  <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:16,lineHeight:1.25}}>{SERVICES[activeService].title}</h3>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:32,lineHeight:1.8}}>{SERVICES[activeService].desc}</p>
                  <Link href="/services" className="btn btn-primary">Explore {SERVICES[activeService].label} →</Link>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {SERVICES[activeService].items.map((item,i)=>(
                    <motion.div key={item} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*.06}}>
                      <div style={{display:"flex",gap:12,padding:"14px 18px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:12,alignItems:"center"}}>
                        <div style={{width:10,height:3,borderRadius:1,background:SERVICES[activeService].color,flexShrink:0,boxShadow:`0 0 8px ${SERVICES[activeService].color}`}}/>
                        <span style={{fontSize:13,color:"var(--text-2)"}}>{item}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CAPABILITIES — feature grid
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Capabilities" title="What we can do for you." center
              subtitle="Six core capabilities that combine to deliver institutional-grade wealth governance."/>
          </div>
          <div className="grid-3">
            {CAPABILITIES.map((c,i)=>(
              <FeatureCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} accent={c.accent} index={i}/>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PHILOSOPHY SECTION
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <motion.div {...FL()}>
              <SectionHeading eyebrow="Philosophy"
                title={<>We govern. <span className="gt-c">We don't speculate.</span></>}
                subtitle="Most wealth managers are product sellers. We are governance engineers. We build structures, not portfolios. We protect mandates, not just returns."/>
              <motion.div {...FU(.2)} style={{display:"flex",flexDirection:"column",gap:20,marginTop:36}}>
                {[
                  { n:"01", title:"Governance over returns", desc:"We don't chase yield. We build the structures that protect and perpetuate capital — so returns are a consequence of discipline, not luck." },
                  { n:"02", title:"Perpetuity over performance", desc:"Every mandate is designed to outlast its principals. Succession structures, constitutional documents, and governance protocols are built in from day one." },
                  { n:"03", title:"Transparency over opacity", desc:"Principals deserve complete visibility. We deliver quarterly governance packs, real-time performance data, and unconditional access to every decision rationale." },
                ].map((p,i)=>(
                  <motion.div key={p.n} {...FU(.08+i*.1)} style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:"rgba(0,212,255,.09)",border:"1px solid rgba(0,212,255,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:"var(--cyan)",fontWeight:700}}>{p.n}</div>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{p.title}</div>
                      <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div {...FS(.15)} style={{position:"relative"}}>
              <GlassCard style={{padding:"clamp(32px,4vw,52px)",textAlign:"center"}}>
                {/* Strata sculpture — replaces RippleSphere */}
                <div style={{marginBottom:28,display:"flex",justifyContent:"center"}}>
                  <StrataSculpture size={280} opacity={0.28} style={{position:"relative"}}/>
                </div>
                <blockquote style={{fontSize:"clamp(18px,2.2vw,26px)",fontWeight:700,color:"var(--text-1)",lineHeight:1.45,marginBottom:16,fontStyle:"italic"}}>
                  "Wealth, structured to outlast its makers."
                </blockquote>
                <div className="t-xs" style={{color:"var(--text-4)",marginBottom:32}}>QMULATE FOUNDING PRINCIPLE · 2019</div>
                <div style={{display:"flex",justifyContent:"center",gap:24,paddingTop:24,borderTop:"1px solid var(--glass-border)"}}>
                  {[{label:"Structural Perpetuity",sub:"Built to outlast"},{label:"Governed Stewardship",sub:"Every mandate"}].map(item=>(
                    <div key={item.label} style={{textAlign:"center"}}>
                      <GovernancePulse width={100} height={24} opacity={0.25} color={BRAND_BLUE} style={{margin:"0 auto 8px"}}/>
                      <div style={{fontSize:12,fontWeight:700,color:"var(--text-2)",marginBottom:2}}>{item.label}</div>
                      <div className="t-xs" style={{color:"var(--text-4)",marginTop:2}}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TIMELINE
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="pulse"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Our Journey" title="Seven years building the standard." center/>
          </div>
          <div style={{position:"relative"}}>
            {/* Timeline line */}
            <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,${BRAND_BLUE}44,rgba(138,92,255,.3),transparent)`,transform:"translateX(-50%)"}} className="timeline-line"/>
            <div style={{display:"flex",flexDirection:"column",gap:32}}>
              {TIMELINE.map((item,i)=>(
                <motion.div key={item.year} {...FU(i*.08)} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,position:"relative"}} className="timeline-row">
                  {/* Left side (even) */}
                  {i%2===0 ? (
                    <>
                      <div style={{textAlign:"right",paddingRight:40,paddingTop:8}}>
                        <div style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--text-5)",letterSpacing:"-0.04em",fontVariantNumeric:"tabular-nums",marginBottom:8,filter:item.current?`drop-shadow(0 0 20px ${BRAND_BLUE}77)`:undefined}}>{item.year}</div>
                        <GlassCard style={{padding:"20px 24px",display:"inline-block",textAlign:"left"}}>
                          <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{item.title}</div>
                          <p className="t-sm" style={{color:"var(--text-3)"}}>{item.desc}</p>
                        </GlassCard>
                      </div>
                      <div/>
                    </>
                  ) : (
                    <>
                      <div/>
                      <div style={{paddingLeft:40,paddingTop:8}}>
                        <div style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--text-5)",letterSpacing:"-0.04em",fontVariantNumeric:"tabular-nums",marginBottom:8,filter:item.current?`drop-shadow(0 0 20px ${BRAND_BLUE}77)`:undefined}}>{item.year}</div>
                        <GlassCard style={{padding:"20px 24px"}}>
                          <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{item.title}</div>
                          <p className="t-sm" style={{color:"var(--text-3)"}}>{item.desc}</p>
                        </GlassCard>
                      </div>
                    </>
                  )}
                  {/* Center stratum marker — replaces circular dot */}
                  <div style={{position:"absolute",left:"50%",top:12,transform:"translateX(-50%)",
                    width:item.current?28:18,height:item.current?4:3,borderRadius:2,
                    background:item.current?BRAND_BLUE:"rgba(255,255,255,.15)",
                    boxShadow:item.current?`0 0 16px ${BRAND_BLUE}88`:undefined,
                    zIndex:2,
                  }}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"clamp(48px,6vw,96px)",alignItems:"start"}} className="grid-2">
            <div style={{position:"sticky",top:80}}>
              <SectionHeading eyebrow="FAQ"
                title="Questions principals ask us."
                subtitle="If you have a question not answered here, we're happy to speak in confidence."/>
              <motion.div {...FU(.2)} style={{marginTop:32}}>
                <Link href="/contact" className="btn btn-ghost">Speak to us in confidence →</Link>
              </motion.div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {FAQ.map((item,i)=>(
                <motion.div key={i} {...FU(i*.07)}>
                  <GlassCard hover={false} style={{overflow:"hidden"}}>
                    <button onClick={()=>setActiveFaq(activeFaq===i?null:i)} style={{
                      width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
                      gap:16,padding:"20px 24px",textAlign:"left",cursor:"pointer",
                    }}>
                      <div style={{fontSize:14,fontWeight:600,color:"var(--text-1)",lineHeight:1.5}}>{item.q}</div>
                      <motion.div animate={{rotate:activeFaq===i?45:0}} transition={{duration:.25}}
                        style={{flexShrink:0,width:22,height:22,borderRadius:4,background:"var(--g2)",
                          display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"var(--text-3)"}}>+</motion.div>
                    </button>
                    <AnimatePresence>
                      {activeFaq===i && (
                        <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                          transition={{duration:.3}}>
                          <div style={{padding:"0 24px 20px",borderTop:"1px solid var(--glass-border)",paddingTop:16}}>
                            <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.8}}>{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA SECTION
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="bg-grid" style={{opacity:.5}}/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}>
            <span className="pill pill-v" style={{marginBottom:28}}><span className="dot-live" style={{background:"#8A5CFF",boxShadow:"0 0 8px #8A5CFF"}}/>PRIVATE FAMILY OFFICE · RIYADH</span>
          </motion.div>
          <motion.h2 {...FU(.08)} className="t-d gt-a" style={{marginBottom:20,fontSize:"clamp(44px,7vw,96px)"}}>
            Built to govern.<br/>Designed to last.
          </motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:540,margin:"0 auto 44px",lineHeight:1.75}}>
            If you are ready to move from managing assets to governing wealth, we would be glad to speak with you in confidence.
          </motion.p>
          <motion.div {...FU(.22)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/contact" className="btn btn-primary glow-border" style={{fontSize:16,padding:"16px 40px"}}>Request an introduction →</Link>
            <Link href="/services" className="btn btn-ghost" style={{fontSize:16,padding:"16px 36px"}}>Explore our services</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.hero-grid,.timeline-row{grid-template-columns:1fr!important}}
        @media(max-width:640px){.hero-trust{gap:20px!important;flex-wrap:wrap}}
        .timeline-line{display:none}
        @media(min-width:700px){.timeline-line{display:block}}
        @media(max-width:700px){.timeline-row{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
