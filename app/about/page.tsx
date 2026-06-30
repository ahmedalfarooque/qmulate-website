"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FU } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Reveal } from "@/components/Reveal";
import { LineReveal, ImageReveal } from "@/components/TextReveal";
import ScanLine from "@/components/ScanLine";
import {
  PortfolioIcon, DocumentIcon,
  LockIcon, UserIcon, StarIcon, WealthIcon, GovernanceIcon,
} from "@/components/icons/GlassIcons";
import { HeroSlideshow } from "@/components/HeroSlideshow";

/* ─── SLIDESHOW IMAGES ───────────────────────────────────────────── */
const HERO_SLIDES = [
  { src:"/Background%20Images/AqAtJNNbvEz9B_X-LrvudRWxvbGO0TcEOO5SOIbPjUWLqGfIMCKZFPPK0e7NrLFWV7OmSEzLhtJmL3K_7GwubvHYNeRbz28PhCctZMEQHwtw1-O1ES9RZPJOy-84skQbgX_ywVavjAsRlX-xptvQOCoqVeg18wEu_VYl9Lw1WW.jpg", position:"center 38%" },
  { src:"/Background%20Images/EDa2yEV826m1m8qajQ_68snVQ4wUUK5-AnhRrlvluoZ9u-8wBSsZVwXSaiI9F1Nl2UOulJ6lRUc5QuHWieEnlsi0O1iIp4MR1cu76APuTICU7qS46yHxy6yvlxMn4j7nXo3AcBkm8RUFQr0Bgwm4ZSrn_KJCWYwdD-BBY6AKpN.jpg", position:"center 40%" },
  { src:"/Background%20Images/_K7bLmnmYeenh0AczYa4VqBSnewL9A47WxeeERWevDPDqyjlTFc9rxqHIPzQaTcnshhbn290miCBrLILvFBGJHWtP4SKinyEDsb_ijCOdx1McrJVNu9hvym7ofLNC0opQbil-dANXL34euw6Ml9t5uV8Hlk4hVWcIxTZfQY9CY.jpg",     position:"center 60%" },
];
const IMG_BREAK = "/Background%20Images/hZBubFn_zlWV4ixbYjDKwKprrycSsZiDh2KZSZIPMoMGMKCelLdIwscS23sRYb2PjNNTIxJn3TPyTPI9wiSFFUph06IoIT06t4BdwPXr-dgtG7p5djBTdVtfxZaGn9TQRYpOVijM2jX3aonOEdk9GK4czwffUqZFIjxG12U4ff.jpg";

/* ─── GLASS ──────────────────────────────────────────────────── */
const glass: React.CSSProperties = {
  backdropFilter:"blur(24px) saturate(160%)",
  WebkitBackdropFilter:"blur(24px) saturate(160%)",
  background:"rgba(8,14,44,0.62)",
  border:"1px solid rgba(255,255,255,0.13)",
  borderRadius:"20px",
  position:"relative",
  overflow:"hidden",
  boxShadow:"inset 0 1.5px 0 rgba(255,255,255,0.42),0 20px 56px rgba(0,0,0,0.58)",
  transition:"all 0.38s cubic-bezier(0.4,0,0.2,1)",
};

function GlassHighlight() {
  return (
    <div style={{
      position:"absolute",top:0,left:0,right:0,height:"1px",
      background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.24) 30%,rgba(255,255,255,0.34) 50%,rgba(255,255,255,0.24) 70%,transparent)",
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

/* ── Parallax image break ── */
function ParallaxImageBreak({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const y = useTransform(scrollYProgress, [0,1], ["-12%","12%"]);

  return (
    <div ref={ref} style={{ position:"relative", height:"clamp(280px,38vw,560px)", overflow:"hidden" }}>
      <motion.div style={{ position:"absolute", inset:"-15% 0", y, willChange:"transform" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="parallax-break-img"/>
      </motion.div>
      {/* Cinematic overlay: color grade + vignette */}
      <div style={{ position:"absolute",inset:0,background:"rgba(4,14,44,0.44)",mixBlendMode:"multiply",zIndex:1 }}/>
      <div style={{
        position:"absolute",inset:0,
        background:"linear-gradient(180deg,rgba(2,4,10,0.72) 0%,rgba(2,4,10,0.08) 44%,rgba(2,4,10,0.72) 100%)",
        zIndex:2,
      }}/>
      <div style={{
        position:"absolute",inset:0,
        background:"radial-gradient(ellipse 85% 75% at 50% 50%,transparent 30%,rgba(2,4,10,0.55) 80%,rgba(2,4,10,0.85) 100%)",
        zIndex:3,
      }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main style={{ position:"relative" }}>
      <PageBackground variant="about"/>

      {/* ── HERO: Cinematic fullbleed ── */}
      <section className="hero-fullbleed" style={{ minHeight:"75vh" }}>
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
                  About QMULATE
                </span>
              </motion.div>
            </div>

            <div style={{ overflow:"hidden" }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.48, duration:.90, ease:[.16,1,.3,1] }}
                style={{
                  fontSize:"clamp(32px,4.8vw,66px)",
                  fontWeight:800,
                  color:"rgba(255,255,255,0.96)",
                  lineHeight:1.1,
                  letterSpacing:"-0.030em",
                  maxWidth:860,
                  marginBottom:0,
                }}
              >
                We transform real estate assets into
              </motion.h1>
            </div>
            <div style={{ overflow:"hidden", marginBottom:32 }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.62, duration:.90, ease:[.16,1,.3,1] }}
                style={{
                  fontSize:"clamp(32px,4.8vw,66px)",
                  fontWeight:800,
                  color:"rgba(255,255,255,0.96)",
                  lineHeight:1.1,
                  letterSpacing:"-0.030em",
                  maxWidth:860,
                }}
              >
                long-term opportunities for growth.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity:0, y:18 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:.90, duration:.75 }}
              style={{
                fontSize:"clamp(15px,1.3vw,18px)",
                lineHeight:1.80,
                color:"rgba(255,255,255,0.58)",
                maxWidth:680,
              }}
            >
              By helping property owners, families, businesses, and endowments
              establish clear ownership and management frameworks, we enhance
              asset performance, unlock potential, and create lasting value
              for generations to come.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION — SPLIT ── */}
      <section className="section-lux" style={{ position:"relative", overflow:"hidden" }}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(52px,6vw,76px)" }}>
            <Reveal direction="up">
              <span className="pill pill-c">
                <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--cyan)",boxShadow:"0 0 8px rgba(0,212,255,0.8)" }}/>
                &nbsp;Our Purpose
              </span>
            </Reveal>
          </div>

          <div className="grid-2" style={{ gap:"clamp(20px,3vw,36px)" }}>
            {/* Vision */}
            <ImageReveal delay={0.08}>
              <div style={{
                ...glass,
                padding:"clamp(36px,4vw,52px)",
                height:"100%",
                borderTop:"1.5px solid rgba(0,200,255,0.45)",
              }}>
                <GlassHighlight/>
                <GlassInnerGlow color="rgba(0,200,255,0.07)"/>
                <div style={{ position:"relative", zIndex:2 }}>
                  <PortfolioIcon size="lg"/>
                  <div className="accent-bar" style={{ marginTop:22 }}/>
                  <h3 style={{
                    fontSize:"clamp(20px,2.2vw,28px)",
                    fontWeight:700,
                    color:"var(--text-1)",
                    marginBottom:"1.1rem",
                    letterSpacing:"-0.022em",
                  }}>Vision</h3>
                  <p style={{ fontSize:"clamp(14px,1.2vw,16px)", lineHeight:1.80, color:"var(--text-3)" }}>
                    To be a trusted partner for families, businesses, and individuals
                    in structuring real estate ownership, managing assets, and turning
                    them into sustainable opportunities that preserve value and
                    support growth across generations.
                  </p>
                </div>
              </div>
            </ImageReveal>

            {/* Mission */}
            <ImageReveal delay={0.18}>
              <div style={{
                ...glass,
                background:"rgba(0,28,76,0.65)",
                padding:"clamp(36px,4vw,52px)",
                height:"100%",
                borderTop:"1.5px solid rgba(0,200,255,0.45)",
              }}>
                <GlassHighlight/>
                <GlassInnerGlow color="rgba(0,200,255,0.07)"/>
                <div style={{ position:"relative", zIndex:2 }}>
                  <DocumentIcon size="lg"/>
                  <div className="accent-bar" style={{ marginTop:22 }}/>
                  <h3 style={{
                    fontSize:"clamp(20px,2.2vw,28px)",
                    fontWeight:700,
                    color:"var(--text-1)",
                    marginBottom:"1.1rem",
                    letterSpacing:"-0.022em",
                  }}>Mission</h3>
                  <p style={{ fontSize:"clamp(14px,1.2vw,16px)", lineHeight:1.80, color:"var(--text-3)" }}>
                    We develop and manage real estate assets through clear governance
                    and management frameworks that preserve value, enhance returns,
                    and support long-term investment sustainability.
                  </p>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ── IMAGE BREAK — full-bleed with parallax ── */}
      <ParallaxImageBreak src={IMG_BREAK}/>

      {/* ── VALUES ── */}
      <section className="section-lux" style={{ background:"var(--bg-alt)", position:"relative", overflow:"hidden" }}>
        <ArchitecturalBg variant="lattice"/>
        <ScanLine/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(52px,6vw,76px)" }}>
            <Reveal direction="up">
              <span className="pill pill-c">OUR VALUES</span>
            </Reveal>
            <LineReveal delay={0.1} style={{ marginTop:18 }}>
              <h2 style={{
                fontSize:"clamp(28px,3.4vw,48px)",
                fontWeight:800,
                color:"var(--text-1)",
                letterSpacing:"-0.026em",
                lineHeight:1.14,
              }}>Our Values</h2>
            </LineReveal>
            <Reveal direction="up" delay={0.2}>
              <p style={{ fontSize:16, color:"var(--text-3)", marginTop:16 }}>
                The principles that guide every decision we make
              </p>
            </Reveal>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
            gap:"clamp(14px,1.8vw,20px)",
          }}>
            {([
              { Icon:LockIcon,       title:"Integrity",      color:"rgba(0,212,255,0.42)",  desc:"We uphold transparency, honesty, and accountability in everything we do, building lasting trust with our clients and partners." },
              { Icon:UserIcon,       title:"Client Focus",   color:"rgba(0,200,255,0.36)",  desc:"We tailor our solutions to the unique needs, objectives, and assets of each client, ensuring a personalized and value-driven approach." },
              { Icon:StarIcon,       title:"Excellence",     color:"rgba(138,92,255,0.40)", desc:"We are committed to delivering high-quality work that combines deep real estate expertise with disciplined institutional practices." },
              { Icon:WealthIcon,     title:"Sustainability", color:"rgba(77,141,255,0.38)", desc:"We strive to protect and enhance asset value while supporting long-term growth and continuity for future generations." },
              { Icon:GovernanceIcon, title:"Responsibility", color:"rgba(138,92,255,0.35)", desc:"We approach every asset with diligence and care, recognizing the long-term impact of the decisions we make." },
            ] as const).map((value, i) => (
              <Reveal key={i} direction="up" delay={i * 0.07}>
                <div
                  className="hover-lift"
                  style={{
                    ...glass,
                    padding:"clamp(28px,3vw,42px) clamp(22px,2.4vw,32px)",
                    height:"100%",
                    borderTop:`1.5px solid ${value.color}`,
                    position:"relative",
                    overflow:"hidden",
                  }}
                >
                  <GlassHighlight/>
                  <GlassInnerGlow/>
                  {/* Ghost number background */}
                  <div className="ghost-bg-num" style={{ bottom:"-8%", right:"-4%", fontSize:"clamp(90px,12vw,160px)" }}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  <div style={{ position:"relative",zIndex:2 }}>
                    <div className="value-num-prefix">{String(i+1).padStart(2,"0")}</div>
                    <value.Icon size="md"/>
                    <h4 style={{
                      fontSize:"clamp(15px,1.5vw,19px)",
                      fontWeight:700,
                      color:"var(--text-1)",
                      marginTop:"1.1rem",
                      marginBottom:"0.75rem",
                      letterSpacing:"-0.018em",
                    }}>{value.title}</h4>
                    <p style={{ fontSize:13.5, lineHeight:1.78, color:"var(--text-3)" }}>{value.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ textAlign:"center", position:"relative", overflow:"hidden" }}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <LineReveal delay={0}>
            <h2 className="t-h2 gt-w" style={{ marginBottom:18 }}>Ready to begin a conversation?</h2>
          </LineReveal>
          <motion.p {...FU(.08)} className="t-lg" style={{ color:"var(--text-3)", marginBottom:42 }}>
            Every introduction is treated with complete discretion.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize:15, padding:"15px 38px" }}>Get in touch →</Link>
            <Link href="/services" className="btn btn-ghost" style={{ fontSize:15, padding:"15px 34px" }}>Our services</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
