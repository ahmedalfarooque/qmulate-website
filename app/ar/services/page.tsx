"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, GlassCard } from "@/components/DS";
import { GovernanceIcon, PortfolioIcon, DigitalIcon } from "@/components/icons/GlassIcons";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { LineReveal, ImageReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";
import ScanLine from "@/components/ScanLine";
import { HeroSlideshow } from "@/components/HeroSlideshow";

/* ─── SLIDESHOW IMAGES ───────────────────────────────────────────── */
const HERO_SLIDES = [
  { src:"/Background%20Images/EDa2yEV826m1m8qajQ_68snVQ4wUUK5-AnhRrlvluoZ9u-8wBSsZVwXSaiI9F1Nl2UOulJ6lRUc5QuHWieEnlsi0O1iIp4MR1cu76APuTICU7qS46yHxy6yvlxMn4j7nXo3AcBkm8RUFQr0Bgwm4ZSrn_KJCWYwdD-BBY6AKpN.jpg",       position:"center 40%" },
  { src:"/Background%20Images/GQMWKvE46ykWN8n7tSxfSnRA8CPWCrMSl0WFglOmCZE2XuArXsivBPtUAoftn-0etMg-pXQiuIQaTAVNJ-z3h6RkV8WPJuFHbVZikezv219E3J6CQJ35BJ-IyzHdN9vnVp594bKK14r8wtZsbmLMOH5A91jUb7hWrKHL7FzuO0.jpg",         position:"center 45%" },
  { src:"/Background%20Images/3x4rIeq93oh_yLNRNVQhVumYRTge5YoxtsdCw8l2bfUpWfWVfqfGo-23YoVDpQF9LQ85ZrTx1Zuczi_ujSQa7XKeExiK8ZMLqdXu58R9CnrTBoxzVzfSP_GX0aTEVR1RlblEVhufsSHJKEZWa5OgfH8TZXVtR8ubAJS_JiTPi3.jpg",       position:"center 50%" },
];
const IMG_SVC  = [
  "/Background%20Images/_K7bLmnmYeenh0AczYa4VqBSnewL9A47WxeeERWevDPDqyjlTFc9rxqHIPzQaTcnshhbn290miCBrLILvFBGJHWtP4SKinyEDsb_ijCOdx1McrJVNu9hvym7ofLNC0opQbil-dANXL34euw6Ml9t5uV8Hlk4hVWcIxTZfQY9CY.jpg",
  "/Background%20Images/u9JiAQUrtJJCg7HZjw3-0FQaK0eGZybkkYsulG-DtLkjo9KaxCRGrYTcTZcGXUtm-dzOLw5uk-dlPs1djl_903jNy2P6DWbUIT-1tHJpVCd0VQRvWS3giXaYPrlAvqNhTB_yCqoMVmygub6NfOg8cs_9EV_-RkNvrCwOyR-Kb1.jpg",
  "/Background%20Images/9BU3riDGJy90oeygMk7L_wLneiq0OMtE4F97u28pVmjDojIC4nM9v1PvGk_3pFLtaiTIDCadEEGyNbbw9bVlIaXmhXGosO72ueeauGQ-bSgj07SyLuNVZzzJlx-JfoAUBGepMRPseOxhIZz1QR5kLZDMPfGUm6QQzWuep58DiU.jpg",
];

const SERVICE_ICONS_AR = [GovernanceIcon, PortfolioIcon, DigitalIcon];

const SERVICES_AR = [
  {
    num:"01",
    title:"هيكلة الملكية والحوكمة",
    color:"var(--cyan)",
    img: IMG_SVC[0],
    clients:[
      { label:"الشركات",           body:"هيكلة ملكية الشركات والأصول وتنظيم العلاقة بين الشركاء والمستثمرين بما يضمن وضوح الصلاحيات، وفعالية اتخاذ القرار، واستدامة الاستثمار." },
      { label:"الأوقاف",           body:"تنظيم ملكية الأصول الوقفية ووضع أطر حوكمة واضحة تدعم تحقيق مقاصد الوقف، وتعزز الاستدامة والاستمرارية عبر الأجيال." },
      { label:"الأفراد والعائلات", body:"تنظيم الأصول والاستثمارات الشخصية ضمن هيكل واضح يساعد على الحوكمة واتخاذ القرار والتخطيط للمستقبل." },
    ],
  },
  {
    num:"02",
    title:"إدارة الأصول العقارية",
    color:"#8A5CFF",
    img: IMG_SVC[1],
    clients:[
      { label:"الشركات",           body:"إدارة المحافظ والأصول العقارية من خلال التشغيل والتأجير والصيانة والتحصيل، بما يحافظ على قيمة الأصول ويعزز كفاءتها التشغيلية." },
      { label:"الأوقاف",           body:"إدارة وتشغيل الأصول الوقفية بما يحقق أفضل استفادة منها ويحافظ على استدامة منافعها وفق شروط الوقف." },
      { label:"الأفراد والعائلات", body:"إدارة العقارات الشخصية والاستثمارية بطريقة توفر رؤية واضحة للأداء وتساعد على المحافظة على القيمة وتعزيز العوائد." },
    ],
  },
  {
    num:"03",
    title:"التطوير والاستثمار",
    color:"#4D8DFF",
    img: IMG_SVC[2],
    clients:[
      { label:"الشركات",           body:"دراسة فرص التوسع والتطوير وإعادة توظيف الأصول بما يدعم النمو ويحقق أفضل عائد استثماري." },
      { label:"الأوقاف",           body:"تحديد الفرص المناسبة لتنمية الأصول الوقفية وتطويرها بما يحقق الاستدامة ويعزز أثر الوقف." },
      { label:"الأفراد والعائلات", body:"تقييم الفرص الاستثمارية وتحديد المسار الأنسب للتطوير أو الاحتفاظ أو التخارج بما يتوافق مع الأهداف المالية طويلة المدى." },
    ],
  },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function ArServicesPage() {
  return (
    <main style={{ position:"relative", fontFamily:"'Madani Arabic',sans-serif" }}>
      <PageBackground variant="services"/>

      {/* ── HERO: Cinematic fullbleed ── */}
      <section className="hero-fullbleed" style={{ minHeight:"72vh" }}>
        <HeroSlideshow slides={HERO_SLIDES} interval={9000}/>
        {/* Color grade + vignette */}
        <div className="hero-grade"/>
        <div className="hero-cyan-grade"/>
        <div style={{
          position:"absolute",inset:0,zIndex:4,
          background:"linear-gradient(160deg,rgba(0,5,24,0.46) 0%,transparent 44%,rgba(2,4,10,0.05) 56%,rgba(2,4,10,0.97) 100%)",
        }}/>
        <div className="hero-vignette"/>
        <div className="hero-top-feather"/>
        <div className="hero-side-feathers"/>
        <div className="hero-cyan-glow"/>
        <ScanLine/>

        <div className="hero-content" style={{ paddingBottom:"clamp(56px,8vw,96px)" }} dir="rtl">
          <div className="container" style={{ textAlign:"right" }}>
            <div style={{ overflow:"hidden", marginBottom:24 }}>
              <motion.div
                initial={{ y:"110%" }}
                animate={{ y:0 }}
                transition={{ delay:.3, duration:.7, ease:[.16,1,.3,1] }}
              >
                <span className="pill pill-c">
                  <span className="dot-live"/>
                  &nbsp;الخدمات
                </span>
              </motion.div>
            </div>

            <div style={{ overflow:"hidden" }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.48, duration:.90, ease:[.16,1,.3,1] }}
                style={{
                  fontSize:"clamp(30px,4.4vw,66px)",
                  fontWeight:800,
                  color:"rgba(255,255,255,0.96)",
                  lineHeight:1.22,
                  maxWidth:740,
                }}
              >
                هيكلة مناسبة لكل نوع
              </motion.h1>
            </div>
            <div style={{ overflow:"hidden", marginBottom:32 }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.62, duration:.90, ease:[.16,1,.3,1] }}
                style={{
                  fontSize:"clamp(30px,4.4vw,66px)",
                  fontWeight:800,
                  color:"rgba(255,255,255,0.96)",
                  lineHeight:1.22,
                  maxWidth:740,
                }}
              >
                من أنواع الملكية.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity:0, y:18 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:.88, duration:.75 }}
              style={{
                fontSize:"clamp(15px,1.3vw,18px)",
                lineHeight:1.92,
                color:"rgba(255,255,255,0.58)",
                maxWidth:560,
              }}
            >
              صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، بدءًا من هيكلة الملكية والحوكمة،
              مرورًا بإدارة الأصول، وصولًا إلى التطوير والاستثمار.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      {SERVICES_AR.map((svc, si) => {
        const SvcIcon = SERVICE_ICONS_AR[si];
        const isEven = si % 2 === 0;
        return (
          <section key={svc.num} className="section-lux" style={{
            position:"relative",
            overflow:"hidden",
            background: isEven ? undefined : "var(--bg-alt)",
          }} dir="rtl">
            {/* Ghost service number — editorial anchor */}
            <div className="ghost-bg-num" style={{ top:"-4%", left:"2%", fontSize:"clamp(140px,20vw,240px)" }}>{svc.num}</div>
            <ArchitecturalBg variant={isEven ? "strata-left" : "lattice"}/>
            <ScanLine/>

            <div className="container" style={{ position:"relative", zIndex:1 }}>
              {/* Section header */}
              <div style={{
                display:"grid",
                gridTemplateColumns:"1fr 1fr",
                gap:"clamp(48px,6vw,96px)",
                alignItems:"flex-start",
                marginBottom:"clamp(44px,5vw,68px)",
              }} className="grid-2">
                <div>
                  <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, justifyContent:"flex-end" }}>
                    <SvcIcon size="md"/>
                    <span className="t-xs" style={{ color:svc.color }}>{svc.num}</span>
                  </motion.div>

                  <LineReveal delay={0.05}>
                    <h2 style={{
                      fontSize:"clamp(22px,2.7vw,40px)",
                      fontWeight:800,
                      color:"var(--text-1)",
                      lineHeight:1.28,
                      borderRight:`3px solid ${svc.color}`,
                      paddingRight:22,
                      textAlign:"right",
                    }}>
                      {svc.title}
                    </h2>
                  </LineReveal>
                </div>

                {/* Service image with luxury reveal */}
                <ImageReveal delay={0.1} style={{ aspectRatio:"16/9", borderRadius:"clamp(14px,1.8vw,24px)" }}>
                  <div className="svc-img-wrap" style={{ aspectRatio:"16/9", borderRadius:0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svc.img} alt={svc.title} loading="lazy" style={{ objectPosition: si===0 ? "center 60%" : si===1 ? "center 50%" : "center 38%" }}/>
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 50%,rgba(2,4,10,0.70) 100%)" }}/>
                    <div style={{
                      position:"absolute",bottom:0,left:0,right:0,height:"3px",
                      background:`linear-gradient(90deg,transparent,${svc.color}88,transparent)`,
                      zIndex:4,
                    }}/>
                  </div>
                </ImageReveal>
              </div>

              {/* Client cards */}
              <div className="grid-3" style={{ gap:"clamp(16px,2.5vw,28px)" }}>
                {svc.clients.map((c, ci) => (
                  <motion.div key={c.label} {...FU(.05 + ci * .09)}>
                    <GlassCard style={{
                      padding:"clamp(24px,3vw,42px)",
                      height:"100%",
                      borderTop:`2px solid ${svc.color}38`,
                    }}>
                      <div style={{
                        fontSize:11,
                        color:svc.color,
                        fontWeight:700,
                        letterSpacing:"0.06em",
                        marginBottom:18,
                        direction:"rtl",
                        textAlign:"right",
                      }}>
                        {c.label}
                      </div>
                      <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.92, direction:"rtl", textAlign:"right" }}>{c.body}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="section" style={{
        position:"relative",
        overflow:"hidden",
        textAlign:"center",
        background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))",
      }}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <LineReveal delay={0}>
            <h2 className="t-h2 gt-w" style={{ marginBottom:18 }}>ابدأ محادثة.</h2>
          </LineReveal>
          <motion.p {...FU(.08)} className="t-lg" style={{ color:"var(--text-3)", marginBottom:42 }}>
            كل تواصل يُعامَل بسرية تامة.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize:15, padding:"15px 38px" }}>← تواصل معنا</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
