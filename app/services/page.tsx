"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceIcon, ProcessIcon } from "@/components/icons/GlassIcons";
import { FU, FI, FS, SectionHeading, GlassCard, OrbBg, IrisBlob, GoldBlobComp, Bubbles, MouseGlow, FeatureCard } from "@/components/DS";

const SERVICES = [
  { id:"stewardship", icon:"◈", label:"Property Stewardship", color:"var(--cyan)",
    headline:"Professional oversight that preserves and compounds value.",
    body:"We manage your real estate portfolio as a unified, governed system — not a collection of fragmented assets. From daily operations to strategic positioning, every decision is made within a documented governance framework that ensures consistency, accountability, and long-term value preservation.",
    deliverables:[
      "Unified portfolio governance framework",
      "Quarterly performance and governance packs",
      "Multi-custodian position consolidation",
      "Benchmark attribution and peer comparison",
      "Regulatory compliance monitoring",
      "Strategic asset positioning reports",
      "Vendor governance and oversight",
      "Capital maintenance planning",
    ] },
  { id:"growth", icon:"⬡", label:"Governed Growth", color:"#8A5CFF",
    headline:"Capital deployment within structural guardrails.",
    body:"Growth without governance is speculation. We design investment mandates, acquisition criteria, and capital deployment frameworks that enable ambitious expansion while maintaining structural integrity. Every investment decision is documented, rationale-driven, and made within pre-approved parameters.",
    deliverables:[
      "Investment mandate design and documentation",
      "Capital deployment framework",
      "Entity and holding structure optimisation",
      "Cross-border structure design",
      "Succession-proof ownership architecture",
      "Tax-efficient wrapper implementation",
      "Board and governance committee design",
      "Annual mandate review process",
    ] },
  { id:"advisory", icon:"◉", label:"Property Advisory", color:"#4D8DFF",
    headline:"Market intelligence converted into decisive action.",
    body:"Our advisory practice converts raw market data into structured investment decisions. We cover deal origination, independent valuation, due diligence management, and transaction governance — always operating within the family's documented mandate framework.",
    deliverables:[
      "Deal origination and pipeline management",
      "Independent valuation and appraisal",
      "Due diligence management and reporting",
      "Transaction governance and documentation",
      "Market intelligence reports",
      "Vendor and counterparty assessment",
      "Exit strategy analysis",
      "Portfolio rebalancing recommendations",
    ] },
  { id:"reporting", icon:"⬟", label:"Wealth Reporting", color:"#A855F7",
    headline:"Complete visibility across every holding, every quarter.",
    body:"Principals deserve a clear, accurate picture of their wealth. We produce consolidated reporting that covers performance, attribution, risk exposure, and governance compliance — structured for principals, trustees, advisors, and regulatory requirements.",
    deliverables:[
      "Consolidated quarterly wealth packs",
      "Performance attribution and analytics",
      "Risk exposure mapping",
      "Governance compliance reporting",
      "Trustee-grade documentation",
      "Custom executive dashboard",
      "Benchmark performance comparison",
      "Annual wealth governance report",
    ] },
  { id:"risk", icon:"🛡️", label:"Risk Management", color:"#FF6EC7",
    headline:"Systematic protection against structural and market risk.",
    body:"Risk in real estate wealth is multidimensional — concentration risk, liquidity risk, succession risk, and market risk all compound in complex ways. We design systematic frameworks that identify, measure, and mitigate risk before it becomes an event.",
    deliverables:[
      "Portfolio concentration analysis",
      "Liquidity stress testing",
      "Succession risk assessment",
      "Market risk monitoring",
      "Insurance governance review",
      "Counterparty risk assessment",
      "Scenario planning and modelling",
      "Risk governance committee facilitation",
    ] },
  { id:"digital", icon:"⚡", label:"Digital Transformation", color:"#FFB56B",
    headline:"Technology that makes governance effortless.",
    body:"We deploy the intelligence infrastructure to make governance automatic, not manual. From real-time analytics to AI-powered risk detection, our technology layer converts data from all sources into actionable, governed insights — available anywhere, any time.",
    deliverables:[
      "Unified data platform deployment",
      "Real-time performance dashboards",
      "AI-powered anomaly detection",
      "Automated compliance monitoring",
      "Document management system",
      "Multi-custodian data integration",
      "Mobile principal dashboard",
      "API integration with external systems",
    ] },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <main>
      <MouseGlow/>

      {/* Hero */}
      <section style={{minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <OrbBg cyan violet/>
        <IrisBlob size={480} top="-15%" right="-8%" opacity={0.3}/>
        <div className="bg-grid" style={{opacity:.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c"><span className="dot-live"/>Services</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>
            Everything your real estate wealth requires.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>
            Six service lines. One integrated governance system. Every service works together — because wealth governance is not a collection of products.
          </motion.p>
        </div>
      </section>

      {/* Service tabs */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <OrbBg cyan={false} violet blue/>
        <GoldBlobComp size={350} bottom="-10%" right="-5%" delay={4}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          {/* Tab nav */}
          <div style={{display:"flex",gap:8,marginBottom:48,flexWrap:"wrap"}}>
            {SERVICES.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActive(i)}
                whileHover={{scale:1.03}} whileTap={{scale:.97}}
                style={{
                  padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",
                  background:active===i?s.color:"rgba(255,255,255,.04)",
                  color:active===i?"#020408":"var(--text-3)",
                  border:`1px solid ${active===i?s.color:"rgba(255,255,255,.08)"}`,
                  transition:"all .25s",display:"flex",alignItems:"center",gap:6,
                }}>
                <ServiceIcon id={s.id} size="xs"/><span style={{marginLeft:4}}>{s.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.4}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(40px,5vw,80px)",alignItems:"start"}} className="grid-2">
                <div>
                  <div style={{marginBottom:20}}><ServiceIcon id={SERVICES[active].id} size="xl"/></div>
                  <h2 className="t-h2" style={{color:"var(--text-1)",marginBottom:20,lineHeight:1.2}}>{SERVICES[active].headline}</h2>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:36,lineHeight:1.85}}>{SERVICES[active].body}</p>
                  <Link href="/contact" className="btn btn-primary" style={{fontSize:14}}>Discuss this service →</Link>
                </div>
                <GlassCard style={{padding:"clamp(24px,3vw,40px)"}}>
                  <div className="t-xs" style={{color:"var(--text-4)",marginBottom:20}}>SERVICE DELIVERABLES</div>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {SERVICES[active].deliverables.map((item,i)=>(
                      <motion.div key={item} initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:i*.04}}>
                        <div style={{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:"1px solid var(--glass-border)"}}>
                          <div style={{width:6,height:6,borderRadius:"50%",background:SERVICES[active].color,flexShrink:0,boxShadow:`0 0 6px ${SERVICES[active].color}`}}/>
                          <span style={{fontSize:13,color:"var(--text-2)"}}>{item}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* How we work */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <IrisBlob size={500} top="-10%" left="-8%" opacity={0.12}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Our Process" title="How we onboard every mandate." center
              subtitle="Every new mandate follows the same disciplined onboarding process — regardless of size."/>
          </div>
          <div className="grid-4">
            {[
              {n:"01",icon:"🔍",title:"Discovery",desc:"We conduct a comprehensive diagnostic of existing structures, assets, governance gaps, and family mandate.",accent:"#00D4FF"},
              {n:"02",icon:"🏗️",title:"Architecture",desc:"We design the complete governance architecture — entity structures, mandate documents, and reporting frameworks.",accent:"#8A5CFF"},
              {n:"03",icon:"⚡",title:"Implementation",desc:"We deploy the governance infrastructure — systems, processes, and documentation — within a defined timeline.",accent:"#4D8DFF"},
              {n:"04",icon:"♾️",title:"Governance",desc:"We operate the mandate on an ongoing basis — reporting, advisory, and continuous governance improvement.",accent:"#A855F7"},
            ].map((step,i)=>(
              <motion.div key={step.n} {...FU(i*.1)}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center",height:"100%"}}>
                  <div style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:step.accent,marginBottom:16}}>{step.n}</div>
                  <div style={{marginBottom:16}}><ProcessIcon step={i} size="lg"/></div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-1)",marginBottom:10}}>{step.title}</h3>
                  <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
        <IrisBlob size={500} top="-15%" left="25%" opacity={0.1}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>Ready to discuss your mandate?</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>All conversations are private and confidential.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>Request an introduction →</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
