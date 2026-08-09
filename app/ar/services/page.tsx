"use client";
import { Fragment } from "react";
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
  { src:"/Background%20Images/old-jeddah-historic-city-saudi-arabia-ksa-187866209.webp",       position:"center 50%" },
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
    color:"#4C63D2",
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
    color:"#5B7CFA",
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
    color:"#0A0B0D",
    img: IMG_SVC[2],
    clients:[
      { label:"الشركات",           body:"دراسة فرص التوسع والتطوير وإعادة توظيف الأصول بما يدعم النمو ويحقق أفضل عائد استثماري." },
      { label:"الأوقاف",           body:"تحديد الفرص المناسبة لتنمية الأصول الوقفية وتطويرها بما يحقق الاستدامة ويعزز أثر الوقف." },
      { label:"الأفراد والعائلات", body:"تقييم الفرص الاستثمارية وتقديم الاستشارات العقارية وخدمات الوساطة لدعم قرارات الاستحواذ والبيع والتطوير والاحتفاظ بالأصول أو التخارج منها." },
    ],
  },
];

/* ═════════════════════════════════════════════
   PAGE — Arabic mirror of app/services/page.tsx
   ═════════════════════════════════════════════ */
export default function ArServicesPage() {
  return (
    <main className="hero-page" style={{ position:"relative", fontFamily:"var(--font-madani),sans-serif" }}>
      <PageBackground variant="services"/>

      {/* ── HERO: قسم واحد موحّد — النص فوق الصورة ── */}
      <section className="svc-hero" dir="rtl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="svc-hero-img" src={HERO_SLIDES[0].src} alt="خدمات كيوميليت" style={{ objectPosition:HERO_SLIDES[0].position }}/>
        <div className="svc-hero-scrim" />

        <div className="container svc-hero-inner">
          <div className="svc-hero-copy" style={{ textAlign:"right" }}>
            <Reveal direction="up" delay={0.05}>
              <span className="pill pill-c" style={{ marginBottom:22 }}>
                الخدمات
              </span>
            </Reveal>

            <h1 className="t-h1 gt-w" style={{ marginBottom:0 }}>
              <LineReveal delay={0.15}><span>هيكلة مناسبة لكل نوع من أنواع الملكية.</span></LineReveal>
            </h1>

            <motion.p
              {...FU(.4)}
              className="t-lg"
              style={{ color:"var(--text-3)", maxWidth:520, marginTop:26, marginRight:0, marginLeft:"auto" }}
            >
              تشمل خدماتنا الاستشارات العقارية والوساطة العقارية وإدارة الأملاك وهيكلة الملكية والتطوير والاستثمار، لتقديم دعم
              متكامل عبر مختلف مراحل دورة حياة العقار.
            </motion.p>

            <motion.div {...FU(.48)} className="ed-hero-cta-row" style={{ justifyContent:"flex-end" }}>
              <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize:14, padding:"14px 30px" }}>ابدأ محادثة ←</Link>
              <Link href="/ar/about" className="btn btn-ghost" style={{ fontSize:14, padding:"14px 26px" }}>عن كيوميليت</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* بطاقات الحقائق السريعة تتداخل مع الحافة السفلية للـ hero */}
      <div className="container" dir="rtl">
        <div className="ed-hero-cards svc-hero-cards">
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


      {/* ── SERVICES ── */}
      {SERVICES.map((svc, si) => {
        const SvcIcon = SERVICE_ICONS[si];
        const layout = LAYOUTS[si % LAYOUTS.length];
        const isFeature = layout === "feature";
        const isRev = layout === "split-rev";

        return (
          <Fragment key={svc.num}>
          {si > 0 && (
            <div className="container">
              <div className="svc-sep" />
            </div>
          )}
          <section id={`svc-${svc.num}`} className={`section-lux${si > 0 ? " section-lux-tight-top" : ""}${si < SERVICES.length - 1 ? " section-lux-tight-bottom" : ""}`} style={{
            position:"relative",
            overflow:"hidden",
            scrollMarginTop:"96px",
          }} dir="rtl">
            {/* Ghost service number — editorial anchor */}
            <div className="svc-ghost-num">{svc.num}</div>

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
                    <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, justifyContent:"flex-start" }}>
                      <span className="t-xs svc-num" style={{ color:svc.color }}>{svc.num}</span>
                      <span className="svc-icon-badge"><SvcIcon size="md"/></span>
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
                      <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, justifyContent:"flex-start" }}>
                        <span className="t-xs svc-num" style={{ color:svc.color }}>{svc.num}</span>
                        <SvcIcon size="md"/>
                      </motion.div>

                      <LineReveal delay={0.05}>
                        <h2 style={{
                          fontSize:"clamp(24px,2.9vw,42px)",
                          fontWeight:700,
                          fontFamily:"var(--font-madani),sans-serif",
                          color:"var(--text-1)",
                          lineHeight:1.28,
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
                <div className="svc-glass-panel">
                  {svc.clients.map((c, ci) => (
                    <motion.div key={c.label} {...FU(.05 + ci * .09)}>
                      <div className="svc-glass-row" style={{
                        direction:"rtl",
                      }}>
                        <div style={{
                          fontSize:"clamp(18px,2vw,23px)", color:"var(--text-1)", fontWeight:700, letterSpacing:"0.06em",
                          fontFamily:"var(--font-madani),sans-serif", textAlign:"right",
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
                      }}>
                        <div style={{
                          fontSize:"clamp(18px,2vw,23px)",
                          color:"var(--text-1)",
                          fontWeight:700,
                          letterSpacing:"0.06em",
                          marginBottom:18,
                          fontFamily:"var(--font-madani),sans-serif",
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
          </Fragment>
        );
      })}

      {/* ── SHOWCASE + CTA (single contained dark band) ── */}
      <div className="container" style={{ padding:"0 clamp(20px,4vw,48px) clamp(80px,10vw,140px)" }} dir="rtl">
          <div className="showcase-dark" style={{ textAlign:"center" }}>
            <div className="showcase-quote showcase-quote-sm" style={{ maxWidth:680, margin:"0 auto" }}>
              هيكلة مناسبة لكل نوع من أنواع الملكية — الحوكمة والإدارة والنمو ضمن منظومة واحدة متكاملة.
            </div>
            <h2 className="showcase-cta-h" style={{ marginTop:"clamp(22px,2.8vw,32px)", marginBottom:10 }}>ابدأ محادثة.</h2>
            <p className="showcase-sub" style={{ maxWidth:440, margin:"0 auto 26px" }}>
              كل تواصل يُعامَل بسرية تامة.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize:14, padding:"13px 32px" }}>← تواصل معنا</Link>
            </div>
          </div>
      </div>

      <style>{`
        @media(max-width:900px){.svc-split{grid-template-columns:1fr!important;direction:rtl!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}

        /* ── Frosted glass badge around the section icon (number stays bare) ── */
        .svc-icon-badge{
          width:64px; height:64px; border-radius:18px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.22);
          backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,0.4);
        }

        /* ── Premium glass panel wrapping the client-type rows ── */
        .svc-glass-panel{
          display:flex; flex-direction:column; gap:20px;
          padding:clamp(16px,2vw,24px);
          border-radius:32px;
          background:rgba(255,255,255,0.28);
          backdrop-filter:blur(28px) saturate(170%); -webkit-backdrop-filter:blur(28px) saturate(170%);
          border:1px solid rgba(255,255,255,0.55);
          box-shadow:0 20px 60px rgba(0,0,0,.05);
          overflow:hidden;
        }
        .svc-glass-row{
          padding:clamp(24px,3vw,32px);
          border-radius:20px;
          background:rgba(255,255,255,.18);
          backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
          border:1px solid rgba(255,255,255,.35);
          display:grid;
          grid-template-columns:200px 1fr;
          gap:clamp(16px,2.5vw,32px);
          transition:background .4s cubic-bezier(.22,.61,.36,1), transform .4s cubic-bezier(.22,.61,.36,1), box-shadow .4s cubic-bezier(.22,.61,.36,1);
          will-change:transform;
        }
        .svc-glass-row:hover{
          background:rgba(255,255,255,.26);
          transform:translateY(-3px);
          box-shadow:0 18px 40px rgba(0,0,0,.08);
        }
        @media(max-width:900px){
          .svc-glass-panel{ padding:16px; gap:16px; }
          .svc-glass-row{ padding:20px; }
        }
        @media(max-width:560px){
          .svc-glass-row{grid-template-columns:1fr!important;gap:8px!important}
        }

        /* ── Dark mode overrides — loaded last, plain attribute selector,
           !important on every property the light rules above hardcode, so
           these always win regardless of source order or :is() specificity
           edge cases. Light mode rules above are untouched. ── */
        [data-theme="dark"] .svc-icon-badge,
        .dark .svc-icon-badge{
          background:rgba(255,255,255,0.08) !important;
          border-color:rgba(255,255,255,0.15) !important;
        }
        [data-theme="dark"] .svc-glass-panel,
        .dark .svc-glass-panel{
          background:rgba(255,255,255,0.06) !important;
          border-color:rgba(255,255,255,0.15) !important;
          backdrop-filter:blur(25px) !important;
          -webkit-backdrop-filter:blur(25px) !important;
          box-shadow:
            0 25px 70px rgba(0,0,0,0.45),
            inset 0 1px 1px rgba(255,255,255,0.15) !important;
          position:relative;
        }
        [data-theme="dark"] .svc-glass-panel::after,
        .dark .svc-glass-panel::after{
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(135deg,rgba(255,255,255,0.10),transparent 40%);
          pointer-events:none;
        }
        [data-theme="dark"] .svc-glass-row,
        .dark .svc-glass-row{
          background:rgba(255,255,255,0.05) !important;
          border-color:rgba(255,255,255,0.15) !important;
        }
        [data-theme="dark"] .svc-glass-row:hover,
        .dark .svc-glass-row:hover{
          background:rgba(255,255,255,0.10) !important;
          box-shadow:
            0 32px 90px rgba(0,0,0,0.55),
            inset 0 1px 1px rgba(255,255,255,0.12) !important;
        }
      `}</style>
    </main>
  );
}
