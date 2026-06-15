"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StrataMark } from "@/components/StrataMark";
import { ArchitecturalBg, StrataSculpture, GovernancePulse, StrataLines, GlassFacade, StrataStack, VerticalFins, StructuralLattice, BRAND_BLUE } from "@/components/Strata";
import { FU, FI, FS, FL, SectionHeading, GlassCard, FeatureCard } from "@/components/DS";
import { ServiceIcon, GovernanceIcon, PortfolioIcon, SuccessionIcon, AIIcon, CrossBorderIcon, RiskIcon, DiscoveryIcon, ArchitectureIcon, ImplementationIcon, InfinityIcon as InfIcon } from "@/components/icons/GlassIcons";
import { preset, TextReveal, StaggerReveal, HoverLift, DrawLine, MagneticButton } from "@/components/Motion";

/* ── Services data ── */
const SERVICES = [
  { id:"stewardship", label:"Property Stewardship", color:"#5B7CFA",
    title:"Professional oversight that preserves and enhances value.",
    desc:"We manage your real estate as a unified, governed system. From daily operations to strategic positioning, every decision is made within a documented governance framework that ensures consistency, accountability, and long-term value preservation.",
    items:["Unified portfolio governance","Quarterly governance reports","Multi-custodian consolidation","Benchmark attribution","Regulatory compliance","Strategic asset positioning"] },
  { id:"growth", label:"Governed Growth", color:"#8A5CFF",
    title:"Disciplined systems that support continuity and performance.",
    desc:"Growth without governance is speculation. We design investment mandates, acquisition criteria, and capital deployment frameworks that enable disciplined expansion while maintaining structural integrity across generations.",
    items:["Investment mandate design","Capital deployment frameworks","Entity structure optimisation","Cross-border holding structures","Succession-proof architecture","Tax-efficient wrapper design"] },
  { id:"advisory", label:"Property Advisory", color:"#4D8DFF",
    title:"Advisory capabilities that transform information into opportunity.",
    desc:"We convert market intelligence into structured investment decisions. Our advisory practice covers deal origination, due diligence, valuation, and transaction execution — always governed by the family's long-term mandate.",
    items:["Deal origination & screening","Independent valuation","Due diligence management","Transaction governance","Market intelligence reports","Vendor & counterparty assessment"] },
  { id:"reporting", label:"Wealth Reporting", color:"#7C6AF0",
    title:"Complete visibility across every holding, every quarter.",
    desc:"Principals deserve a clear, accurate picture of their wealth. We produce consolidated reporting covering performance, attribution, risk exposure, and governance compliance — structured for principals, trustees, and advisors.",
    items:["Consolidated quarterly packs","Performance attribution","Risk exposure mapping","Governance compliance reporting","Trustee-grade documentation","Custom dashboard access"] },
];

/* ── Core principles (replacing metrics) ── */
const PRINCIPLES = [
  { icon:"◼", label:"Compound", desc:"Let structure, not noise, drive returns over decades." },
  { icon:"◼", label:"Protect",  desc:"Govern for the downside; preserve before we grow." },
  { icon:"◼", label:"Transfer", desc:"Carry intent — not just assets — between generations." },
];

/* ── Capabilities ── */
const CAPABILITIES = [
  { title:"Governance Architecture", desc:"Entity structures, holding frameworks, and constitutional documents built for permanence.", accent:"#5B7CFA" },
  { title:"Portfolio Intelligence",   desc:"Analytics across all holdings — performance, risk, liquidity, and attribution.", accent:"#8A5CFF" },
  { title:"Succession Engineering",   desc:"Multi-generational ownership structures that carry intent across generations.", accent:"#4D8DFF" },
  { title:"AI-Driven Insights",        desc:"Models surfacing anomalies, opportunities, and risk signals before they become events.", accent:"#7C6AF0" },
  { title:"Cross-Border Structures",   desc:"Multi-jurisdiction holding frameworks with consolidated reporting and unified governance.", accent:"#5B7CFA" },
  { title:"Risk Management",           desc:"Systematic identification, measurement, and mitigation of portfolio risk.", accent:"#8A5CFF" },
];

/* ── Pillars (qualitative, replacing metrics) ── */
const PILLARS = [
  { label:"Property Stewardship", sub:"Professional oversight that preserves and enhances value.",        Icon:GovernanceIcon },
  { label:"Governed Growth",       sub:"Disciplined systems that support continuity and performance.",     Icon:PortfolioIcon  },
  { label:"Property Advisory",     sub:"Advisory capabilities that transform information into opportunity.",Icon:SuccessionIcon },
  { label:"Multi-Generational",    sub:"Carry intent — not just assets — between generations.",            Icon:InfIcon        },
];

/* ── Timeline ── */
const TIMELINE = [
  {year:"2019",title:"Foundation",desc:"QMULATE established to govern — not merely manage — real estate wealth across generations."},
  {year:"2021",title:"Platform Build",desc:"Proprietary governance platform deployed. Real-time reporting across all asset classes."},
  {year:"2023",title:"GCC Expansion",desc:"Expanded advisory practice to UAE and KSA. Multi-jurisdiction mandates now active."},
  {year:"2026",title:"Today",desc:"Platform v7 live. Three generational mandates active. Motion design system deployed.",current:true},
];

/* ── FAQ ── */
const FAQ = [
  {q:"How is QMULATE different from a traditional wealth manager?",a:"We are a governance-first family office, not a product-selling wealth manager. Our mandate is to organise, protect, and transfer wealth — not to generate fee income from product recommendations. We operate fee-only, with no conflicts of interest."},
  {q:"What is the minimum mandate size?",a:"We engage with principals managing significant real estate portfolios who require institutional-grade governance. All enquiries are treated with discretion."},
  {q:"What does 'governed growth' mean in practice?",a:"Every capital deployment decision is made within a pre-approved investment mandate — with documented rationale, risk parameters, and approval governance. Growth happens, but never at the expense of structural integrity."},
  {q:"How do you handle multi-jurisdictional structures?",a:"We maintain governance frameworks across KSA, UAE, UK, and key offshore jurisdictions. Each structure is designed for succession clarity, tax efficiency, and operational simplicity — with consolidated reporting in a single view."},
];

export default function Home() {
  const [activeSvc, setActiveSvc] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number|null>(null);

  return (
    <main className="hero-page">

      {/* ════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
        position:"relative",overflow:"hidden",
        background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        {/* Architectural backgrounds — replaces orbs/bubbles */}
        <ArchitecturalBg variant="mixed"/>
        <div className="bg-grid" style={{opacity:.5}}/>

        {/* Strata sculpture — hero focal point */}
        <StrataSculpture size={420} opacity={0.14}
          style={{right:"clamp(-60px,-4%,0)",top:"50%",transform:"translateY(-42%)"}}/>

        <div className="cw" style={{position:"relative",zIndex:5,paddingTop:"clamp(100px,12vw,140px)",paddingBottom:"clamp(80px,10vw,120px)"}}>
          <div style={{maxWidth:760}}>

            {/* Eyebrow */}
            <motion.div {...FI(.1)} style={{marginBottom:28}}>
              <span className="pill pill-c">
                <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:BRAND_BLUE,marginRight:6}}/>
                Real Estate Wealth Governance · Riyadh
              </span>
            </motion.div>

            {/* StrataMark — brand animation plays once */}
            <motion.div {...FU(.12)} style={{marginBottom:32}}>
              <StrataMark size={44} animate/>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{opacity:0,y:40,filter:"blur(8px)"}}
              animate={{opacity:1,y:0,filter:"blur(0px)"}}
              transition={{duration:1.2,delay:.25,ease:[.2,.8,.2,1]}}
              style={{
                fontFamily:"var(--font-geist,'Inter',sans-serif)",
                fontSize:"clamp(44px,6.5vw,96px)",
                fontWeight:700,letterSpacing:"-0.045em",lineHeight:.94,
                color:"var(--snow)",marginBottom:28,
              }}
            >
              Wealth, structured<br/>
              <span style={{color:BRAND_BLUE}}>to outlast</span><br/>
              its makers.
            </motion.h1>

            <motion.p
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:.9,delay:.45,ease:[.2,.8,.2,1]}}
              style={{fontSize:"clamp(16px,1.8vw,20px)",color:"var(--mist)",
                lineHeight:1.65,maxWidth:540,marginBottom:16}}
            >
              We organise real estate wealth — property management, brokerage, advisory, and facilities — into one governed, perpetual system.
            </motion.p>

            <motion.p
              initial={{opacity:0}} animate={{opacity:1}}
              transition={{duration:.7,delay:.5}}
              style={{fontFamily:"'IBM Plex Sans Arabic',sans-serif",
                fontSize:14,color:"rgba(255,255,255,0.18)",marginBottom:48,direction:"rtl"}}
            >
              ثروة مبنية لتدوم بعد صانعيها.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
              transition={{duration:.8,delay:.55,ease:[.2,.8,.2,1]}}
              style={{display:"flex",gap:14,flexWrap:"wrap"}}
            >
              <MagneticButton>
                <Link href="/contact" className="btn btn-primary"
                  style={{fontSize:15,padding:"13px 32px",borderRadius:4}}>
                  Request an introduction →
                </Link>
              </MagneticButton>
              <Link href="/about" className="btn btn-ghost"
                style={{fontSize:15,padding:"13px 28px",borderRadius:4}}>
                Our approach
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Governance pulse at bottom */}
        <GovernancePulse opacity={0.12}
          style={{position:"absolute",bottom:24,left:0,right:0,width:"100%",maxWidth:800,margin:"0 auto"}}/>
      </section>

      {/* ════════════════════════════════════════════════════════
          QUALITATIVE PILLARS (replaces numerical metrics)
          ════════════════════════════════════════════════════════ */}
      <section style={{background:"var(--bg-alt)",borderTop:"1px solid rgba(255,255,255,0.055)",borderBottom:"1px solid rgba(255,255,255,0.055)"}}>
        <div className="container">
          <div className="grid-4" style={{padding:"clamp(40px,5vw,64px) 0",gap:"clamp(24px,3vw,40px)"}}>
            {PILLARS.map((p,i)=>(
              <motion.div key={p.label} {...FU(i*.08)}>
                <div style={{display:"flex",flexDirection:"column",gap:14,padding:"24px 0"}}>
                  <p.Icon size="md" animated={false}/>
                  <div style={{fontSize:15,fontWeight:700,color:"var(--snow)",letterSpacing:"-0.02em"}}>{p.label}</div>
                  <div style={{fontSize:13,color:"var(--mist)",lineHeight:1.7}}>{p.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PLATFORM OVERVIEW
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="The Platform"
                title={<>One system for all<br/>your real estate wealth.</>}
                subtitle="We don't manage investments. We organise wealth. Property management, brokerage, advisory, and facilities — unified into a single, governed, perpetual system."/>
              <motion.div {...FU(.18)} style={{marginTop:36,display:"flex",flexDirection:"column",gap:14}}>
                {[
                  ["Governance First","Every asset governed by a documented policy framework, not individual discretion."],
                  ["Perpetual Design","Structures built to outlast principals — transferring wealth and intent across generations."],
                  ["Intelligence Layer","Real-time analytics across all holdings. No surprises. Full transparency."],
                ].map(([title,desc])=>(
                  <div key={String(title)} style={{display:"flex",gap:16,padding:"16px 20px",background:"rgba(255,255,255,.035)",border:"1px solid var(--glass-border)",borderRadius:4}}>
                    <div style={{width:3,borderRadius:2,background:BRAND_BLUE,flexShrink:0,alignSelf:"stretch"}}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:"var(--snow)",marginBottom:4,letterSpacing:"-0.015em"}}>{title}</div>
                      <div style={{fontSize:12,color:"var(--mist)",lineHeight:1.7}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div {...FU(.28)} style={{marginTop:28}}>
                <Link href="/about" className="btn btn-ghost" style={{fontSize:13,padding:"10px 20px",borderRadius:4}}>Explore our approach →</Link>
              </motion.div>
            </div>

            {/* Governance layers diagram */}
            <motion.div {...FS(.12)}>
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:8}}>
                {/* Vertical line */}
                <div style={{position:"absolute",left:-1,top:0,bottom:0,width:1,background:`linear-gradient(to bottom,${BRAND_BLUE},rgba(91,124,250,.3),transparent)`}}/>
                {[
                  {label:"Governance Layer",sub:"Constitutional documents · Voting rights · Succession protocols",color:BRAND_BLUE},
                  {label:"Operations Layer",sub:"Day-to-day management · Vendor governance · Compliance monitoring",color:"#8A5CFF"},
                  {label:"Intelligence Layer",sub:"Performance analytics · Risk monitoring · Benchmark attribution",color:"#4D8DFF"},
                  {label:"Advisory Layer",sub:"Deal sourcing · Market intelligence · Transaction governance",color:"#7C6AF0"},
                ].map((layer,i)=>(
                  <motion.div key={layer.label} {...FU(.1+i*.08)}>
                    <GlassCard style={{padding:"18px 22px 18px 28px",borderLeft:`2px solid ${layer.color}55`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:"var(--snow)",marginBottom:4}}>{layer.label}</div>
                          <div className="t-xs" style={{color:"var(--mist)",textTransform:"none",letterSpacing:0,fontSize:11}}>{layer.sub}</div>
                        </div>
                        <div style={{width:7,height:7,borderRadius:"50%",background:layer.color,boxShadow:`0 0 8px ${layer.color}`,flexShrink:0}}/>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES — tabs
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="facade"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Services" title="Everything your wealth requires." center
              subtitle="From daily operations to generational succession — governed by one integrated system."/>
          </div>

          {/* Tab buttons */}
          <div style={{display:"flex",gap:6,marginBottom:36,flexWrap:"wrap",justifyContent:"center"}}>
            {SERVICES.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveSvc(i)}
                whileHover={{scale:1.02}} whileTap={{scale:.98}}
                style={{
                  padding:"8px 18px",borderRadius:3,fontSize:12,fontWeight:600,cursor:"pointer",
                  background:activeSvc===i?s.color:"rgba(255,255,255,.04)",
                  color:activeSvc===i?"#fff":"var(--mist)",
                  border:`1px solid ${activeSvc===i?s.color+"55":"rgba(255,255,255,.07)"}`,
                  transition:"all .2s",letterSpacing:"0.01em",
                }}>
                {s.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeSvc} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(32px,4vw,64px)",alignItems:"start"}} className="grid-2">
                <div>
                  <div style={{marginBottom:16}}><ServiceIcon id={SERVICES[activeSvc].id} size="lg"/></div>
                  <h3 className="t-h3" style={{color:"var(--snow)",marginBottom:16,lineHeight:1.25,letterSpacing:"-0.025em"}}>{SERVICES[activeSvc].title}</h3>
                  <p className="t-md" style={{color:"var(--mist)",marginBottom:32,lineHeight:1.8}}>{SERVICES[activeSvc].desc}</p>
                  <Link href="/services" className="btn btn-primary" style={{fontSize:13,padding:"10px 22px",borderRadius:4}}>Explore service →</Link>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {SERVICES[activeSvc].items.map((item,i)=>(
                    <motion.div key={item} initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}>
                      <div style={{display:"flex",gap:12,padding:"12px 16px",background:"rgba(255,255,255,.03)",border:"1px solid var(--glass-border)",borderRadius:3,alignItems:"center"}}>
                        <div style={{width:3,height:3,borderRadius:"50%",background:SERVICES[activeSvc].color,flexShrink:0}}/>
                        <span style={{fontSize:12,color:"var(--mist)"}}>{item}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CAPABILITIES
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Capabilities" title="What we can do for you." center
              subtitle="Six core capabilities that combine to deliver institutional-grade wealth governance."/>
          </div>
          <div className="grid-3">
            {CAPABILITIES.map((c,i)=>(
              <FeatureCard key={c.title} icon="" title={c.title} desc={c.desc} accent={c.accent} index={i}/>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PHILOSOPHY
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <motion.div {...FL()}>
              <SectionHeading eyebrow="Philosophy"
                title={<>We govern.<br/><span style={{color:BRAND_BLUE}}>We don't speculate.</span></>}
                subtitle="Most wealth managers are product sellers. We are governance engineers. We build structures, not portfolios. We protect mandates, not just returns."/>
              <motion.div {...FU(.18)} style={{display:"flex",flexDirection:"column",gap:20,marginTop:36}}>
                {[
                  {n:"01",title:"Governance over returns",desc:"We don't chase yield. We build the structures that protect and perpetuate capital — so returns are a consequence of discipline, not luck."},
                  {n:"02",title:"Perpetuity over performance",desc:"Every mandate is designed to outlast its principals. Succession structures, constitutional documents, and governance protocols are built in from day one."},
                  {n:"03",title:"Transparency over opacity",desc:"Principals deserve complete visibility. We deliver quarterly governance packs, real-time performance data, and unconditional access to every decision rationale."},
                ].map((p,i)=>(
                  <motion.div key={p.n} {...FU(.06+i*.09)} style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                    <div style={{
                      width:32,height:32,borderRadius:2,
                      background:`${BRAND_BLUE}14`,border:`1px solid ${BRAND_BLUE}33`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontFamily:"var(--font-geist-mono,'Courier New'),monospace",
                      fontSize:10,color:BRAND_BLUE,fontWeight:700,flexShrink:0,
                    }}>{p.n}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:"var(--snow)",marginBottom:5,letterSpacing:"-0.015em"}}>{p.title}</div>
                      <p style={{fontSize:12,color:"var(--mist)",lineHeight:1.75}}>{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div {...FS(.15)}>
              <GlassCard style={{padding:"clamp(32px,4vw,52px)",textAlign:"center"}}>
                <div style={{marginBottom:24,display:"flex",justifyContent:"center"}}>
                  <StrataMark size={56} animate style={{color:"rgba(255,255,255,0.7)"}}/>
                </div>
                <blockquote style={{fontSize:"clamp(17px,2vw,23px)",fontWeight:700,color:"var(--snow)",lineHeight:1.45,marginBottom:16,fontStyle:"italic",letterSpacing:"-0.02em"}}>
                  "Wealth, structured to outlast its makers."
                </blockquote>
                <div className="t-xs" style={{color:"var(--mist)",marginBottom:28}}>QMULATE FOUNDING PRINCIPLE · 2019</div>
                <DrawLine/>
                <div style={{display:"flex",justifyContent:"center",gap:28,paddingTop:24}}>
                  {PRINCIPLES.map(p=>(
                    <div key={p.label} style={{textAlign:"center"}}>
                      <div style={{fontSize:15,fontWeight:800,color:BRAND_BLUE,marginBottom:4,letterSpacing:"-0.02em"}}>{p.label}</div>
                      <div style={{fontSize:11,color:"var(--mist)",maxWidth:100,lineHeight:1.5}}>{p.desc}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TIMELINE
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Our Journey" title="Seven years building the standard." center/>
          </div>
          <div style={{position:"relative"}}>
            <div className="timeline-line" style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,${BRAND_BLUE}55,rgba(91,124,250,.25),transparent)`,transform:"translateX(-50%)"}}/>
            <div style={{display:"flex",flexDirection:"column",gap:28}}>
              {TIMELINE.map((item,i)=>(
                <motion.div key={item.year} {...FU(i*.07)}
                  style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,position:"relative"}} className="timeline-row">
                  {i%2===0 ? (
                    <>
                      <div style={{textAlign:"right",paddingRight:40,paddingTop:6}}>
                        <div style={{fontSize:"clamp(24px,3vw,38px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--ghost)",letterSpacing:"-0.04em",marginBottom:6,fontVariantNumeric:"tabular-nums"}}>{item.year}</div>
                        <GlassCard style={{padding:"18px 22px",display:"inline-block",textAlign:"left"}}>
                          <div style={{fontSize:13,fontWeight:700,color:"var(--snow)",marginBottom:5}}>{item.title}</div>
                          <p style={{fontSize:12,color:"var(--mist)",lineHeight:1.7}}>{item.desc}</p>
                        </GlassCard>
                      </div>
                      <div/>
                    </>
                  ) : (
                    <>
                      <div/>
                      <div style={{paddingLeft:40,paddingTop:6}}>
                        <div style={{fontSize:"clamp(24px,3vw,38px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--ghost)",letterSpacing:"-0.04em",marginBottom:6,fontVariantNumeric:"tabular-nums"}}>{item.year}</div>
                        <GlassCard style={{padding:"18px 22px"}}>
                          <div style={{fontSize:13,fontWeight:700,color:"var(--snow)",marginBottom:5}}>{item.title}</div>
                          <p style={{fontSize:12,color:"var(--mist)",lineHeight:1.7}}>{item.desc}</p>
                        </GlassCard>
                      </div>
                    </>
                  )}
                  <div style={{position:"absolute",left:"50%",top:8,transform:"translateX(-50%)",
                    width:item.current?14:9,height:item.current?14:9,borderRadius:"50%",
                    background:item.current?BRAND_BLUE:"rgba(255,255,255,.12)",
                    boxShadow:item.current?`0 0 20px ${BRAND_BLUE}` :undefined,
                    zIndex:2}}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"clamp(48px,6vw,96px)",alignItems:"start"}} className="grid-2">
            <div style={{position:"sticky",top:80}}>
              <SectionHeading eyebrow="FAQ" title="Questions principals ask us."
                subtitle="If you have a question not answered here, we're happy to speak in confidence."/>
              <motion.div {...FU(.2)} style={{marginTop:28}}>
                <Link href="/contact" className="btn btn-ghost" style={{fontSize:13,padding:"10px 20px",borderRadius:4}}>Speak in confidence →</Link>
              </motion.div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {FAQ.map((item,i)=>(
                <motion.div key={i} {...FU(i*.06)}>
                  <GlassCard hover={false}>
                    <button onClick={()=>setActiveFaq(activeFaq===i?null:i)} style={{
                      width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
                      gap:16,padding:"18px 22px",textAlign:"left",cursor:"pointer",
                    }}>
                      <div style={{fontSize:13,fontWeight:600,color:"var(--snow)",lineHeight:1.5}}>{item.q}</div>
                      <motion.div animate={{rotate:activeFaq===i?45:0}} transition={{duration:.22}}
                        style={{flexShrink:0,width:20,height:20,borderRadius:"50%",
                          background:"rgba(255,255,255,.06)",display:"flex",alignItems:"center",
                          justifyContent:"center",fontSize:14,color:"var(--mist)"}}>+</motion.div>
                    </button>
                    <AnimatePresence>
                      {activeFaq===i && (
                        <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.28}}>
                          <div style={{padding:"0 22px 18px",borderTop:"1px solid var(--glass-border)",paddingTop:14}}>
                            <p style={{fontSize:12,color:"var(--mist)",lineHeight:1.8}}>{item.a}</p>
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

      {/* ════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:`linear-gradient(160deg,var(--bg-1),var(--bg-0))`}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="bg-grid" style={{opacity:.4}}/>
        <StrataSculpture size={520} opacity={0.1}
          style={{right:"-5%",top:"50%",transform:"translateY(-50%)"}}/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}>
            <span className="pill pill-c" style={{marginBottom:24}}>
              <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:BRAND_BLUE,marginRight:6}}/>
              PRIVATE FAMILY OFFICE · RIYADH
            </span>
          </motion.div>
          <motion.h2 {...FU(.07)} style={{
            fontSize:"clamp(44px,7vw,92px)",fontWeight:700,
            letterSpacing:"-0.042em",lineHeight:.96,
            color:"var(--snow)",marginBottom:20,
          }}>
            Built to govern.<br/>
            <span style={{color:BRAND_BLUE}}>Designed to last.</span>
          </motion.h2>
          <motion.p {...FU(.14)} style={{fontSize:"clamp(15px,1.8vw,19px)",color:"var(--mist)",maxWidth:480,margin:"0 auto 40px",lineHeight:1.75}}>
            If you are ready to move from managing assets to governing wealth, we would be glad to speak with you in confidence.
          </motion.p>
          <motion.div {...FU(.2)} style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <MagneticButton>
              <Link href="/contact" className="btn btn-primary glow-border" style={{fontSize:15,padding:"14px 38px",borderRadius:4}}>Request an introduction →</Link>
            </MagneticButton>
            <Link href="/services" className="btn btn-ghost" style={{fontSize:15,padding:"14px 32px",borderRadius:4}}>Explore our services</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.hero-grid,.grid-2,.timeline-row{grid-template-columns:1fr!important}}
        .timeline-line{display:none}
        @media(min-width:700px){.timeline-line{display:block}}
        @media(max-width:700px){.timeline-row{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
