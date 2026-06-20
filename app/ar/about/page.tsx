"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, SectionHeading, GlassCard } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";

export default function ArAboutPage() {
  return (
    <main style={{ position: "relative", fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>
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
        <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
          <motion.div {...FI()} style={{ marginBottom: 24 }}>
            <span className="pill pill-c"><span className="dot-live" />من نحن</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ maxWidth: 780, marginBottom: 24 }}>
            نؤمن بأن العقار أكثر من مجرد أصل.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 620, lineHeight: 1.9 }}>
            إنه قيمة تحتاج إلى إدارة واعية ورؤية طويلة المدى. لذلك نقدم منظومة عقارية متكاملة تجمع بين إدارة الأصول والحوكمة والتنمية،
            لمساعدة العائلات والشركات والأفراد على الحفاظ على قيمة أصولهم.
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
                label: "الرؤية", color: "var(--cyan)",
                title: "شريك موثوق عبر الأجيال.",
                body: "أن نكون الشريك الموثوق في تنظيم الملكية وإدارة الأصول العقارية، وتحويلها إلى فرص استثمارية مستدامة تعزز القيمة وتدعم استمرارية الثروة عبر الأجيال.",
              },
              {
                label: "الرسالة", color: "#8A5CFF",
                title: "أُطر حوكمة راسخة ومستدامة.",
                body: "نطوّر وننظّم الأصول العقارية ضمن أطر حوكمة وإدارة واضحة، بما يحفظ القيمة، ويعزز العائد، ويحقق استدامة الاستثمار.",
              },
            ].map((item, i) => (
              <motion.div key={item.label} {...FU(i * .1)}>
                <GlassCard style={{ padding: "clamp(32px,4vw,52px)", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, direction: "rtl" }}>
                    <span className="t-xs" style={{ color: item.color }}>{item.label}</span>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg,${item.color}44,transparent)` }} />
                  </div>
                  <h3 className="t-h3" style={{ color: "var(--text-1)", marginBottom: 16, lineHeight: 1.3, direction: "rtl" }}>{item.title}</h3>
                  <p className="t-md" style={{ color: "var(--text-3)", lineHeight: 1.9, direction: "rtl" }}>{item.body}</p>
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
            <SectionHeading eyebrow="القيم" title="ما يُوجِّه كل قرار." center />
          </div>
          <div className="grid-3">
            {[
              { title: "المضاعفة", body: "دع الهيكل، لا الضجيج، يقود العوائد على مدى عقود.", color: "var(--cyan)", icon: "◈" },
              { title: "الحماية", body: "تحوّط للمخاطر السلبية؛ احفظ القيمة قبل أن تنمو.", color: "#8A5CFF", icon: "⬡" },
              { title: "الاستمرارية", body: "انقل النوايا — لا الأصول فحسب — بين الأجيال.", color: "#4D8DFF", icon: "◉" },
            ].map((v, i) => (
              <motion.div key={v.title} {...FU(i * .1)}>
                <GlassCard style={{ padding: "clamp(28px,3.5vw,44px)", textAlign: "center", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 16, color: v.color, filter: `drop-shadow(0 0 12px ${v.color}66)` }}>{v.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 12, direction: "rtl" }}>{v.title}</h3>
                  <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.8, direction: "rtl" }}>{v.body}</p>
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
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{ marginBottom: 16 }}>هل أنت مستعد لبدء محادثة؟</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{ color: "var(--text-3)", marginBottom: 36 }}>
            جميع المقدمات خاصة وسرية.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 36px" }}>← تواصل معنا</Link>
            <Link href="/ar/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }}>خدماتنا</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
