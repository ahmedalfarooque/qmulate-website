"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, GlassCard } from "@/components/DS";
import { PageBackground } from "@/components/PageBackground";
import { Reveal } from "@/components/Reveal";
import { LineReveal } from "@/components/TextReveal";
import {
  PortfolioIcon, DocumentIcon,
  LockIcon, UserIcon, StarIcon, WealthIcon, GovernanceIcon,
} from "@/components/icons/GlassIcons";

/* ── Values ── */
const VALUES = [
  { Icon:LockIcon,       title:"Integrity",      color:"#4C63D2", desc:"We uphold transparency, honesty, and accountability in everything we do, building lasting trust with our clients and partners." },
  { Icon:UserIcon,       title:"Client Focus",   color:"#5B7CFA", desc:"We tailor our solutions to the unique needs, objectives, and assets of each client, ensuring a personalized and value-driven approach." },
  { Icon:StarIcon,       title:"Excellence",     color:"#0A0B0D", desc:"We are committed to delivering high-quality work that combines deep real estate expertise with disciplined institutional practices." },
  { Icon:WealthIcon,     title:"Sustainability", color:"#3B54C4", desc:"We strive to protect and enhance asset value while supporting long-term growth and continuity for future generations." },
  { Icon:GovernanceIcon, title:"Responsibility", color:"#4C63D2", desc:"We approach every asset with diligence and care, recognizing the long-term impact of the decisions we make." },
] as const;

/* ── Highlights — the same real facts previously shown as overlapping
   cards on a hero photograph; now compact rows inside the narrative
   column, no imagery involved. ── */
const HIGHLIGHTS = [
  { Icon:GovernanceIcon, title:"Governance-Led",          body:"Clear ownership frameworks and decision-making structures for every asset." },
  { Icon:WealthIcon,     title:"Value Preservation",      body:"Disciplined institutional practices that protect and grow long-term value." },
  { Icon:DocumentIcon,   title:"Kingdom-Wide Compliance", body:"Structured under Saudi Arabia's regulatory framework across five licensing bodies." },
] as const;

/* ── Stacked cards — right column ── */
const STACK_CARDS = [
  { Icon:PortfolioIcon, title:"Vision", body:"To be a trusted partner for families, businesses, and individuals in structuring real estate ownership, managing assets, and turning them into sustainable opportunities that preserve value and support growth across generations." },
  { Icon:DocumentIcon,  title:"Mission", body:"We develop and manage real estate assets through clear governance and management frameworks that preserve value, enhance returns, and support long-term investment sustainability." },
  { Icon:GovernanceIcon, title:"Core Values", body:"Integrity, client focus, sustainability, and responsibility guide every decision we make — explored in full below." },
  { Icon:StarIcon, title:"Excellence", body:"We are committed to delivering high-quality work that combines deep real estate expertise with disciplined institutional practices." },
] as const;

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main className="hero-page" style={{ position:"relative" }}>
      <PageBackground variant="about"/>

      {/* ── HERO — one unified section, headline OVER a premium architecture image ── */}
      <section className="svc-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="svc-hero-img" src="/Background%20Images/Hero_About%20Page1.jpg" alt="QMULATE" style={{ objectPosition:"center 42%" }}/>
        <div className="svc-hero-scrim" />

        <div className="container svc-hero-inner">
          <div className="svc-hero-copy">
            <Reveal direction="up" delay={0.05}>
              <span className="pill pill-c" style={{ marginBottom:22 }}>
                About QMULATE
              </span>
            </Reveal>

            <h1 className="t-h1 gt-w" style={{ marginBottom:0 }}>
              <LineReveal delay={0.15}><span>We transform real estate assets into long-term opportunities for growth.</span></LineReveal>
            </h1>

            <motion.p
              {...FU(.4)}
              className="t-lg"
              style={{ color:"var(--text-3)", maxWidth:540, marginTop:26 }}
            >
              By helping property owners, families, businesses, and endowments
              establish clear ownership and management frameworks, we enhance
              asset performance, unlock potential, and create lasting value
              for generations to come.
            </motion.p>

            <motion.div {...FU(.48)} className="ed-hero-cta-row">
              <Link href="/contact" className="btn btn-primary" style={{ fontSize:14, padding:"14px 30px" }}>Get in touch →</Link>
              <Link href="/services" className="btn btn-ghost" style={{ fontSize:14, padding:"14px 26px" }}>Our services</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE — narrative · abstract glass art · stacked cards ── */}
      <section className="section-lux section-lux-tight-bottom" style={{ position:"relative", overflow:"hidden" }}>
        <div className="deco-shard" style={{ top:"8%", right:"-2%" }} />
        <div className="deco-shard" style={{ bottom:"10%", left:"-3%", transform:"rotate(-16deg)" }} />
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <div className="about-split">

            {/* Left — narrative */}
            <div className="about-narrative">
              <Reveal direction="up">
                <span className="pill pill-c">Who We Are</span>
              </Reveal>
              <LineReveal delay={0.08} style={{ marginTop:18 }}>
                <h2 className="t-h2 gt-w">A governance-led platform for real estate ownership.</h2>
              </LineReveal>

              <motion.p {...FU(.16)} className="t-md about-narrative-p">
                QMULATE is a real estate ownership and asset management platform
                built for families, businesses, and endowments across the Kingdom.
                We help clients establish clear ownership structures, govern their
                holdings with discipline, and turn static assets into long-term
                sources of value.
              </motion.p>

              <motion.p {...FU(.24)} className="t-md about-narrative-p">
                Every engagement is structured around the same principle: clarity
                of ownership creates confidence in decision-making. From structuring
                and governance to asset management, development, and investment, we
                bring institutional discipline to every stage of the ownership
                lifecycle.
              </motion.p>

              <div className="about-highlights">
                {HIGHLIGHTS.map((h,i)=>(
                  <Reveal key={h.title} direction="up" delay={.3+i*.06}>
                    <div className="about-highlight-row">
                      <h.Icon size="sm"/>
                      <div>
                        <div className="about-highlight-title">{h.title}</div>
                        <div className="about-highlight-body">{h.body}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right — stacked glass cards */}
            <div className="about-cards-col">
              {STACK_CARDS.map((c,i)=>(
                <Reveal key={c.title} direction="up" delay={.1+i*.08}>
                  <GlassCard style={{ padding:"clamp(24px,2.6vw,34px)" }}>
                    <c.Icon size="md"/>
                    <h4 className="t-h4 about-card-title">{c.title}</h4>
                    <p className="t-sm about-card-body">{c.body}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-lux section-lux-tight-top">
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"clamp(48px,6vw,72px)" }}>
            <Reveal direction="up">
              <span className="pill pill-c">Our Values</span>
            </Reveal>
            <LineReveal delay={0.1} style={{ marginTop:18 }}>
              <h2 className="t-h2 gt-w">The principles that guide us</h2>
            </LineReveal>
            <Reveal direction="up" delay={0.2}>
              <p className="t-md" style={{ color:"var(--text-3)", marginTop:16 }}>
                The principles that guide every decision we make
              </p>
            </Reveal>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
            gap:"clamp(14px,1.8vw,20px)",
          }}>
            {VALUES.map((value, i) => (
              <Reveal key={value.title} direction="up" delay={i * 0.07}>
                <GlassCard style={{
                  padding:"clamp(28px,3vw,42px) clamp(22px,2.4vw,32px)",
                  height:"100%",
                }}>
                  <div className="value-num-prefix">{String(i+1).padStart(2,"0")}</div>
                  <value.Icon size="md"/>
                  <h4 className="t-h4" style={{
                    color:"var(--text-1)",
                    marginTop:"1.1rem",
                    marginBottom:"0.75rem",
                  }}>{value.title}</h4>
                  <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.78 }}>{value.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWCASE + CTA (single contained dark band) ── */}
      <div className="container" style={{ padding:"0 clamp(20px,4vw,48px) clamp(28px,4vw,48px)" }}>
        <Reveal direction="up">
          <div className="showcase-dark" style={{ textAlign:"center" }}>
            <div className="showcase-quote showcase-quote-sm" style={{ maxWidth:680, margin:"0 auto" }}>
              We develop and manage real estate assets through clear governance, preserving value and supporting long-term investment sustainability.
            </div>
            <h2 className="showcase-cta-h" style={{ marginTop:"clamp(22px,2.8vw,32px)", marginBottom:10 }}>Ready to begin a conversation?</h2>
            <p className="showcase-sub" style={{ maxWidth:440, margin:"0 auto 26px" }}>
              Every introduction is treated with complete discretion.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/contact" className="btn btn-primary" style={{ fontSize:14, padding:"13px 32px" }}>Get in touch →</Link>
              <Link href="/services" className="btn btn-ghost" style={{ fontSize:14, padding:"13px 28px", color:"#F5F6F8", borderColor:"rgba(255,255,255,0.20)" }}>Our services</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
