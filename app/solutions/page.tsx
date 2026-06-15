"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { GovernanceIcon, PortfolioIcon, AIIcon, CrossBorderIcon, RiskIcon, DigitalIcon, DocumentIcon, WealthIcon } from "@/components/icons/GlassIcons";
import { FU, FI, FS, SectionHeading, GlassCard } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";

const SOLUTIONS = [
  {icon:"🏛️",title:"Governance Platform",color:"var(--cyan)",desc:"End-to-end governance infrastructure — constitutional documents, mandate frameworks, entity structures, and succession protocols — deployed as a unified, auditable system.",features:["Constitutional document library","Board governance tools","Succession protocol engine","Mandate tracking dashboard","Audit trail and documentation","Regulatory compliance monitoring"]},
  {icon:"📊",title:"Portfolio Intelligence",color:"#8A5CFF",desc:"Real-time analytics across all holdings — performance, attribution, liquidity, concentration, and risk — unified into a single dashboard that gives principals complete visibility, always.",features:["Real-time performance analytics","Risk concentration mapping","Liquidity position monitoring","Benchmark attribution tools","Custom reporting builder","Multi-custodian aggregation"]},
  {icon:"🤖",title:"AI Risk Engine",color:"#4D8DFF",desc:"Machine learning models that surface anomalies, concentration risks, and market signals before they become governance events. Predictive, not reactive.",features:["Anomaly detection algorithms","Concentration risk signals","Market correlation analysis","Scenario stress testing","Predictive cash flow modelling","Early warning notifications"]},
  {icon:"🌐",title:"Multi-Jurisdiction Manager",color:"#A855F7",desc:"Consolidated governance across all jurisdictions — KSA, UAE, UK, and offshore — with unified reporting, compliance monitoring, and structural oversight in a single view.",features:["Cross-border structure mapping","Jurisdiction-specific compliance","Consolidated reporting","Tax efficiency monitoring","Entity relationship management","Regulatory change alerts"]},
  {icon:"🔄",title:"Asset Lifecycle Manager",color:"#FF6EC7",desc:"Full lifecycle governance from acquisition through development, management, and exit — with documented decision frameworks, performance tracking, and governance checkpoints at each stage.",features:["Acquisition governance checklist","Development milestone tracking","Operations performance dashboards","Exit strategy analytics","Capital event documentation","Historical performance archive"]},
  {icon:"📱",title:"Principal Portal",color:"#FFB56B",desc:"A secure, private portal giving principals real-time access to their complete wealth position — performance, governance, documents, and reporting — from any device, anywhere.",features:["Real-time wealth dashboard","Document secure access","Governance status overview","Custom notification preferences","Mobile-optimised interface","Secure communication channel"]},
];

export default function Solutions() {
  return (
    <main>
      {/* Hero */}
      <section style={{minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="bg-grid" style={{opacity:.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c"><span className="dot-live"/>Solutions & Technology</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>
            Institutional-grade technology for real estate wealth.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>
            Six integrated solutions that together form the complete infrastructure for governed real estate wealth management.
          </motion.p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-3">
            {SOLUTIONS.map((s,i)=>(
              <motion.div key={s.title} {...FU(i*.07)}>
                <GlassCard style={{padding:"clamp(24px,3vw,40px)",height:"100%"}}>
                  <div style={{marginBottom:20}}>
                    {i===0&&<GovernanceIcon size="lg" animated={false}/>}
                    {i===1&&<PortfolioIcon size="lg" animated={false}/>}
                    {i===2&&<AIIcon size="lg" animated={false}/>}
                    {i===3&&<CrossBorderIcon size="lg" animated={false}/>}
                    {i===4&&<RiskIcon size="lg" animated={false}/>}
                    {i===5&&<DigitalIcon size="lg" animated={false}/>}
                  </div>
                  <h3 style={{fontSize:18,fontWeight:700,color:"var(--text-1)",marginBottom:10,lineHeight:1.3}}>{s.title}</h3>
                  <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75,marginBottom:24}}>{s.desc}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {s.features.map(f=>(
                      <div key={f} style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{width:8,height:2,borderRadius:1,background:s.color,flexShrink:0,boxShadow:`0 0 5px ${s.color}`}}/>
                        <span style={{fontSize:12,color:"var(--text-3)"}}>{f}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Architecture" title="How the platform is built." center
              subtitle="Every solution is an integrated module — not a standalone product. They share data, governance protocols, and reporting infrastructure."/>
          </div>

          {/* Architecture visual */}
          <div style={{maxWidth:900,margin:"0 auto"}}>
            {[
              {label:"Principal Portal",color:"#FFB56B",sub:"Real-time access layer for principals and trustees"},
              {label:"Intelligence & Analytics Layer",color:"#A855F7",sub:"Performance · Risk · Attribution · AI Engine"},
              {label:"Governance & Operations Layer",color:"#4D8DFF",sub:"Documents · Mandates · Compliance · Lifecycle"},
              {label:"Data Integration Layer",color:"#8A5CFF",sub:"Custodians · Banks · Registries · Market Data"},
              {label:"Asset & Entity Foundation",color:"var(--cyan)",sub:"All properties · Entities · Holdings · Structures"},
            ].map((layer,i)=>(
              <motion.div key={layer.label} {...FU(.08+i*.1)} style={{marginBottom:8}}>
                <div style={{
                  padding:"clamp(16px,2vw,24px) clamp(20px,3vw,36px)",
                  background:`linear-gradient(135deg,${layer.color}0A,${layer.color}04)`,
                  border:`1px solid ${layer.color}30`,borderRadius:16,
                  backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
                  display:"flex",justifyContent:"space-between",alignItems:"center",
                  transition:"all .3s",
                }}>
                  <div style={{fontWeight:700,color:"var(--text-1)",fontSize:"clamp(13px,1.5vw,16px)"}}>{layer.label}</div>
                  <div style={{fontSize:12,color:"var(--text-3)",textAlign:"right",maxWidth:360}}>{layer.sub}</div>
                  <div style={{width:14,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 10px ${layer.color}`,flexShrink:0}}/>
                </div>
                {i<4&&<div style={{width:1,height:16,background:layer.color,margin:"0 auto",opacity:.4}}/>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>See the platform in action.</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>We offer a private demonstration for qualified principals.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>Request a demonstration →</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
