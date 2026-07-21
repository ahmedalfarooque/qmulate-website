"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, GlassCard } from "@/components/DS";
import { GovernanceIcon, PortfolioIcon, DigitalIcon } from "@/components/icons/GlassIcons";
import { PageBackground } from "@/components/PageBackground";
import { LineReveal, ImageReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";

/* ─── SLIDESHOW IMAGES — same photography as the EN Services page ──────── */
const HERO_SLIDES = [
  { src:"/Background%20Images/EDa2yEV826m1m8qajQ_68snVQ4wUUK5-AnhRrlvluoZ9u-8wBSsZVwXSaiI9F1Nl2UOulJ6lRUc5QuHWieEnlsi0O1iIp4MR1cu76APuTICU7qS46yHxy6yvlxMn4j7nXo3AcBkm8RUFQr0Bgwm4ZSrn_KJCWYwdD-BBY6AKpN.jpg",       position:"center 40%" },
  { src:"/Background%20Images/GQMWKvE46ykWN8n7tSxfSnRA8CPWCrMSl0WFglOmCZE2XuArXsivBPtUAoftn-0etMg-pXQiuIQaTAVNJ-z3h6RkV8WPJuFHbVZikezv219E3J6CQJ35BJ-IyzHdN9vnVp594bKK14r8wtZsbmLMOH5A91jUb7hWrKHL7FzuO0.jpg",         position:"center 45%" },
  { src:"/Background%20Images/3x4rIeq93oh_yLNRNVQhVumYRTge5YoxtsdCw8l2bfUpWfWVfqfGo-23YoVDpQF9LQ85ZrTx1Zuczi_ujSQa7XKeExiK8ZMLqdXu58R9CnrTBoxzVzfSP_GX0aTEVR1RlblEVhufsSHJKEZWa5OgfH8TZXVtR8ubAJS_JiTPi3.jpg",       position:"center 50%" },
];
const IMG_SVC  = [
  "/Background%20Images/_K7bLmnmYeenh0AczYa4VqBSnewL9A47WxeeERWevDPDqyjlTFc9rxqHIPzQaTcnshhbn290miCBrLILvFBGJHWtP4SKinyEDsb_ijCOdx1McrJVNu9hvym7ofLNC0opQbil-dANXL34euw6Ml9t5uV8Hlk4hVWcIxTZfQY9CY.jpg",
  "/Background%20Images/kYKY9tiUSP1u1r4HWrv3sdoL1ErJ6RUI2B8R0RO5R8xcO4iSioZY1gsBAECuldsCKNrV-EkLHedsepUzfdQs6hqcuPOqRFcQmX7IkVt-2i6vRzBP-J7QvVBE4RWfPmeNSdmPiqux4ZDX56egqMXcn5koUsJtQclcTB6Ku0V7t_.jpg",
  "/Background%20Images/9BU3riDGJy90oeygMk7L_wLneiq0OMtE4F97u28pVmjDojIC4nM9v1PvGk_3pFLtaiTIDCadEEGyNbbw9bVlIaXmhXGosO72ueeauGQ-bSgj07SyLuNVZzzJlx-JfoAUBGepMRPseOxhIZz1QR5kLZDMPfGUm6QQzWuep58DiU.jpg",
];

const SERVICE_ICONS = [GovernanceIcon, PortfolioIcon, DigitalIcon];

/* Layout rhythm per service: editorial variety, matches the EN Services page */
const LAYOUTS = ["split", "feature", "split-rev"] as const;

/* Real Arabic business copy — ported unchanged from the prior Arabic Services page */
const SERVICES = [
  {
    num:"01",
    title:"هيكلة الملكية والحوكمة",
    color:"#2B6E8F",
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
    color:"#B08D57",
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
    color:"#123A57",
    img: IMG_SVC[2],
    clients:[
      { label:"الشركات",           body:"دراسة فرص التوسع والتطوير وإعادة توظيف الأصول بما يدعم النمو ويحقق أفضل عائد استثماري." },
      { label:"الأوقاف",           body:"تحديد الفرص المناسبة لتنمية الأصول الوقفية وتطويرها بما يحقق الاستدامة ويعزز أثر الوقف." },
      { label:"الأفراد والعائلات", body:"تقييم الفرص الاستثمارية وتحديد المسار الأنسب للتطوير أو الاحتفاظ أو التخارج بما يتوافق مع الأهداف المالية طويلة المدى." },
    ],
  },
];

/* ═════════════════════════════════════════════
   PAGE — Arabic mirror of app/services/page.tsx
   ═════════════════════════════════════════════ */
export default function ArServicesPage() {
  return (
    <main style={{ position:"relative", fontFamily:"'Madani Arabic',sans-serif" }}>
      <PageBackground variant="services"/>

      {/* ── HERO: Editorial — bold heading, photo, real quick-facts ── */}
      <section className="ed-hero" dir="rtl">
        <div className="container">
          <div className="ed-hero-top" style={{ textAlign:"right", marginLeft:"auto" }}>
            <Reveal direction="up" delay={0.05}>
              <span className="pill pill-c" style={{ marginBottom:22 }}>
                <span className="dot-live"/>&nbsp;الخدمات
              </span>
            </Reveal>

            <h1 className="t-h1 gt-w" style={{ marginBottom:0 }}>
              <LineReveal delay={0.15}><span style={{ display:"block" }}>هيكلة مناسبة لكل نوع</span></LineReveal>
              <LineReveal delay={0.26} style={{ marginTop:2 }}><span style={{ display:"block" }}>من أنواع الملكية.</span></LineReveal>
            </h1>

            <motion.p
              {...FU(.4)}
              className="t-lg"
              style={{ color:"var(--text-3)", maxWidth:560, marginTop:26, marginRight:0, marginLeft:"auto" }}
            >
              صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، بدءًا من هيكلة الملكية والحوكمة، مرورًا بإدارة الأصول،
              وصولًا إلى التطوير والاستثمار.
            </motion.p>

            <motion.div {...FU(.48)} className="ed-hero-cta-row" style={{ justifyContent:"flex-end" }}>
              <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize:14, padding:"14px 30px" }}>ابدأ محادثة ←</Link>
              <Link href="/ar/about" className="btn btn-ghost" style={{ fontSize:14, padding:"14px 26px" }}>عن كيوميليت</Link>
            </motion.div>
          </div>

          <div className="ed-hero-image-wrap">
            <ImageReveal delay={0.1} className="ed-hero-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_SLIDES[0].src} alt="خدمات كيوميليت" loading="lazy" style={{ objectPosition:HERO_SLIDES[0].position }}/>
            </ImageReveal>

            <div className="ed-hero-cards">
              {[
                { Icon:GovernanceIcon, title:"الهيكلة والحوكمة",       body:"تنظيم ترتيبات الملكية وأطر الحوكمة لضمان سيطرة واضحة وطويلة الأمد." },
                { Icon:PortfolioIcon,  title:"إدارة الأصول",            body:"التأجير والتشغيل والصيانة بما يحافظ على قيمة المحفظة ويعزّزها." },
                { Icon:DigitalIcon,    title:"التطوير والاستثمار",      body:"تحديد فرص التوسع وإعادة التوظيف والنمو المستدام." },
              ].map((c,i)=>(
                <Reveal key={c.title} direction="up" delay={i*0.08}>
                  <div className="ed-hero-card" style={{ textAlign:"right" }}>
                    <c.Icon size="md"/>
                    <h4 className="t-h4" style={{ color:"var(--text-1)", marginTop:14, marginBottom:8 }}>{c.title}</h4>
                    <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.7 }}>{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      {SERVICES.map((svc, si) => {
        const SvcIcon = SERVICE_ICONS[si];
        const layout = LAYOUTS[si % LAYOUTS.length];
        const isFeature = layout === "feature";
        const isRev = layout === "split-rev";

        return (
          <section key={svc.num} className="section-lux" style={{
            position:"relative",
            overflow:"hidden",
            borderTop: si > 0 ? "1px solid var(--glass-border)" : undefined,
          }} dir="rtl">
            {/* Ghost service number — editorial anchor, mirrored to the left */}
            <div className="svc-ghost-num" style={{ top:"clamp(20px,3vw,32px)", right:"auto", left:"clamp(20px,3vw,32px)" }}>{svc.num}</div>

            <div className="container" style={{ position:"relative", zIndex:1 }}>
              {isFeature ? (
                <>
                  {/* ── FULL-WIDTH FEATURE LAYOUT ── */}
                  <ImageReveal delay={0.06} style={{ marginBottom:"clamp(36px,4.5vw,56px)" }}>
                    <div className="svc-img-wrap" style={{ aspectRatio:"21/9" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={svc.img} alt={svc.title} loading="lazy" style={{ objectPosition:"center 45%" }}/>
                      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"3px",background:`linear-gradient(90deg,transparent,${svc.color}99,transparent)`,zIndex:4 }}/>
                    </div>
                  </ImageReveal>

                  <div style={{ maxWidth:760, marginBottom:"clamp(40px,4.5vw,60px)", marginRight:0, marginLeft:"auto", textAlign:"right" }}>
                    <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, justifyContent:"flex-end" }}>
                      <SvcIcon size="md"/>
                      <span className="t-xs" style={{ color:svc.color }}>{svc.num}</span>
                    </motion.div>
                    <LineReveal delay={0.05}>
                      <h2 className="t-h2" style={{ color:"var(--text-1)" }}>{svc.title}</h2>
                    </LineReveal>
                    <div className="accent-bar" style={{ background:`linear-gradient(90deg,${svc.color},color-mix(in srgb,${svc.color} 40%,transparent))`, marginRight:0, marginLeft:"auto" }}/>
                  </div>
                </>
              ) : (
                <>
                  {/* ── SPLIT LAYOUT (mirrored alternating direction for RTL) ── */}
                  <div className="grid-2 svc-split" style={{
                    gap:"clamp(48px,6vw,96px)",
                    alignItems:"flex-start",
                    marginBottom:"clamp(44px,5vw,68px)",
                    direction: isRev ? "ltr" : "rtl",
                  }}>
                    <div style={{ direction:"rtl", textAlign:"right" }}>
                      <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, justifyContent:"flex-end" }}>
                        <SvcIcon size="md"/>
                        <span className="t-xs" style={{ color:svc.color }}>{svc.num}</span>
                      </motion.div>

                      <LineReveal delay={0.05}>
                        <h2 style={{
                          fontSize:"clamp(24px,2.9vw,42px)",
                          fontWeight:700,
                          fontFamily:"'Madani Arabic',sans-serif",
                          color:"var(--text-1)",
                          lineHeight:1.28,
                          borderRight:`3px solid ${svc.color}`,
                          paddingRight:22,
                        }}>
                          {svc.title}
                        </h2>
                      </LineReveal>
                    </div>

                    {/* Service image with luxury reveal */}
                    <ImageReveal delay={0.1} style={{ aspectRatio:"16/9", direction:"ltr" }}>
                      <div className="svc-img-wrap" style={{ aspectRatio:"16/9", borderRadius:0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={svc.img} alt={svc.title} loading="lazy" style={{ objectPosition: si===0 ? "center 60%" : "center 38%" }}/>
                        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"3px",background:`linear-gradient(90deg,transparent,${svc.color}99,transparent)`,zIndex:4 }}/>
                      </div>
                    </ImageReveal>
                  </div>
                </>
              )}

              {/* Client cards — full-width feature service gets a layered list treatment for rhythm variety */}
              {isFeature ? (
                <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                  {svc.clients.map((c, ci) => (
                    <motion.div key={c.label} {...FU(.05 + ci * .09)}>
                      <div className="layer-item svc-layer-row" style={{
                        padding:"clamp(22px,2.6vw,32px) clamp(20px,2.4vw,30px)",
                        borderBottom: ci < svc.clients.length - 1 ? "1px solid var(--glass-border)" : "none",
                        display:"grid",
                        gridTemplateColumns:"200px 1fr",
                        gap:"clamp(16px,2.5vw,32px)",
                        direction:"rtl",
                      }}>
                        <div style={{
                          fontSize:11, color:svc.color, fontWeight:700, letterSpacing:"0.06em",
                          fontFamily:"'Madani Arabic',sans-serif", textAlign:"right",
                        }}>
                          {c.label}
                        </div>
                        <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.92, textAlign:"right" }}>{c.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid-3" style={{ gap:"clamp(16px,2.5vw,28px)" }}>
                  {svc.clients.map((c, ci) => (
                    <motion.div key={c.label} {...FU(.05 + ci * .09)}>
                      <GlassCard style={{
                        padding:"clamp(24px,3vw,42px)",
                        height:"100%",
                        borderTop:`2px solid color-mix(in srgb, ${svc.color} 42%, transparent)`,
                      }}>
                        <div style={{
                          fontSize:11,
                          color:svc.color,
                          fontWeight:700,
                          letterSpacing:"0.06em",
                          marginBottom:18,
                          fontFamily:"'Madani Arabic',sans-serif",
                          textAlign:"right",
                        }}>
                          {c.label}
                        </div>
                        <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.92 }}>{c.body}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="section" style={{ textAlign:"center" }} dir="rtl">
        <div className="container">
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
        @media(max-width:900px){.svc-split{grid-template-columns:1fr!important;direction:rtl!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
        @media(max-width:560px){.svc-layer-row{grid-template-columns:1fr!important;gap:8px!important}}
      `}</style>
    </main>
  );
}
