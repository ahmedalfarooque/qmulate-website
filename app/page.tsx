"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FU, SectionHeading } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import ScanLine from "@/components/ScanLine";
import { Reveal } from "@/components/Reveal";
import { LineReveal, ImageReveal } from "@/components/TextReveal";
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

/* ─── GLASS SYSTEM ────────────────────────────────────────────────── */
const GLASS_BASE: React.CSSProperties = {
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
};
const glass: React.CSSProperties = {
  ...GLASS_BASE,
  background: 'rgba(8,14,44,0.62)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: `
    inset 0 1.5px 0 rgba(255,255,255,0.42),
    inset 1px 0 0 rgba(255,255,255,0.16),
    0 20px 56px rgba(0,0,0,0.60),
    0 6px 16px rgba(0,0,0,0.40)
  `,
};
/* glass without the 'border' shorthand — safe to combine with individual
   borderTopColor/borderRightColor etc. without React's shorthand-mixing warning */
const { border: _glassBorder, ...GLASS_SIDE } = glass;

const glassCyan: React.CSSProperties = {
  ...GLASS_BASE,
  background: 'rgba(0,28,76,0.65)',
  border: '1px solid rgba(0,200,255,0.28)',
  boxShadow: `
    inset 0 1.5px 0 rgba(0,220,255,0.50),
    0 20px 56px rgba(0,0,0,0.60)
  `,
};

/* Decorator helpers */
function GlassHighlight({ color = 'rgba(255,255,255,0.24)' }: { color?: string }) {
  return (
    <div style={{
      position:'absolute',top:0,left:0,right:0,height:'1px',
      background:`linear-gradient(90deg,transparent,${color} 30%,rgba(255,255,255,0.32) 50%,${color} 70%,transparent)`,
      pointerEvents:'none',zIndex:3,
    }}/>
  );
}
function GlassInnerGlow({ color = 'rgba(255,255,255,0.05)' }: { color?: string }) {
  return (
    <div style={{
      position:'absolute',top:0,left:0,right:0,height:'55%',
      background:`linear-gradient(180deg,${color} 0%,transparent 100%)`,
      pointerEvents:'none',zIndex:0,borderRadius:'inherit',
    }}/>
  );
}
function GlassSheen() {
  return (
    <div style={{
      position:'absolute',inset:0,
      background:'linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 30%,transparent 60%)',
      pointerEvents:'none',zIndex:0,borderRadius:'inherit',
    }}/>
  );
}

/* ─── DATA ────────────────────────────────────────────────────────────── */
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

const HOME_SERVICES = [
  { id:"structuring", num:"01", label:"Ownership Structuring & Governance", color:"var(--cyan)",
    body:"Organising ownership frameworks and decision-making structures for long-term clarity and control." },
  { id:"asset-management", num:"02", label:"Real Estate Asset Management", color:"#8A5CFF",
    body:"Managing portfolios through leasing, operations, and maintenance to preserve and enhance value." },
  { id:"development", num:"03", label:"Development & Investment", color:"#4D8DFF",
    body:"Identifying and executing opportunities for expansion, repositioning, and sustainable growth." },
];

const REGULATORS = [
  { name:"AWQAF",                     img:"/Regulatory%20Authorities/AWQAF%20LOGO.png" },
  { name:"EHKAAM",                    img:"/Regulatory%20Authorities/EHKAAM%20LOGO.png" },
  { name:"Ministry of Housing",       img:"/Regulatory%20Authorities/Ministry%20of%20Housing%20Logo.png" },
  { name:"Real Estate General Authority", img:"/Regulatory%20Authorities/REAL%20ESTATE%20GENERAL%20AUTHORITY%20LOGO.png" },
  { name:"State Property General Authority", img:"/Regulatory%20Authorities/STATE%20PROPERTY%20OF%20GENERAL%20AUTHORITY%20LOGO.png" },
];

const SERVICE_LAYERS = [
  { label:"Ownership Structuring", sub:"Clear frameworks · Decision governance · Long-term clarity", color:"var(--cyan)" },
  { label:"Asset Management",       sub:"Leasing · Operations · Maintenance · Value preservation",  color:"#8A5CFF" },
  { label:"Development & Investment",sub:"Expansion · Repositioning · Sustainable growth",          color:"#4D8DFF" },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [hoveredService, setHoveredService] = useState<number|null>(null);

  /* Hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroImgY    = useTransform(scrollYProgress, [0,1], ["0%","22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.7], [1,0]);

  /* WHO WE ARE counter reveal */
  const wwaRef = useRef<HTMLDivElement>(null);
  const wwaVisible = useInView(wwaRef, { once:true, margin:"-20px" });

  return (
    <main className="hero-page" style={{ position:"relative" }}>
      <PageBackground variant="home"/>

      {/* ══════════════════════════════════════════
          1. HERO — CINEMATIC FULLBLEED
          ══════════════════════════════════════════ */}
      <section ref={heroRef} className="hero-fullbleed" style={{ minHeight:"100svh" }}>

        {/* Parallax wrapper — translates image slower than page scroll */}
        <motion.div
          style={{ position:"absolute", inset:"-8% 0", y:heroImgY, willChange:"transform" }}
        >
          <HeroSlideshow slides={HERO_SLIDES} interval={9000}/>
        </motion.div>

        {/* Layer 2: Deep navy color grade — shifts warm golden→cool blue */}
        <div className="hero-grade"/>

        {/* Layer 3: Subtle cyan brand screen */}
        <div className="hero-cyan-grade"/>

        {/* Layer 4: Directional gradient — darkens bottom for text legibility */}
        <div style={{
          position:"absolute",inset:0,zIndex:4,
          background:"linear-gradient(162deg,rgba(0,5,24,0.48) 0%,transparent 42%,rgba(2,4,10,0.04) 56%,rgba(2,4,10,0.97) 100%)",
        }}/>

        {/* Layer 5: Radial vignette — darkens all edges */}
        <div className="hero-vignette"/>

        {/* Layer 6: Top + side feathers — no hard boundaries */}
        <div className="hero-top-feather"/>
        <div className="hero-side-feathers"/>

        {/* Layer 7: Cyan ambient glow — brand color light at base */}
        <div className="hero-cyan-glow"/>

        <ScanLine/>

        {/* Subtle architectural grid overlay */}
        <div style={{
          position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(0,212,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.022) 1px,transparent 1px)",
          backgroundSize:"100px 100px",
        }}/>

        {/* Content */}
        <motion.div className="hero-content" style={{ opacity:heroOpacity }}>
          <div className="container">

            {/* Eyebrow */}
            <div style={{ overflow:"hidden", marginBottom:32 }}>
              <motion.div
                initial={{ y:"110%" }}
                animate={{ y:0 }}
                transition={{ delay:.35, duration:.7, ease:[.16,1,.3,1] }}
              >
                <span className="pill pill-c">
                  <span className="dot-live"/>
                  Integrated Real Estate Platform
                </span>
              </motion.div>
            </div>

            {/* Headline — line by line luxury reveal */}
            <div style={{ overflow:"hidden" }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.52, duration:.92, ease:[.16,1,.3,1] }}
                className="gt-w"
                style={{
                  fontSize:"clamp(40px,5.8vw,86px)",
                  fontWeight:900,
                  lineHeight:1.02,
                  letterSpacing:"-0.036em",
                  marginBottom:0,
                }}
              >
                Transforming Ownership
              </motion.h1>
            </div>
            <div style={{ overflow:"hidden", marginBottom:40 }}>
              <motion.h1
                initial={{ y:"108%" }}
                animate={{ y:0 }}
                transition={{ delay:.68, duration:.92, ease:[.16,1,.3,1] }}
                className="gt-w"
                style={{
                  fontSize:"clamp(40px,5.8vw,86px)",
                  fontWeight:900,
                  lineHeight:1.02,
                  letterSpacing:"-0.036em",
                }}
              >
                into Enduring Value.
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity:0, y:22 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:.96, duration:.80 }}
              style={{
                fontSize:"clamp(16px,1.5vw,20px)",
                lineHeight:1.82,
                color:"rgba(255,255,255,0.60)",
                maxWidth:560,
                marginBottom:48,
              }}
            >
              A fully integrated real estate platform for families, businesses, and individuals,
              dedicated to managing assets, preserving value, and enabling sustainable long-term growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1.14, duration:.70 }}
              style={{ display:"flex", gap:16, flexWrap:"wrap" }}
            >
              <a href="/contact" className="btn btn-primary" style={{ fontSize:15, padding:"15px 36px" }}>
                Request an introduction →
              </a>
              <a href="/about" className="btn btn-ghost" style={{ fontSize:15, padding:"15px 32px" }}>
                Our approach
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
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
      <div className="stat-strip">
        <div className="container" style={{ padding:"clamp(32px,4.5vw,52px) 0" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"clamp(16px,3vw,40px)" }}>
            {([
              { n:"3",   label:"Core Services",       sub:"Structuring · Management · Development" },
              { n:"5",   label:"Regulatory Bodies",   sub:"AWQAF · EHKAAM · REGA · Housing · SPGA" },
              { n:"KSA", label:"Kingdom-Wide Focus",  sub:"Saudi Arabia exclusive operations" },
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
          2. WHO ARE WE — SPLIT LAYOUT + IMAGE
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position:"relative", overflow:"hidden" }}>
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
            {/* Left — text */}
            <div>
              <Reveal direction="up">
                <div style={{ overflow:"hidden", marginBottom:24 }}>
                  <span className="pill pill-c">
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--cyan)", boxShadow:"0 0 8px rgba(0,212,255,0.8)" }}/>
                    &nbsp;Who Are We
                  </span>
                </div>
              </Reveal>

              <LineReveal delay={0.1}>
                <h2 style={{
                  fontSize:"clamp(28px,3.4vw,48px)",
                  fontWeight:800,
                  color:"var(--text-1)",
                  lineHeight:1.16,
                  letterSpacing:"-0.026em",
                  marginBottom:0,
                }}>
                  An Integrated Real Estate Platform
                </h2>
              </LineReveal>

              <div className="accent-bar" style={{ marginTop:"clamp(20px,2.2vw,28px)" }}/>

              <Reveal direction="up" delay={0.2}>
                <p style={{
                  fontSize:"clamp(15px,1.3vw,18px)",
                  lineHeight:1.82,
                  color:"var(--text-3)",
                  marginBottom:40,
                }}>
                  We support property owners, families, businesses, and endowments in
                  managing their real estate assets through a clear and structured
                  framework that facilitates decision-making and promotes long-term
                  sustainability. By combining real estate expertise with institutional
                  best practices, we help enhance asset performance, preserve value,
                  and support sustainable growth over time.
                </p>
              </Reveal>

              {/* Client type grid */}
              <Reveal direction="up" delay={0.32}>
                <div style={{
                  display:"grid",
                  gridTemplateColumns:"1fr 1fr",
                  gap:"0.85rem",
                }}>
                  {[
                    { Icon:HomeIcon,       label:"Property Owners" },
                    { Icon:SuccessionIcon, label:"Families" },
                    { Icon:GovernanceIcon, label:"Businesses" },
                    { Icon:DocumentIcon,   label:"Endowments" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      ...glass,
                      padding:"20px 16px",
                      textAlign:"center",
                      display:"flex",
                      flexDirection:"column",
                      alignItems:"center",
                      gap:"0.6rem",
                      cursor:"default",
                    }}>
                      <GlassHighlight/>
                      <GlassInnerGlow/>
                      <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.6rem" }}>
                        <item.Icon size="md"/>
                        <span style={{ fontSize:12.5, color:"var(--text-2)", fontWeight:500 }}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — image with luxury reveal */}
            <ImageReveal delay={0.12} style={{ aspectRatio:"3/4", minHeight:500, borderRadius:"clamp(16px,2vw,28px)" }}>
              <div className="split-img split-img-col" style={{ aspectRatio:"3/4", minHeight:500, borderRadius:0 }}>
                <SplitSlideshow slides={ADVISOR_SLIDES} interval={7000}/>
                <div className="img-grad" style={{ zIndex:10 }}/>
                {/* Decorative corners */}
                <div className="img-corner-accent tl" style={{ zIndex:11 }}/>
                <div className="img-corner-accent br" style={{ zIndex:11 }}/>
                <div className="img-overlay" style={{ zIndex:12 }}>
                  <div style={{ ...glass, padding:"16px 20px" }}>
                    <GlassHighlight/>
                    <GlassInnerGlow/>
                    <div style={{ position:"relative", zIndex:2, display:"flex", gap:28 }}>
                      {[
                        { n:"3",   l:"Core Services" },
                        { n:"5",   l:"Licensed Bodies" },
                        { n:"KSA", l:"Kingdom Based" },
                      ].map((s, i) => (
                        <div key={i} className="stat-block">
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
          3. REGULATORY AUTHORITIES
          ══════════════════════════════════════════ */}
      <section style={{
        position:"relative",
        overflow:"hidden",
        background:"var(--bg-alt)",
        backdropFilter:"blur(40px)",
        borderTop:"1px solid var(--glass-border)",
        borderBottom:"1px solid var(--glass-border)",
      }}>
        <ScanLine/>
        <div className="container" style={{ padding:"clamp(60px,7vw,96px) 0", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(40px,4.5vw,56px)" }}>
            <Reveal direction="up">
              <div className="t-xs" style={{ color:"var(--cyan)", marginBottom:14 }}>REGULATORY AUTHORITIES</div>
            </Reveal>
            <LineReveal delay={0.08}>
              <h2 className="t-h2" style={{ color:"var(--text-1)" }}>Licensed and Regulated.</h2>
            </LineReveal>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(min(200px,100%),1fr))",
            gap:"clamp(14px,2vw,22px)",
          }}>
            {REGULATORS.map((r, i) => (
              <motion.div key={r.name} {...FU(i * 0.06)} style={{ position:"relative", paddingBottom:20 }}>
                {/* Depth shadow */}
                <div style={{
                  position:"absolute",left:"5%",right:"5%",bottom:4,height:"75%",
                  borderRadius:20,background:"rgba(0,0,0,0.38)",
                  filter:"blur(14px)",zIndex:0,pointerEvents:"none",
                }}/>
                {/* Card */}
                <div style={{
                  backdropFilter:"blur(48px) saturate(200%) brightness(1.08)",
                  WebkitBackdropFilter:"blur(48px) saturate(200%) brightness(1.08)",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.28)",
                  borderRadius:"20px",
                  position:"relative",zIndex:1,overflow:"hidden",
                  boxShadow:`
                    inset 0 1.5px 0 rgba(255,255,255,0.52),
                    inset 1px 0 0 rgba(255,255,255,0.20),
                    0 4px 0 rgba(0,0,0,0.20),
                    0 10px 0 rgba(0,0,0,0.12),
                    0 32px 80px rgba(0,0,0,0.62)
                  `,
                  padding:"clamp(26px,3vw,40px) clamp(14px,2vw,24px)",
                  textAlign:"center",
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  minHeight:160,
                  transition:"all 0.42s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1.5px 0 rgba(255,255,255,0.62),0 32px 100px rgba(0,0,0,0.70),0 0 48px rgba(0,180,255,0.14)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1.5px 0 rgba(255,255,255,0.52),inset 1px 0 0 rgba(255,255,255,0.20),0 4px 0 rgba(0,0,0,0.20),0 10px 0 rgba(0,0,0,0.12),0 32px 80px rgba(0,0,0,0.62)`;
                }}
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
                          maxHeight:(i===0||i===4)?140:115,
                          maxWidth:(i===0||i===4)?"100%":"88%",
                          width:(i===0||i===4)?"100%":undefined,
                          objectFit:"contain",
                          transform:(i===0||i===4)?"scale(1.3)":"none",
                          transformOrigin:"center center",
                          filter:"brightness(1.1) drop-shadow(0 2px 14px rgba(0,160,255,0.32))",
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize:10,fontWeight:700,letterSpacing:"0.10em",
                      textTransform:"uppercase",color:"rgba(255,255,255,0.82)",lineHeight:1.4,
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
          4. WHO WE ARE — SERVICE LAYERS
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position:"relative", overflow:"hidden" }}>
        <ScanLine/>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <div
            style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:"clamp(48px,6vw,96px)",
              alignItems:"center",
            }}
            className="grid-2"
          >
            <div>
              <SectionHeading
                eyebrow="WHO WE ARE"
                title={<>An integrated real estate platform.</>}
                subtitle="We provide an integrated approach to real estate asset management and ownership structuring, helping clients manage their assets through clear governance, effective management, and a long-term perspective."
              />
            </div>

            <motion.div
              ref={wwaRef}
              initial="hidden"
              animate={wwaVisible ? "visible" : "hidden"}
              variants={{ visible:{ transition:{ staggerChildren:0.32 } } }}
              style={{ display:"flex", flexDirection:"column", gap:0 }}
            >
              {SERVICE_LAYERS.map((layer, i) => (
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
                    borderLeft:`2px solid ${layer.color}55`,
                  }}>
                    <GlassHighlight/>
                    <GlassInnerGlow/>
                    <GlassSheen/>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2 }}>
                      <div>
                        <div style={{ fontSize:14,fontWeight:700,color:"#ffffff",marginBottom:6 }}>{layer.label}</div>
                        <div className="t-xs" style={{ color:"rgba(255,255,255,0.78)",textTransform:"none",letterSpacing:0,fontSize:11.5 }}>
                          {layer.sub}
                        </div>
                      </div>
                      <div style={{ width:10,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,flexShrink:0,marginLeft:16 }}/>
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
      <section className="section-lux" style={{ background:"var(--bg-alt)",position:"relative",overflow:"hidden" }}>
        <ScanLine/>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{ position:"relative",zIndex:1 }}>
          <div style={{ marginBottom:"clamp(48px,6vw,72px)" }}>
            <SectionHeading
              wide
              eyebrow="OUR SERVICES"
              title="Structured for every type of ownership."
              subtitle="Our services cover the key aspects of real estate ownership, from structuring and governance to asset management, development, and investment, tailored to the unique needs of corporates, endowments, and individuals."
            />
          </div>

          <div className="grid-3" style={{ gap:"clamp(16px,2vw,24px)", marginBottom:"clamp(40px,4.5vw,56px)" }}>
            {HOME_SERVICES.map((s, i) => (
              <motion.div key={s.id} {...FU(i * 0.06)}>
                <div
                  className="lux-card"
                  style={{
                    ...GLASS_SIDE,
                    /* Individual border longhands — no shorthand mixing */
                    borderTopWidth:    hoveredService===i ? '1px'   : '1.5px',
                    borderTopStyle:    'solid',
                    borderTopColor:    hoveredService===i ? `${s.color}50` : `${s.color}44`,
                    borderRightWidth:  '1px', borderRightStyle: 'solid',
                    borderRightColor:  hoveredService===i ? `${s.color}50` : 'rgba(255,255,255,0.13)',
                    borderBottomWidth: '1px', borderBottomStyle: 'solid',
                    borderBottomColor: hoveredService===i ? `${s.color}50` : 'rgba(255,255,255,0.13)',
                    borderLeftWidth:   '1px', borderLeftStyle: 'solid',
                    borderLeftColor:   hoveredService===i ? `${s.color}50` : 'rgba(255,255,255,0.13)',
                    padding:"clamp(28px,3vw,44px)",
                    height:"100%",
                    position:"relative",
                    ...(hoveredService === i ? {
                      background:"rgba(0,36,96,0.68)",
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

                  {/* Ghost number */}
                  <div className="svc-ghost-num">{s.num}</div>

                  <div style={{ position:"relative", zIndex:2 }}>
                    {/* Icon container */}
                    <div style={{
                      width:48,height:48,borderRadius:14,marginBottom:24,
                      background:"rgba(255,255,255,0.07)",
                      backdropFilter:"blur(20px) saturate(160%)",
                      WebkitBackdropFilter:"blur(20px) saturate(160%)",
                      border:`1px solid ${s.color}44`,
                      boxShadow:`inset 0 1px 0 rgba(255,255,255,0.32),0 4px 14px rgba(0,0,0,0.38),0 0 14px ${s.color}18`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      position:"relative",overflow:"hidden",
                      transition:"all 0.35s ease",
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

                    <h3 style={{ fontSize:16,fontWeight:700,color:"#ffffff",marginBottom:12,lineHeight:1.35 }}>{s.label}</h3>
                    <p className="t-sm" style={{ color:"rgba(255,255,255,0.78)",lineHeight:1.82 }}>{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign:"center" }}>
            <a href="/services" className="btn btn-ghost" style={{ fontSize:15, padding:"15px 36px" }}>
              View all services →
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. CTA — BEGIN A CONVERSATION
          ══════════════════════════════════════════ */}
      <section className="section" style={{
        position:"relative", overflow:"hidden", textAlign:"center",
        background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))",
      }}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <Reveal direction="up">
            <p className="t-xs" style={{ color:"var(--cyan)", marginBottom:20, letterSpacing:"0.15em" }}>READY TO GET STARTED</p>
          </Reveal>
          <LineReveal delay={0.06}>
            <h2 className="t-h2 gt-w" style={{ marginBottom:18 }}>Begin a conversation.</h2>
          </LineReveal>
          <Reveal direction="up" delay={0.14}>
            <p className="t-lg" style={{ color:"var(--text-3)", maxWidth:460, margin:"0 auto 48px" }}>
              Every introduction is treated with complete discretion.
            </p>
          </Reveal>
          <motion.div {...FU(.20)} style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/contact" className="btn btn-primary" style={{ fontSize:15, padding:"15px 38px" }}>Get in touch →</a>
            <a href="/services" className="btn btn-ghost" style={{ fontSize:15, padding:"15px 38px" }}>View services</a>
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
