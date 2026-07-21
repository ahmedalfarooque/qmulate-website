"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FU, FI, GlassCard } from "@/components/DS";
import { PageBackground } from "@/components/PageBackground";
import { ImageReveal } from "@/components/TextReveal";
import { CheckIcon } from "@/components/icons/GlassIcons";

/* ── Input / Textarea — premium light glass style, mirrored for RTL ─────── */
const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.55)",
  border: "1px solid rgba(20,23,31,0.10)",
  borderRadius: 12,
  padding: "13px 16px",
  fontSize: 14,
  color: "var(--text-1)",
  outline: "none",
  backdropFilter: "blur(12px) saturate(160%)",
  WebkitBackdropFilter: "blur(12px) saturate(160%)",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  boxSizing: "border-box",
  fontFamily: "'Madani Arabic',sans-serif",
  direction: "rtl",
  textAlign: "right",
};

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
        color: "var(--text-4)",
        fontFamily: "'Madani Arabic',sans-serif",
        textAlign: "right",
      }}>
        {label}{required && <span style={{ color: "var(--gold)", marginRight: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function GInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputBase,
        background: focused ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
        border: focused ? "1px solid rgba(176,141,87,0.55)" : "1px solid rgba(20,23,31,0.10)",
        boxShadow: focused
          ? "0 0 0 3px rgba(176,141,87,0.14), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "inset 0 1px 0 rgba(255,255,255,0.6)",
        ...props.style,
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

function GSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      style={{
        ...inputBase,
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7080' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left 14px center",
        paddingLeft: 36,
        background: focused ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
        border: focused ? "1px solid rgba(176,141,87,0.55)" : "1px solid rgba(20,23,31,0.10)",
        boxShadow: focused
          ? "0 0 0 3px rgba(176,141,87,0.14), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

function GTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...inputBase,
        resize: "vertical",
        minHeight: 120,
        background: focused ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
        border: focused ? "1px solid rgba(176,141,87,0.55)" : "1px solid rgba(20,23,31,0.10)",
        boxShadow: focused
          ? "0 0 0 3px rgba(176,141,87,0.14), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

/* ── AREAS — real Arabic business copy, ported unchanged ─────────────────── */
const AREAS = [
  "هيكلة الملكية والحوكمة",
  "إدارة الأصول العقارية",
  "التطوير والاستثمار",
  "استفسار عام",
];

export default function ArContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", entity: "", area: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const up = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise(r => setTimeout(r, 900));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main style={{ position: "relative", fontFamily: "'Madani Arabic',sans-serif" }}>
      <PageBackground variant="contact" />

      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(120px,15vw,180px)", paddingBottom: "clamp(60px,8vw,100px)",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(40px,5vw,80px)", alignItems: "start", direction: "rtl" }} className="grid-contact">

            {/* ── Right (RTL start) — imagery + info ── */}
            <div>
              <ImageReveal delay={0.04} style={{ borderRadius: "clamp(16px,2vw,22px)", marginBottom: 28 }}>
                <div className="contact-logo-frame">
                  <img src="/Logo.png" alt="QMULATE" className="contact-logo-img" />
                </div>
              </ImageReveal>

              <motion.div {...FI()} style={{ marginBottom: 24 }}>
                <span className="pill pill-c"><span className="dot-live" />خاص وسري</span>
              </motion.div>
              <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ marginBottom: 20 }}>
                تواصل معنا.
              </motion.h1>
              <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 420, lineHeight: 1.9, marginBottom: 40 }}>
                كل تواصل يُعامَل بسرية تامة. نردّ عادةً في غضون يوم عمل واحد.
              </motion.p>

              <motion.div {...FU(.22)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--text-4)", fontFamily: "'Madani Arabic',sans-serif", marginBottom: 10, textAlign: "right" }}>التواصل</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 6, textAlign: "right" }}>د. أحمد إسماعيل الفاروق</div>
                  <a href="tel:+966533339052" style={{ display: "block", fontSize: 13, color: "var(--cyan)", marginBottom: 3, direction: "ltr", textAlign: "right" }}>+966 53 333 9052</a>
                  <a href="mailto:ceo@qmulate.com" style={{ display: "block", fontSize: 13, color: "var(--cyan)", direction: "ltr", textAlign: "right" }}>ceo@qmulate.com</a>
                </GlassCard>

                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--text-4)", fontFamily: "'Madani Arabic',sans-serif", marginBottom: 10, textAlign: "right" }}>العنوان</div>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.85, margin: 0, textAlign: "right" }}>
                    طريق الملك عبدالعزيز، حي البساتين<br />
                    ص.ب 23718، جدة 9351<br />
                    المملكة العربية السعودية
                  </p>
                </GlassCard>
              </motion.div>

              <motion.p {...FU(.32)} style={{ fontSize: 11, color: "var(--text-5)", marginTop: 28, fontFamily: "'Madani Arabic',sans-serif", textAlign: "right" }}>
                خاص وسري · السجل التجاري: 7054453274 · الرقم الضريبي: 314819612900003
              </motion.p>
            </div>

            {/* ── Left (RTL end) — form ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .5, ease: [.25,.46,.45,.94] }}>
              <div className="gf noise" style={{
                padding: "clamp(28px,4vw,48px)",
                position: "relative",
                overflow: "hidden",
              }}>
                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "48px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                      <CheckIcon size="lg" />
                    </div>
                    <h3 className="t-h3" style={{ color: "var(--text-1)", marginBottom: 12 }}>تم استلام طلبك.</h3>
                    <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.8 }}>سنتواصل معك خلال يوم عمل واحد. كل مراسلة خاصة وسرية.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--gold)", fontFamily: "'Madani Arabic',sans-serif", marginBottom: 20, textAlign: "right" }}>
                        طلب تقديم
                      </div>
                      <h2 className="t-h3" style={{ color: "var(--text-1)" }}>
                        ابدأ محادثة خاصة.
                      </h2>
                    </div>

                    {/* Name + Email row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, direction: "rtl" }} className="form-row">
                      <Field label="الاسم الكامل" required>
                        <GInput type="text" placeholder="اسمك الكامل" value={form.name} onChange={up("name")} required />
                      </Field>
                      <Field label="البريد الإلكتروني" required>
                        <GInput type="email" placeholder="example@domain.com" value={form.email} onChange={up("email")} required style={{ direction: "ltr", textAlign: "left" }} />
                      </Field>
                    </div>

                    <Field label="اسم العائلة / الجهة">
                      <GInput type="text" placeholder="اسم العائلة، الشركة، أو الوقف" value={form.entity} onChange={up("entity")} />
                    </Field>

                    <Field label="مجال الاهتمام">
                      <GSelect value={form.area} onChange={up("area")}>
                        <option value="">اختر مجالاً</option>
                        {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                      </GSelect>
                    </Field>

                    <Field label="الرسالة" required>
                      <GTextarea placeholder="أخبرنا باختصار عن موضوع النقاش…" rows={5} value={form.message} onChange={up("message") as React.ChangeEventHandler<HTMLTextAreaElement>} required />
                    </Field>

                    <div>
                      <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{
                        width: "100%",
                        padding: "15px 24px",
                        fontSize: 15,
                        cursor: status === "sending" ? "wait" : "pointer",
                        opacity: status === "sending" ? 0.7 : 1,
                      }}>
                        {status === "sending" ? "جارٍ الإرسال…" : "← إرسال الطلب"}
                      </button>
                      <p style={{ fontSize: 11, color: "var(--text-5)", textAlign: "center", marginTop: 14, fontFamily: "'Madani Arabic',sans-serif" }}>
                        جميع الطلبات خاصة وسرية. لا نشارك معلوماتك.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-contact{grid-template-columns:1fr!important}}
        @media(max-width:560px){.form-row{grid-template-columns:1fr!important}}
        select option { background: #FFFFFF; color: var(--text-1); }
        .contact-logo-frame{
          display:flex; align-items:center; justify-content:center;
          padding:clamp(52px,7vw,80px) clamp(24px,4vw,40px);
          border-radius:clamp(24px,2.8vw,32px);
          background:
            linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.40) 48%,transparent 66%),
            linear-gradient(155deg,rgba(255,255,255,0.42) 0%,rgba(255,255,255,0.16) 100%);
          backdrop-filter:blur(36px) saturate(180%) brightness(1.03);
          -webkit-backdrop-filter:blur(36px) saturate(180%) brightness(1.03);
          border:1px solid rgba(255,255,255,0.55);
          box-shadow:0 30px 70px -18px rgba(20,40,70,0.16), 0 8px 22px rgba(255,255,255,0.28) inset, 0 1px 0 rgba(255,255,255,0.85) inset;
          position:relative; overflow:hidden;
        }
        .contact-logo-frame::before{
          content:""; position:absolute; inset:-30%;
          background:
            radial-gradient(circle at 70% 22%, rgba(18,58,87,0.16), transparent 55%),
            radial-gradient(circle at 22% 80%, rgba(176,141,87,0.12), transparent 55%);
          pointer-events:none;
        }
        .contact-logo-img{
          position:relative; z-index:1;
          width:clamp(120px,12vw,175px); height:auto; object-fit:contain;
          filter:drop-shadow(0 14px 38px rgba(18,58,87,0.24)) saturate(1.12) contrast(1.05);
        }
        @media(max-width:767px){
          .contact-logo-frame{
            backdrop-filter:none; -webkit-backdrop-filter:none;
            background:rgba(255,255,255,0.92);
          }
        }
      `}</style>
    </main>
  );
}
