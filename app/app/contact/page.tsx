"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocationIcon, EmailIcon, LockIcon, ClockIcon, CheckIcon, SuccessStateIcon } from "@/components/icons/GlassIcons";
import { FU, FI, FS, SectionHeading, GlassCard, OrbBg, IrisBlob, GoldBlobComp, Bubbles, MouseGlow } from "@/components/DS";

const REASONS = ["Governance Architecture","Portfolio Intelligence","Succession Planning","Wealth Reporting","Risk Management","General Enquiry"];

export default function Contact() {
  const [form, setForm] = useState({ name:"",email:"",entity:"",reason:"",message:"" });
  const [focus, setFocus] = useState<string|null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const inputStyle = (field:string):React.CSSProperties => ({
    width:"100%",background:"var(--g1)",
    border:`1px solid ${focus===field?"rgba(0,212,255,.5)":"rgba(255,255,255,.08)"}`,
    borderRadius:12,padding:"13px 16px",fontSize:14,color:"var(--text-1)",
    outline:"none",fontFamily:"'Inter',sans-serif",
    transition:"border-color .2s, box-shadow .2s",
    boxShadow:focus===field?"0 0 0 3px rgba(0,212,255,.12)":"none",
  });

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    setSending(true);
    await new Promise(r=>setTimeout(r,1500));
    setSending(false);
    setSent(true);
  };

  return (
    <main>
      <MouseGlow/>

      {/* Hero */}
      <section style={{minHeight:"50vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <OrbBg cyan violet/>
        <IrisBlob size={500} top="-15%" right="-8%" opacity={0.3}/>
        <div className="bg-grid" style={{opacity:.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}>
            <span className="pill pill-c"><span className="dot-live"/>Private & Confidential</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>
            Begin a conversation.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>
            Every introduction is treated with complete discretion. We typically respond within one business day.
          </motion.p>
        </div>
      </section>

      {/* Form section */}
      <section className="section-sm" style={{position:"relative",overflow:"hidden"}}>
        <OrbBg cyan={false} violet blue/>
        <GoldBlobComp size={350} bottom="-10%" right="-5%" delay={3}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"clamp(40px,5vw,96px)",alignItems:"start"}} className="grid-2">
            {/* Left — info */}
            <div>
              <motion.div {...FU()}>
                <SectionHeading eyebrow="Contact" title="Private introductions only."/>
              </motion.div>
              <motion.div {...FU(.12)} style={{display:"flex",flexDirection:"column",gap:24,marginTop:36}}>
                {[
                  { icon:"loc",  label:"Office", val:"Riyadh, Saudi Arabia" },
                  { icon:"email",label:"Enquiries", val:"enquiries@qmulate.com" },
                  { icon:"lock", label:"Confidentiality", val:"All introductions are private" },
                  { icon:"clock",label:"Response Time", val:"Within one business day" },
                ].map(item=>(
                  <div key={item.label} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                    <div style={{flexShrink:0}}>
                      {item.icon==="loc"&&<LocationIcon size="sm" animated={false}/>}
                      {item.icon==="email"&&<EmailIcon size="sm" animated={false}/>}
                      {item.icon==="lock"&&<LockIcon size="sm" animated={false}/>}
                      {item.icon==="clock"&&<ClockIcon size="sm" animated={false}/>}
                    </div>
                    <div>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:4}}>{item.label}</div>
                      <div style={{fontSize:14,color:"var(--text-2)"}}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div {...FU(.2)} style={{marginTop:40}}>
                <GlassCard style={{padding:"24px 28px"}}>
                  <div style={{fontSize:13,color:"var(--text-3)",lineHeight:1.8}}>
                    <strong style={{color:"var(--text-1)",display:"block",marginBottom:8}}>Minimum Mandate</strong>
                    We typically engage with principals managing real estate portfolios of SAR 100M and above. If you are below this threshold and believe our services are still relevant, we are happy to discuss your situation.
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div {...FS(.15)}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="success" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>
                    <GlassCard style={{padding:"clamp(40px,5vw,64px)",textAlign:"center"}}>
                      <div style={{marginBottom:20,display:"flex",justifyContent:"center"}}><SuccessStateIcon size="xl" animated={false}/></div>
                      <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:12}}>Introduction received.</h3>
                      <p style={{color:"var(--text-3)",lineHeight:1.8,fontSize:15}}>Thank you. We have received your enquiry and will respond within one business day. All communications are treated with complete discretion.</p>
                    </GlassCard>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    <GlassCard style={{padding:"clamp(32px,4vw,52px)"}}>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:28}}>INTRODUCTION REQUEST</div>
                      <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:18}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                          <div>
                            <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Full name *</label>
                            <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                              placeholder="Your name" style={inputStyle("name")}
                              onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)}/>
                          </div>
                          <div>
                            <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Email address *</label>
                            <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                              placeholder="your@email.com" style={inputStyle("email")}
                              onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)}/>
                          </div>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Family / Entity name</label>
                          <input value={form.entity} onChange={e=>setForm({...form,entity:e.target.value})}
                            placeholder="Your family or entity name" style={inputStyle("entity")}
                            onFocus={()=>setFocus("entity")} onBlur={()=>setFocus(null)}/>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Area of interest</label>
                          <select value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}
                            style={{...inputStyle("reason"),cursor:"pointer",appearance:"none"} as React.CSSProperties}
                            onFocus={()=>setFocus("reason")} onBlur={()=>setFocus(null)}>
                            <option value="">Select an area</option>
                            {REASONS.map(r=><option key={r} value={r} style={{background:"var(--bg-1)"}}>{r}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Message *</label>
                          <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                            placeholder="Tell us about your situation and what you are looking to achieve."
                            style={{...inputStyle("message"),resize:"vertical",minHeight:120} as React.CSSProperties}
                            onFocus={()=>setFocus("message")} onBlur={()=>setFocus(null)}/>
                        </div>
                        <button type="submit" disabled={sending} className="btn btn-primary"
                          style={{fontSize:15,padding:"14px",width:"100%",opacity:sending?.7:1,cursor:sending?"not-allowed":"pointer"}}>
                          {sending ? "Sending..." : "Send introduction →"}
                        </button>
                        <p style={{fontSize:11,color:"var(--text-4)",textAlign:"center"}}>All introductions are private and confidential. We do not share your information.</p>
                      </form>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
