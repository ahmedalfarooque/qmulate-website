"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FU, FI, GlassCard } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";

/* ── Input / Textarea glass style ──────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "13px 16px",
  fontSize: 14,
  color: "var(--text-1)",
  outline: "none",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  transition: "border-color 0.2s, box-shadow 0.2s",
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
        {label}{required && <span style={{ color: "var(--cyan)", marginLeft: 3 }}>*</span>}
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
        border: focused ? "1px solid rgba(0,196,204,0.60)" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: focused
          ? "0 0 0 3px rgba(0,196,204,0.10), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: 36,
        border: focused ? "1px solid rgba(0,196,204,0.60)" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: focused
          ? "0 0 0 3px rgba(0,196,204,0.10), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
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
        border: focused ? "1px solid rgba(0,196,204,0.60)" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: focused
          ? "0 0 0 3px rgba(0,196,204,0.10), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
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
        background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(40px,5vw,80px)", alignItems: "start" }} className="grid-contact">

            {/* ── Left — info ── */}
            <div>
              <motion.div {...FI()} style={{ marginBottom: 24 }}>
                <span className="pill pill-c"><span className="dot-live" />PRIVATE &amp; CONFIDENTIAL</span>
              </motion.div>
              <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ marginBottom: 20 }}>
                Get in touch.
              </motion.h1>
              <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 420, lineHeight: 1.8, marginBottom: 40 }}>
                Every introduction is treated with complete discretion.
                We typically respond within one business day.
              </motion.p>

              <motion.div {...FU(.22)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-4)", fontFamily: "var(--font-geist-mono,'Courier New'),monospace", marginBottom: 10 }}>Contact</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 6 }}>Dr. Ahmed Ismail Alfarooque</div>
                  <a href="tel:+966533339052" style={{ display: "block", fontSize: 13, color: "var(--cyan)", marginBottom: 3 }}>+966 53 333 9052</a>
                  <a href="mailto:enquiries@qmulate.com" style={{ display: "block", fontSize: 13, color: "var(--cyan)" }}>enquiries@qmulate.com</a>
                </GlassCard>

                <GlassCard style={{ padding: "22px 26px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-4)", fontFamily: "var(--font-geist-mono,'Courier New'),monospace", marginBottom: 10 }}>Address</div>
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
              {/* Advanced glass form card */}
              <div style={{
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                background: "rgba(8,14,44,0.68)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 24,
                padding: "clamp(28px,4vw,48px)",
                position: "relative",
                overflow: "hidden",
                boxShadow: `
                  inset 0 1.5px 0 rgba(255,255,255,0.40),
                  inset 1px 0 0 rgba(255,255,255,0.10),
                  inset -1px 0 0 rgba(255,255,255,0.05),
                  0 32px 80px rgba(0,0,0,0.70),
                  0 8px 24px rgba(0,0,0,0.45),
                  0 0 0 1px rgba(255,255,255,0.04)
                `,
              }}>
                {/* Top highlight */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,196,204,0.55) 30%,rgba(255,255,255,0.40) 50%,rgba(91,124,250,0.55) 70%,transparent)", pointerEvents: "none" }} />
                {/* Inner glow */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg,rgba(255,255,255,0.03) 0%,transparent 100%)", pointerEvents: "none", borderRadius: "inherit" }} />

                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "48px 20px" }}>
                    <div style={{ fontSize: 40, marginBottom: 20 }}>✓</div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>Introduction received.</h3>
                    <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.7 }}>We&apos;ll be in touch within one business day. Every communication is private and confidential.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cyan)", fontFamily: "var(--font-geist-mono,'Courier New'),monospace", marginBottom: 20 }}>
                        Introduction Request
                      </div>
                      <h2 style={{ fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 700, color: "var(--text-1)", lineHeight: 1.2 }}>
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
                      <button type="submit" disabled={status === "sending"} style={{
                        width: "100%",
                        padding: "15px 24px",
                        borderRadius: 12,
                        cursor: status === "sending" ? "wait" : "pointer",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#b8f0ff",
                        fontFamily: "var(--font-geist,'Inter',sans-serif)",
                        background: "rgba(0,212,255,0.08)",
                        border: "1px solid rgba(0,212,255,0.32)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.16), 0 0 0 1px rgba(0,212,255,0.10), 0 4px 24px rgba(0,212,255,0.18), 0 0 48px rgba(0,212,255,0.06)",
                        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                        opacity: status === "sending" ? 0.7 : 1,
                      }}
                      onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(0,212,255,0.14)"; b.style.borderColor = "rgba(0,212,255,0.52)"; b.style.boxShadow = "inset 0 1.5px 0 rgba(255,255,255,0.22), 0 0 0 1px rgba(0,212,255,0.20), 0 8px 40px rgba(0,212,255,0.28), 0 0 70px rgba(0,212,255,0.14)"; b.style.transform = "scale(1.02) translateY(-1px)"; b.style.color = "#ffffff"; }}
                      onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(0,212,255,0.08)"; b.style.borderColor = "rgba(0,212,255,0.32)"; b.style.boxShadow = "inset 0 1.5px 0 rgba(255,255,255,0.16), 0 0 0 1px rgba(0,212,255,0.10), 0 4px 24px rgba(0,212,255,0.18), 0 0 48px rgba(0,212,255,0.06)"; b.style.transform = "scale(1) translateY(0)"; b.style.color = "#b8f0ff"; }}
                      >
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
        @media(max-width:900px){.grid-contact{grid-template-columns:1fr!important}}
        @media(max-width:560px){.form-row{grid-template-columns:1fr!important}}
        select option { background: #0a0f28; color: #e2e8f0; }
      `}</style>
    </main>
  );
}
