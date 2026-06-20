"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, FS, SectionHeading, GlassCard, HeroGlass } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";

export default function AboutPage() {
  return (
    <main style={{ position: "relative" }}>
      <PageBackground variant="about" />

      {/* ── Hero ── */}
      <section style={{
        minHeight: "72vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(120px,15vw,180px)", paddingBottom: "clamp(60px,8vw,100px)",
        background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        <ArchitecturalBg variant="mixed" />
        {/* Logo watermark */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <img src="/Logo.png" alt="" style={{
            width: "55%", maxWidth: "580px", height: "auto",
            opacity: 0.03, filter: "brightness(10) saturate(0)",
            userSelect: "none",
          }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div {...FI()} style={{ marginBottom: 24 }}>
            <span className="pill pill-c"><span className="dot-live" />About</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ maxWidth: 780, marginBottom: 24 }}>
            We believe real estate is more than an asset.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 620, lineHeight: 1.8 }}>
            It is a value to be preserved, managed, and grown through informed stewardship and a long-term perspective.
            That is why we provide an integrated real estate platform that combines asset management, governance, and
            development, helping families, businesses, and individuals protect the value of their assets.
          </motion.p>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <ArchitecturalBg variant="fins" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid-2" style={{ gap: "clamp(24px,3vw,40px)" }}>
            {[
              {
                label: "VISION", color: "var(--cyan)",
                title: "A trusted partner across generations.",
                body: "To be a trusted partner for families, businesses, and individuals in structuring real estate ownership, managing assets, and turning them into sustainable opportunities that preserve value and support growth across generations.",
              },
              {
                label: "MISSION", color: "#8A5CFF",
                title: "Governed frameworks that endure.",
                body: "We develop and manage real estate assets through clear governance and management frameworks that preserve value, enhance returns, and support long-term investment sustainability.",
              },
            ].map((item, i) => (
              <motion.div key={item.label} {...FU(i * .1)}>
                <GlassCard style={{ padding: "clamp(32px,4vw,52px)", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <span className="t-xs" style={{ color: item.color }}>{item.label}</span>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${item.color}44,transparent)` }} />
                  </div>
                  <h3 className="t-h3" style={{ color: "var(--text-1)", marginBottom: 16, lineHeight: 1.3 }}>{item.title}</h3>
                  <p className="t-md" style={{ color: "var(--text-3)", lineHeight: 1.85 }}>{item.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
        <ArchitecturalBg variant="lattice" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,64px)" }}>
            <SectionHeading eyebrow="VALUES" title="What guides every decision." center />
          </div>
          <div className="grid-3">
            {[
              { title: "Compound", body: "Let structure, not noise, drive returns over decades.", color: "var(--cyan)", icon: "◈" },
              { title: "Protect", body: "Govern for the downside; preserve before we grow.", color: "#8A5CFF", icon: "⬡" },
              { title: "Transfer", body: "Carry intent — not just assets — between generations.", color: "#4D8DFF", icon: "◉" },
            ].map((v, i) => (
              <motion.div key={v.title} {...FU(i * .1)}>
                <GlassCard style={{ padding: "clamp(28px,3.5vw,44px)", textAlign: "center", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 16, color: v.color, filter: `drop-shadow(0 0 12px ${v.color}66)` }}>{v.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>{v.title}</h3>
                  <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.75 }}>{v.body}</p>
                </GlassCard>
              </motion.div>
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
    </main>
  );
}
