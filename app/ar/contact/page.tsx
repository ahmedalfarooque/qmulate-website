"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FU, GlassCard } from "@/components/DS";
import { PageBackground } from "@/components/PageBackground";
import { ImageReveal } from "@/components/TextReveal";
import { CheckIcon, PhoneIcon, EmailIcon, LocationIcon, ClockIcon } from "@/components/icons/GlassIcons";
import { useTheme } from "@/components/ThemeProvider";

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
  fontFamily: "var(--font-madani),sans-serif",
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
        fontFamily: "var(--font-madani),sans-serif",
        textAlign: "right",
      }}>
        {label}{required && <span style={{ color: "var(--gold)", marginRight: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function fieldStyle(isDark: boolean, focused: boolean): React.CSSProperties {
  if (isDark) {
    return {
      background: focused ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
      border: focused ? "1px solid rgba(91,124,250,0.55)" : "1px solid rgba(255,255,255,0.15)",
      boxShadow: focused
        ? "0 0 0 3px rgba(91,124,250,0.18), inset 0 1px 1px rgba(255,255,255,0.12)"
        : "inset 0 1px 1px rgba(255,255,255,0.10)",
    };
  }
  return {
    background: focused ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
    border: focused ? "1px solid rgba(91,124,250,0.55)" : "1px solid rgba(20,23,31,0.10)",
    boxShadow: focused
      ? "0 0 0 3px rgba(91,124,250,0.14), inset 0 1px 0 rgba(255,255,255,0.9)"
      : "inset 0 1px 0 rgba(255,255,255,0.6)",
  };
}

function GInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const { resolvedTheme } = useTheme();
  return (
    <input
      {...props}
      style={{
        ...inputBase,
        ...fieldStyle(resolvedTheme === "dark", focused),
        ...props.style,
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

function GSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  const { resolvedTheme } = useTheme();
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
        ...fieldStyle(resolvedTheme === "dark", focused),
      }}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

function GTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  const { resolvedTheme } = useTheme();
  return (
    <textarea
      {...props}
      style={{
        ...inputBase,
        resize: "vertical",
        minHeight: 120,
        ...fieldStyle(resolvedTheme === "dark", focused),
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
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
    <main style={{ position: "relative", fontFamily: "var(--font-madani),sans-serif" }}>
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
              <ImageReveal delay={0.04} style={{ marginBottom: 28 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={isDark ? "/Logo-light.svg" : "/Logo.svg"} alt="QMULATE" className="contact-logo-img" />
              </ImageReveal>

              <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ marginBottom: 20, marginTop: 24 }}>
                تواصل معنا.
              </motion.h1>
              <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 420, lineHeight: 1.9, marginBottom: 20 }}>
                يسعدنا خدمتكم من خلال نموذج التواصل التالي وفريقنا سيكون على استعداد تام للرد بأقرب فرصة ممكنة.
              </motion.p>

              <motion.div {...FU(.19)} className="contact-warm-badge" style={{ marginBottom: 32 }}>
                <ClockIcon size="sm" />
                <span>نردّ عادةً في غضون يوم عمل واحد</span>
              </motion.div>

              <motion.div {...FU(.22)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: "flex-start" }}>
                    <PhoneIcon size="sm" />
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--text-4)", fontFamily: "var(--font-madani),sans-serif" }}>التواصل</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 6, textAlign: "right" }}>د. أحمد إسماعيل الفاروقي</div>
                  <a href="tel:+966533339052" style={{ display: "block", fontSize: 13, color: "var(--cyan)", marginBottom: 3, direction: "ltr", textAlign: "right" }}>+966 53 333 9052</a>
                  <a href="mailto:ceo@qmulate.com" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--cyan)", direction: "ltr", justifyContent: "flex-end" }}>ceo@qmulate.com<EmailIcon size="sm" /></a>
                </GlassCard>

                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: "flex-start" }}>
                    <LocationIcon size="sm" />
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--text-4)", fontFamily: "var(--font-madani),sans-serif" }}>العنوان</div>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.85, margin: 0, textAlign: "right" }}>
                    طريق الملك عبدالعزيز، حي البساتين<br />
                    ص.ب 23718، جدة 9351<br />
                    المملكة العربية السعودية
                  </p>
                </GlassCard>
              </motion.div>
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
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--gold)", fontFamily: "var(--font-madani),sans-serif", marginBottom: 20, textAlign: "right" }}>
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
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-warm-badge{
          display:inline-flex; align-items:center; gap:9px;
          padding:9px 12px 9px 16px; border-radius:100px;
          background:rgba(91,124,250,0.08); border:1px solid rgba(91,124,250,0.22);
          font-size:12.5px; font-weight:600; color:var(--text-2);
          font-family:var(--font-madani),sans-serif;
        }
        @media(max-width:900px){.grid-contact{grid-template-columns:1fr!important}}
        @media(max-width:560px){.form-row{grid-template-columns:1fr!important}}
        select option { background: #FFFFFF; color: var(--text-1); }
        [data-theme="dark"] select option,
        .dark select option { background: #10141D; color: #FFFFFF; }
        .contact-logo-frame{
          display:flex; align-items:center; justify-content:center;
          padding:clamp(52px,7vw,80px) clamp(24px,4vw,40px);
          border-radius:clamp(24px,2.8vw,32px);
          background:
            radial-gradient(130% 100% at 80% 12%, rgba(255,255,255,0.32) 0%, transparent 52%),
            linear-gradient(155deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.09) 100%);
          backdrop-filter:blur(34px) saturate(180%) brightness(1.02);
          -webkit-backdrop-filter:blur(34px) saturate(180%) brightness(1.02);
          border:1px solid rgba(255,255,255,0.42);
          box-shadow:0 44px 92px -26px rgba(20,40,70,0.20), 0 1px 0 rgba(255,255,255,0.85) inset, 0 -1px 0 rgba(20,40,70,0.05) inset;
          position:relative; overflow:hidden;
        }
        .contact-logo-frame::before{
          content:""; position:absolute; inset:-30%;
          background:
            radial-gradient(circle at 70% 22%, rgba(10,11,13,0.16), transparent 55%),
            radial-gradient(circle at 22% 80%, rgba(91,124,250,0.12), transparent 55%);
          pointer-events:none;
        }
        .contact-logo-img{
          display:block; margin-inline-start:0;
          width:clamp(150px,16vw,220px); height:auto; object-fit:contain;
          background:transparent;
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
