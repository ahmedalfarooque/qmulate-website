"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FU, SectionHeading } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { Reveal } from "@/components/Reveal";
import { LineReveal, ImageReveal } from "@/components/TextReveal";
import { PageBackground } from "@/components/PageBackground";
import ScanLine from "@/components/ScanLine";
import { HomeIcon, SuccessionIcon, GovernanceIcon, DocumentIcon } from "@/components/icons/GlassIcons";
import { HeroSlideshow, SplitSlideshow } from "@/components/HeroSlideshow";

/* ─── SLIDESHOW IMAGES ───────────────────────────────────────────── */
const HERO_SLIDES = [
  { src:"/Background%20Images/bg2.PNG",                                                                                                                                                                                                                                                               position:"center 52%" },
  { src:"/Background%20Images/AqAtJNNbvEz9B_X-LrvudRWxvbGO0TcEOO5SOIbPjUWLqGfIMCKZFPPK0e7NrLFWV7OmSEzLhtJmL3K_7GwubvHYNeRbz28PhCctZMEQHwtw1-O1ES9RZPJOy-84skQbgX_ywVavjAsRlX-xptvQOCoqVeg18wEu_VYl9Lw1WW.jpg",                                                                             position:"center 38%" },
  { src:"/Background%20Images/9BU3riDGJy90oeygMk7L_wLneiq0OMtE4F97u28pVmjDojIC4nM9v1PvGk_3pFLtaiTIDCadEEGyNbbw9bVlIaXmhXGosO72ueeauGQ-bSgj07SyLuNVZzzJlx-JfoAUBGepMRPseOxhIZz1QR5kLZDMPfGUm6QQzWuep58DiU.jpg",                                                                               position:"center 40%" },
  { src:"/Background%20Images/hZBubFn_zlWV4ixbYjDKwKprrycSsZiDh2KZSZIPMoMGMKCelLdIwscS23sRYb2PjNNTIxJn3TPyTPI9wiSFFUph06IoIT06t4BdwPXr-dgtG7p5djBTdVtfxZaGn9TQRYpOVijM2jX3aonOEdk9GK4czwffUqZFIjxG12U4ff.jpg",                                                                               position:"center 45%" },
];
const ADVISOR_SLIDES = [
  { src:"/Background%20Images/kYKY9tiUSP1u1r4HWrv3sdoL1ErJ6RUI2B8R0RO5R8xcO4iSioZY1gsBAECuldsCKNrV-EkLHedsepUzfdQs6hqcuPOqRFcQmX7IkVt-2i6vRzBP-J7QvVBE4RWfPmeNSdmPiqux4ZDX56egqMXcn5koUsJtQclcTB6Ku0V7t_.jpg", position:"center 42%" },
  { src:"/Background%20Images/u9JiAQUrtJJCg7HZjw3-0FQaK0eGZybkkYsulG-DtLkjo9KaxCRGrYTcTZcGXUtm-dzOLw5uk-dlPs1djl_903jNy2P6DWbUIT-1tHJpVCd0VQRvWS3giXaYPrlAvqNhTB_yCqoMVmygub6NfOg8cs_9EV_-RkNvrCwOyR-Kb1.jpg", position:"center 50%" },
];

/* ─── GLASS SYSTEM ─────────────────────────────────────────── */
const GLASS_BASE: React.CSSProperties = {
  backdropFilter:"blur(24px) saturate(160%)",
  WebkitBackdropFilter:"blur(24px) saturate(160%)",
  borderRadius:"20px",
  position:"relative",
  overflow:"hidden",
  transition:"all 0.38s cubic-bezier(0.4,0,0.2,1)",
};
const glass: React.CSSProperties = {
  ...GLASS_BASE,
  background:"rgba(8,14,44,0.62)",
  border:"1px solid rgba(255,255,255,0.13)",
  boxShadow:`
    inset 0 1.5px 0 rgba(255,255,255,0.42),
    0 20px 56px rgba(0,0,0,0.60)
  `,
};

function GlassHighlight({ color = "rgba(255,255,255,0.24)" }: { color?: string }) {
  return (
    <div style={{
      position:"absolute",top:0,left:0,right:0,height:"1px",
      background:`linear-gradient(90deg,transparent,${color} 30%,rgba(255,255,255,0.32) 50%,${color} 70%,transparent)`,
      pointerEvents:"none",zIndex:3,
    }}/>
  );
}
function GlassInnerGlow({ color = "rgba(255,255,255,0.05)" }: { color?: string }) {
  return (
    <div style={{
      position:"absolute",top:0,left:0,right:0,height:"55%",
      background:`linear-gradient(180deg,${color} 0%,transparent 100%)`,
      pointerEvents:"none",zIndex:0,borderRadius:"inherit",
    }}/>
  );
}
function GlassSheen() {
  return (
    <div style={{
      position:"absolute",inset:0,
      background:"linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 30%,transparent 60%)",
      pointerEvents:"none",zIndex:0,borderRadius:"inherit",
    }}/>
  );
}

/* ─── DATA ──────────────────────────────────────────────────── */
const SERVICE_ICONS = [
  (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="1" width="6" height="5" rx="1.5"/>
      <line x1="12" y1="6" x2="12" y2="10"/>
      <line x1="4.5" y1="10" x2="19.5" y2="10"/>
      <line x1="4.5" y1="10" x2="4.5" y2="13"/>
      <line x1="19.5" y1="10" x2="19.5" y2="13"/>
      <rect x="1.5" y="13" width="6" height="5" rx="1.5"/>
      <rect x="16.5" y="13" width="6" height="5" rx="1.5"/>
    </svg>
  ),
  (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M5 21V7.5L12 3l7 4.5V21"/>
      <rect x="9" y="13" width="2.5" height="8"/>
      <rect x="12.5" y="13" width="2.5" height="8"/>
      <rect x="8.5" y="8.5" width="2" height="2" rx="0.4"/>
      <rect x="13.5" y="8.5" width="2" height="2" rx="0.4"/>
    </svg>
  ),
  (color: string) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 8.5 11 13 15.5 21 7"/>
      <polyline points="16 7 21 7 21 12"/>
      <line x1="3" y1="21" x2="21" y2="21"/>
    </svg>
  ),
];

const SERVICES_AR = [
  { id:"structuring", num:"01", label:"هيكلة الملكية والحوكمة",  color:"var(--cyan)",
    body:"تنظيم أطر الملكية وهياكل صنع القرار لضمان الوضوح والسيطرة على المدى البعيد." },
  { id:"asset",       num:"02", label:"إدارة الأصول العقارية",   color:"#8A5CFF",
    body:"إدارة المحافظ من خلال التأجير والتشغيل والصيانة للحفاظ على القيمة وتعزيزها." },
  { id:"development", num:"03", label:"التطوير والاستثمار",       color:"#4D8DFF",
    body:"تحديد وتنفيذ الفرص للتوسع وإعادة التوظيف والنمو المستدام." },
];

const REGULATORS_AR = [
  { name:"أوقاف",              img:"/Regulatory%20Authorities/AWQAF%20LOGO.png",                          idx:0 },
  { name:"إحكام",              img:"/Regulatory%20Authorities/EHKAAM%20LOGO.png",                         idx:1 },
  { name:"وزارة الإسكان",     img:"/Regulatory%20Authorities/Ministry%20of%20Housing%20Logo.png",         idx:2 },
  { name:"هيئة العقار",        img:"/Regulatory%20Authorities/REAL%20ESTATE%20GENERAL%20AUTHORITY%20LOGO.png", idx:3 },
  { name:"هيئة أملاك الدولة",  img:"/Regulatory%20Authorities/STATE%20PROPERTY%20OF%20GENERAL%20AUTHORITY%20LOGO.png", idx:4 },
];

const SERVICE_LAYERS_AR = [
  { label:"هيكلة الملكية",     sub:"أطر واضحة · حوكمة القرار · وضوح المدى البعيد",       color:"var(--cyan)" },
  { label:"إدارة الأصول",      sub:"التأجير · التشغيل · الصيانة · الحفاظ على القيمة",   color:"#8A5CFF" },
  { label:"التطوير والاستثمار",sub:"التوسع · إعادة التوظيف · النمو المستدام",             color:"#4D8DFF" },
];

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
export default function ArHome() {
  const [hoveredService, setHoveredService] = useState<number|null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroImgY    = useTransform(scrollYProgress, [0,1], ["0%","22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.7], [1,0]);

  const wwaRef = useRef<HTMLDivElement>(null);
  const wwaVisible = useInView(wwaRef, { once:true, margin:"-20px" });

  return (
    <main className="hero-page" style={{ position:"relative", fontFamily:"'Madani Arabic',sans-serif" }}>
      <PageBackground variant="home"/>

      {/* ══════════════════════════════════════════
          1. HERO — CINEMATIC FULLBLEED
          ══════════════════════════════════════════ */}
      <section ref={heroRef} className="hero-fullbleed" style={{ minHeight:"100svh" }}>
        {/* Parallax wrapper */}
        <motion.div
          style={{ position:"absolute", inset:"-8% 0", y:heroImgY, willChange:"transform" }}
        >
          <HeroSlideshow slides={HERO_SLIDES} interval={9000}/>
        </motion.div>

        {/* Color grade: deep navy → shifts warm golden tones to cool blue */}
        <div className="hero-grade"/>
        <div className="hero-cyan-grade"/>

        {/* Directional gradient — darkens bottom for text */}
        <div style={{
          position:"absolute",inset:0,zIndex:4,
          background:"linear-gradient(162deg,rgba(0,5,24,0.48) 0%,transparent 42%,rgba(2,4,10,0.04) 56%,rgba(2,4,10,0.97) 100%)",
        }}/>

        {/* Vignette + edge feathers — no hard boundaries */}
        <div className="hero-vignette"/>
        <div className="hero-top-feather"/>
        <div className="hero-side-feathers"/>
        <div className="hero-cyan-glow"/>

        <ScanLine/>

        <div style={{
          position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(0,212,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.022) 1px,transparent 1px)",
          backgroundSize:"100px 100px",
        }}/>

        <motion.div className="hero-content" style={{ opacity:heroOpacity }} dir="rtl">
          <div className="container" style={{ textAlign:"right" }}>
            <div style={{ overflow:"hidden", marginBottom:32 }}>
              <motion.div
                initial={{ y:"110%" }}
                animate={{ y:0 }}
                transition={{ delay:.35, duration:.7, ease:[.16,1,.3,1] }}
              >
                <span className="pill pill-c">
                  <span className="dot-live"/>
                  &nbsp;منظومة عقارية متكاملة
                </span>
              </motion.div>
            </div>

            <div style={{ overflow:"hidden" }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.52, duration:.92, ease:[.16,1,.3,1] }}
                className="gt-w"
                style={{
                  fontSize:"clamp(38px,5.2vw,82px)",
                  fontWeight:900,
                  lineHeight:1.12,
                  letterSpacing:"0",
                  marginBottom:0,
                }}
              >
                نحوّل الملكية
              </motion.h1>
            </div>
            <div style={{ overflow:"hidden", marginBottom:40 }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.68, duration:.92, ease:[.16,1,.3,1] }}
                className="gt-w"
                style={{
                  fontSize:"clamp(38px,5.2vw,82px)",
                  fontWeight:900,
                  lineHeight:1.12,
                  letterSpacing:"0",
                }}
              >
                إلى قيمة مستدامة.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity:0, y:22 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:.96, duration:.80 }}
              style={{
                fontSize:"clamp(15px,1.5vw,19px)",
                lineHeight:1.95,
                color:"rgba(255,255,255,0.62)",
                maxWidth:560,
                marginBottom:48,
                marginRight:0,
                marginLeft:"auto",
              }}
            >
              منظومة عقارية متكاملة للعائلات والشركات والأفراد، تتخصص في إدارة الأصول
              والحفاظ على قيمتها وتحقيق النمو المستدام على المدى البعيد.
            </motion.p>

            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1.14, duration:.70 }}
              style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"flex-end" }}
            >
              <a href="/ar/contact" className="btn btn-primary" style={{ fontSize:15, padding:"15px 36px" }}>
                ← طلب تواصل خاص
              </a>
              <a href="/ar/about" className="btn btn-ghost" style={{ fontSize:15, padding:"15px 32px" }}>
                من نحن
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:1.8, duration:.9 }}
        >
          <div className="si-line"/>
          <span className="si-label">scroll</span>
        </motion.div>
      </section>

      {/* ── PREMIUM STAT STRIP ─────────────────────── */}
      <div className="stat-strip" dir="rtl">
        <div className="container" style={{ padding:"clamp(32px,4.5vw,52px) 0" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"clamp(16px,3vw,40px)" }}>
            {([
              { n:"3",   label:"خدمات رئيسية",    sub:"هيكلة · إدارة · تطوير" },
              { n:"5",   label:"جهات تنظيمية",    sub:"الأوقاف · إحكام · هيئة العقار · الإسكان · أملاك" },
              { n:"KSA", label:"نطاق المملكة",    sub:"التركيز الحصري على المملكة العربية السعودية" },
            ] as const).map((s, i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:6, position:"relative" }}>
                {i > 0 && <div className="stat-vsep"/>}
                <div className="prem-stat-num blur-reveal" style={{ animationDelay:`${i*0.14}s` }}>{s.n}</div>
                <div className="prem-stat-label">{s.label}</div>
                <div className="prem-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. من نحن — SPLIT LAYOUT + IMAGE
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position:"relative", overflow:"hidden" }} dir="rtl">
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <div
            className="split-grid"
            style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:"clamp(56px,8vw,120px)",
              alignItems:"center",
            }}
          >
            {/* Right (RTL first col) — text */}
            <div>
              <Reveal direction="right">
                <div style={{ overflow:"hidden", marginBottom:24 }}>
                  <span className="pill pill-c">
                    <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--cyan)",boxShadow:"0 0 8px rgba(0,212,255,0.8)" }}/>
                    &nbsp;من نحن
                  </span>
                </div>
              </Reveal>

              <LineReveal delay={0.1}>
                <h2 style={{
                  fontSize:"clamp(26px,3.2vw,46px)",
                  fontWeight:800,
                  color:"var(--text-1)",
                  lineHeight:1.28,
                  marginBottom:0,
                }}>
                  منظومة عقارية متكاملة
                </h2>
              </LineReveal>

              <div className="accent-bar" style={{ marginTop:"clamp(18px,2.2vw,26px)" }}/>

              <Reveal direction="right" delay={0.2}>
                <p style={{
                  fontSize:"clamp(15px,1.3vw,17px)",
                  lineHeight:1.95,
                  color:"var(--text-3)",
                  marginBottom:40,
                  textAlign:"right",
                }}>
                  نساعد الملاك والعائلات والشركات والأوقاف على إدارة أصولهم العقارية
                  ضمن إطار واضح ومنظم يسهّل اتخاذ القرار ويحافظ على استدامة الأصول.
                  من خلال الجمع بين الخبرة العقارية والممارسات المؤسسية، نعمل على
                  تعزيز كفاءة الأصول ودعم نموها على المدى الطويل.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.32}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.85rem" }}>
                  {[
                    { Icon:HomeIcon,       label:"ملاك العقارات" },
                    { Icon:SuccessionIcon, label:"العائلات" },
                    { Icon:GovernanceIcon, label:"الشركات" },
                    { Icon:DocumentIcon,   label:"الأوقاف" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      ...glass,
                      padding:"20px 16px",
                      textAlign:"center",
                      display:"flex",
                      flexDirection:"column",
                      alignItems:"center",
                      gap:"0.6rem",
                    }}>
                      <GlassHighlight/>
                      <GlassInnerGlow/>
                      <div style={{ position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",gap:"0.6rem" }}>
                        <item.Icon size="md"/>
                        <span style={{ fontSize:12.5,color:"var(--text-2)",fontWeight:500 }}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Left (RTL second col) — image with luxury reveal */}
            <ImageReveal delay={0.12} style={{ aspectRatio:"3/4", minHeight:500, borderRadius:"clamp(16px,2vw,28px)" }}>
              <div className="split-img split-img-col" style={{ aspectRatio:"3/4", minHeight:500, borderRadius:0 }}>
                <SplitSlideshow slides={ADVISOR_SLIDES} interval={7000}/>
                <div className="img-grad" style={{ zIndex:10 }}/>
                <div className="img-corner-accent tl" style={{ zIndex:11 }}/>
                <div className="img-corner-accent br" style={{ zIndex:11 }}/>
                <div className="img-overlay" style={{ zIndex:12 }}>
                  <div style={{ ...glass, padding:"16px 20px" }}>
                    <GlassHighlight/>
                    <GlassInnerGlow/>
                    <div style={{ position:"relative",zIndex:2,display:"flex",gap:24,justifyContent:"flex-end",flexDirection:"row-reverse" }}>
                      {[
                        { n:"3",   l:"خدمات أساسية" },
                        { n:"5",   l:"جهات مرخّصة" },
                        { n:"KSA", l:"مقرها المملكة" },
                      ].map((s, i) => (
                        <div key={i} className="stat-block" style={{ textAlign:"right" }}>
                          <div className="stat-num">{s.n}</div>
                          <div className="stat-label">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. الجهات التنظيمية
          ══════════════════════════════════════════ */}
      <section style={{
        position:"relative",
        overflow:"hidden",
        background:"var(--bg-alt)",
        backdropFilter:"blur(40px)",
        borderTop:"1px solid var(--glass-border)",
        borderBottom:"1px solid var(--glass-border)",
      }} dir="rtl">
        <ScanLine/>
        <div className="container" style={{ padding:"clamp(60px,7vw,96px) 0", position:"relative", zIndex:1, direction:"rtl" }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(40px,4.5vw,56px)" }}>
            <Reveal direction="up">
              <div className="t-xs" style={{ color:"var(--cyan)", marginBottom:14 }}>الجهات التنظيمية</div>
            </Reveal>
            <LineReveal delay={0.08}>
              <h2 className="t-h2" style={{ color:"var(--text-1)" }}>مرخّصون ومنظَّمون.</h2>
            </LineReveal>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(min(200px,100%),1fr))",
            gap:"clamp(14px,2vw,22px)",
          }}>
            {REGULATORS_AR.map((r, i) => (
              <motion.div key={r.name} {...FU(i * 0.06)} style={{ position:"relative", paddingBottom:20 }}>
                <div style={{
                  position:"absolute",left:"5%",right:"5%",bottom:4,height:"75%",
                  borderRadius:20,background:"rgba(0,0,0,0.38)",
                  filter:"blur(14px)",zIndex:0,pointerEvents:"none",
                }}/>
                <div style={{
                  backdropFilter:"blur(48px) saturate(200%) brightness(1.08)",
                  WebkitBackdropFilter:"blur(48px) saturate(200%) brightness(1.08)",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.28)",
                  borderRadius:"20px",
                  position:"relative",zIndex:1,overflow:"hidden",
                  boxShadow:`
                    inset 0 1.5px 0 rgba(255,255,255,0.52),
                    0 4px 0 rgba(0,0,0,0.20),
                    0 32px 80px rgba(0,0,0,0.62)
                  `,
                  padding:"clamp(26px,3vw,40px) clamp(14px,2vw,24px)",
                  textAlign:"center",
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  minHeight:160,
                  transition:"all 0.42s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
                >
                  <div style={{ position:"absolute",top:0,left:0,right:0,height:"1.5px",
                    background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.52) 30%,rgba(255,255,255,0.72) 50%,rgba(255,255,255,0.52) 70%,transparent)",
                    zIndex:3,pointerEvents:"none" }}/>
                  <div style={{ position:"relative",zIndex:2,width:"100%" }}>
                    <div style={{ height:140,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.img}
                        alt={r.name}
                        style={{
                          maxHeight:(r.idx===0||r.idx===4)?140:115,
                          maxWidth:(r.idx===0||r.idx===4)?"100%":"88%",
                          width:(r.idx===0||r.idx===4)?"100%":undefined,
                          objectFit:"contain",
                          transform:(r.idx===0||r.idx===4)?"scale(1.3)":"none",
                          transformOrigin:"center center",
                          filter:"brightness(1.1) drop-shadow(0 2px 14px rgba(0,160,255,0.32))",
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize:10,fontWeight:700,letterSpacing:"0.06em",
                      textTransform:"none",color:"rgba(255,255,255,0.82)",lineHeight:1.4,
                    }}>{r.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial separator */}
      <div style={{ padding:"0 clamp(24px,5vw,80px)" }}><div className="editorial-rule"/></div>

      {/* ══════════════════════════════════════════
          4. من نحن — SERVICE LAYERS
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position:"relative", overflow:"hidden" }} dir="rtl">
        <ScanLine/>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{ position:"relative", zIndex:1, direction:"rtl" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(48px,6vw,96px)", alignItems:"center" }} className="grid-2">
            <div>
              <SectionHeading
                eyebrow="من نحن"
                title={<>منظومة عقارية متكاملة.</>}
                subtitle="نقدم نهجًا متكاملًا لإدارة الأصول العقارية وهيكلة الملكية، نساعد من خلاله عملاءنا على إدارة أصولهم وفق أطر حوكمة واضحة وإدارة فعّالة ونظرة بعيدة المدى."
              />
            </div>

            <motion.div
              ref={wwaRef}
              initial="hidden"
              animate={wwaVisible ? "visible" : "hidden"}
              variants={{ visible:{ transition:{ staggerChildren:0.32 } } }}
              style={{ display:"flex",flexDirection:"column",gap:0 }}
            >
              {SERVICE_LAYERS_AR.map((layer, i) => (
                <motion.div
                  key={layer.label}
                  variants={{
                    hidden:  { opacity:0, y:28 },
                    visible: { opacity:1, y:0, transition:{ duration:0.70, ease:[.25,.46,.45,.94] } },
                  }}
                >
                  <div className="layer-item" style={{
                    ...glass,
                    padding:"clamp(18px,2.2vw,26px) clamp(20px,2.2vw,28px)",
                    borderRight:`2px solid ${layer.color}55`,
                    direction:"rtl",
                    textAlign:"right",
                  }}>
                    <GlassHighlight/>
                    <GlassInnerGlow/>
                    <GlassSheen/>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2 }}>
                      <div style={{ width:10,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,flexShrink:0,marginLeft:16 }}/>
                      <div>
                        <div style={{ fontSize:14,fontWeight:700,color:"#ffffff",marginBottom:6,textAlign:"right" }}>{layer.label}</div>
                        <div className="t-xs" style={{ color:"rgba(255,255,255,0.78)",textTransform:"none",letterSpacing:0,fontSize:11.5,textAlign:"right" }}>
                          {layer.sub}
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < 2 && (
                    <motion.div
                      variants={{
                        hidden:  { scaleY:0, opacity:0 },
                        visible: { scaleY:1, opacity:1, transition:{ duration:0.38, ease:"easeOut", delay:0.44 } },
                      }}
                      style={{ display:"flex",flexDirection:"column",alignItems:"center",transformOrigin:"top" }}
                    >
                      <div style={{ width:1,height:28,background:"linear-gradient(180deg,rgba(0,220,255,0.75) 0%,rgba(0,180,255,0.25) 100%)",borderRadius:2 }}/>
                      <div style={{ width:5,height:5,borderRadius:"50%",background:"rgba(0,220,255,0.65)",boxShadow:"0 0 8px rgba(0,220,255,0.55)" }}/>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. SERVICES PREVIEW
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ background:"var(--bg-alt)",position:"relative",overflow:"hidden" }} dir="rtl">
        <ScanLine/>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{ position:"relative",zIndex:1,direction:"rtl" }}>
          <div style={{ marginBottom:"clamp(48px,6vw,72px)" }}>
            <SectionHeading
              wide
              eyebrow="خدماتنا"
              title="هيكلة مناسبة لكل نوع من أنواع الملكية."
              subtitle="صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، بدءًا من هيكلة الملكية والحوكمة، مرورًا بإدارة الأصول، وصولًا إلى التطوير والاستثمار، مع مراعاة الاحتياجات الخاصة لكل نوع من العملاء."
            />
          </div>

          <div className="grid-3" style={{ gap:"clamp(16px,2vw,24px)", marginBottom:"clamp(40px,4.5vw,56px)" }}>
            {SERVICES_AR.map((s, i) => (
              <motion.div key={s.id} {...FU(i * 0.06)}>
                <div
                  style={{
                    ...glass,
                    padding:"clamp(28px,3vw,44px)",
                    height:"100%",
                    position:"relative",
                    borderTop:`1.5px solid ${s.color}44`,
                    direction:"rtl",
                    textAlign:"right",
                    ...(hoveredService === i ? {
                      background:"rgba(0,36,96,0.68)",
                      border:`1px solid ${s.color}50`,
                      transform:"translateY(-8px)",
                      boxShadow:`inset 0 1.5px 0 ${s.color}66,0 32px 80px rgba(0,0,0,0.70),0 0 56px ${s.color}18`,
                    } : {}),
                  }}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <GlassHighlight color={hoveredService === i ? `${s.color}66` : undefined}/>
                  <GlassInnerGlow color={hoveredService === i ? `${s.color}14` : undefined}/>
                  <GlassSheen/>
                  <div className="svc-ghost-num">{s.num}</div>

                  <div style={{ position:"relative",zIndex:2 }}>
                    <div style={{
                      width:48,height:48,borderRadius:14,marginBottom:24,
                      background:"rgba(255,255,255,0.07)",
                      backdropFilter:"blur(20px) saturate(160%)",
                      WebkitBackdropFilter:"blur(20px) saturate(160%)",
                      border:`1px solid ${s.color}44`,
                      boxShadow:`inset 0 1px 0 rgba(255,255,255,0.32),0 4px 14px rgba(0,0,0,0.38),0 0 14px ${s.color}18`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      position:"relative",overflow:"hidden",
                    }}>
                      <div style={{ position:"absolute",top:0,left:0,right:0,height:"1px",
                        background:`linear-gradient(90deg,transparent,${s.color}88,rgba(255,255,255,0.4),transparent)`,zIndex:2 }}/>
                      <div style={{ position:"absolute",inset:0,
                        background:`radial-gradient(circle at 50% 0%,${s.color}22 0%,transparent 70%)`,zIndex:0 }}/>
                      <span style={{ position:"relative",zIndex:1,
                        filter:`drop-shadow(0 0 7px ${s.color}) drop-shadow(0 0 16px ${s.color}55)` }}>
                        {SERVICE_ICONS[i](s.color)}
                      </span>
                    </div>
                    <h3 style={{ fontSize:16,fontWeight:700,color:"#ffffff",marginBottom:12,lineHeight:1.48 }}>{s.label}</h3>
                    <p className="t-sm" style={{ color:"rgba(255,255,255,0.78)",lineHeight:1.88 }}>{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign:"center" }}>
            <a href="/ar/services" className="btn btn-ghost" style={{ fontSize:15,padding:"15px 36px" }}>
              ← عرض جميع الخدمات
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. CTA — ابدأ محادثة
          ══════════════════════════════════════════ */}
      <section className="section" style={{
        position:"relative", overflow:"hidden", textAlign:"center",
        background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))",
      }} dir="rtl">
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <Reveal direction="up">
            <p className="t-xs" style={{ color:"var(--cyan)", marginBottom:20, letterSpacing:"0.10em" }}>ابدأ الآن</p>
          </Reveal>
          <LineReveal delay={0.06}>
            <h2 className="t-h2 gt-w" style={{ marginBottom:18 }}>ابدأ محادثة.</h2>
          </LineReveal>
          <Reveal direction="up" delay={0.14}>
            <p className="t-lg" style={{ color:"var(--text-3)", maxWidth:460, margin:"0 auto 48px" }}>
              كل تواصل يُعامَل بسرية تامة.
            </p>
          </Reveal>
          <motion.div {...FU(.20)} style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/ar/contact" className="btn btn-primary" style={{ fontSize:15, padding:"15px 38px" }}>← تواصل معنا</a>
            <a href="/ar/services" className="btn btn-ghost" style={{ fontSize:15, padding:"15px 38px" }}>خدماتنا</a>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
        @media(max-width:960px){.split-grid{grid-template-columns:1fr!important}}
        @media(max-width:960px){.split-grid .split-img-col{aspect-ratio:16/9!important;min-height:320px!important}}
        @media(max-width:640px){.stat-strip .container>div{grid-template-columns:1fr!important;gap:24px!important}}
      `}</style>
    </main>
  );
}
