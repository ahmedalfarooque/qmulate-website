"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChallengeIcon, SolutionCheckIcon } from "@/components/icons";
import {
  FU, FI, FS, FL,
  SectionHeading, GlassCard,
} from "@/components/DS";
import {
  ArchitecturalBg, StrataLines, GovernancePulse,
  StrataSculpture, GlassFacade, VerticalFins,
  StructuralLattice, BRAND_BLUE,
} from "@/components/Strata";

const PROJECTS = [
  {
    id: "001",
    title: "Multi-Generational Succession Framework",
    type: "Succession Engineering",
    status: "Active",
    year: "2024",
    duration: "18 months",
    accentColor: "#00D4FF",
    brief:
      "A third-generation family required a complete succession framework covering real estate assets across multiple jurisdictions — built for permanence, not just compliance.",
    challenge:
      "The family had accumulated assets across KSA, UAE, London, and Jersey over four decades with no unified governance structure, creating succession ambiguity and operational fragmentation.",
    solution:
      "We designed a four-layer governance architecture with structured entities, constitutional family documents, and a long-term succession roadmap engineered to outlast its principals.",
    pillars: [
      {
        label: "Governance Architecture",
        desc: "Constitutional documents, entity structuring, and voting rights frameworks designed for multi-generational clarity.",
      },
      {
        label: "Jurisdiction Alignment",
        desc: "Unified governance visibility across KSA, UAE, London, and Jersey with consolidated reporting.",
      },
      {
        label: "Succession Protocol",
        desc: "Third-generation succession framework with documented transfer mechanisms and family governance councils.",
      },
      {
        label: "Long-Term Stewardship",
        desc: "Perpetual mandate design with succession-proof structures built to outlast its principals.",
      },
    ],
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  return (
    <main className="hero-page">

      {/* ══════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "60vh", position: "relative",
        display: "flex", alignItems: "center", overflow: "hidden",
        background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div className="bg-grid" style={{ opacity: 0.5 }} />
        <div className="bg-aurora" />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div {...FI(0.05)} style={{ marginBottom: 20 }}>
            <span className="pill pill-c">
              <span style={{ display: "inline-block", width: 10, height: 3, borderRadius: 1, background: BRAND_BLUE, marginRight: 8, verticalAlign: "middle" }} />
              Case Studies · Institutional Mandates
            </span>
          </motion.div>

          <motion.h1
            {...FU(0.1)} className="t-d gt-w"
            style={{ marginBottom: 20, maxWidth: 860, fontSize: "clamp(44px,6vw,88px)" }}
          >
            Mandates that<br /><span className="gt-c">redefined governance.</span>
          </motion.h1>

          <motion.p
            {...FU(0.18)} className="t-xl"
            style={{ color: "var(--text-3)", maxWidth: 560, lineHeight: 1.75, marginBottom: 40 }}
          >
            Each engagement is a structured governance system — designed for permanence, not just performance.
          </motion.p>

          {/* Architectural visualization in hero */}
          <motion.div
            {...FS(0.22)}
            style={{
              display: "flex", gap: 32, alignItems: "flex-end",
              padding: "28px 32px",
              background: "var(--g1)", border: "1px solid var(--glass-border)",
              borderRadius: 20, backdropFilter: "blur(20px)",
              maxWidth: 680, overflow: "hidden", position: "relative",
            }}
          >
            <StrataLines count={6} width={120} opacity={0.18} color={BRAND_BLUE} />
            <div style={{ flex: 1 }}>
              <GovernancePulse width={320} height={48} opacity={0.22} color={BRAND_BLUE} />
            </div>
            <VerticalFins count={8} height={60} opacity={0.12} style={{ flexShrink: 0 }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECT SELECTOR + CONTENT
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <ArchitecturalBg variant="lattice" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          {/* Tab selectors */}
          <motion.div {...FU(0)} style={{ display: "flex", gap: 12, marginBottom: 56, flexWrap: "wrap" }}>
            {PROJECTS.map((p, i) => (
              <motion.button
                key={p.id}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "12px 28px", borderRadius: 100, fontSize: 13,
                  fontWeight: 600, cursor: "pointer",
                  background: active === i ? p.accentColor : "rgba(255,255,255,.04)",
                  color: active === i ? "#020408" : "var(--text-3)",
                  border: `1px solid ${active === i ? p.accentColor : "rgba(255,255,255,.08)"}`,
                  transition: "all .25s",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-geist-mono,'Courier New'),monospace",
                  fontSize: 10, opacity: 0.7, marginRight: 10,
                }}>{p.id}</span>
                {p.type}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* ── Project header ── */}
              <div
                style={{
                  display: "grid", gridTemplateColumns: "1.2fr 1fr",
                  gap: "clamp(32px,4vw,64px)", marginBottom: 40,
                }}
                className="grid-2"
              >
                <div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                    <span className="pill pill-c">{project.type}</span>
                    <span style={{
                      padding: "4px 14px", borderRadius: 100, fontSize: 11, fontWeight: 600,
                      background: `${project.accentColor}18`, color: project.accentColor,
                      border: `1px solid ${project.accentColor}33`,
                    }}>{project.status}</span>
                    <span style={{
                      padding: "4px 14px", borderRadius: 100, fontSize: 11,
                      color: "var(--text-4)", background: "var(--g1)",
                      border: "1px solid var(--glass-border)",
                    }}>{project.year} · {project.duration}</span>
                  </div>

                  <motion.h2
                    {...FU(0.05)} className="t-h1 gt-w"
                    style={{ marginBottom: 24, lineHeight: 1.15 }}
                  >
                    {project.title}
                  </motion.h2>

                  <motion.p
                    {...FU(0.12)} className="t-lg"
                    style={{ color: "var(--text-3)", lineHeight: 1.8 }}
                  >
                    {project.brief}
                  </motion.p>
                </div>

                {/* Visual governance panel */}
                <motion.div {...FS(0.15)} style={{ position: "relative" }}>
                  <GlassCard style={{
                    padding: "clamp(28px,3vw,44px)", height: "100%",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    borderLeft: `2px solid ${project.accentColor}33`,
                    overflow: "hidden",
                  }}>
                    <StrataLines count={7} width={280} opacity={0.18} color={project.accentColor} />
                    <div style={{ marginTop: 20 }}>
                      <GovernancePulse width={280} height={56} opacity={0.28} color={project.accentColor} />
                    </div>
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--glass-border)" }}>
                      <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: 6 }}>GOVERNANCE SYSTEM</div>
                      <div style={{ fontSize: 13, color: "var(--text-2)", fontWeight: 600 }}>Structural perpetuity · Multi-generational</div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>

              {/* ── Challenge + Solution ── */}
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}
                className="grid-2"
              >
                {[
                  { label: "The Challenge", body: project.challenge, icon: "challenge", accent: "rgba(255,107,107,0.6)" },
                  { label: "Our Solution", body: project.solution, icon: "solution", accent: project.accentColor },
                ].map((block, i) => (
                  <motion.div key={block.label} {...FU(0.08 + i * 0.08)}>
                    <GlassCard style={{
                      padding: "clamp(24px,3vw,40px)", height: "100%",
                      borderLeft: `2px solid ${block.accent}55`,
                    }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
                        {block.icon === "challenge" && <ChallengeIcon size="sm" />}
                        {block.icon === "solution" && <SolutionCheckIcon size="sm" />}
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", letterSpacing: "0.04em" }}>
                          {block.label}
                        </div>
                      </div>
                      <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.85 }}>{block.body}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* ── Governance Architecture Pillars ── */}
              <motion.div {...FU(0.18)}>
                <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: 24 }}>
                  GOVERNANCE ARCHITECTURE
                </div>
                <div className="grid-4" style={{ gap: "clamp(12px,2vw,20px)" }}>
                  {project.pillars.map((pillar, i) => (
                    <motion.div key={pillar.label} {...FU(0.04 + i * 0.07)}>
                      <GlassCard style={{ padding: "clamp(20px,2.5vw,32px)", height: "100%" }}>
                        <div style={{ marginBottom: 14 }}>
                          <StrataLines
                            count={3} width={64} opacity={0.25}
                            color={project.accentColor}
                          />
                        </div>
                        <div style={{
                          fontSize: 13, fontWeight: 700,
                          color: "var(--text-1)", marginBottom: 10, lineHeight: 1.3,
                        }}>
                          {pillar.label}
                        </div>
                        <p className="t-xs" style={{
                          color: "var(--text-3)", lineHeight: 1.75,
                          textTransform: "none", letterSpacing: 0, fontSize: 12, fontFamily: "inherit",
                        }}>
                          {pillar.desc}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GLASS FACADE VISUAL BREAK
          ══════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: "var(--bg-alt)",
        borderTop: "1px solid var(--glass-border)",
        borderBottom: "1px solid var(--glass-border)",
        padding: "clamp(48px,6vw,80px) 0",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "flex", gap: "clamp(24px,4vw,56px)",
            alignItems: "center", justifyContent: "center", flexWrap: "wrap",
          }}>
            <motion.div {...FS(0)}>
              <GlassFacade cols={9} rows={6} cellW={32} cellH={24} gap={3} opacity={0.12} accent={BRAND_BLUE} />
            </motion.div>
            <div style={{ maxWidth: 380 }}>
              <motion.div {...FL(0.1)}>
                <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: 16 }}>
                  STEWARDSHIP STANDARD
                </div>
                <p className="t-lg" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
                  Every mandate is built on the same principle: governance that outlasts its principals — across assets, jurisdictions, and generations.
                </p>
              </motion.div>
            </div>
            <motion.div {...FS(0.05)}>
              <StructuralLattice width={200} height={160} opacity={0.08} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
          ══════════════════════════════════════════════════ */}
      <section className="section" style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg,var(--bg-1),var(--bg-0))",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div className="bg-grid" style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div {...FI(0)} style={{ marginBottom: 24 }}>
            <span className="pill pill-v">
              <span className="dot-live" style={{ background: "#8A5CFF", boxShadow: "0 0 8px #8A5CFF" }} />
              PRIVATE FAMILY OFFICE · RIYADH
            </span>
          </motion.div>

          {/* Strata sculpture centrepiece */}
          <motion.div {...FS(0.06)} style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <StrataSculpture size={320} opacity={0.22} style={{ position: "relative" }} />
          </motion.div>

          <motion.h2
            {...FU(0.1)} className="t-d gt-a"
            style={{ marginBottom: 20, fontSize: "clamp(36px,5.5vw,72px)" }}
          >
            Ready to become<br />a case study?
          </motion.h2>
          <motion.p
            {...FU(0.16)} className="t-xl"
            style={{ color: "var(--text-3)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.75 }}
          >
            If your wealth requires governance — not just management — we would be glad to speak with you in confidence.
          </motion.p>
          <motion.div
            {...FU(0.22)}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact" className="btn btn-primary glow-border" style={{ fontSize: 16, padding: "16px 40px" }}>
              Request an introduction →
            </Link>
            <Link href="/services" className="btn btn-ghost" style={{ fontSize: 16, padding: "16px 36px" }}>
              Explore our services
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-4{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.grid-4{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
