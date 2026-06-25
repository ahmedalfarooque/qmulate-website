"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Reveal } from "@/components/Reveal";
import {
  PortfolioIcon, DocumentIcon,
  LockIcon, UserIcon, StarIcon, WealthIcon, GovernanceIcon,
} from "@/components/icons/GlassIcons";

export default function AboutPage() {
  return (
    <main style={{ position: "relative" }}>
      <PageBackground variant="about" />

      {/* ── Hero ── */}
      <section style={{
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        position: 'relative', overflow: 'hidden',
        background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <img src="/Logo.png" alt="" style={{
            width: "55%", maxWidth: "580px", height: "auto",
            opacity: 0.03, filter: "brightness(10) saturate(0)", userSelect: "none",
          }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '6px 16px', borderRadius: '999px',
              border: '1px solid rgba(91,124,250,0.28)',
              background: 'rgba(91,124,250,0.10)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              marginBottom: '1.5rem',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B7CFA', boxShadow: '0 0 8px rgba(91,124,250,0.8)' }}/>
              <span style={{ color: 'rgba(91,124,250,0.9)', fontSize: 11, letterSpacing: '0.13em', fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase' }}>
                About QMULATE
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h1 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800,
              color: 'var(--text-1)', lineHeight: 1.15, maxWidth: '900px', marginBottom: '1.5rem',
            }}>
              We transform real estate assets into long-term opportunities for growth.
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.65, color: 'var(--text-3)', maxWidth: '760px' }}>
              By helping property owners, families, businesses, and endowments
              establish clear ownership and management frameworks, we enhance
              asset performance, unlock potential, and create lasting value
              for generations to come.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section style={{ padding: 'clamp(40px, 6vw, 80px) 0', position: 'relative', overflow: 'hidden' }}>
        <ArchitecturalBg variant="fins" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-2" style={{ gap: 'clamp(24px,3vw,40px)' }}>
            <Reveal direction="left">
              <div style={{
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                background: 'rgba(8,14,44,0.62)',
                border: '1px solid rgba(0,200,255,0.28)',
                borderRadius: '20px',
                padding: 'clamp(28px, 3vw, 40px)',
                height: '100%',
                boxShadow: 'inset 0 1.5px 0 rgba(0,220,255,0.55), 0 24px 60px rgba(0,0,0,0.65)',
              }}>
                <PortfolioIcon size="lg" />
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Vision</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-3)' }}>
                  To be a trusted partner for families, businesses, and individuals
                  in structuring real estate ownership, managing assets, and turning
                  them into sustainable opportunities that preserve value and
                  support growth across generations.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div style={{
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                background: 'rgba(0,30,80,0.62)',
                border: '1px solid rgba(0,200,255,0.28)',
                borderRadius: '20px',
                padding: 'clamp(28px, 3vw, 40px)',
                height: '100%',
                boxShadow: 'inset 0 1.5px 0 rgba(0,220,255,0.55), 0 24px 60px rgba(0,0,0,0.65)',
              }}>
                <DocumentIcon size="lg" />
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Mission</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-3)' }}>
                  We develop and manage real estate assets through clear governance
                  and management frameworks that preserve value, enhance returns,
                  and support long-term investment sustainability.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
        <ArchitecturalBg variant="lattice" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.75rem' }}>Our Values</h2>
              <p style={{ fontSize: 16, color: 'var(--text-3)' }}>The principles that guide every decision we make</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {([
              { Icon: LockIcon,       title: 'Integrity',     desc: 'We uphold transparency, honesty, and accountability in everything we do, building lasting trust with our clients and partners.' },
              { Icon: UserIcon,       title: 'Client Focus',  desc: 'We tailor our solutions to the unique needs, objectives, and assets of each client, ensuring a personalized and value-driven approach.' },
              { Icon: StarIcon,       title: 'Excellence',    desc: 'We are committed to delivering high-quality work that combines deep real estate expertise with disciplined institutional practices.' },
              { Icon: WealthIcon,     title: 'Sustainability',desc: 'We strive to protect and enhance asset value while supporting long-term growth and continuity for future generations.' },
              { Icon: GovernanceIcon, title: 'Responsibility',desc: 'We approach every asset with diligence and care, recognizing the long-term impact of the decisions we make.' },
            ] as const).map((value, i) => (
              <Reveal key={i} direction="up" delay={i * 0.08}>
                <div style={{
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  background: 'rgba(8,14,44,0.62)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: '18px',
                  padding: '28px 24px',
                  height: '100%',
                  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.45), 0 24px 60px rgba(0,0,0,0.65)',
                }}>
                  <value.Icon size="md" />
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-1)', marginTop: '1rem', marginBottom: '0.5rem' }}>{value.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-3)' }}>{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
        <ArchitecturalBg variant="strata-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{ marginBottom: 16 }}>Ready to begin a conversation?</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{ color: "var(--text-3)", marginBottom: 36 }}>
            Every introduction is treated with complete discretion.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 36px" }}>Get in touch →</Link>
            <Link href="/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }}>Our services</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
