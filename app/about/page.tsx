"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { StrataMark } from "@/components/StrataMark";
import {
  FU, FI, FS, FL, SectionHeading, GlassCard, FeatureCard,
  HeroGlass, Divider
} from "@/components/DS";
import {
  ArchitecturalBg, StrataLines, GovernancePulse, BRAND_BLUE
} from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";

const PRINCIPLES = [
  { n:"01", title:"Governance over returns", desc:"We don't optimise for yield. We build the structural frameworks that protect and perpetuate capital across market cycles and family generations." },
  { n:"02", title:"Perpetuity over performance", desc:"Every mandate is designed to outlast its principals. We engineer succession structures, constitutional documents, and governance protocols from day one." },
  { n:"03", title:"Transparency over opacity", desc:"Principals receive complete quarterly governance packs, real-time performance data, and unconditional access to every decision rationale." },
  { n:"04", title:"Discipline over discretion", desc:"Every investment decision is made within documented mandate parameters. No personal judgment replaces institutional process." },
];

const LAYERS = [
  { num:"01", name:"Governance Layer", color:"var(--cyan)", desc:"Constitutional documents, entity structures, voting rights, and succession protocols. The permanent framework that governs everything below it." },
  { num:"02", name:"Operations Layer", color:"#8A5CFF", desc:"Day-to-day management of all assets. Vendor governance, regulatory compliance, and facilities oversight — documented and auditable." },
  { num:"03", name:"Intelligence Layer", color:"#4D8DFF", desc:"Performance analytics, risk monitoring, benchmark attribution, and anomaly detection. Real-time visibility across every holding." },
  { num:"04", name:"Advisory Layer", color:"#A855F7", desc:"Market intelligence, deal origination, due diligence management, and transaction governance — always within the mandate framework." },
];

const TEAM = [
  { name:"Faisal Al-Mansouri", role:"Founding Partner", area:"Governance Architecture & Strategy" },
  { name:"Khalid Al-Rashid", role:"Partner, Portfolio Management", area:"Asset Strategy & Performance" },
  { name:"Sara Al-Ghamdi", role:"Director, Operations", area:"Operational Excellence & Compliance" },
  { name:"Ahmed Bin Saeed", role:"Director, Advisory", area:"Transaction Governance & Markets" },
];

export default function About() {
  return (
    <main style={{ position: 'relative' }}>
      <PageBackground variant="about" />
      {/* ── Hero ── */}
      <section style={{minHeight:"72vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="bg-grid" style={{opacity:.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c"><span className="dot-live"/>About QMULATE</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:780,marginBottom:24}}>
            A family office engineered<br/>for permanence.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>
            QMULATE was founded to solve a specific problem: most real estate wealth is managed reactively, not governed proactively. We exist to change that.
          </motion.p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-2" style={{gap:"clamp(24px,3vw,40px)"}}>
            {[
              { label:"MISSION", color:"var(--cyan)", title:"We govern wealth. We don't manage products.", body:"QMULATE organises real estate wealth — property management, brokerage, advisory, and facilities — into one governed system. Every mandate is structured to preserve, grow, and transfer wealth across generations without loss of intent." },
              { label:"VISION", color:"#8A5CFF", title:"A world where wealth outlasts its makers.", body:"We believe every family that builds significant real estate wealth deserves a governance framework worthy of that achievement. Our vision is to become the standard of institutional-grade real estate wealth governance in the GCC and beyond." },
            ].map((item,i)=>(
              <motion.div key={item.label} {...FU(i*.1)}>
                <GlassCard style={{padding:"clamp(32px,4vw,52px)",height:"100%"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                    <span className="t-xs" style={{color:item.color}}>{item.label}</span>
                    <div style={{flex:1,height:1,background:`linear-gradient(90deg,${item.color}44,transparent)`}}/>
                  </div>
                  <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:16,lineHeight:1.3}}>{item.title}</h3>
                  <p className="t-md" style={{color:"var(--text-3)",lineHeight:1.85}}>{item.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founding Principle ── */}
      <section style={{padding:"clamp(60px,8vw,100px) 0",position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}><span className="pill pill-w" style={{marginBottom:32}}>Founding Principle</span></motion.div>
          <motion.blockquote {...FU(.08)} style={{fontSize:"clamp(24px,3.5vw,52px)",fontWeight:800,color:"var(--text-1)",lineHeight:1.2,maxWidth:900,margin:"0 auto 32px",letterSpacing:"-0.035em"}}>
            "Wealth, structured to <span className="gt-c">outlast its makers.</span>"
          </motion.blockquote>
          <motion.p {...FU(.16)} className="t-xs" style={{color:"var(--text-4)"}}>QMULATE · FOUNDED 2019 · RIYADH, SAUDI ARABIA</motion.p>
        </div>
      </section>

      {/* ── Governance Principles ── */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"start"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="Our Principles" title={<>The beliefs we govern by.</>}
                subtitle="These four principles inform every structure we design, every decision we make, and every mandate we accept."/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {PRINCIPLES.map((p,i)=>(
                <motion.div key={p.n} {...FU(.06+i*.09)}>
                  <GlassCard style={{padding:"24px 28px"}}>
                    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                      <div style={{width:34,height:34,borderRadius:10,background:"rgba(0,212,255,.08)",border:"1px solid rgba(0,212,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:"var(--cyan)",fontWeight:700,flexShrink:0}}>{p.n}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{p.title}</div>
                        <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{p.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform Architecture ── */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Platform" title="Four layers. One unified system." center
              subtitle="Our governance architecture organises wealth into four interlocking layers — each dependent on the one above it."/>
          </div>
          <div style={{position:"relative",maxWidth:800,margin:"0 auto"}}>
            <div style={{position:"absolute",left:-1,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,#00D4FF,#8A5CFF,#4D8DFF,#A855F7,transparent)"}}/>
            <div style={{display:"flex",flexDirection:"column",gap:16,paddingLeft:40}}>
              {LAYERS.map((layer,i)=>(
                <motion.div key={layer.num} {...FU(.08+i*.1)}>
                  <GlassCard style={{padding:"28px 32px",borderLeft:`2px solid ${layer.color}44`}}>
                    <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                      <div>
                        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                          <span style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:layer.color,fontWeight:700}}>{layer.num}</span>
                          <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-1)"}}>{layer.name}</h3>
                          <div style={{width:12,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,marginLeft:"auto"}}/>
                        </div>
                        <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{layer.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                  {/* Connector stratum bar */}
                  <div style={{position:"absolute",left:-8,width:16,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 10px ${layer.color}`,top:"50%", transform:"translateY(-50%)"}}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Governance Standards ── */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="pulse"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Track Record" title="Seven years building the standard." center
              subtitle="A governance platform built through practice — not theory."/>
          </div>
          <div className="grid-4">
            {[
              {label:"Property Stewardship",desc:"Every asset governed by policy framework",icon:"◈",color:"#00D4FF"},
              {label:"Long-Term Preservation",desc:"Structures built for generational continuity",icon:"⬡",color:"#8A5CFF"},
              {label:"Governed Growth",desc:"Capital deployed within structural guardrails",icon:"◉",color:"#4D8DFF"},
              {label:"Generational Continuity",desc:"Succession frameworks active across mandates",icon:"⬟",color:"#A855F7"},
            ].map((p,i)=>(
              <motion.div key={p.label} {...FU(i*.09)}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
                  <div style={{marginBottom:16,display:"flex",justifyContent:"center"}}>
                    <StrataLines count={3} width={60} opacity={0.22} color={p.color}/>
                  </div>
                  <div style={{fontSize:22,marginBottom:10,color:p.color,filter:`drop-shadow(0 0 14px ${p.color}55)`}}>{p.icon}</div>
                  <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:8}}>{p.label}</div>
                  <div className="t-xs" style={{color:"var(--text-4)",textTransform:"none",letterSpacing:0,fontSize:12,fontFamily:"inherit"}}>{p.desc}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Leadership" title="The team behind the platform." center/>
          </div>
          <div className="grid-4">
            {TEAM.map((member,i)=>(
              <motion.div key={member.name} {...FU(i*.08)}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
                  {/* Initials mark */}
                  <div style={{width:72,height:72,borderRadius:14,margin:"0 auto 20px",
                    background:"linear-gradient(135deg,rgba(0,212,255,.10),rgba(138,92,255,.10))",
                    border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:22,fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:"0.02em"}}>
                    {member.name.split(" ").map((n: string)=>n[0]).join("")}
                  </div>
                  <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{member.name}</div>
                  <div style={{fontSize:13,color:"var(--cyan)",marginBottom:8}}>{member.role}</div>
                  <div className="t-xs" style={{color:"var(--text-4)",textTransform:"none",letterSpacing:0,fontSize:12}}>{member.area}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>Ready to begin a conversation?</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>All introductions are private and confidential.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>Request an introduction →</Link>
            <Link href="/services" className="btn btn-ghost" style={{fontSize:15,padding:"14px 32px"}}>View our services</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
