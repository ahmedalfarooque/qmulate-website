"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FU, FI, GlassCard } from "@/components/DS";
import { PageBackground } from "@/components/PageBackground";
import { ImageReveal } from "@/components/TextReveal";
import { CheckIcon, PhoneIcon, EmailIcon, LocationIcon, ClockIcon } from "@/components/icons/GlassIcons";

/* ── Input / Textarea — premium light glass style ────────────────────────── */
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
  fontFamily: "var(--font-geist,'Inter',sans-serif)",
};

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.10em",
        textTransform: "uppercase", color: "var(--text-4)",
        fontFamily: "var(--font-geist-mono,'Courier New'),monospace",
      }}>
        {label}{required && <span style={{ color: "var(--gold)", marginLeft: 3 }}>*</span>}
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
        backgroundPosition: "right 14px center",
        paddingRight: 36,
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

/* ── AREAS ─────────────────────────────────────────────────────────────── */
const AREAS = [
  "Ownership Structuring & Governance",
  "Real Estate Asset Management",
  "Development & Investment",
  "General Enquiry",
];

export default function ContactPage() {
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
    <main style={{ position: "relative" }}>
      <PageBackground variant="contact" />

      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(120px,15vw,180px)", paddingBottom: "clamp(60px,8vw,100px)",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(40px,5vw,80px)", alignItems: "start" }} className="grid-contact">

            {/* ── Left — imagery + info ── */}
            <div>
              <ImageReveal delay={0.04} style={{ borderRadius: "clamp(16px,2vw,22px)", marginBottom: 28 }}>
                <div className="contact-logo-frame">
                  <img src="/Logo.png" alt="QMULATE" className="contact-logo-img" />
                </div>
              </ImageReveal>

              <motion.div {...FI()} style={{ marginBottom: 24 }}>
                <span className="pill pill-c"><span className="dot-live" />Private &amp; Confidential</span>
              </motion.div>
              <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ marginBottom: 20 }}>
                Get in touch.
              </motion.h1>
              <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 420, lineHeight: 1.8, marginBottom: 20 }}>
                We&apos;d welcome the chance to hear from you.
                Every introduction is treated with complete discretion.
              </motion.p>

              <motion.div {...FU(.19)} className="contact-warm-badge" style={{ marginBottom: 32 }}>
                <ClockIcon size="sm" />
                <span>Typically responds within one business day</span>
              </motion.div>

              <motion.div {...FU(.22)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <PhoneIcon size="sm" />
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-4)", fontFamily: "var(--font-geist-mono,'Courier New'),monospace" }}>Contact</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 6 }}>Dr. Ahmed Ismail Alfarooque</div>
                  <a href="tel:+966533339052" style={{ display: "block", fontSize: 13, color: "var(--cyan)", marginBottom: 3 }}>+966 53 333 9052</a>
                  <a href="mailto:ceo@qmulate.com" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--cyan)" }}><EmailIcon size="sm" />ceo@qmulate.com</a>
                </GlassCard>

                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <LocationIcon size="sm" />
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-4)", fontFamily: "var(--font-geist-mono,'Courier New'),monospace" }}>Address</div>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.75, margin: 0 }}>
                    King Abdulaziz Rd, Albasatin Dist.<br />
                    P.O. Box 23718, Jeddah 9351<br />
                    Kingdom of Saudi Arabia
                  </p>
                </GlassCard>
              </motion.div>

              <motion.p {...FU(.32)} style={{ fontSize: 11, color: "var(--text-5)", marginTop: 28, fontFamily: "var(--font-geist-mono,'Courier New'),monospace" }}>
                Privileged &amp; Confidential · CR: 7054453274 · VAT: 314819612900003
              </motion.p>
            </div>

            {/* ── Right — form ── */}
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
                    <h3 className="t-h3" style={{ color: "var(--text-1)", marginBottom: 12 }}>Introduction received.</h3>
                    <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.7 }}>We&apos;ll be in touch within one business day. Every communication is private and confidential.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-geist-mono,'Courier New'),monospace", marginBottom: 20 }}>
                        Introduction Request
                      </div>
                      <h2 className="t-h3" style={{ color: "var(--text-1)" }}>
                        Begin a private conversation.
                      </h2>
                    </div>

                    {/* Name + Email row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                      <Field label="Full Name" required>
                        <GInput type="text" placeholder="Your full name" value={form.name} onChange={up("name")} required />
                      </Field>
                      <Field label="Email Address" required>
                        <GInput type="email" placeholder="you@example.com" value={form.email} onChange={up("email")} required />
                      </Field>
                    </div>

                    <Field label="Family / Entity Name">
                      <GInput type="text" placeholder="Family, company, or endowment name" value={form.entity} onChange={up("entity")} />
                    </Field>

                    <Field label="Area of Interest">
                      <GSelect value={form.area} onChange={up("area")}>
                        <option value="">Select an area</option>
                        {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                      </GSelect>
                    </Field>

                    <Field label="Message" required>
                      <GTextarea placeholder="Tell us briefly what you'd like to discuss…" rows={5} value={form.message} onChange={up("message") as React.ChangeEventHandler<HTMLTextAreaElement>} required />
                    </Field>

                    <div>
                      <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{
                        width: "100%",
                        padding: "15px 24px",
                        fontSize: 15,
                        cursor: status === "sending" ? "wait" : "pointer",
                        opacity: status === "sending" ? 0.7 : 1,
                      }}>
                        {status === "sending" ? "Sending…" : "Send introduction →"}
                      </button>
                      <p style={{ fontSize: 11, color: "var(--text-5)", textAlign: "center", marginTop: 14, fontFamily: "var(--font-geist-mono,'Courier New'),monospace" }}>
                        All introductions are private and confidential. We do not share your information.
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
        .contact-warm-badge{
          display:inline-flex; align-items:center; gap:9px;
          padding:9px 16px 9px 12px; border-radius:100px;
          background:rgba(176,141,87,0.08); border:1px solid rgba(176,141,87,0.22);
          font-size:12.5px; font-weight:600; color:var(--text-2);
        }
        @media(max-width:900px){.grid-contact{grid-template-columns:1fr!important}}
        @media(max-width:560px){.form-row{grid-template-columns:1fr!important}}
        select option { background: #FFFFFF; color: var(--text-1); }
        .contact-logo-frame{
          display:flex; align-items:center; justify-content:center;
          padding:clamp(52px,7vw,80px) clamp(24px,4vw,40px);
          border-radius:clamp(24px,2.8vw,32px);
          /* True frosted crystal glass — a corner-anchored specular highlight
             (matching .gc/.gp/.gf) instead of a full diagonal streak, and a
             much lighter base fill so the logo reads as floating in glass
             rather than sitting on a tinted panel. */
          background:
            radial-gradient(130% 100% at 20% 12%, rgba(255,255,255,0.32) 0%, transparent 52%),
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
            radial-gradient(circle at 30% 22%, rgba(18,58,87,0.16), transparent 55%),
            radial-gradient(circle at 78% 80%, rgba(176,141,87,0.12), transparent 55%);
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
