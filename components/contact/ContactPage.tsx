"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FU, GlassCard } from "@/components/DS";
import { PageBackground } from "@/components/PageBackground";
import { ImageReveal } from "@/components/TextReveal";
import { CheckIcon, PhoneIcon, EmailIcon, LocationIcon, ClockIcon } from "@/components/icons/GlassIcons";
import { useTheme } from "@/components/ThemeProvider";
import { contactContent, type Locale } from "./contactContent";

/* ── Input / Textarea — premium light glass style, shared by both locales ── */
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
};

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

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label className="contact-label">
        {label}{required && <span style={{ color: "var(--gold)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function GInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const { resolvedTheme } = useTheme();
  return (
    <input
      {...props}
      style={{ ...inputBase, ...fieldStyle(resolvedTheme === "dark", focused), ...props.style }}
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
      className="contact-select"
      style={{ ...inputBase, appearance: "none", ...fieldStyle(resolvedTheme === "dark", focused), ...props.style }}
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
      style={{ ...inputBase, resize: "vertical", minHeight: 110, ...fieldStyle(resolvedTheme === "dark", focused), ...props.style }}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const t = contactContent[locale];
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [form, setForm] = useState({ name: "", email: "", entity: "", area: "", message: "" });
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
    <main className={isAr ? "contact-page contact-page-ar" : "contact-page"} style={{ position: "relative" }}>
      <PageBackground variant="contact" />

      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(56px,6vw,84px)", paddingBottom: "clamp(16px,2vw,28px)",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 1280, padding: "0 40px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "minmax(0,0.95fr) minmax(0,1.05fr)",
            gap: "clamp(24px,3vw,40px)", alignItems: "stretch",
            direction: isAr ? "rtl" : "ltr",
          }} className="grid-contact">

            {/* ── Info column — logo, heading, description, badge, contact/address cards ── */}
            <div style={{ display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
              <div>
                <ImageReveal delay={0.04} style={{ marginBottom: 14 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={isDark ? "/Logo-light.svg" : "/Logo.svg"} alt="QMULATE" className="contact-logo-img" />
                </ImageReveal>

                <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ fontSize: "clamp(34px,3.4vw,48px)", marginBottom: 10, marginTop: 10 }}>
                  {t.heading}
                </motion.h1>
                <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", fontSize: "clamp(17px,1.5vw,19px)", maxWidth: 480, lineHeight: 1.6, marginBottom: 12 }}>
                  {t.description}
                </motion.p>

                <motion.div {...FU(.19)} className="contact-warm-badge" style={{ marginBottom: 14 }}>
                  <ClockIcon size="sm" />
                  <span>{t.badge}</span>
                </motion.div>
              </div>

              <motion.div {...FU(.22)} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
                <GlassCard className="contact-info-card" style={{ padding: "16px 20px" }}>
                  <div className="contact-card-head">
                    <PhoneIcon size="sm" />
                    <div className="contact-label">{t.contactLabel}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 5 }}>{t.name}</div>
                  <a href={`tel:${t.phoneHref}`} className="contact-ltr-link" style={{ display: "block", fontSize: 13, color: "var(--cyan)", marginBottom: 3 }}>{t.phone}</a>
                  <a href={`mailto:${t.email}`} className="contact-ltr-link" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--cyan)", justifyContent: isAr ? "flex-end" : "flex-start" }}>
                    {isAr ? <>{t.email}<EmailIcon size="sm" /></> : <><EmailIcon size="sm" />{t.email}</>}
                  </a>
                </GlassCard>

                <GlassCard className="contact-info-card" style={{ padding: "16px 20px" }}>
                  <div className="contact-card-head">
                    <LocationIcon size="sm" />
                    <div className="contact-label">{t.addressLabel}</div>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, margin: 0 }}>
                    {t.address.map((line, i) => (
                      <span key={line}>{line}{i < t.address.length - 1 && <br />}</span>
                    ))}
                  </p>
                </GlassCard>
              </motion.div>
            </div>

            {/* ── Form column ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .5, ease: [.25,.46,.45,.94] }}>
              <div className="gf noise" style={{
                padding: "clamp(20px,2.6vw,30px)",
                position: "relative",
                overflow: "hidden",
                height: "100%",
                maxWidth: 700,
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              }}>
                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "48px 20px", margin: "auto 0" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                      <CheckIcon size="lg" />
                    </div>
                    <h3 className="t-h3" style={{ color: "var(--text-1)", marginBottom: 12 }}>{t.sentHeading}</h3>
                    <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.7 }}>{t.sentBody}</p>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1, height: "100%" }}>
                    <div>
                      <div className="contact-eyebrow">{t.eyebrow}</div>
                      <h2 className="t-h3" style={{ color: "var(--text-1)", fontSize: "clamp(28px,2.4vw,34px)" }}>
                        {t.formHeading}
                      </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                      <Field label={t.fields.fullName} required>
                        <GInput type="text" placeholder={t.fields.fullNamePlaceholder} value={form.name} onChange={up("name")} required />
                      </Field>
                      <Field label={t.fields.email} required>
                        <GInput type="email" placeholder={t.fields.emailPlaceholder} value={form.email} onChange={up("email")} required className="contact-ltr-input" />
                      </Field>
                    </div>

                    <Field label={t.fields.entity}>
                      <GInput type="text" placeholder={t.fields.entityPlaceholder} value={form.entity} onChange={up("entity")} />
                    </Field>

                    <Field label={t.fields.area}>
                      <GSelect value={form.area} onChange={up("area")}>
                        <option value="">{t.fields.areaPlaceholder}</option>
                        {t.areas.map(a => <option key={a} value={a}>{a}</option>)}
                      </GSelect>
                    </Field>

                    <Field label={t.fields.message} required>
                      <GTextarea placeholder={t.fields.messagePlaceholder} rows={3} value={form.message} onChange={up("message") as React.ChangeEventHandler<HTMLTextAreaElement>} required />
                    </Field>

                    <div style={{ marginTop: "auto" }}>
                      <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{
                        width: "100%",
                        padding: "12px 24px",
                        fontSize: 15,
                        cursor: status === "sending" ? "wait" : "pointer",
                        opacity: status === "sending" ? 0.7 : 1,
                      }}>
                        {status === "sending" ? t.sending : t.send}
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
        /* ── Shared Contact page layout — identical grid, sizing, and spacing
           for English and Arabic. Only text-direction-sensitive rules are
           scoped under .contact-page-ar; everything else applies to both. ── */
        .contact-label{
          font-size:11px; font-weight:700; letter-spacing:0.10em; text-transform:uppercase;
          color:var(--text-4); font-family:var(--font-geist-mono,'Courier New'),monospace;
        }
        .contact-eyebrow{
          font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase;
          color:var(--gold); font-family:var(--font-geist-mono,'Courier New'),monospace;
          margin-bottom:8px;
        }
        .contact-card-head{ display:flex; align-items:center; gap:10px; margin-bottom:10px; }
        /* PageBackground's "contact" variant places soft blurred color blobs
           behind the page (one sits bottom-right); the shared .gc background
           is intentionally translucent so those blobs show through for depth
           elsewhere on the site. On these two small text cards that same
           translucency reads as a gray/uneven tint, worst on the lower-right
           corner where the blob sits. Make just these two cards a solid,
           near-opaque light surface — background only, nothing else on .gc
           touched. */
        .contact-info-card{
          background: rgba(255,255,255,0.94) !important;
        }
        :is([data-theme="dark"],.dark) .contact-info-card{
          background: rgba(20,26,38,0.90) !important;
        }
        .contact-ltr-link, .contact-ltr-input{ direction:ltr; unicode-bidi:isolate; }
        .contact-warm-badge{
          display:inline-flex; align-items:center; gap:8px;
          padding:8px 16px 8px 12px; border-radius:100px;
          background:rgba(91,124,250,0.08); border:1px solid rgba(91,124,250,0.22);
          font-size:12.5px; font-weight:600; color:var(--text-2);
        }
        @media(max-width:900px){.grid-contact{grid-template-columns:1fr!important}.grid-contact>div{height:auto!important}}
        @media(max-width:560px){.form-row{grid-template-columns:1fr!important}}
        select option { background: #FFFFFF; color: var(--text-1); }
        [data-theme="dark"] select option,
        .dark select option { background: #10141D; color: #FFFFFF; }
        .contact-select{
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7080' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 14px center; padding-right:36px;
        }
        .contact-logo-img{
          display:block;
          width:clamp(90px,9vw,120px); height:auto; object-fit:contain;
          background:transparent;
        }

        /* ── Arabic-only overrides — same layout, mirrored direction/typography ── */
        .contact-page-ar .contact-label,
        .contact-page-ar .contact-eyebrow{ font-family:var(--font-madani),sans-serif; letter-spacing:0.06em; }
        .contact-page-ar .contact-card-head{ justify-content:flex-start; }
        .contact-page-ar .contact-select{
          background-position:left 14px center; padding-right:16px; padding-left:36px;
        }
      `}</style>
    </main>
  );
}
