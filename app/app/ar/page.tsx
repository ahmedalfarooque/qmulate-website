"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StrataMark } from "@/components/StrataMark";
import { ArchitecturalBg, StrataSculpture, GovernancePulse, BRAND_BLUE } from "@/components/Strata";
import { FU, FI, FS, SectionHeading, GlassCard } from "@/components/DS";
import { ServiceIcon } from "@/components/icons/GlassIcons";
import { MagneticButton, DrawLine } from "@/components/Motion";

const SERVICES_AR = [
  { id:"stewardship", label:"إدارة العقارات", color:BRAND_BLUE,
    headline:"إشراف احترافي يحافظ على قيمة الأصول ويعززها.",
    body:"نُدير محفظتك العقارية كمنظومة موحّدة ومحكومة. كل قرار يُتَّخذ ضمن إطار حوكمة موثَّق يضمن الاتساق والمساءلة والقيمة طويلة الأمد.",
    items:["إطار حوكمة موحَّد","تقارير ربعية للأداء","تجميع مراكز متعددة","توجيه القياسي","متابعة الامتثال","تقارير التموضع الاستراتيجي"] },
  { id:"growth", label:"النمو المحكوم", color:"#7C6AF0",
    headline:"نشر رأس المال ضمن حواجز هيكلية.",
    body:"النمو بلا حوكمة مضاربة. نصمّم تفويضات الاستثمار ومعايير الاستحواذ وأُطر نشر رأس المال التي تُتيح توسُّعاً منضبطاً.",
    items:["تصميم تفويض الاستثمار","إطار نشر رأس المال","تحسين هيكل الكيانات","هياكل عابرة للحدود","هيكلة صديقة للتوريث","أغلفة ضريبية كفؤة"] },
  { id:"advisory", label:"الاستشارات العقارية", color:"#8A5CFF",
    headline:"تحويل ذكاء السوق إلى قرارات حاسمة.",
    body:"نُحوِّل بيانات السوق الخام إلى قرارات استثمار منظَّمة. تغطي ممارستنا نشأة الصفقات والتقييم المستقل وإدارة الاستحواذ.",
    items:["نشأة الصفقات وإدارتها","التقييم المستقل","إدارة العناية الواجبة","حوكمة المعاملات","تقارير ذكاء السوق","تقييم البائعين"] },
  { id:"reporting", label:"تقارير الثروة", color:"#5B7CFA",
    headline:"رؤية كاملة عبر كل حيازة كل ربع.",
    body:"يستحق الأصيلون صورة واضحة ودقيقة عن ثروتهم. نُنتج تقارير موحَّدة تغطي الأداء والنسب والتعرُّض للمخاطر وامتثال الحوكمة.",
    items:["حزم ثروة ربعية موحَّدة","نسب الأداء","رسم خريطة التعرض للمخاطر","تقارير امتثال الحوكمة","توثيق بمستوى الأمناء","وصول مخصص للوحة التحكم"] },
];

const PILLARS_AR = [
  {v:"حوكمة",    l:"منظومة متكاملة"},
  {v:"توريث",   l:"هيكل متعدد الأجيال"},
  {v:"استدامة", l:"منظور مؤسسي"},
  {v:"انضباط",  l:"نمو محكوم"},
];

export default function ArHome() {
  const [activeSvc, setActiveSvc] = useState(0);

  return (
    <main className="hero-page ar">

      {/* ── Hero ── */}
      <section style={{
        minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
        position:"relative",overflow:"hidden",
        background:"linear-gradient(160deg,var(--bg-0),var(--bg-1),var(--bg-0))",
        padding:"clamp(90px,12vw,120px) clamp(20px,4vw,48px) 40px",
      }}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="bg-grid" style={{opacity:.5}}/>
        <StrataSculpture size={360} opacity={0.11}
          style={{left:"-3%",top:"50%",transform:"translateY(-50%)"}}/>

        <div style={{position:"relative",zIndex:5,width:"100%",maxWidth:1240}}>
          <div style={{
            background:"rgba(6,11,20,0.72)",
            backdropFilter:"blur(48px)",WebkitBackdropFilter:"blur(48px)",
            border:"1px solid rgba(255,255,255,0.10)",
            borderRadius:24,padding:"clamp(44px,6vw,80px)",
          }}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,5vw,80px)",alignItems:"center",direction:"rtl"}} className="hero-grid">
              <div>
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5,duration:.7}} style={{marginBottom:20,display:"flex",justifyContent:"flex-end"}}>
                  <span className="pill pill-c">
                    <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:BRAND_BLUE,marginLeft:6}}/>
                    منصة الثروة العقارية · الرياض
                  </span>
                </motion.div>

                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6}} style={{marginBottom:24,display:"flex",justifyContent:"flex-end"}}>
                  <StrataMark size={40} animate style={{color:"rgba(255,255,255,0.8)"}}/>
                </motion.div>

                <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}}
                  transition={{delay:.7,duration:1.1,ease:[.2,.8,.2,1]}}
                  style={{
                    fontSize:"clamp(40px,6vw,84px)",fontWeight:700,
                    letterSpacing:"-0.02em",lineHeight:.98,
                    color:"var(--snow)",marginBottom:20,textAlign:"right",
                  }}>
                  ثروة، <span style={{color:BRAND_BLUE}}>منظَّمة</span><br/>
                  لتدوم بعد<br/>
                  <span style={{color:"rgba(255,255,255,.2)"}}>صانعيها.</span>
                </motion.h1>

                <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.9,duration:.8}}
                  style={{fontSize:"clamp(15px,1.8vw,19px)",color:"var(--mist)",maxWidth:480,marginBottom:12,lineHeight:1.85,textAlign:"right"}}>
                  نُنظِّم الثروة العقارية — إدارة عقارات، وساطة، استشارات، ومرافق — في منظومة حوكمة واحدة ودائمة.
                </motion.p>

                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.95,duration:.7}}
                  style={{fontFamily:"'Inter',sans-serif",direction:"ltr",fontSize:13,color:"rgba(255,255,255,.15)",marginBottom:44,textAlign:"right"}}>
                  Wealth, structured to outlast its makers.
                </motion.p>

                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}}
                  style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-end",marginBottom:40}}>
                  <MagneticButton>
                    <Link href="/ar/contact" className="btn btn-primary" style={{fontSize:14,padding:"12px 28px",borderRadius:4}}>اطلب مقدمة ←</Link>
                  </MagneticButton>
                  <Link href="/ar/about" className="btn btn-ghost" style={{fontSize:14,padding:"12px 24px",borderRadius:4}}>نهجنا</Link>
                </motion.div>

                {/* Qualitative trust pillars — no numbers */}
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.15,duration:.8}}
                  style={{display:"flex",gap:24,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.07)",justifyContent:"flex-end",flexWrap:"wrap"}}>
                  {PILLARS_AR.map((item,i)=>(
                    <div key={i} style={{textAlign:"right"}}>
                      <div style={{fontSize:"clamp(15px,1.8vw,20px)",fontWeight:800,color:BRAND_BLUE,letterSpacing:"-0.02em"}}>{item.v}</div>
                      <div className="t-xs" style={{color:"var(--mist)",marginTop:3}}>{item.l}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right visual */}
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[
                  {val:"مستدام",  label:"هيكل الحوكمة",   sub:"موثَّق وقابل للمراجعة", accent:BRAND_BLUE,   delay:1.1},
                  {val:"منضبط",   label:"النمو المحكوم",    sub:"استراتيجية طويلة الأمد",accent:"#7C6AF0",   delay:1.25},
                  {val:"دائم",    label:"التوريث الهيكلي", sub:"جاهز لأجيال قادمة",     accent:"#8A5CFF",   delay:1.4},
                ].map((m,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{delay:m.delay,duration:.8}}>
                    <GlassCard style={{padding:"16px 20px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexDirection:"row-reverse"}}>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:"clamp(16px,2vw,24px)",fontWeight:800,color:m.accent,letterSpacing:"-0.03em",lineHeight:1}}>{m.val}</div>
                          <div style={{fontSize:12,color:"var(--mist)",marginTop:4}}>{m.label}</div>
                        </div>
                        <span style={{fontSize:10,color:m.accent,background:`${m.accent}14`,border:`1px solid ${m.accent}30`,borderRadius:3,padding:"3px 10px",whiteSpace:"nowrap"}}>{m.sub}</span>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <GovernancePulse opacity={0.10}
          style={{position:"absolute",bottom:16,left:0,right:0,width:"80%",maxWidth:720,margin:"0 auto"}}/>
      </section>

      {/* ── Qualitative pillars (no metrics) ── */}
      <section style={{background:"var(--bg-alt)",borderTop:"1px solid rgba(255,255,255,.055)",borderBottom:"1px solid rgba(255,255,255,.055)"}}>
        <div className="container">
          <div className="grid-4" style={{padding:"clamp(36px,4.5vw,56px) 0",direction:"rtl"}}>
            {[
              {label:"إدارة العقارات",sub:"إشراف احترافي يحافظ على القيمة ويعززها."},
              {label:"النمو المحكوم",  sub:"أنظمة منضبطة تدعم الاستمرارية والأداء."},
              {label:"الاستشارات",    sub:"قدرات استشارية تحوّل المعلومات إلى فرص."},
              {label:"متعدد الأجيال", sub:"انقل النية — لا الأصول فحسب — بين الأجيال."},
            ].map((p,i)=>(
              <motion.div key={p.label} {...FU(i*.08)}>
                <div style={{display:"flex",flexDirection:"column",gap:10,padding:"20px 0",textAlign:"right"}}>
                  <div style={{width:2,height:24,background:BRAND_BLUE,borderRadius:2,marginRight:"auto",marginLeft:0}}/>
                  <div style={{fontSize:14,fontWeight:700,color:"var(--snow)",letterSpacing:"-0.015em"}}>{p.label}</div>
                  <div style={{fontSize:12,color:"var(--mist)",lineHeight:1.7}}>{p.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(36px,4.5vw,56px)"}}>
            <motion.div {...FI()} style={{marginBottom:16}}>
              <span className="pill pill-c">
                <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:BRAND_BLUE,marginLeft:6}}/>
                خدماتنا
              </span>
            </motion.div>
            <motion.h2 {...FU(.08)} style={{fontSize:"clamp(26px,3.5vw,44px)",fontWeight:700,color:"var(--snow)",letterSpacing:"-0.03em"}}>كل ما تحتاجه ثروتك.</motion.h2>
          </div>

          <div style={{display:"flex",gap:6,marginBottom:36,flexWrap:"wrap",justifyContent:"center"}}>
            {SERVICES_AR.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveSvc(i)}
                whileHover={{scale:1.02}} whileTap={{scale:.98}}
                style={{
                  padding:"8px 18px",borderRadius:3,fontSize:12,fontWeight:600,cursor:"pointer",
                  background:activeSvc===i?s.color:"rgba(255,255,255,.04)",
                  color:activeSvc===i?"#fff":"var(--mist)",
                  border:`1px solid ${activeSvc===i?`${s.color}55`:"rgba(255,255,255,.07)"}`,
                  transition:"all .2s",
                }}>
                {s.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeSvc} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"clamp(28px,4vw,60px)",alignItems:"start",direction:"rtl"}} className="grid-2">
                <div>
                  <div style={{marginBottom:16}}><ServiceIcon id={SERVICES_AR[activeSvc].id} size="lg"/></div>
                  <h3 style={{fontSize:"clamp(18px,2.2vw,27px)",fontWeight:700,color:"var(--snow)",marginBottom:16,lineHeight:1.25,letterSpacing:"-0.02em"}}>{SERVICES_AR[activeSvc].headline}</h3>
                  <p style={{fontSize:14,color:"var(--mist)",marginBottom:32,lineHeight:1.9}}>{SERVICES_AR[activeSvc].body}</p>
                  <Link href="/ar/services" className="btn btn-primary" style={{fontSize:13,padding:"10px 22px",borderRadius:4}}>استكشف الخدمة ←</Link>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {SERVICES_AR[activeSvc].items.map((item,i)=>(
                    <motion.div key={item} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}>
                      <div style={{display:"flex",gap:12,padding:"11px 15px",background:"rgba(255,255,255,.03)",border:"1px solid var(--glass-border)",borderRadius:3,alignItems:"center",flexDirection:"row-reverse"}}>
                        <div style={{width:3,height:3,borderRadius:"50%",background:SERVICES_AR[activeSvc].color,flexShrink:0}}/>
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

      {/* ── CTA ── */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <ArchitecturalBg variant="mixed"/>
        <StrataSculpture size={460} opacity={0.09} style={{right:"-5%",top:"50%",transform:"translateY(-50%)"}}/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}>
            <span className="pill pill-c" style={{marginBottom:24}}>
              <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:BRAND_BLUE,marginLeft:6}}/>
              مكتب العائلة الخاص · الرياض
            </span>
          </motion.div>
          <motion.div {...FU(.07)} style={{display:"flex",justifyContent:"center",marginBottom:20}}>
            <StrataMark size={48} animate style={{color:"rgba(255,255,255,0.7)"}}/>
          </motion.div>
          <motion.h2 {...FU(.12)} style={{fontSize:"clamp(36px,5.5vw,80px)",fontWeight:700,letterSpacing:"-0.032em",lineHeight:1.04,color:"var(--snow)",marginBottom:18}}>
            مبني للحوكمة.<br/><span style={{color:BRAND_BLUE}}>مصمَّم ليدوم.</span>
          </motion.h2>
          <motion.p {...FU(.18)} style={{fontSize:"clamp(14px,1.7vw,18px)",color:"var(--mist)",maxWidth:480,margin:"0 auto 36px",lineHeight:1.85}}>
            إذا كنت مستعداً للانتقال من إدارة الأصول إلى حوكمة الثروة، يسعدنا التحدث معك بسرية تامة.
          </motion.p>
          <motion.div {...FU(.22)} style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <MagneticButton>
              <Link href="/ar/contact" className="btn btn-primary" style={{fontSize:14,padding:"13px 32px",borderRadius:4}}>اطلب مقدمة ←</Link>
            </MagneticButton>
            <Link href="/ar/services" className="btn btn-ghost" style={{fontSize:14,padding:"13px 26px",borderRadius:4}}>استكشف خدماتنا</Link>
          </motion.div>
        </div>
      </section>

      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;direction:rtl}}`}</style>
    </main>
  );
}
