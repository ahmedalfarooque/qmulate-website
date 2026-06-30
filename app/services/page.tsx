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

const SERVICE_ICONS = [GovernanceIcon, PortfolioIcon, DigitalIcon];

const SERVICES = [
  {
    num:"01",
    title:"Ownership Structuring & Governance",
    color:"var(--cyan)",
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
    color:"#8A5CFF",
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
    color:"#4D8DFF",
    img: IMG_SVC[2],
    clients:[
      { label:"Corporates",           body:"Identifying opportunities for expansion, development, and asset repositioning to support growth and maximize investment returns." },
      { label:"Endowments",           body:"Evaluating and developing endowment assets through sustainable investment opportunities that strengthen long-term impact and value creation." },
      { label:"Individuals & Families", body:"Assessing investment opportunities and identifying the most suitable path for development, retention, or exit in line with long-term financial objectives." },
    ],
  },
];

/* ─── GLASS ──────────────────────────────────────── */
const glass: React.CSSProperties = {
  backdropFilter:"blur(24px) saturate(160%)",
  WebkitBackdropFilter:"blur(24px) saturate(160%)",
  background:"rgba(8,14,44,0.62)",
  border:"1px solid rgba(255,255,255,0.13)",
  borderRadius:"20px",
  position:"relative",
  overflow:"hidden",
  boxShadow:"inset 0 1.5px 0 rgba(255,255,255,0.40),0 20px 56px rgba(0,0,0,0.58)",
  transition:"all 0.38s cubic-bezier(0.4,0,0.2,1)",
};
function GlassHighlight() {
  return <div style={{
    position:"absolute",top:0,left:0,right:0,height:"1px",
    background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.24) 30%,rgba(255,255,255,0.34) 50%,rgba(255,255,255,0.24) 70%,transparent)",
    pointerEvents:"none",zIndex:3,
  }}/>;
}
function GlassInnerGlow({ color="rgba(255,255,255,0.05)" }:{ color?:string }) {
  return <div style={{
    position:"absolute",top:0,left:0,right:0,height:"55%",
    background:`linear-gradient(180deg,${color} 0%,transparent 100%)`,
    pointerEvents:"none",zIndex:0,borderRadius:"inherit",
  }}/>;
}

/* ═════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <main style={{ position:"relative" }}>
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

        <div className="hero-content" style={{ paddingBottom:"clamp(56px,8vw,96px)" }}>
          <div className="container">
            <div style={{ overflow:"hidden", marginBottom:24 }}>
              <motion.div
                initial={{ y:"110%" }}
                animate={{ y:0 }}
                transition={{ delay:.3, duration:.7, ease:[.16,1,.3,1] }}
              >
                <span className="pill pill-c">
                  <span className="dot-live"/>
                  Services
                </span>
              </motion.div>
            </div>

            <div style={{ overflow:"hidden" }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.48, duration:.90, ease:[.16,1,.3,1] }}
                style={{
                  fontSize:"clamp(32px,4.8vw,70px)",
                  fontWeight:800,
                  color:"rgba(255,255,255,0.96)",
                  lineHeight:1.08,
                  letterSpacing:"-0.032em",
                  maxWidth:740,
                  marginBottom:0,
                }}
              >
                Structured for every type
              </motion.h1>
            </div>
            <div style={{ overflow:"hidden", marginBottom:32 }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.62, duration:.90, ease:[.16,1,.3,1] }}
                style={{
                  fontSize:"clamp(32px,4.8vw,70px)",
                  fontWeight:800,
                  color:"rgba(255,255,255,0.96)",
                  lineHeight:1.08,
                  letterSpacing:"-0.032em",
                  maxWidth:740,
                }}
              >
                of ownership.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity:0, y:18 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:.88, duration:.75 }}
              style={{
                fontSize:"clamp(15px,1.3vw,18px)",
                lineHeight:1.80,
                color:"rgba(255,255,255,0.58)",
                maxWidth:560,
              }}
            >
              Our services cover the key aspects of real estate ownership, from structuring and governance to asset management,
              development, and investment.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      {SERVICES.map((svc, si) => {
        const SvcIcon = SERVICE_ICONS[si];
        const isEven = si % 2 === 0;
        return (
          <section key={svc.num} className="section-lux" style={{
            position:"relative",
            overflow:"hidden",
            background: isEven ? undefined : "var(--bg-alt)",
          }}>
            {/* Ghost service number — editorial anchor */}
            <div className="ghost-bg-num" style={{ top:"-4%", right:"2%", fontSize:"clamp(140px,20vw,240px)" }}>{svc.num}</div>
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
                  <motion.div {...FI()} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22 }}>
                    <SvcIcon size="md"/>
                    <span className="t-xs" style={{ color:svc.color }}>{svc.num}</span>
                  </motion.div>

                  <LineReveal delay={0.05}>
                    <h2 style={{
                      fontSize:"clamp(24px,2.9vw,42px)",
                      fontWeight:800,
                      color:"var(--text-1)",
                      letterSpacing:"-0.026em",
                      lineHeight:1.16,
                      borderLeft:`3px solid ${svc.color}`,
                      paddingLeft:22,
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
                    {/* Color accent bar on image */}
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
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
