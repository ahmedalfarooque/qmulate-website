"use client";
import { ServiceIcon, ProcessIcon } from "@/components/icons/GlassIcons";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StrataMark } from "@/components/StrataMark";
import {
  FU, FI, FS, Counter, SectionHeading, GlassCard, MetricCard, FeatureCard,
  OrbBg, IrisBlob, GoldBlobComp, Bubbles, RippleSphere, MouseGlow, HeroGlass, FloatingBadge
} from "@/components/DS";

const SERVICES_AR = [
  { id:"stewardship", icon:"◈", label:"إدارة العقارات", color:"var(--cyan)", headline:"إشراف احترافي يحافظ على القيمة ويضاعفها.", body:"نُدير محفظتك العقارية كمنظومة موحّدة ومحكومة — وليس مجرد مجموعة أصول متفرقة. كل قرار يُتَّخذ ضمن إطار حوكمة موثَّق يضمن الاتساق والمساءلة والقيمة طويلة الأمد.", items:["إطار حوكمة موحَّد","تقارير ربعية للأداء والحوكمة","تجميع مراكز متعددة الحراس","توجيه القياسي ونسب الأداء","متابعة الامتثال التنظيمي","تقارير التموضع الاستراتيجي"] },
  { id:"growth", icon:"⬡", label:"النمو المحكوم", color:"#8A5CFF", headline:"نشر رأس المال ضمن حواجز هيكلية.", body:"النمو بلا حوكمة مضاربة. نصمّم تفويضات الاستثمار ومعايير الاستحواذ وأُطر نشر رأس المال التي تُتيح توسُّعاً طموحاً مع الحفاظ على سلامة الهيكل.", items:["تصميم تفويض الاستثمار","إطار نشر رأس المال","تحسين هيكل الكيانات والحيازات","تصميم الهياكل العابرة للحدود","هيكلة صديقة للتوريث","تصميم الأغلفة الضريبية الكفؤة"] },
  { id:"advisory", icon:"◉", label:"الاستشارات العقارية", color:"#4D8DFF", headline:"تحويل ذكاء السوق إلى قرارات حاسمة.", body:"نُحوِّل بيانات السوق الخام إلى قرارات استثمار منظَّمة. تغطي ممارستنا الاستشارية نشأة الصفقات والتقييم المستقل وإدارة الاستحواذ وحوكمة المعاملات.", items:["نشأة الصفقات وإدارة الأنابيب","التقييم المستقل والتقدير","إدارة العناية الواجبة","حوكمة المعاملات","تقارير ذكاء السوق","تقييم البائعين والأطراف المقابلة"] },
  { id:"reporting", icon:"⬟", label:"تقارير الثروة", color:"#A855F7", headline:"رؤية كاملة عبر كل حيازة كل ربع.", body:"يستحق الأصيلون صورة واضحة ودقيقة عن ثروتهم. نُنتج تقارير موحَّدة تغطي الأداء والنسب والتعرُّض للمخاطر وامتثال الحوكمة.", items:["حزم ثروة ربعية موحَّدة","نسب الأداء وتحليلاته","رسم خريطة التعرض للمخاطر","تقارير امتثال الحوكمة","توثيق بمستوى الأمناء","وصول مخصص للوحة التحكم"] },
];

export default function ArHome() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="hero-page ar">
      <MouseGlow/>

      {/* ── HERO ── */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",background:"var(--bg-0)",padding:"clamp(90px,12vw,120px) clamp(20px,4vw,48px) 40px"}}>
        <OrbBg cyan violet blue warm/>
        <div className="bg-grid" style={{opacity:.7}}/>
        <IrisBlob size={560} top="-15%" left="-8%" delay={0} opacity={0.45}/>
        <GoldBlobComp size={380} bottom="-5%" right="-6%" delay={3}/>
        <Bubbles/>

        <div style={{position:"relative",zIndex:10,width:"100%",maxWidth:1240}}>
          <HeroGlass style={{borderRadius:36,padding:"clamp(44px,6vw,80px)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:"clamp(40px,5vw,80px)",alignItems:"center",direction:"rtl"}} className="hero-grid">
              {/* Right (RTL = appears right) */}
              <div>
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}} style={{marginBottom:28}}>
                  <span className="pill pill-c"><span className="dot-live"/>منصة الثروة العقارية · الرياض</span>
                </motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.6}} style={{marginBottom:24,display:"flex",justifyContent:"flex-end"}}>
                  <StrataMark size={48} animate style={{color:"var(--text-1)"}}/>
                </motion.div>
                <motion.h1 initial={{opacity:0,y:30,scale:.95}} animate={{opacity:1,y:0,scale:1}}
                  transition={{delay:.8,duration:1.1}}
                  className="t-d gt-w" style={{marginBottom:20,fontSize:"clamp(44px,6vw,88px)",textAlign:"right"}}>
                  ثروة،<br/>
                  <span className="gt-c">منظَّمة</span><br/>
                  لتدوم بعد<br/>
                  <span style={{color:"rgba(255,255,255,.2)"}}>صانعيها.</span>
                </motion.h1>
                <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}}
                  className="t-xl" style={{color:"var(--text-3)",maxWidth:480,marginBottom:12,lineHeight:1.85,textAlign:"right"}}>
                  نُنظِّم الثروة العقارية — إدارة عقارات، وساطة، استشارات، ومرافق — في منظومة حوكمة واحدة ودائمة.
                </motion.p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.05,duration:.7}}
                  style={{fontFamily:"'Inter',sans-serif",direction:"ltr",fontSize:14,color:"rgba(255,255,255,.18)",marginBottom:44,textAlign:"right"}}>
                  Wealth, structured to outlast its makers.
                </motion.p>
                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.15,duration:.7}}
                  style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-end",marginBottom:52}}>
                  <Link href="/ar/contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 34px"}}>اطلب مقدمة ←</Link>
                  <Link href="/ar/about" className="btn btn-ghost" style={{fontSize:15,padding:"14px 30px"}}>نهجنا</Link>
                </motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:.8}}
                  style={{display:"flex",gap:32,paddingTop:28,borderTop:"1px solid var(--glass-border)",justifyContent:"flex-end"}} className="hero-trust">
                  {[{v:"SAR 2.4B+",l:"تحت الحوكمة"},{v:"الجيل الثالث",l:"عمق التوريث"},{v:"100%",l:"تغطية الحوكمة"}].map(item=>(
                    <div key={item.l} style={{textAlign:"right"}}>
                      <div style={{fontSize:"clamp(16px,2vw,22px)",fontWeight:800,color:"var(--cyan)",letterSpacing:"-0.03em",filter:"drop-shadow(0 0 16px rgba(0,212,255,.5))"}}>{item.v}</div>
                      <div className="t-xs" style={{color:"var(--text-4)",marginTop:3}}>{item.l}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
              {/* Left (RTL = appears left) */}
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:16}}>
                <motion.div initial={{opacity:0,scale:.5}} animate={{opacity:1,scale:1}} transition={{delay:1.0,duration:1.2,ease:[.34,1.56,.64,1]}}
                  style={{display:"flex",justifyContent:"center",marginBottom:8}}>
                  <RippleSphere size={120}/>
                </motion.div>
                {[
                  {val:"SAR 48.2m",label:"إجمالي الثروة (ر1)",sub:"▲ 2.4% ربعية",accent:"#00D4FF",delay:1.2},
                  {val:"94.7%",label:"درجة الحوكمة",sub:"الأفضل في فئته",accent:"#8A5CFF",delay:1.35},
                  {val:"3 أجيال",label:"أُفق التوريث",sub:"أُطر نشطة",accent:"#4D8DFF",delay:1.5},
                ].map((m,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:m.delay,duration:.8}}>
                    <GlassCard style={{padding:"18px 22px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexDirection:"row-reverse"}}>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:"clamp(18px,2vw,26px)",fontWeight:800,color:m.accent,letterSpacing:"-0.03em",lineHeight:1,filter:`drop-shadow(0 0 12px ${m.accent}66)`}}>{m.val}</div>
                          <div style={{fontSize:12,color:"var(--text-3)",marginTop:4}}>{m.label}</div>
                        </div>
                        <span style={{fontSize:10,color:m.accent,background:`${m.accent}14`,border:`1px solid ${m.accent}30`,borderRadius:100,padding:"3px 10px",whiteSpace:"nowrap"}}>{m.sub}</span>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </HeroGlass>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section style={{background:"var(--bg-alt)",backdropFilter:"blur(40px)",borderTop:"1px solid var(--glass-border)",borderBottom:"1px solid var(--glass-border)"}}>
        <div className="container">
          <div className="grid-4" style={{padding:"clamp(40px,5vw,64px) 0"}}>
            {[
              {to:2.4,pre:"SAR ",suf:"B+",l:"الأصول تحت الحوكمة",c:"#00D4FF"},
              {to:14,suf:" عاماً",l:"سجل الحوكمة",c:"#8A5CFF"},
              {to:97,suf:"%",l:"معدل استبقاء العملاء",c:"#4D8DFF"},
              {to:100,suf:"%",l:"تغطية الحوكمة",c:"#A855F7"},
            ].map((m,i)=>(
              <motion.div key={m.l} {...FU(i*.1)} style={{textAlign:"center",padding:"clamp(24px,3vw,40px) 16px"}}>
                <div style={{fontSize:"clamp(36px,4.5vw,60px)",fontWeight:900,letterSpacing:"-0.05em",color:m.c,filter:`drop-shadow(0 0 24px ${m.c}66)`,fontVariantNumeric:"tabular-nums",lineHeight:1,marginBottom:8,direction:"ltr"}}>
                  <Counter to={m.to} prefix={m.pre||""} suffix={m.suf} decimals={m.to<10?1:0}/>
                </div>
                <div style={{fontSize:14,color:"var(--text-2)",fontWeight:600,marginBottom:4}}>{m.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <IrisBlob size={500} top="-10%" left="-5%" opacity={0.12}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <motion.div {...FI()} style={{marginBottom:16}}><span className="pill pill-c"><span className="dot-live"/>خدماتنا</span></motion.div>
            <motion.h2 {...FU(.08)} className="t-h2 gt-w">كل ما تحتاجه ثروتك.</motion.h2>
            <motion.p {...FU(.14)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>ست خطوط خدمة. منظومة حوكمة موحَّدة واحدة.</motion.p>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap",justifyContent:"center"}}>
            {SERVICES_AR.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveService(i)} whileHover={{scale:1.03}} whileTap={{scale:.97}}
                style={{padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",
                  background:activeService===i?s.color:"rgba(255,255,255,.04)",
                  color:activeService===i?"#020408":"var(--text-3)",
                  border:`1px solid ${activeService===i?s.color:"rgba(255,255,255,.08)"}`,transition:"all .25s"}}>
                <ServiceIcon id={s.id} size="xs"/><span style={{marginRight:4}}>{s.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeService} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.4}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"clamp(32px,4vw,64px)",alignItems:"start",direction:"rtl"}} className="grid-2">
                <div>
                  <div style={{fontSize:28,marginBottom:16}}>{SERVICES_AR[activeService].icon}</div>
                  <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:16,lineHeight:1.25}}>{SERVICES_AR[activeService].headline}</h3>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:32,lineHeight:1.9}}>{SERVICES_AR[activeService].body}</p>
                  <Link href="/ar/services" className="btn btn-primary">استكشف الخدمة ←</Link>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {SERVICES_AR[activeService].items.map((item,i)=>(
                    <motion.div key={item} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*.06}}>
                      <div style={{display:"flex",gap:12,padding:"14px 18px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:12,alignItems:"center",flexDirection:"row-reverse"}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:SERVICES_AR[activeService].color,flexShrink:0,boxShadow:`0 0 8px ${SERVICES_AR[activeService].color}`}}/>
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

      {/* ── CTA ── */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <IrisBlob size={700} top="-30%" right="-15%" opacity={0.18}/>
        <GoldBlobComp size={400} bottom="-20%" left="-10%" delay={5}/>
        <Bubbles/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}><span className="pill pill-v" style={{marginBottom:28}}>مكتب العائلة الخاص · الرياض</span></motion.div>
          <motion.h2 {...FU(.08)} className="t-d gt-a" style={{marginBottom:20,fontSize:"clamp(44px,7vw,96px)"}}>
            مبني للحوكمة.<br/>مصمَّم ليدوم.
          </motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:540,margin:"0 auto 44px",lineHeight:1.85}}>
            إذا كنت مستعداً للانتقال من إدارة الأصول إلى حوكمة الثروة، يسعدنا التحدث معك بسرية تامة.
          </motion.p>
          <motion.div {...FU(.22)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/ar/contact" className="btn btn-primary" style={{fontSize:16,padding:"16px 40px"}}>اطلب مقدمة ←</Link>
            <Link href="/ar/services" className="btn btn-ghost" style={{fontSize:16,padding:"16px 36px"}}>استكشف خدماتنا</Link>
          </motion.div>
        </div>
      </section>

      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;direction:rtl}}`}</style>
    </main>
  );
}
