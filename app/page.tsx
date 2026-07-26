"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FU, SectionHeading } from "@/components/DS";
import { Reveal } from "@/components/Reveal";
import { LineReveal, ImageReveal } from "@/components/TextReveal";
import { HomeIcon, SuccessionIcon, GovernanceIcon, DocumentIcon } from "@/components/icons/GlassIcons";
import { SplitSlideshow } from "@/components/HeroSlideshow";
import { HeroCardStack } from "@/components/HeroCardStack";
import { PropertyShowcase, type ShowcaseItem } from "@/components/PropertyShowcase";

const BGI = (file: string) => `/Background%20Images/${file}`;

/* ─── HERO — rotating luxury card stack (front/middle/back) ─────────
   Uses the three dedicated hero photographs, cycled continuously. */
const HERO_STACK_IMAGES = [
  { src: BGI("Home_hero1.jpg"), position: "center 40%" },
  { src: BGI("Home_hero2.jpg"), position: "center 45%" },
  { src: BGI("Home_hero3.png"), position: "center 50%" },
];

/* Editorial split imagery — single-slide arrays keep the Ken Burns drift */
const WHO_WE_ARE_IMG = [{ src: BGI("JdWb9CkELQIJ23C0ooXh7S4uIO6GpX8UyeDtx2-7GPOa-5CUB-G1uKjJOy2YwOfQb86I6Sp1S-o8CQgEc7W9e8Y7AzAD-FPrrhSZDd0qbxU42vX5z2n5AzTdnsSt5_HjsXP_7vkxOimwuIjCIwxwnbU_E2vkHEJ6y_Oz5j2PzC.jpg"), position: "center 40%" }];
const STRUCTURE_IMG   = [{ src: BGI("lStHlz6rGvVTNrn-gxBsxbYPxHasr-dH2337InzXsYChXw7hYLdTKUMBalUuIWZzkzfcOHukp7yPCct_vkj6ZF3eTFewlWNhJZJfhKixOjIqPjxuGCHMzuEJszZ_Z3ZfV9UIdoqBzjt7Iq-VexYqNvlDmiXgce0bhLafh2RBy2.jpg"), position: "center 45%" }];

/* ─── DATA (real, unchanged business content) ──────────────────────── */
const HOME_SERVICES: ShowcaseItem[] = [
  { num: "01", category: "Governance & Structuring", title: "Ownership Structuring & Governance",
    image: "AqAtJNNbvEz9B_X-LrvudRWxvbGO0TcEOO5SOIbPjUWLqGfIMCKZFPPK0e7NrLFWV7OmSEzLhtJmL3K_7GwubvHYNeRbz28PhCctZMEQHwtw1-O1ES9RZPJOy-84skQbgX_ywVavjAsRlX-xptvQOCoqVeg18wEu_VYl9Lw1WW.jpg",
    body: "Organising ownership frameworks and decision-making structures for long-term clarity and control." },
  { num: "02", category: "Asset Management", title: "Real Estate Asset Management",
    image: "nnCjPbRJpT5EQytfClgoeerh9ssrgENktsHfIcS_5DZM2dH8pKpsFp7YQM3dRi0NyZp5eGc3jS-0bRgEAaFY_ERGZ4TZHiu3FRg3mXbZMwaQLjDbK4uMDGGQ0HHsGbfS_mt3pCelpO5T189RKW_hBc3vT_hwTB6wouHJ1b.jpg",
    body: "Managing portfolios through leasing, operations, and maintenance to preserve and enhance value." },
  { num: "03", category: "Development & Investment", title: "Development & Investment",
    image: "bg13.jpg",
    body: "Identifying and executing opportunities for expansion, repositioning, and sustainable growth." },
];

const REGULATORS = [
  { name: "AWQAF", img: "/Regulatory%20Authorities/AWQAF%20LOGO.png" },
  { name: "EHKAAM", img: "/Regulatory%20Authorities/EHKAAM%20LOGO.png" },
  { name: "Ministry of Housing", img: "/Regulatory%20Authorities/Ministry%20of%20Housing%20Logo.png" },
  { name: "Real Estate General Authority", img: "/Regulatory%20Authorities/REAL%20ESTATE%20GENERAL%20AUTHORITY%20LOGO.png" },
  { name: "State Property General Authority", img: "/Regulatory%20Authorities/STATE%20PROPERTY%20OF%20GENERAL%20AUTHORITY%20LOGO.png" },
];

const PROCESS_IMG = [{ src: BGI("1000_F_332524339_NGSV5Nsf4ZQHUIB7xjBeP5IQBQdDGFaU.jpg"), position: "center 45%" }];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery", body: "Understanding ownership structure, objectives, and the composition of existing assets." },
  { num: "02", title: "Structuring", body: "Establishing clear governance and decision-making frameworks around those assets." },
  { num: "03", title: "Management", body: "Ongoing asset management, reporting, and value preservation across the portfolio." },
  { num: "04", title: "Growth", body: "Identifying opportunities for development, repositioning, and long-term growth." },
];

const SERVICE_LAYERS = [
  { label: "Ownership Structuring", sub: "Clear frameworks · Decision governance · Long-term clarity", color: "var(--gold)" },
  { label: "Asset Management",       sub: "Leasing · Operations · Maintenance · Value preservation",   color: "var(--cyan)" },
  { label: "Development & Investment", sub: "Expansion · Repositioning · Sustainable growth",           color: "var(--blue)" },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="hero-page" style={{ position: "relative" }}>

      {/* ══════════════════════════════════════════
          1. HERO — LIGHT EDITORIAL SPLIT
          Text + trust bar on one side, an auto-transitioning
          offset image pair on the other (no full-bleed photo).
          ══════════════════════════════════════════ */}
      <section ref={heroRef} className="hero-fullbleed" style={{
        minHeight: "100svh", alignItems: "center", background: "var(--bg-0)",
        paddingTop: "clamp(104px,15vh,148px)", paddingBottom: "clamp(56px,7vh,84px)",
      }}>
        <div className="bg-mesh" />

        <motion.div className="hero-content" style={{ opacity: heroOpacity, position: "relative", width: "100%", padding: 0 }}>
          <div className="container">
            <div className="hero-split-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(40px,6vw,96px)", alignItems: "center" }}>

              {/* ── Left: headline, subhead, trust bar ── */}
              <div>
                <div style={{ overflow: "hidden" }}>
                  <motion.h1
                    initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="t-d"
                    style={{ color: "var(--text-1)", marginBottom: 0 }}
                  >
                    Transforming Ownership
                  </motion.h1>
                </div>
                <div style={{ overflow: "hidden", marginBottom: 32 }}>
                  <motion.h1
                    initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="t-d gt-warm"
                    style={{ marginBottom: 0 }}
                  >
                    into Enduring Value.
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.85 }}
                  style={{ fontSize: "clamp(16px,1.5vw,20px)", lineHeight: 1.85, color: "var(--text-3)", maxWidth: 520, marginBottom: 44 }}
                >
                  A fully integrated real estate platform for families, businesses, and individuals,
                  dedicated to managing assets, preserving value, and enabling sustainable long-term growth.
                </motion.p>
              </div>

              {/* ── Right: rotating luxury card stack ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="hero-image-cluster"
              >
                <div className="hic-accent" />
                <HeroCardStack images={HERO_STACK_IMAGES} />
              </motion.div>
            </div>

            {/* Trust bar — no container, logos sit directly on the page */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.75 }}
              className="trust-bar"
            >
              <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: 20, letterSpacing: "0.14em" }}>
                Licensed &amp; Regulated By
              </div>
              <div className="trust-bar-row">
                {REGULATORS.map(r => (
                  <div key={r.name} className="trust-logo-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.img}
                      alt={r.name}
                      title={r.name}
                      className={`trust-logo${r.img.includes("STATE%20PROPERTY") ? " trust-logo-lg" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          3. WHO WE ARE — EDITORIAL SPLIT (image right)
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(56px,8vw,120px)", alignItems: "center" }}>
            <div>
              <Reveal direction="up">
                <div style={{ overflow: "hidden", marginBottom: 24 }}>
                  <span className="pill pill-c">Who Are We</span>
                </div>
              </Reveal>

              <LineReveal delay={0.1}>
                <h2 className="t-h2" style={{ color: "var(--text-1)", marginBottom: 0 }}>
                  An Integrated Real Estate Platform
                </h2>
              </LineReveal>

              <div className="accent-bar" style={{ marginTop: "clamp(20px,2.2vw,28px)" }} />

              <Reveal direction="up" delay={0.2}>
                <p style={{ fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.85, color: "var(--text-3)", marginBottom: 40 }}>
                  We support property owners, families, businesses, and endowments in
                  managing their real estate assets through a clear and structured
                  framework that facilitates decision-making and promotes long-term
                  sustainability. By combining real estate expertise with institutional
                  best practices, we help enhance asset performance, preserve value,
                  and support sustainable growth over time.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.32}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                  {[
                    { Icon: HomeIcon, label: "Property Owners" },
                    { Icon: SuccessionIcon, label: "Families" },
                    { Icon: GovernanceIcon, label: "Businesses" },
                    { Icon: DocumentIcon, label: "Endowments" },
                  ].map((item, i) => (
                    <div key={i} className="gc" style={{ padding: "20px 16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                      <item.Icon size="md" />
                      <span style={{ fontSize: 12.5, color: "var(--text-2)", fontWeight: 500 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <ImageReveal delay={0.12} className="split-img-col" style={{ aspectRatio: "3/4", minHeight: 500, borderRadius: "clamp(16px,2vw,28px)" }}>
              <div className="split-img split-img-col" style={{ aspectRatio: "3/4", minHeight: 500, borderRadius: 0 }}>
                <SplitSlideshow slides={WHO_WE_ARE_IMG} interval={12000} />
                <div className="img-grad qm-scrim-force" style={{ zIndex: 10 }} />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      <div className="container"><div className="editorial-rule" /></div>

      {/* ══════════════════════════════════════════
          4. HOW WE WORK — NUMBERED PROCESS (image right)
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,7vw,100px)", alignItems: "center" }}>
            <div>
              <LineReveal delay={0.08}>
                <h2 className="t-h2" style={{ color: "var(--text-1)", marginBottom: 40 }}>From mandate to milestone.</h2>
              </LineReveal>

              <div className="process-steps">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div key={step.num} {...FU(i * 0.08)} className="process-step">
                    <div className="process-num t-xs" style={{ color: "var(--gold)" }}>{step.num}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>{step.title}</div>
                      <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text-3)" }}>{step.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <ImageReveal delay={0.1} className="split-img-col" style={{ aspectRatio: "4/5", minHeight: 460, borderRadius: "clamp(16px,2vw,28px)" }}>
              <div className="split-img split-img-col" style={{ aspectRatio: "4/5", minHeight: 460, borderRadius: 0 }}>
                <SplitSlideshow slides={PROCESS_IMG} interval={12000} />
                <div className="img-grad qm-scrim-force" style={{ zIndex: 10 }} />
                <div className="img-corner-accent tl" style={{ zIndex: 11 }} />
                <div className="img-corner-accent br" style={{ zIndex: 11 }} />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      <div className="container"><div className="editorial-rule" /></div>

      {/* ══════════════════════════════════════════
          5. SERVICE LAYERS — EDITORIAL SPLIT (image left)
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="split-grid split-grid-rev" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,96px)", alignItems: "center" }}>

            <ImageReveal delay={0.1} className="split-order-first split-img-col" style={{ aspectRatio: "4/5", minHeight: 460, borderRadius: "clamp(16px,2vw,28px)" }}>
              <div className="split-img split-img-col" style={{ aspectRatio: "4/5", minHeight: 460, borderRadius: 0 }}>
                <SplitSlideshow slides={STRUCTURE_IMG} interval={12000} />
                <div className="img-grad qm-scrim-force" style={{ zIndex: 10 }} />
                <div className="img-corner-accent tl" style={{ zIndex: 11 }} />
                <div className="img-corner-accent br" style={{ zIndex: 11 }} />
              </div>
            </ImageReveal>

            <div>
              <SectionHeading
                eyebrow="WHO WE ARE"
                title={<>An integrated real estate platform.</>}
                subtitle="We provide an integrated approach to real estate asset management and ownership structuring, helping clients manage their assets through clear governance, effective management, and a long-term perspective."
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 36 }}>
                {SERVICE_LAYERS.map((layer, i) => (
                  <motion.div key={layer.label} {...FU(i * 0.1)}>
                    <div className="layer-item gc" style={{ padding: "clamp(18px,2.2vw,26px) clamp(20px,2.2vw,28px)" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>{layer.label}</div>
                        <div className="t-xs" style={{ color: "var(--text-3)", textTransform: "none", letterSpacing: 0, fontSize: 11.5, fontWeight: 500 }}>{layer.sub}</div>
                      </div>
                    </div>
                    {i < 2 && <div style={{ height: 14 }} />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="editorial-rule" /></div>

      {/* ══════════════════════════════════════════
          6. FEATURED DEVELOPMENTS / INVESTMENT COLLECTIONS
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
            <SectionHeading
              wide
              eyebrow="FEATURED COLLECTIONS"
              title="Structured for every type of ownership."
              subtitle="Our services cover the key aspects of real estate ownership, from structuring and governance to asset management, development, and investment, tailored to the unique needs of corporates, endowments, and individuals."
            />
          </div>

          <PropertyShowcase items={HOME_SERVICES} />

          <div style={{ textAlign: "center", marginTop: "clamp(40px,4.5vw,56px)" }}>
            <a href="/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "15px 36px" }}>View all services →</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CTA — BEGIN A CONVERSATION (contained dark showcase band)
          ══════════════════════════════════════════ */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container">
          <div className="showcase-dark" style={{ textAlign: "center" }}>
            <LineReveal delay={0.06}>
              <h2 className="showcase-quote" style={{ marginBottom: 18 }}>Begin a conversation.</h2>
            </LineReveal>
            <Reveal direction="up" delay={0.14}>
              <p className="showcase-sub" style={{ maxWidth: 460, margin: "0 auto 40px" }}>
                Every introduction is treated with complete discretion.
              </p>
            </Reveal>
            <motion.div {...FU(0.2)} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "15px 38px" }}>Get in touch →</a>
              <a href="/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "15px 38px", color: "#F5F6F8", borderColor: "rgba(255,255,255,0.20)" }}>View services</a>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .qm-stat-plate{
          display:flex; gap:28px;
          background:rgba(6,10,18,0.42);
          backdrop-filter:blur(20px) saturate(160%); -webkit-backdrop-filter:blur(20px) saturate(160%);
          border:1px solid rgba(255,255,255,0.16);
          border-radius:16px; padding:16px 20px;
        }
        .qm-scrim-force{
          background:linear-gradient(180deg,transparent 45%,rgba(4,8,16,0.82) 100%) !important;
        }
        @media(max-width:900px){.split-grid{grid-template-columns:1fr!important}}
        @media(max-width:900px){.split-grid-rev .split-order-first{order:-1}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
        @media(max-width:960px){.split-grid .split-img-col{aspect-ratio:16/9!important;min-height:320px!important;width:100%!important;height:auto!important}}

        /* ── Hero image cluster — auto-transitioning offset pair ── */
        .hero-image-cluster{
          position:relative; width:100%; max-width:520px; margin-left:auto;
          aspect-ratio:4/5;
        }
        .hic-accent{
          position:absolute; top:6%; right:-7%; width:72%; height:72%;
          border-radius:24px; background:var(--blue); opacity:.9; z-index:0;
        }

        /* ── Rotating luxury card stack (front/middle/back) ── */
        .hero-stack{
          position:absolute; inset:0; z-index:1;
        }
        .hero-stack-card{
          position:absolute; left:8%; top:2%; width:84%; height:84%;
          border-radius:26px; overflow:hidden;
          border:1px solid rgba(255,255,255,0.55);
          transform-origin:center center;
        }
        .hero-stack-card::before{
          content:"";position:absolute;top:0;left:0;right:0;height:34%;z-index:2;pointer-events:none;
          background:linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%);
        }
        .hero-stack-card img{
          width:100%; height:100%; object-fit:cover; display:block;
        }
        .trust-bar{
          width:100%;
          margin-top:clamp(20px,3vw,32px);
          padding-top:clamp(18px,2.2vw,26px);
          border-top:1px solid var(--glass-border);
        }
        .trust-bar-row{
          display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:clamp(20px,3vw,40px);
        }
        .trust-logo-box{
          display:flex; align-items:center; justify-content:center; height:clamp(88px,10.2vw,124px); flex:1 1 0;
        }
        .trust-logo{
          height:100%; width:auto; max-width:250px; object-fit:contain;
          opacity:.82; filter:grayscale(.2); transition:opacity .3s ease, filter .3s ease, transform .3s ease;
        }
        .trust-logo:hover{ opacity:1; filter:grayscale(0); transform:scale(1.05); }
        .trust-logo-lg{ transform:scale(1.55); }
        .trust-logo-lg:hover{ transform:scale(1.63); }
        @media(max-width:640px){
          .trust-bar-row{ justify-content:center; }
          .trust-logo-box{ flex:0 1 auto; height:68px; }
        }
        @media(max-width:1180px){
          .hero-split-grid{ grid-template-columns:1fr!important; }
          .hero-image-cluster{ max-width:420px; margin:0 auto; order:-1; }
        }

        /* ── How We Work — numbered process list ── */
        .process-steps{ display:flex; flex-direction:column; gap:0; }
        .process-step{
          display:grid; grid-template-columns:44px 1fr; gap:18px;
          padding:18px 0; border-bottom:1px solid var(--glass-border);
        }
        .process-step:last-child{ border-bottom:none; }
        .process-num{ letter-spacing:0; }
      `}</style>
    </main>
  );
}
