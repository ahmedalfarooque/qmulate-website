"use client";
import {
  LocationIcon, EmailIcon, LockIcon, ClockIcon,
} from "@/components/icons/GlassIcons";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FU, FI, FS, SectionHeading, GlassCard,
  HeroGlass,
} from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";
import ScanLine from "@/components/ScanLine";

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

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({target:heroRef,offset:["start start","end start"]});
  const heroOpacity = useTransform(scrollYProgress,[0,.6],[1,0]);
  const heroY = useTransform(scrollYProgress,[0,1],["0%","20%"]);

  const inp = (field:string):React.CSSProperties => ({
    width:"100%",background:"var(--g1)",
    border:`1px solid ${focus===field?"rgba(0,212,255,.5)":"rgba(255,255,255,.08)"}`,
    borderRadius:12,padding:"13px 16px",fontSize:14,color:"var(--text-1)",
    outline:"none",fontFamily:"'Inter',sans-serif",
    transition:"border-color .2s, box-shadow .2s",
    boxShadow:focus===field?"0 0 0 3px rgba(0,212,255,.12)":"none",
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
            <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:"clamp(40px,5vw,80px)",alignItems:"center"}} className="hero-grid">
              <div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.6}} style={{marginBottom:24}}>
                  <img src="/Logo.png" alt="QMULATE" style={{width:"150px",height:"auto",objectFit:"contain",filter:"none",boxShadow:"none"}}/>
                </motion.div>
                <motion.h1 initial={{opacity:0,y:30,scale:.95}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.8,duration:1.1,ease:[.25,.46,.45,.94]}} className="t-d gt-w" style={{marginBottom:20,fontSize:"clamp(44px,6vw,88px)"}}>
                  Transforming Ownership into Enduring Value.
                </motion.h1>
                <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}} className="t-xl" style={{color:"var(--text-3)",maxWidth:480,marginBottom:44,lineHeight:1.75}}>
                  A fully integrated real estate platform for families, businesses, and individuals, dedicated to managing assets, preserving value, and enabling sustainable long-term growth.
                </motion.p>
                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.15,duration:.7}} style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                  <a href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 34px"}}>Request an introduction →</a>
                  <a href="#about" className="btn btn-ghost" style={{fontSize:15,padding:"14px 30px"}}>Our approach</a>
                </motion.div>
              </div>
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:16}}>
                <motion.div initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{delay:1.0,duration:1.0,ease:[.34,1.56,.64,1]}}>
                  <div style={{position:"relative",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"460px"}}>
                    <Logo3D size={250}/>
                  </div>
                </motion.div>
              </div>
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
        <div className="container" style={{padding:"clamp(48px,6vw,80px) 0",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(32px,4vw,48px)"}}>
            <div className="t-xs" style={{color:"var(--cyan)",marginBottom:12}}>REGULATORY AUTHORITIES</div>
            <h2 className="t-h2" style={{color:"var(--text-1)"}}>Licensed and Regulated.</h2>
          </div>
          <div className="grid-3" style={{gap:"clamp(16px,2vw,24px)"}}>
            {[1,2,3].map(i=>(
              <GlassCard key={i} style={{padding:"clamp(24px,3vw,40px)",textAlign:"center"}}>
                {/* TODO: Replace with actual authority logo <img> when provided */}
                <div style={{width:48,height:48,background:"rgba(255,255,255,.06)",borderRadius:10,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontSize:11,color:"var(--text-5)"}}>LOGO</span>
                </div>
                <div style={{fontSize:12,color:"var(--text-5)"}}>Authority Logo</div>
              </GlassCard>
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
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="WHO WE ARE" title={<>An integrated real estate platform.</>} subtitle="We provide an integrated approach to real estate asset management and ownership structuring, helping clients manage their assets through clear governance, effective management, and a long-term perspective."/>
            </div>
            <motion.div {...FS(.12)} style={{position:"relative"}}>
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:12}}>
                {[
                  {label:"Ownership Structuring",sub:"Clear frameworks · Decision governance · Long-term clarity",color:"var(--cyan)"},
                  {label:"Asset Management",sub:"Leasing · Operations · Maintenance · Value preservation",color:"#8A5CFF"},
                  {label:"Development & Investment",sub:"Expansion · Repositioning · Sustainable growth",color:"#4D8DFF"},
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
              </div>
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
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="OUR SERVICES" title="Structured for every type of ownership." center subtitle="Our services cover the key aspects of real estate ownership, from structuring and governance to asset management, development, and investment, tailored to the unique needs of corporates, endowments, and individuals."/>
          </div>
          <div className="grid-3" style={{gap:"clamp(16px,2vw,24px)",marginBottom:"clamp(32px,4vw,48px)"}}>
            {HOME_SERVICES.map((s,i)=>(
              <motion.div key={s.id} {...FU(i*0.06)}>
                <GlassCard style={{padding:"clamp(24px,3vw,40px)",height:"100%"}}>
                  <div style={{width:10,height:3,borderRadius:1,background:s.color,marginBottom:20,boxShadow:`0 0 8px ${s.color}`}}/>
                  <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-1)",marginBottom:12,lineHeight:1.3}}>{s.label}</h3>
                  <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{s.body}</p>
                </GlassCard>
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
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c"><span className="dot-live"/>About</span>
          </motion.div>
          <motion.h2 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:780,marginBottom:24}}>
            We believe real estate is more than an asset.
          </motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:620,lineHeight:1.8,marginBottom:"clamp(48px,6vw,72px)"}}>
            It is a value to be preserved, managed, and grown through informed stewardship and a long-term perspective.
          </motion.p>
          <div className="grid-2" style={{gap:"clamp(24px,3vw,40px)",marginBottom:"clamp(40px,5vw,64px)"}}>
            {[
              {label:"VISION",color:"var(--cyan)",title:"A trusted partner across generations.",body:"To be a trusted partner for families, businesses, and individuals in structuring real estate ownership, managing assets, and turning them into sustainable opportunities that preserve value and support growth across generations."},
              {label:"MISSION",color:"#8A5CFF",title:"Governed frameworks that endure.",body:"We develop and manage real estate assets through clear governance and management frameworks that preserve value, enhance returns, and support long-term investment sustainability."},
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
                <GlassCard style={{padding:"clamp(28px,3.5vw,44px)",textAlign:"center",height:"100%"}}>
                  <div style={{fontSize:28,marginBottom:16,color:v.color,filter:`drop-shadow(0 0 12px ${v.color}66)`}}>{v.icon}</div>
                  <h3 style={{fontSize:18,fontWeight:700,color:"var(--text-1)",marginBottom:12}}>{v.title}</h3>
                  <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{v.body}</p>
                </GlassCard>
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
            <motion.h2 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>
              Structured for every type of ownership.
            </motion.h2>
            <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8,marginBottom:0}}>
              Our services cover the key aspects of real estate ownership, from structuring and governance to asset management, development, and investment.
            </motion.p>
          </div>
        </div>

        {SERVICES_DETAIL.map((svc,si)=>(
          <div key={svc.num} style={{background:si%2===1?"var(--bg-alt)":undefined,position:"relative",overflow:"hidden"}}>
            <ArchitecturalBg variant={si%2===0?"strata-left":"lattice"}/>
            <div className="container" style={{position:"relative",zIndex:1,padding:"clamp(48px,6vw,80px) 0"}}>
              <motion.div {...FI()} style={{marginBottom:12}}>
                <span className="t-xs" style={{color:svc.color,fontFamily:"monospace"}}>{svc.num}</span>
              </motion.div>
              <motion.h3 {...FU(.06)} className="t-h2" style={{color:"var(--text-1)",marginBottom:"clamp(40px,5vw,64px)",borderLeft:`3px solid ${svc.color}`,paddingLeft:20}}>
                {svc.title}
              </motion.h3>
              <div className="grid-3" style={{gap:"clamp(20px,2.5vw,32px)"}}>
                {svc.clients.map((c,ci)=>(
                  <motion.div key={c.label} {...FU(.06+ci*.1)}>
                    <GlassCard style={{padding:"clamp(24px,3vw,40px)",height:"100%",borderTop:`2px solid ${svc.color}44`}}>
                      <div style={{fontSize:12,color:svc.color,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:16}}>{c.label}</div>
                      <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.85}}>{c.body}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
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

              <motion.div {...FU(.14)} style={{display:"flex",flexDirection:"column",gap:0}}>
                {[
                  {Icon:LocationIcon,  label:"OFFICE",          value:"Jeddah, Saudi Arabia",        href:undefined},
                  {Icon:EmailIcon,     label:"ENQUIRIES",       value:"enquiries@qmulate.com",        href:"mailto:enquiries@qmulate.com"},
                  {Icon:null,          label:"PHONE",           value:"+966 53 333 9052",             href:"tel:+966533339052"},
                  {Icon:LockIcon,      label:"CONFIDENTIALITY", value:"All introductions are private", href:undefined},
                  {Icon:ClockIcon,     label:"RESPONSE TIME",   value:"Within one business day",      href:undefined},
                ].map(({Icon,label,value,href},i)=>(
                  <div key={label} style={{display:"flex",gap:20,alignItems:"flex-start",padding:"20px 0",borderBottom:"1px solid var(--glass-border)"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:"var(--g1)",border:"1px solid var(--glass-border)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {Icon ? <Icon size="sm"/> : <span style={{fontSize:15}}>📞</span>}
                    </div>
                    <div>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:4}}>{label}</div>
                      {href
                        ? <a href={href} style={{fontSize:14,color:"var(--cyan)",fontWeight:500}}>{value}</a>
                        : <div style={{fontSize:14,color:"var(--text-2)",fontWeight:500}}>{value}</div>
                      }
                    </div>
                  </div>
                ))}

                {/* Address */}
                <div style={{padding:"20px 0",borderBottom:"1px solid var(--glass-border)"}}>
                  <div className="t-xs" style={{color:"var(--text-4)",marginBottom:4}}>ADDRESS</div>
                  <p style={{fontSize:13,color:"var(--text-3)",lineHeight:1.7}}>
                    King Abdulaziz Rd, Albasatin Dist.<br/>
                    P.O. Box 23718, Jeddah 9351<br/>
                    Kingdom of Saudi Arabia
                  </p>
                </div>
              </motion.div>

              <motion.p {...FU(.32)} style={{fontSize:11,color:"var(--text-5)",marginTop:28,fontFamily:"var(--font-geist-mono,'Courier New'),monospace"}}>
                Privileged &amp; Confidential · CR: 7054453274 · VAT: 314819612900003
              </motion.p>
            </div>

            {/* ── Right column — form ── */}
            <motion.div {...FU(.1)}>
              <GlassCard style={{padding:"clamp(32px,4vw,52px)"}}>
                <div className="t-xs" style={{color:"var(--cyan)",marginBottom:28}}>INTRODUCTION REQUEST</div>

                {sent ? (
                  <div style={{textAlign:"center",padding:"40px 0"}}>
                    <div style={{fontSize:32,marginBottom:16}}>✓</div>
                    <h3 style={{fontSize:20,fontWeight:700,color:"var(--text-1)",marginBottom:8}}>Request sent.</h3>
                    <p style={{fontSize:14,color:"var(--text-3)"}}>We will be in touch within one business day.</p>
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
                    <button type="submit" className="btn btn-primary" style={{fontSize:15,padding:"14px",justifyContent:"center"}}>
                      Send introduction →
                    </button>
                    <p style={{fontSize:11,color:"var(--text-5)",textAlign:"center",lineHeight:1.6}}>
                      All introductions are private and confidential. We do not share your information.
                    </p>
                  </form>
                )}
              </GlassCard>
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
