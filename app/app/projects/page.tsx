"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArchitecturalBg, GovernancePulse, StrataLines, StrataSculpture, GlassFacade, StructuralLattice, BRAND_BLUE } from "@/components/Strata";
import { StrataMark } from "@/components/StrataMark";
import { FU, FI, FS, SectionHeading, GlassCard } from "@/components/DS";
import { ChallengIcon, SolutionCheckIcon } from "@/components/icons/GlassIcons";
import { preset, HoverLift, DrawLine, MagneticButton } from "@/components/Motion";

/* ── Case Studies — NO monetary values, qualitative governance focus ── */
const PROJECTS = [
  {
    id:"001", type:"Succession Engineering", status:"Active", year:"2024",
    color:BRAND_BLUE,
    title:"Multi-Generational Succession Framework",
    brief:"A third-generation family required a complete succession framework for a large multi-jurisdictional real estate portfolio. The mandate encompassed constitutional document drafting, entity restructuring, and a long-horizon succession roadmap.",
    challenge:"Assets were accumulated across KSA, UAE, London, and Jersey over decades — with no unified governance structure, contradictory ownership documentation, and no succession plan. Governance risk was significant.",
    solution:"A four-layer governance architecture was designed: a Cayman foundation at the apex, an SPV layer, and operating entities in KSA and UK. Constitutional documents were drafted for all primary entities. A 25-year succession roadmap with governance checkpoints was delivered.",
    pillars:[
      {label:"Governance Architecture",val:"Four-layer structure spanning three jurisdictions"},
      {label:"Succession Depth",val:"Third-generation succession horizon"},
      {label:"Documentation Coverage",val:"Constitutional documents across all entities"},
      {label:"Implementation",val:"Full transition within a defined mandate timeline"},
    ],
  },
  {
    id:"002", type:"Digital Transformation", status:"Active", year:"2023",
    color:"#7C6AF0",
    title:"Unified Portfolio Intelligence Deployment",
    brief:"A GCC family office with a diversified real estate portfolio across commercial, residential, and hospitality assets required a unified intelligence platform to replace multiple disconnected reporting systems.",
    challenge:"Performance data was scattered across multiple systems, custodians, and accounting firms. Quarterly reporting took weeks and was historically inaccurate. Principals lacked real-time visibility.",
    solution:"The unified intelligence platform was deployed, integrating all data sources into a single reporting spine. AI anomaly detection was activated across all holdings. Reporting cycle was reduced dramatically. A principal dashboard went live in the first quarter.",
    pillars:[
      {label:"Data Sources Unified",val:"All custodians and systems consolidated"},
      {label:"Reporting Cycle",val:"From weeks to days — fully automated"},
      {label:"Principal Access",val:"Real-time dashboard active from day one"},
      {label:"Anomaly Detection",val:"AI-powered risk signals across entire portfolio"},
    ],
  },
  {
    id:"003", type:"Governance Platform", status:"Completed", year:"2022",
    color:"#8A5CFF",
    title:"Cross-Border Governance Architecture",
    brief:"A founding-generation principal required a cross-border governance structure to consolidate a large portfolio across KSA, UK, and Jersey — designed to be succession-ready and tax-efficient at every layer.",
    challenge:"Assets were held directly in the principal's name across three jurisdictions with no holding structure, inadequate documentation, and significant succession risk. The mandate required complete structural clarity.",
    solution:"A three-tier holding structure was designed: a Jersey Foundation at the apex, a Cayman SPV layer, and KSA and UK operating companies. All assets were transferred within the mandate timeline. Constitutional documents, mandates, and succession protocols were fully executed.",
    pillars:[
      {label:"Governance Layers",val:"Three-tier cross-jurisdictional architecture"},
      {label:"Entities Structured",val:"Operating entities across KSA, UK, and offshore"},
      {label:"Documentation",val:"Full constitutional framework and succession protocols"},
      {label:"Timeline",val:"Completed within agreed mandate schedule"},
    ],
  },
];

/* ── Our approach qualitative pillars ── */
const APPROACH = [
  {n:"01",title:"Diagnostic",desc:"We begin with a comprehensive, confidential diagnostic — mapping all assets, structures, governance gaps, and family mandate before proposing any solution."},
  {n:"02",title:"Architecture",desc:"We design the complete governance architecture: entity structures, mandate documents, reporting frameworks, and succession protocols — tailored to the family's objectives."},
  {n:"03",title:"Implementation",desc:"We deploy the governance infrastructure — legal, operational, and technological — in a disciplined sequence with clear milestones and accountability."},
  {n:"04",title:"Continuity",desc:"We operate the mandate on an ongoing basis — quarterly reporting, strategic advisory, and continuous governance improvement as the family evolves."},
];

export default function Projects() {
  const [active, setActive] = useState(0);

  return (
    <main>

      {/* ── Hero ── */}
      <section style={{
        minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",
        overflow:"hidden",
        background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
        paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)",
      }}>
        <ArchitecturalBg variant="strata-left"/>
        <div className="bg-grid" style={{opacity:.5}}/>
        <StrataSculpture size={360} opacity={0.11}
          style={{right:"-3%",top:"50%",transform:"translateY(-50%)"}}/>

        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c">
              <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:BRAND_BLUE,marginRight:6}}/>
              Selected Mandates
            </span>
          </motion.div>
          <motion.h1 {...FU(.08)} style={{
            fontSize:"clamp(38px,5.5vw,76px)",fontWeight:700,
            letterSpacing:"-0.042em",lineHeight:1.04,
            color:"var(--snow)",maxWidth:700,marginBottom:24,
          }}>
            Mandates that redefine what governance looks like.
          </motion.h1>
          <motion.p {...FU(.16)} style={{
            fontSize:"clamp(15px,1.8vw,19px)",color:"var(--mist)",
            maxWidth:520,lineHeight:1.75,
          }}>
            Three engagements from our practice — presented with client permission, focused on governance complexity rather than commercial scale.
          </motion.p>
        </div>

        <GovernancePulse opacity={0.1}
          style={{position:"absolute",bottom:16,left:0,right:0,width:"80%",maxWidth:720,margin:"0 auto"}}/>
      </section>

      {/* ── Case study tabs ── */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>

          {/* Tab selector */}
          <div style={{display:"flex",gap:6,marginBottom:52,flexWrap:"wrap"}}>
            {PROJECTS.map((p,i)=>(
              <motion.button key={p.id} onClick={()=>setActive(i)}
                whileHover={{scale:1.02}} whileTap={{scale:.98}}
                style={{
                  padding:"9px 20px",borderRadius:3,fontSize:12,fontWeight:600,cursor:"pointer",
                  background:active===i?p.color:"rgba(255,255,255,.04)",
                  color:active===i?"#fff":"var(--mist)",
                  border:`1px solid ${active===i?`${p.color}55`:"rgba(255,255,255,.07)"}`,
                  transition:"all .22s",letterSpacing:"0.01em",
                }}>
                <span style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",marginRight:8,fontSize:10,opacity:.7}}>{p.id}</span>
                {p.type}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
              transition={{duration:.38,ease:[.2,.8,.2,1]}}>

              {/* Qualitative pillars — NO monetary values */}
              <div className="grid-4" style={{marginBottom:48}}>
                {PROJECTS[active].pillars.map((p,i)=>(
                  <motion.div key={p.label} {...FU(i*.07)}>
                    <GlassCard style={{
                      padding:"clamp(18px,2.5vw,28px)",
                      borderTop:`2px solid ${PROJECTS[active].color}44`,
                      height:"100%",
                    }}>
                      <div style={{
                        fontFamily:"var(--font-geist-mono,'Courier New'),monospace",
                        fontSize:10,color:PROJECTS[active].color,
                        marginBottom:10,letterSpacing:"0.06em",textTransform:"uppercase",
                      }}>{p.label}</div>
                      <div style={{
                        fontSize:"clamp(12px,1.3vw,14px)",fontWeight:600,
                        color:"var(--snow)",lineHeight:1.55,
                      }}>{p.val}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* Brief + Challenge + Solution */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(24px,3.5vw,56px)",alignItems:"start"}} className="grid-2">
                <div>
                  <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
                    <span className="pill pill-w">{PROJECTS[active].type}</span>
                    <span className="pill" style={{
                      background:`${PROJECTS[active].color}12`,
                      border:`1px solid ${PROJECTS[active].color}35`,
                      color:PROJECTS[active].color,
                    }}>{PROJECTS[active].status}</span>
                    <span className="pill pill-w">{PROJECTS[active].year}</span>
                  </div>
                  <h2 style={{
                    fontSize:"clamp(20px,2.5vw,32px)",fontWeight:700,
                    color:"var(--snow)",marginBottom:18,lineHeight:1.25,
                    letterSpacing:"-0.025em",
                  }}>{PROJECTS[active].title}</h2>
                  <p style={{fontSize:14,color:"var(--mist)",lineHeight:1.85,marginBottom:28}}>{PROJECTS[active].brief}</p>
                  <DrawLine/>
                  <div style={{marginTop:24}}>
                    <div style={{
                      fontFamily:"var(--font-geist-mono,'Courier New'),monospace",
                      fontSize:10,color:"var(--mist)",marginBottom:8,letterSpacing:"0.08em",
                    }}>MANDATE TYPE</div>
                    <div style={{fontSize:13,color:PROJECTS[active].color,fontWeight:600}}>{PROJECTS[active].type}</div>
                  </div>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  {[
                    {label:"The Challenge",body:PROJECTS[active].challenge,Icon:ChallengIcon,accent:"#B45309"},
                    {label:"Our Solution",body:PROJECTS[active].solution,Icon:SolutionCheckIcon,accent:BRAND_BLUE},
                  ].map(block=>(
                    <GlassCard key={block.label} style={{padding:"22px 26px"}}>
                      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                        <block.Icon size="sm" animated={false}/>
                        <div style={{
                          fontFamily:"var(--font-geist-mono,'Courier New'),monospace",
                          fontSize:10,color:"var(--mist)",letterSpacing:"0.08em",textTransform:"uppercase",
                        }}>{block.label}</div>
                      </div>
                      <p style={{fontSize:13,color:"var(--mist)",lineHeight:1.82}}>{block.body}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="How We Work" title="Governance before growth." center
              subtitle="Every mandate follows the same disciplined process — because governance is not an outcome, it is a practice."/>
          </div>
          <div className="grid-4">
            {APPROACH.map((s,i)=>(
              <motion.div key={s.n} {...FU(i*.09)}>
                <GlassCard style={{padding:"clamp(22px,3vw,36px)",height:"100%"}}>
                  <div style={{
                    fontFamily:"var(--font-geist-mono,'Courier New'),monospace",
                    fontSize:11,color:BRAND_BLUE,marginBottom:16,letterSpacing:"0.06em",
                  }}>{s.n}</div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"var(--snow)",marginBottom:10,letterSpacing:"-0.02em"}}>{s.title}</h3>
                  <p style={{fontSize:13,color:"var(--mist)",lineHeight:1.78}}>{s.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance statement ── */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <ArchitecturalBg variant="strata-right"/>
        <StrataSculpture size={480} opacity={0.09}
          style={{left:"-5%",top:"50%",transform:"translateY(-50%)"}}/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}><span className="pill pill-c" style={{marginBottom:28}}>
            <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:BRAND_BLUE,marginRight:6}}/>
            Our Governance Standard
          </span></motion.div>
          <motion.div {...FU(.08)} style={{marginBottom:24,display:"flex",justifyContent:"center"}}>
            <StrataMark size={52} animate style={{color:"rgba(255,255,255,0.7)"}}/>
          </motion.div>
          <motion.h2 {...FU(.14)} style={{
            fontSize:"clamp(28px,4vw,56px)",fontWeight:700,letterSpacing:"-0.036em",
            lineHeight:1.08,color:"var(--snow)",marginBottom:20,maxWidth:680,margin:"0 auto 20px",
          }}>
            Structure before scale.<br/>
            <span style={{color:BRAND_BLUE}}>Governance before growth.</span>
          </motion.h2>
          <motion.p {...FU(.2)} style={{fontSize:15,color:"var(--mist)",maxWidth:480,margin:"0 auto 40px",lineHeight:1.8}}>
            Every mandate begins with governance architecture — never with capital deployment. This is what distinguishes stewardship from management.
          </motion.p>
          <motion.div {...FU(.26)} style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <MagneticButton>
              <Link href="/contact" className="btn btn-primary" style={{fontSize:14,padding:"12px 30px",borderRadius:4}}>
                Discuss your mandate →
              </Link>
            </MagneticButton>
            <Link href="/services" className="btn btn-ghost" style={{fontSize:14,padding:"12px 26px",borderRadius:4}}>
              Our services
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
