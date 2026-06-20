"use client";
import { motion } from "framer-motion";
import { FU, FI, GlassCard } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";

export default function ArContactPage() {
  return (
    <main style={{ position: "relative", fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>
      <PageBackground variant="contact" />

      {/* ── Contact Section ── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(120px,15vw,180px)", paddingBottom: "clamp(60px,8vw,100px)",
        background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,96px)", alignItems: "start", direction: "rtl" }} className="grid-2">
            {/* Right (RTL: first column) — heading & details */}
            <div>
              <motion.div {...FI()} style={{ marginBottom: 24 }}>
                <span className="pill pill-c"><span className="dot-live" />خاص وسري</span>
              </motion.div>
              <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ marginBottom: 20 }}>
                تواصل معنا.
              </motion.h1>
              <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 480, lineHeight: 1.9, marginBottom: 48 }}>
                كل تواصل يُعامَل بسرية تامة. نردّ عادةً في غضون يوم عمل واحد.
              </motion.p>

              <motion.div {...FU(.22)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <GlassCard style={{ padding: "24px 28px" }}>
                  <div style={{ fontSize: 13, color: "var(--text-4)", marginBottom: 6 }}>التواصل</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-1)", marginBottom: 8 }}>د. أحمد إسماعيل الفاروق</div>
                  <a href="tel:+966533339052" style={{ display: "block", fontSize: 14, color: "var(--cyan)", marginBottom: 4, direction: "ltr", textAlign: "right" }}>
                    +966 53 333 9052
                  </a>
                  <a href="mailto:enquiries@qmulate.com" style={{ display: "block", fontSize: 14, color: "var(--cyan)", direction: "ltr", textAlign: "right" }}>
                    enquiries@qmulate.com
                  </a>
                </GlassCard>

                <GlassCard style={{ padding: "24px 28px" }}>
                  <div style={{ fontSize: 13, color: "var(--text-4)", marginBottom: 6 }}>العنوان</div>
                  <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.85 }}>
                    طريق الملك عبدالعزيز، حي البساتين<br />
                    ص.ب 23718، جدة 9351<br />
                    المملكة العربية السعودية
                  </p>
                </GlassCard>
              </motion.div>

              <motion.p {...FU(.32)} style={{ fontSize: 11, color: "var(--text-5)", marginTop: 32, fontFamily: "var(--font-geist-mono,'Courier New'),monospace", direction: "ltr", textAlign: "right" }}>
                خاص وسري · السجل التجاري: 7054453274 · الرقم الضريبي: 314819612900003
              </motion.p>
            </div>

            {/* Left (RTL: second column) — glass card */}
            <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15, duration: .4 }}>
              <GlassCard style={{ padding: "clamp(32px,4vw,52px)" }}>
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <img src="/Logo.png" alt="QMULATE" style={{
                    height: "64px", width: "auto", display: "block", margin: "0 auto 32px",
                    filter: "drop-shadow(0 0 20px rgba(91,124,250,0.5))",
                  }} />
                  <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.9, marginBottom: 32, maxWidth: 320, margin: "0 auto 32px" }}>
                    نعمل مع عدد محدود من العملاء. كل تواصل يبدأ بمحادثة خاصة غير ملزمة.
                  </p>
                  <a href="mailto:enquiries@qmulate.com" className="btn btn-primary" style={{ fontSize: 14, padding: "14px 32px" }}>
                    أرسل استفساراً ←
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
