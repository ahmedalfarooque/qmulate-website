"use client";
import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, GlassCard } from "@/components/DS";
import { GovernanceIcon, PortfolioIcon, DigitalIcon } from "@/components/icons/GlassIcons";
import { PageBackground } from "@/components/PageBackground";
import { LineReveal, ImageReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";

/* ─── SLIDESHOW IMAGES ───────────────────────────────────────────── */
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

/* Layout rhythm per service: editorial variety, not a flat repeated grid */
const LAYOUTS = ["split", "feature", "split-rev"] as const;

const SERVICES = [
  {
    num:"01",
    title:"Ownership Structuring & Governance",
    color:"#4C63D2",
    img: IMG_SVC[0],
    clients:[
      { label:"Corporates",           body:"Structuring ownership arrangements and organizing relationships between shareholders, partners, and investors to ensure clear authority, effective decision-making, and long-term business sustainability." },
      { label:"Endowments",           body:"Establishing governance frameworks for endowment assets that support the fulfillment of endowment objectives, strengthen oversight, and ensure continuity across generations." },
      { label:"Individuals & Families", body:"Organizing personal assets and investments within a structured framework that supports governance, informed decision-making, and long-term planning." },
    ],
  },
  {
    num:"02",
    title:"Real Estate Asset Management",
    color:"#5B7CFA",
    img: IMG_SVC[1],
    clients:[
      { label:"Corporates",           body:"Managing real estate portfolios through leasing, operations, maintenance, and collections to preserve asset value and enhance operational performance." },
      { label:"Endowments",           body:"Managing and operating endowment assets to maximize their benefit while preserving value and ensuring long-term sustainability in line with the endowment's objectives." },
      { label:"Individuals & Families", body:"Managing personal and investment properties through a structured approach that provides performance visibility, protects asset value, and enhances returns." },
    ],
  },
  {
    num:"03",
    title:"Development & Investment",
    color:"#0A0B0D",
    img: IMG_SVC[2],
    clients:[
      { label:"Corporates",           body:"Identifying opportunities for expansion, development, and asset repositioning to support growth and maximize investment returns." },
      { label:"Endowments",           body:"Evaluating and developing endowment assets through sustainable investment opportunities that strengthen long-term impact and value creation." },
      { label:"Individuals & Families", body:"Assessing investment opportunities and identifying the most suitable path for development, retention, or exit in line with long-term financial objectives." },
    ],
  },
];

/* ═════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <main style={{ position:"relative" }}>
      <PageBackground variant="services"/>

      {/* ── HERO: one unified section — headline sits OVER the image ── */}
      <section className="svc-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="svc-hero-img" src={HERO_SLIDES[0].src} alt="QMULATE services" style={{ objectPosition:HERO_SLIDES[0].position }}/>
        <div className="svc-hero-scrim" />

        <div className="container svc-hero-inner">
          <div className="svc-hero-copy">
            <Reveal direction="up" delay={0.05}>
              <span className="pill pill-c" style={{ marginBottom:22 }}>
                Services
              </span>
            </Reveal>

            <h1 className="t-h1 gt-w" style={{ marginBottom:0 }}>
              <LineReveal delay={0.15}><span>Structured for every type of ownership.</span></LineReveal>
            </h1>

            <motion.p
              {...FU(.4)}
              className="t-lg"
              style={{ color:"var(--text-3)", maxWidth:520, marginTop:26 }}
            >
              Our services cover the key aspects of real estate ownership, from structuring and governance to asset management,
              development, and investment.
            </motion.p>

            <motion.div {...FU(.48)} className="ed-hero-cta-row">
              <Link href="/contact" className="btn btn-primary" style={{ fontSize:14, padding:"14px 30px" }}>Start a conversation →</Link>
              <Link href="/about" className="btn btn-ghost" style={{ fontSize:14, padding:"14px 26px" }}>About QMULATE</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* quick-fact cards straddling the hero's lower edge */}
      <div className="container">
        <div className="ed-hero-cards svc-hero-cards">
          {[
            { Icon:GovernanceIcon, title:"Structuring & Governance", body:"Organizing ownership arrangements and governance frameworks for clear, long-term control." },
            { Icon:PortfolioIcon,  title:"Asset Management",         body:"Leasing, operations, and maintenance that preserve and enhance portfolio value." },
            { Icon:DigitalIcon,    title:"Development & Investment", body:"Identifying opportunities for expansion, repositioning, and sustainable growth." },
          ].map((c,i)=>(
            <Reveal key={c.title} direction="up" delay={i*0.08}>
              <div className="ed-hero-card">
                <c.Icon size="md"/>
                <h4 className="t-h4" style={{ color:"var(--text-1)", marginTop:14, marginBottom:8 }}>{c.title}</h4>
                <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.7 }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── STRUCTURED INDEX — anchor rail tying the three services together ── */}
      <div className="svc-index-rail">
        <div className="container">
          <div className="svc-index-row">
            {SERVICES.map((svc, i) => (
              <a key={svc.num} href={`#svc-${svc.num}`} className="svc-index-item">
                <span className="svc-index-dot" style={{ background:svc.color }} />
                <span className="svc-index-num">{svc.num}</span>
                <span className="svc-index-label">{svc.title}</span>
              </a>
            ))}
          </div>
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
          {si > 0 && <div className="container"><div className="deco-divider"><span className="line" /><span className="deco-diamond" /><span className="line r" /></div></div>}
          <section id={`svc-${svc.num}`} className="section-lux" style={{
            position:"relative",
            overflow:"hidden",
            scrollMarginTop:"96px",
          }}>
            {/* Ghost service number — editorial anchor */}
            <div className="svc-ghost-num" style={{ top:"clamp(20px,3vw,32px)", right:"clamp(20px,3vw,32px)" }}>{svc.num}</div>

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

                  <div style={{ maxWidth:760, marginBottom:"clamp(40px,4.5vw,60px)" }}>
                    <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                      <SvcIcon size="md"/>
                      <span className="t-xs" style={{ color:svc.color }}>{svc.num}</span>
                    </motion.div>
                    <LineReveal delay={0.05}>
                      <h2 className="t-h2" style={{ color:"var(--text-1)" }}>{svc.title}</h2>
                    </LineReveal>
                    <div className="accent-bar" style={{ background:`linear-gradient(90deg,${svc.color},color-mix(in srgb,${svc.color} 40%,transparent))` }}/>
                  </div>
                </>
              ) : (
                <>
                  {/* ── SPLIT LAYOUT (alternating direction) ── */}
                  <div className="grid-2 svc-split" style={{
                    gap:"clamp(48px,6vw,96px)",
                    alignItems:"flex-start",
                    marginBottom:"clamp(44px,5vw,68px)",
                    direction: isRev ? "rtl" : "ltr",
                  }}>
                    <div style={{ direction:"ltr" }}>
                      <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22 }}>
                        <SvcIcon size="md"/>
                        <span className="t-xs" style={{ color:svc.color }}>{svc.num}</span>
                      </motion.div>

                      <LineReveal delay={0.05}>
                        <h2 style={{
                          fontSize:"clamp(24px,2.9vw,42px)",
                          fontWeight:700,
                          fontFamily:"var(--font-geist,'Inter',sans-serif)",
                          color:"var(--text-1)",
                          letterSpacing:"-0.012em",
                          lineHeight:1.16,
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
                      }}>
                        <div style={{
                          fontSize:11, color:svc.color, fontWeight:700, letterSpacing:"0.13em",
                          textTransform:"uppercase", fontFamily:"var(--font-geist-mono,'Courier New'),monospace",
                        }}>
                          {c.label}
                        </div>
                        <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.88 }}>{c.body}</p>
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
                          fontSize:11,
                          color:svc.color,
                          fontWeight:700,
                          letterSpacing:"0.13em",
                          textTransform:"uppercase",
                          marginBottom:18,
                          fontFamily:"var(--font-geist-mono,'Courier New'),monospace",
                        }}>
                          {c.label}
                        </div>
                        <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.88 }}>{c.body}</p>
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

      {/* ── SHOWCASE PULL-QUOTE (contained dark band) ── */}
      <div className="container" style={{ padding:"0 clamp(20px,4vw,48px) clamp(28px,4vw,48px)" }}>
        <Reveal direction="up">
          <div className="showcase-dark" style={{ textAlign:"center" }}>
            <div className="showcase-quote" style={{ maxWidth:760, margin:"0 auto" }}>
              Structured for every type of ownership — governance, management, and growth in one integrated platform.
            </div>
            <div className="deco-divider" style={{ marginTop:"clamp(20px,2.6vw,30px)" }}>
              <span className="line" /><span className="deco-diamond" /><span className="line r" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── CTA ── */}
      <section className="section" style={{ textAlign:"center" }}>
        <div className="container">
          <LineReveal delay={0}>
            <h2 className="t-h2 gt-w" style={{ marginBottom:18 }}>Begin a conversation.</h2>
          </LineReveal>
          <motion.p {...FU(.08)} className="t-lg" style={{ color:"var(--text-3)", marginBottom:42 }}>
            Every introduction is treated with complete discretion.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize:15, padding:"15px 38px" }}>Get in touch →</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.svc-split{grid-template-columns:1fr!important;direction:ltr!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
        @media(max-width:560px){.svc-layer-row{grid-template-columns:1fr!important;gap:8px!important}}

        /* ── Structured index rail — wayfinding across the three services ── */
        .svc-index-rail{
          position:sticky; top:0; z-index:20;
          padding:14px 0;
          background:
            radial-gradient(100% 220% at 8% 0%, rgba(255,255,255,0.20) 0%, transparent 60%),
            linear-gradient(180deg,rgba(255,255,255,0.20) 0%,rgba(255,255,255,0.10) 100%);
          backdrop-filter:blur(24px) saturate(180%); -webkit-backdrop-filter:blur(24px) saturate(180%);
          border-top:1px solid rgba(255,255,255,0.38); border-bottom:1px solid rgba(255,255,255,0.38);
        }
        @media(max-width:767px){ .svc-index-rail{ backdrop-filter:none; -webkit-backdrop-filter:none; background:rgba(255,255,255,0.92); position:relative; } }
        .svc-index-row{ display:flex; gap:clamp(18px,3vw,40px); overflow-x:auto; scrollbar-width:none; }
        .svc-index-row::-webkit-scrollbar{ display:none; }
        .svc-index-item{
          display:flex; align-items:center; gap:9px; white-space:nowrap; flex-shrink:0;
          font-size:12.5px; font-weight:600; color:var(--text-3); text-decoration:none;
          padding:6px 2px; transition:color .2s ease;
        }
        .svc-index-item:hover{ color:var(--text-1); }
        .svc-index-dot{ width:6px; height:6px; border-radius:50%; flex-shrink:0; }
        .svc-index-num{
          font-family:var(--font-geist-mono,'Courier New'),monospace; font-size:10.5px;
          color:var(--text-4); letter-spacing:.06em;
        }
      `}</style>
    </main>
  );
}
