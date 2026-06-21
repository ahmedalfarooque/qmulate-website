"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, SectionHeading, GlassCard } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";

const SERVICES = [
  {
    num: "01",
    title: "Ownership Structuring & Governance",
    color: "var(--cyan)",
    clients: [
      {
        label: "Corporates",
        body: "Structuring ownership arrangements and organizing relationships between shareholders, partners, and investors to ensure clear authority, effective decision-making, and long-term business sustainability.",
      },
      {
        label: "Endowments",
        body: "Establishing governance frameworks for endowment assets that support the fulfillment of endowment objectives, strengthen oversight, and ensure continuity across generations.",
      },
      {
        label: "Individuals & Families",
        body: "Organizing personal assets and investments within a structured framework that supports governance, informed decision-making, and long-term planning.",
      },
    ],
  },
  {
    num: "02",
    title: "Real Estate Asset Management",
    color: "#8A5CFF",
    clients: [
      {
        label: "Corporates",
        body: "Managing real estate portfolios through leasing, operations, maintenance, and collections to preserve asset value and enhance operational performance.",
      },
      {
        label: "Endowments",
        body: "Managing and operating endowment assets to maximize their benefit while preserving value and ensuring long-term sustainability in line with the endowment's objectives.",
      },
      {
        label: "Individuals & Families",
        body: "Managing personal and investment properties through a structured approach that provides performance visibility, protects asset value, and enhances returns.",
      },
    ],
  },
  {
    num: "03",
    title: "Development & Investment",
    color: "#4D8DFF",
    clients: [
      {
        label: "Corporates",
        body: "Identifying opportunities for expansion, development, and asset repositioning to support growth and maximize investment returns.",
      },
      {
        label: "Endowments",
        body: "Evaluating and developing endowment assets through sustainable investment opportunities that strengthen long-term impact and value creation.",
      },
      {
        label: "Individuals & Families",
        body: "Assessing investment opportunities and identifying the most suitable path for development, retention, or exit in line with long-term financial objectives.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main style={{ position: "relative" }}>
      <PageBackground variant="services" />

      {/* ── Hero ── */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center",
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
            <span className="pill pill-c"><span className="dot-live" />Services</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ maxWidth: 720, marginBottom: 24 }}>
            Structured for every type of ownership.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 560, lineHeight: 1.8 }}>
            Our services cover the key aspects of real estate ownership, from structuring and governance to asset management,
            development, and investment.
          </motion.p>
        </div>
      </section>

      {/* ── Services ── */}
      {SERVICES.map((svc, si) => (
        <section key={svc.num} className="section" style={{
          position: "relative", overflow: "hidden",
          background: si % 2 === 1 ? "var(--bg-alt)" : undefined,
        }}>
          <ArchitecturalBg variant={si % 2 === 0 ? "strata-left" : "lattice"} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <motion.div {...FI()} style={{ marginBottom: 12 }}>
              <span className="t-xs" style={{ color: svc.color, fontFamily: "var(--font-geist-mono,'Courier New'),monospace" }}>{svc.num}</span>
            </motion.div>
            <motion.h2 {...FU(.06)} className="t-h2" style={{ color: "var(--text-1)", marginBottom: "clamp(40px,5vw,64px)", borderLeft: `3px solid ${svc.color}`, paddingLeft: 20 }}>
              {svc.title}
            </motion.h2>
            <div className="grid-3" style={{ gap: "clamp(20px,2.5vw,32px)" }}>
              {svc.clients.map((c, ci) => (
                <motion.div key={c.label} {...FU(.06 + ci * .1)}>
                  <GlassCard style={{ padding: "clamp(24px,3vw,40px)", height: "100%", borderTop: `2px solid ${svc.color}44` }}>
                    <div style={{ fontSize: 12, color: svc.color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                      {c.label}
                    </div>
                    <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.85 }}>{c.body}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="section" style={{
        position: "relative", overflow: "hidden", textAlign: "center",
        background: "linear-gradient(160deg,var(--bg-1),var(--bg-0))",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{ marginBottom: 16 }}>Begin a conversation.</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{ color: "var(--text-3)", marginBottom: 36 }}>
            Every introduction is treated with complete discretion.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 36px" }}>Get in touch →</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
