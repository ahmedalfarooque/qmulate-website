"use client";
import { ChallengIcon, SolutionCheckIcon } from "@/components/icons/GlassIcons";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioIcon, GovernanceIcon, CrossBorderIcon } from "@/components/icons/GlassIcons";
import { FU, FI, FS, SectionHeading, GlassCard, MetricCard, OrbBg, IrisBlob, GoldBlobComp, MouseGlow, Counter } from "@/components/DS";

const PROJECTS = [
  { id:"001", title:"Multi-Generational Succession Framework", type:"Succession Engineering", status:"Active",
    year:"2024", duration:"18 months", accentColor:"#00D4FF",
    brief:"A third-generation family required a complete succession framework covering SAR 1.8B in real estate assets across 4 jurisdictions. The mandate included constitutional document drafting, entity restructuring, and a 25-year succession roadmap.",
    challenge:"The family had accumulated assets across KSA, UAE, London, and Jersey over 40 years — with no unified governance structure, contradictory ownership documentation, and no succession plan.",
    solution:"We designed a four-layer governance architecture with a Cayman holding structure, KSA operating entities, and a UAE Advisory Council. Constitutional documents were drafted for all primary entities. A 25-year succession roadmap with clear governance checkpoints was delivered.",
    metrics:[{v:1.8,suf:"B+",l:"Assets Restructured (SAR)"},{v:4,suf:" juris.",l:"Jurisdictions Governed"},{v:3,suf:"rd gen",l:"Succession Horizon"},{v:100,suf:"%",l:"Governance Coverage"}] },
  { id:"002", title:"AI-Powered Portfolio Analytics Deployment", type:"Digital Transformation", status:"Active",
    year:"2023", duration:"12 months", accentColor:"#8A5CFF",
    brief:"A GCC family office with SAR 650M in real estate across commercial, residential, and hospitality assets required a unified analytics platform to replace 7 disconnected reporting systems.",
    challenge:"Performance data was scattered across 7 systems, 3 custodians, and 2 accounting firms. Quarterly reporting took 6 weeks and was historically inaccurate. No real-time visibility existed.",
    solution:"We deployed our unified intelligence platform, integrating all 7 data sources into a single reporting spine. AI anomaly detection was activated across all holdings. Reporting cycle reduced from 6 weeks to 48 hours. Principal dashboard went live in month 4.",
    metrics:[{v:650,suf:"M+",l:"Assets Unified (SAR)"},{v:7,suf:" systems",l:"Data Sources Integrated"},{v:94,suf:"%",l:"Reporting Time Reduction"},{v:100,suf:"%",l:"Real-Time Coverage"}] },
  { id:"003", title:"Cross-Border Governance Architecture", type:"Governance Platform", status:"Completed",
    year:"2022", duration:"24 months", accentColor:"#4D8DFF",
    brief:"A founding-generation Saudi principal required a cross-border governance structure to consolidate assets across KSA, UK, and Jersey — designed to be succession-ready and tax-efficient at every layer.",
    challenge:"Assets were held directly in the principal's name across three jurisdictions with no holding structure, inadequate documentation, and significant succession risk. Total exposure exceeded SAR 2.1B.",
    solution:"A three-tier holding structure was designed: Jersey Foundation at apex, Cayman SPV layer, and KSA/UK operating companies. All assets were transferred within 18 months. Constitutional documents, mandates, and succession protocols were fully drafted and executed.",
    metrics:[{v:2.1,suf:"B",l:"Assets Structured (SAR)"},{v:3,suf:" layers",l:"Governance Architecture"},{v:100,suf:"%",l:"Documentation Complete"},{v:18,suf:" mo",l:"Implementation Timeline"}] },
];

export default function Projects() {
  const [active, setActive] = useState(0);

  return (
    <main>
      <MouseGlow/>

      {/* Hero */}
      <section style={{minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <OrbBg cyan violet blue/>
        <IrisBlob size={480} top="-10%" right="-8%" opacity={0.25}/>
        <div className="bg-grid" style={{opacity:.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c"><span className="dot-live"/>Selected Projects</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>
            Mandates that redefined what governance looks like.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>
            Three case studies from our portfolio — anonymised, with client permission, to illustrate what institutional-grade real estate governance achieves in practice.
          </motion.p>
        </div>
      </section>

      {/* Project navigation */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <OrbBg cyan={false} violet/>
        <GoldBlobComp size={350} bottom="-10%" left="-5%" delay={3}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          {/* Tab selector */}
          <div style={{display:"flex",gap:8,marginBottom:48,flexWrap:"wrap"}}>
            {PROJECTS.map((p,i)=>(
              <motion.button key={p.id} onClick={()=>setActive(i)}
                whileHover={{scale:1.03}} whileTap={{scale:.97}}
                style={{
                  padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",
                  background:active===i?p.accentColor:"rgba(255,255,255,.04)",
                  color:active===i?"#020408":"var(--text-3)",
                  border:`1px solid ${active===i?p.accentColor:"rgba(255,255,255,.08)"}`,transition:"all .25s",
                }}>
                {p.id} — {p.type}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.4}}>
              {/* KPI row */}
              <div className="grid-4" style={{marginBottom:40}}>
                {PROJECTS[active].metrics.map((m,i)=>(
                  <motion.div key={m.l} {...FU(i*.07)}>
                    <GlassCard style={{padding:"clamp(20px,2.5vw,32px)",textAlign:"center",borderTop:`2px solid ${PROJECTS[active].accentColor}44`}}>
                      <div style={{fontSize:"clamp(28px,3.5vw,48px)",fontWeight:900,letterSpacing:"-0.04em",color:PROJECTS[active].accentColor,filter:`drop-shadow(0 0 20px ${PROJECTS[active].accentColor}66)`,fontVariantNumeric:"tabular-nums",lineHeight:1,marginBottom:8}}>
                        <Counter to={m.v} suffix={m.suf} decimals={m.v<10?1:0}/>
                      </div>
                      <div style={{fontSize:12,color:"var(--text-3)",fontWeight:500}}>{m.l}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* Project detail */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(24px,3vw,48px)",alignItems:"start"}} className="grid-2">
                <div>
                  <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
                    <span className="pill pill-w">{PROJECTS[active].type}</span>
                    <span className="pill" style={{background:`${PROJECTS[active].accentColor}14`,border:`1px solid ${PROJECTS[active].accentColor}40`,color:PROJECTS[active].accentColor}}>{PROJECTS[active].status}</span>
                    <span className="pill pill-w">{PROJECTS[active].year}</span>
                  </div>
                  <h2 className="t-h3" style={{color:"var(--text-1)",marginBottom:20,lineHeight:1.25}}>{PROJECTS[active].title}</h2>
                  <p className="t-md" style={{color:"var(--text-3)",lineHeight:1.85,marginBottom:24}}>{PROJECTS[active].brief}</p>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  {[
                    {label:"The Challenge", body:PROJECTS[active].challenge, icon:"⚠️"},
                    {label:"Our Solution", body:PROJECTS[active].solution, icon:"solution"},
                  ].map(block=>(
                    <GlassCard key={block.label} style={{padding:"24px 28px"}}>
                      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
                        <>
                      {block.icon==="challenge" && <ChallengIcon size="sm" animated={false}/>}
                      {block.icon==="solution"  && <SolutionCheckIcon size="sm" animated={false}/>}
                    </>
                        <div className="t-xs" style={{color:"var(--text-3)"}}>{block.label}</div>
                      </div>
                      <p className="t-sm" style={{color:"var(--text-2)",lineHeight:1.8}}>{block.body}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Aggregate metrics */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <IrisBlob size={500} top="-15%" right="-8%" opacity={0.12}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Across All Mandates" title="The numbers behind the governance." center/>
          </div>
          <div className="grid-4">
            {[
              {to:4.6,pre:"SAR ",suf:"B+",l:"Total Assets Governed",accent:"#00D4FF"},
              {to:7,suf:"+ yrs",l:"Average Mandate Duration",accent:"#8A5CFF"},
              {to:100,suf:"%",l:"Client Retention Rate",accent:"#4D8DFF"},
              {to:3,suf:"rd gen",l:"Maximum Succession Depth",accent:"#A855F7"},
            ].map((m,i)=>(
              <motion.div key={m.l} {...FU(i*.09)}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
                  <div style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:900,letterSpacing:"-0.04em",color:m.accent,filter:`drop-shadow(0 0 20px ${m.accent}66)`,fontVariantNumeric:"tabular-nums",lineHeight:1,marginBottom:8}}>
                    <Counter to={m.to} prefix={m.pre||""} suffix={m.suf} decimals={m.to<10?1:0}/>
                  </div>
                  <div style={{fontSize:13,color:"var(--text-2)",fontWeight:500}}>{m.l}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
        <IrisBlob size={400} top="-10%" left="30%" opacity={0.1}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>Ready to become a case study?</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>We'd be glad to speak with you about your mandate.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>Request an introduction →</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
