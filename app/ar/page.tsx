"use client";
import { ServiceIcon } from "@/components/icons/GlassIcons";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FU, FI, FS, SectionHeading, GlassCard, HeroGlass
} from "@/components/DS";
import {
  ArchitecturalBg, StrataLines, GovernancePulse, StrataSculpture, BRAND_BLUE
} from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";

const SERVICES_AR = [
  { id:"stewardship", icon:"◈", label:"إدارة العقارات", color:"var(--cyan)", headline:"إشراف احترافي يحافظ على القيمة ويضاعفها.", body:"نُدير محفظتك العقارية كمنظومة موحّدة ومحكومة — وليس مجرد مجموعة أصول متفرقة. كل قرار يُتَّخذ ضمن إطار حوكمة موثَّق يضمن الاتساق والمساءلة والقيمة طويلة الأمد.", items:["إطار حوكمة موحَّد","تقارير ربعية للأداء والحوكمة","تجميع مراكز متعددة الحراس","توجيه القياسي ونسب الأداء","متابعة الامتثال التنظيمي","تقارير التموضع الاستراتيجي"] },
  { id:"growth", icon:"⬡", label:"النمو المحكوم", color:"#8A5CFF", headline:"نشر رأس المال ضمن حواجز هيكلية.", body:"النمو بلا حوكمة مضاربة. نصمّم تفويضات الاستثمار ومعايير الاستحواذ وأُطر نشر رأس المال التي تُتيح توسُّعاً طموحاً مع الحفاظ على سلامة الهيكل.", items:["تصميم تفويض الاستثمار","إطار نشر رأس المال","تحسين هيكل الكيانات والحيازات","تصميم الهياكل العابرة للحدود","هيكلة صديقة للتوريث","تصميم الأغلفة الضريبية الكفؤة"] },
  { id:"advisory", icon:"◉", label:"الاستشارات العقارية", color:"#4D8DFF", headline:"تحويل ذكاء السوق إلى قرارات حاسمة.", body:"نُحوِّل بيانات السوق الخام إلى قرارات استثمار منظَّمة. تغطي ممارستنا الاستشارية نشأة الصفقات والتقييم المستقل وإدارة الاستحواذ وحوكمة المعاملات.", items:["نشأة الصفقات وإدارة الأنابيب","التقييم المستقل والتقدير","إدارة العناية الواجبة","حوكمة المعاملات","تقارير ذكاء السوق","تقييم البائعين والأطراف المقابلة"] },
  { id:"reporting", icon:"⬟", label:"تقارير الثروة", color:"#A855F7", headline:"رؤية كاملة عبر كل حيازة كل ربع.", body:"يستحق الأصيلون صورة واضحة ودقيقة عن ثروتهم. نُنتج تقارير موحَّدة تغطي الأداء والنسب والتعرُّض للمخاطر وامتثال الحوكمة.", items:["حزم ثروة ربعية موحَّدة","نسب الأداء وتحليلاته","رسم خريطة التعرض للمخاطر","تقارير امتثال الحوكمة","توثيق بمستوى الأمناء","وصول مخصص للوحة التحكم"] },
];

const AR_STUBS: Record<string,{badge:string,h1:string,sub:string}> = {
  about:    {badge:"من نحن",h1:"مكتب عائلة مُهندَس للديمومة.",sub:"تأسَّست كيوميليت لحل مشكلة محددة: معظم الثروات العقارية تُدار بصورة تفاعلية لا استباقية. نحن هنا لتغيير ذلك."},
  services: {badge:"الخدمات",h1:"كل ما تحتاجه ثروتك العقارية.",sub:"ست خطوط خدمة. منظومة حوكمة موحَّدة. كل خدمة تعمل بالتنسيق مع الأخريات."},
  solutions:{badge:"الحلول والتقنية",h1:"تقنية بمستوى المؤسسات للثروة العقارية.",sub:"ست حلول متكاملة تشكّل البنية التحتية الكاملة لإدارة الثروة العقارية المحكومة."},
  projects: {badge:"مشاريع مختارة",h1:"تفويضات أعادت تعريف معنى الحوكمة.",sub:"ثلاث دراسات حالة من محفظتنا — مُخفاة الهوية بإذن العملاء."},
  contact:  {badge:"خاص وسري",h1:"ابدأ محادثة.",sub:"كل مقدمة تُعامَل بسرية تامة. عادةً ما نرد خلال يوم عمل واحد."},
};

export default function ArHome() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="hero-page ar" style={{ position: 'relative' }}>
      <PageBackground variant="home" />

      {/* ════════════════════════════════════════
          HOME — Hero
          ════════════════════════════════════════ */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",background:"var(--bg-0)",padding:"clamp(90px,12vw,120px) clamp(20px,4vw,48px) 40px"}}>
        <ArchitecturalBg variant="mixed"/>

        <div style={{position:"relative",zIndex:10,width:"100%",maxWidth:1240}}>
          <HeroGlass style={{borderRadius:36,padding:"clamp(44px,6vw,80px)"}}>
            {/* direction:"ltr" ensures child 1 → LEFT col, child 2 → RIGHT col regardless of inherited RTL */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:"clamp(40px,5vw,80px)",alignItems:"center",direction:"ltr"}} className="hero-grid">

              {/* LEFT column — 3D Logo */}
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:16,alignItems:"center",justifyContent:"center"}}>
                <motion.div initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{delay:1.0,duration:1.0,ease:[.34,1.56,.64,1]}}>
                  <Logo3D size={250}/>
                </motion.div>
              </div>

              {/* RIGHT column — Text (direction ltr for flex-end = visual right) */}
              <div style={{direction:"ltr"}}>
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}} style={{marginBottom:28,display:"flex",justifyContent:"flex-end"}}>
                  <span className="pill pill-c"><span className="dot-live"/>منصة الثروة العقارية · الرياض</span>
                </motion.div>

                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.6}} style={{marginBottom:24,display:"flex",justifyContent:"flex-end"}}>
                  <img src="/Logo.png" alt="QMULATE" style={{width:'150px',height:'auto',objectFit:'contain',filter:'drop-shadow(0 0 20px rgba(91,124,250,0.6)) drop-shadow(0 0 40px rgba(91,124,250,0.25))'}}/>
                </motion.div>

                <motion.h1 initial={{opacity:0,y:30,scale:.95}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.8,duration:1.1}} className="t-d gt-w" style={{marginBottom:20,fontSize:"clamp(44px,6vw,88px)",textAlign:"right",direction:"rtl"}}>
                  ثروة،<br/><span className="gt-c">منظَّمة</span><br/>لتدوم بعد<br/><span style={{color:"rgba(255,255,255,.2)"}}>صانعيها.</span>
                </motion.h1>

                <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}} className="t-xl" style={{color:"var(--text-3)",maxWidth:480,marginBottom:12,lineHeight:1.85,textAlign:"right",direction:"rtl"}}>
                  نُنظِّم الثروة العقارية — إدارة عقارات، وساطة، استشارات، ومرافق — في منظومة حوكمة واحدة ودائمة.
                </motion.p>

                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.05,duration:.7}} style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:"rgba(255,255,255,.18)",marginBottom:44,textAlign:"right"}}>
                  Wealth, structured to outlast its makers.
                </motion.p>

                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.15,duration:.7}} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-end",marginBottom:52}}>
                  <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 34px"}}>← اطلب مقدمة</Link>
                  <Link href="#about" className="btn btn-ghost" style={{fontSize:15,padding:"14px 30px"}}>نهجنا</Link>
                </motion.div>

                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:.8}} style={{display:"flex",gap:28,paddingTop:28,borderTop:"1px solid var(--glass-border)",justifyContent:"flex-end",flexWrap:"wrap"}} className="hero-trust">
                  {[{icon:"◈",v:"رعاية العقار",l:"حوكمة الأصول"},{icon:"⬡",v:"النمو المحكوم",l:"نشر رأس المال"},{icon:"◉",v:"الاستمرارية الجيلية",l:"إطار التوريث"}].map(item=>(
                    <div key={item.l} style={{textAlign:"right"}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end",marginBottom:4}}>
                        <div style={{fontSize:16,color:"var(--cyan)",filter:"drop-shadow(0 0 10px rgba(0,212,255,.5))"}}>{item.icon}</div>
                        <div style={{fontSize:"clamp(13px,1.5vw,15px)",fontWeight:700,color:"var(--text-1)"}}>{item.v}</div>
                      </div>
                      <div style={{display:"flex",justifyContent:"flex-end"}}><StrataLines count={2} width={52} opacity={0.3} color="var(--cyan)"/></div>
                      <div className="t-xs" style={{color:"var(--text-4)",marginTop:4}}>{item.l}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </HeroGlass>
        </div>
      </section>

      {/* HOME — Pillars */}
      <section style={{background:"var(--bg-alt)",backdropFilter:"blur(40px)",borderTop:"1px solid var(--glass-border)",borderBottom:"1px solid var(--glass-border)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-4" style={{padding:"clamp(40px,5vw,64px) 0"}}>
            {[{icon:"◈",label:"رعاية العقار",desc:"كل أصل محكوم بإطار سياسات",color:"#00D4FF"},{icon:"⬡",label:"النمو المحكوم",desc:"رأس مال ينشر ضمن حواجز هيكلية",color:"#8A5CFF"},{icon:"◉",label:"الحفاظ طويل الأمد",desc:"هياكل مبنية للاستمرارية الجيلية",color:"#4D8DFF"},{icon:"⬟",label:"الاستمرارية الجيلية",desc:"أُطر التوريث نشطة عبر التفويضات",color:"#A855F7"}].map((p,i)=>(
              <motion.div key={p.label} {...FU(i*.1)} style={{textAlign:"center",padding:"clamp(24px,3vw,40px) 16px"}}>
                <div style={{marginBottom:14,display:"flex",justifyContent:"center"}}><StrataLines count={3} width={60} opacity={0.22} color={p.color}/></div>
                <div style={{fontSize:26,marginBottom:10,color:p.color,filter:`drop-shadow(0 0 18px ${p.color}55)`}}>{p.icon}</div>
                <div style={{fontSize:14,color:"var(--text-1)",fontWeight:700,marginBottom:6}}>{p.label}</div>
                <div style={{fontSize:12,color:"var(--text-4)",lineHeight:1.6}}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOME — Services */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <motion.div {...FI()} style={{marginBottom:16}}><span className="pill pill-c"><span className="dot-live"/>خدماتنا</span></motion.div>
            <motion.h2 {...FU(.08)} className="t-h2 gt-w">كل ما تحتاجه ثروتك.</motion.h2>
            <motion.p {...FU(.14)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>ست خطوط خدمة. منظومة حوكمة موحَّدة واحدة.</motion.p>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap",justifyContent:"center",direction:"ltr"}}>
            {SERVICES_AR.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveService(i)} whileHover={{scale:1.03}} whileTap={{scale:.97}} style={{padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",background:activeService===i?s.color:"rgba(255,255,255,.04)",color:activeService===i?"#020408":"var(--text-3)",border:`1px solid ${activeService===i?s.color:"rgba(255,255,255,.08)"}`,transition:"all .25s",display:"flex",alignItems:"center",gap:6}}>
                <ServiceIcon id={s.id} size="xs"/><span>{s.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeService} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.4}}>
              {/* direction:"rtl" on grid: text col is child-1 → RIGHT, items col is child-2 → LEFT */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"clamp(32px,4vw,64px)",alignItems:"start",direction:"rtl"}} className="grid-2">
                <div>
                  <div style={{fontSize:28,marginBottom:16,textAlign:"right"}}>{SERVICES_AR[activeService].icon}</div>
                  <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:16,lineHeight:1.25,textAlign:"right"}}>{SERVICES_AR[activeService].headline}</h3>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:32,lineHeight:1.9,textAlign:"right"}}>{SERVICES_AR[activeService].body}</p>
                  <Link href="#services" className="btn btn-primary">← استكشف الخدمة</Link>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {SERVICES_AR[activeService].items.map((item,i)=>(
                    <motion.div key={item} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*.06}}>
                      <div style={{display:"flex",gap:12,padding:"14px 18px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:12,alignItems:"center",direction:"rtl"}}>
                        <div style={{width:10,height:3,borderRadius:1,background:SERVICES_AR[activeService].color,flexShrink:0,boxShadow:`0 0 8px ${SERVICES_AR[activeService].color}`}}/>
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

      {/* HOME — CTA */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}><span className="pill pill-v" style={{marginBottom:28}}>مكتب العائلة الخاص · الرياض</span></motion.div>
          <motion.h2 {...FU(.08)} className="t-d gt-a" style={{marginBottom:20,fontSize:"clamp(44px,7vw,96px)"}}>مبني للحوكمة.<br/>مصمَّم ليدوم.</motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:540,margin:"0 auto 44px",lineHeight:1.85}}>إذا كنت مستعداً للانتقال من إدارة الأصول إلى حوكمة الثروة، يسعدنا التحدث معك بسرية تامة.</motion.p>
          <motion.div {...FU(.22)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:16,padding:"16px 40px"}}>← اطلب مقدمة</Link>
            <Link href="#services" className="btn btn-ghost" style={{fontSize:16,padding:"16px 36px"}}>استكشف خدماتنا</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT (stub)
          ════════════════════════════════════════ */}
      <section id="about" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24,display:"flex",justifyContent:"flex-start"}}>
            <span className="pill pill-c"><span className="dot-live"/>{AR_STUBS.about.badge}</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24,textAlign:"right"}}>{AR_STUBS.about.h1}</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.85,marginLeft:"auto",textAlign:"right"}}>{AR_STUBS.about.sub}</motion.p>
          <motion.div {...FU(.24)} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-start",marginTop:36}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:14}}>← اطلب مقدمة</Link>
            <Link href="#home" className="btn btn-ghost" style={{fontSize:14}}>الرئيسية</Link>
          </motion.div>
        </div>
      </section>
      <section className="section" style={{position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <SectionHeading eyebrow={AR_STUBS.about.badge} title={AR_STUBS.about.h1} center/>
          <motion.p {...FU(.1)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>{AR_STUBS.about.sub}</motion.p>
          <motion.div {...FU(.2)} style={{marginTop:40,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب مقدمة</Link>
            <Link href="#about" className="btn btn-ghost" style={{fontSize:15}}>من نحن</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES (stub)
          ════════════════════════════════════════ */}
      <section id="services" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24,display:"flex",justifyContent:"flex-start"}}>
            <span className="pill pill-c"><span className="dot-live"/>{AR_STUBS.services.badge}</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24,textAlign:"right"}}>{AR_STUBS.services.h1}</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.85,marginLeft:"auto",textAlign:"right"}}>{AR_STUBS.services.sub}</motion.p>
          <motion.div {...FU(.24)} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-start",marginTop:36}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:14}}>← اطلب مقدمة</Link>
            <Link href="#home" className="btn btn-ghost" style={{fontSize:14}}>الرئيسية</Link>
          </motion.div>
        </div>
      </section>
      <section className="section" style={{position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <SectionHeading eyebrow={AR_STUBS.services.badge} title={AR_STUBS.services.h1} center/>
          <motion.p {...FU(.1)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>{AR_STUBS.services.sub}</motion.p>
          <motion.div {...FU(.2)} style={{marginTop:40,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب مقدمة</Link>
            <Link href="#about" className="btn btn-ghost" style={{fontSize:15}}>من نحن</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SOLUTIONS (stub)
          ════════════════════════════════════════ */}
      <section id="solutions" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24,display:"flex",justifyContent:"flex-start"}}>
            <span className="pill pill-c"><span className="dot-live"/>{AR_STUBS.solutions.badge}</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24,textAlign:"right"}}>{AR_STUBS.solutions.h1}</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.85,marginLeft:"auto",textAlign:"right"}}>{AR_STUBS.solutions.sub}</motion.p>
          <motion.div {...FU(.24)} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-start",marginTop:36}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:14}}>← اطلب مقدمة</Link>
            <Link href="#home" className="btn btn-ghost" style={{fontSize:14}}>الرئيسية</Link>
          </motion.div>
        </div>
      </section>
      <section className="section" style={{position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <SectionHeading eyebrow={AR_STUBS.solutions.badge} title={AR_STUBS.solutions.h1} center/>
          <motion.p {...FU(.1)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>{AR_STUBS.solutions.sub}</motion.p>
          <motion.div {...FU(.2)} style={{marginTop:40,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب مقدمة</Link>
            <Link href="#about" className="btn btn-ghost" style={{fontSize:15}}>من نحن</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROJECTS (stub)
          ════════════════════════════════════════ */}
      <section id="projects" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24,display:"flex",justifyContent:"flex-start"}}>
            <span className="pill pill-c"><span className="dot-live"/>{AR_STUBS.projects.badge}</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24,textAlign:"right"}}>{AR_STUBS.projects.h1}</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.85,marginLeft:"auto",textAlign:"right"}}>{AR_STUBS.projects.sub}</motion.p>
          <motion.div {...FU(.24)} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-start",marginTop:36}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:14}}>← اطلب مقدمة</Link>
            <Link href="#home" className="btn btn-ghost" style={{fontSize:14}}>الرئيسية</Link>
          </motion.div>
        </div>
      </section>
      <section className="section" style={{position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <SectionHeading eyebrow={AR_STUBS.projects.badge} title={AR_STUBS.projects.h1} center/>
          <motion.p {...FU(.1)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>{AR_STUBS.projects.sub}</motion.p>
          <motion.div {...FU(.2)} style={{marginTop:40,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب مقدمة</Link>
            <Link href="#about" className="btn btn-ghost" style={{fontSize:15}}>من نحن</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT (stub)
          ════════════════════════════════════════ */}
      <section id="contact" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24,display:"flex",justifyContent:"flex-start"}}>
            <span className="pill pill-c"><span className="dot-live"/>{AR_STUBS.contact.badge}</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24,textAlign:"right"}}>{AR_STUBS.contact.h1}</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.85,marginLeft:"auto",textAlign:"right"}}>{AR_STUBS.contact.sub}</motion.p>
          <motion.div {...FU(.24)} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-start",marginTop:36}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:14}}>← اطلب مقدمة</Link>
            <Link href="#home" className="btn btn-ghost" style={{fontSize:14}}>الرئيسية</Link>
          </motion.div>
        </div>
      </section>
      <section className="section" style={{position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <SectionHeading eyebrow={AR_STUBS.contact.badge} title={AR_STUBS.contact.h1} center/>
          <motion.p {...FU(.1)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>{AR_STUBS.contact.sub}</motion.p>
          <motion.div {...FU(.2)} style={{marginTop:40,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب مقدمة</Link>
            <Link href="#about" className="btn btn-ghost" style={{fontSize:15}}>من نحن</Link>
          </motion.div>
        </div>
      </section>

      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important}}`}</style>
    </main>
  );
}
