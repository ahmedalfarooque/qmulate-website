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
import { PageBackground } from "@/components/PageBackground";
import { useTheme } from "@/components/ThemeProvider";

const BGI = (file: string) => `/Background%20Images/${file}`;

/* ─── HERO — same rotating luxury card stack as the EN homepage ── */
const HERO_STACK_IMAGES = [
  { src: BGI("Home_hero1.jpg"), position: "center 40%" },
  { src: BGI("Home_hero2.jpg"), position: "center 45%" },
  { src: BGI("Home_hero3.png"), position: "center 50%" },
];

/* Editorial split imagery — same photography choices as the EN homepage */
const WHO_WE_ARE_IMG = [{ src: BGI("JdWb9CkELQIJ23C0ooXh7S4uIO6GpX8UyeDtx2-7GPOa-5CUB-G1uKjJOy2YwOfQb86I6Sp1S-o8CQgEc7W9e8Y7AzAD-FPrrhSZDd0qbxU42vX5z2n5AzTdnsSt5_HjsXP_7vkxOimwuIjCIwxwnbU_E2vkHEJ6y_Oz5j2PzC.jpg"), position: "center 40%" }];
const STRUCTURE_IMG   = [{ src: BGI("lStHlz6rGvVTNrn-gxBsxbYPxHasr-dH2337InzXsYChXw7hYLdTKUMBalUuIWZzkzfcOHukp7yPCct_vkj6ZF3eTFewlWNhJZJfhKixOjIqPjxuGCHMzuEJszZ_Z3ZfV9UIdoqBzjt7Iq-VexYqNvlDmiXgce0bhLafh2RBy2.jpg"), position: "center 45%" }];

/* ─── DATA (real, unchanged Arabic business content, ported from the prior
   Arabic homepage — only the surrounding scaffolding has been restructured) ── */
const HOME_SERVICES: ShowcaseItem[] = [
  { num: "01", category: "هيكلة الملكية", title: "هيكلة الملكية والحوكمة",
    image: "AqAtJNNbvEz9B_X-LrvudRWxvbGO0TcEOO5SOIbPjUWLqGfIMCKZFPPK0e7NrLFWV7OmSEzLhtJmL3K_7GwubvHYNeRbz28PhCctZMEQHwtw1-O1ES9RZPJOy-84skQbgX_ywVavjAsRlX-xptvQOCoqVeg18wEu_VYl9Lw1WW.jpg",
    body: "تنظيم أطر الملكية وهياكل صنع القرار لضمان الوضوح والسيطرة على المدى البعيد." },
  { num: "02", category: "إدارة الأصول", title: "إدارة الأصول العقارية",
    image: "nnCjPbRJpT5EQytfClgoeerh9ssrgENktsHfIcS_5DZM2dH8pKpsFp7YQM3dRi0NyZp5eGc3jS-0bRgEAaFY_ERGZ4TZHiu3FRg3mXbZMwaQLjDbK4uMDGGQ0HHsGbfS_mt3pCelpO5T189RKW_hBc3vT_hwTB6wouHJ1b.jpg",
    body: "إدارة المحافظ من خلال التأجير والتشغيل والصيانة للحفاظ على القيمة وتعزيزها." },
  { num: "03", category: "التطوير والاستثمار", title: "التطوير والاستثمار",
    image: "bg13.jpg",
    body: "تحديد وتنفيذ الفرص للتوسع وإعادة التوظيف والنمو المستدام." },
];

const REGULATORS = [
  { name: "أوقاف",             img: "/Regulatory%20Authorities/AWQAF%20LOGO.png", aspect: 480 / 270, hasDarkVariant: true, boost: true },
  { name: "إحكام",             img: "/Regulatory%20Authorities/EHKAAM%20LOGO.png", aspect: 469 / 203, hasDarkVariant: true, boost: true },
  { name: "وزارة الإسكان",     img: "/Regulatory%20Authorities/Ministry%20of%20Housing%20Logo.png", aspect: 1280 / 1291, hasDarkVariant: true, boost: true },
  { name: "هيئة العقار",        img: "/Regulatory%20Authorities/REAL%20ESTATE%20GENERAL%20AUTHORITY%20LOGO.png", aspect: 2774 / 880, hasDarkVariant: true, boost: false },
  { name: "هيئة أملاك الدولة",  img: "/Regulatory%20Authorities/STATE%20PROPERTY%20OF%20GENERAL%20AUTHORITY%20LOGO.png", aspect: 320 / 320, hasDarkVariant: true, boost: false },
];

/* Dedicated Dark Mode logo files live alongside the Light Mode originals,
   named with a " 2" suffix before the extension. */
const darkLogoSrc = (img: string) => img.replace(/\.png$/, "%202.png");

const PROCESS_IMG = [{ src: BGI("1000_F_332524339_NGSV5Nsf4ZQHUIB7xjBeP5IQBQdDGFaU.jpg"), position: "center 45%" }];

const PROCESS_STEPS = [
  { num: "01", title: "الاكتشاف", body: "فهم هيكل الملكية والأهداف وتركيبة الأصول القائمة." },
  { num: "02", title: "الهيكلة", body: "إرساء أطر حوكمة واضحة وآليات لصنع القرار حول تلك الأصول." },
  { num: "03", title: "الإدارة", body: "إدارة الأصول والتقارير والحفاظ على القيمة عبر المحفظة بشكل مستمر." },
  { num: "04", title: "النمو", body: "تحديد فرص التطوير وإعادة التوظيف والنمو على المدى الطويل." },
];

const SERVICE_LAYERS = [
  { label: "هيكلة الملكية",      sub: "أطر واضحة · حوكمة القرار · وضوح المدى البعيد",     color: "var(--gold)" },
  { label: "إدارة الأصول",        sub: "التأجير · التشغيل · الصيانة · الحفاظ على القيمة",   color: "var(--cyan)" },
  { label: "التطوير والاستثمار",  sub: "التوسع · إعادة التوظيف · النمو المستدام",           color: "var(--blue)" },
];

/* ═══════════════════════════════════════════════════════════
   PAGE — Arabic mirror of app/page.tsx (Ivory & Brass redesign)
   ═══════════════════════════════════════════════════════════ */
export default function ArHome() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { resolvedTheme } = useTheme();

  return (
    <main className="hero-page" style={{ position: "relative", fontFamily: "var(--font-madani),sans-serif" }}>
      <PageBackground variant="home"/>

      {/* ══════════════════════════════════════════
          1. HERO — LIGHT EDITORIAL SPLIT (mirrored: text right, image left)
          ══════════════════════════════════════════ */}
      <section ref={heroRef} className="hero-fullbleed" style={{
        minHeight: "100svh", alignItems: "center", background: "var(--bg-0)",
        paddingTop: "clamp(104px,15vh,148px)", paddingBottom: "clamp(56px,7vh,84px)",
      }}>
        <div className="bg-mesh" />

        <motion.div className="hero-content" style={{ opacity: heroOpacity, position: "relative", width: "100%", padding: 0 }} dir="rtl">
          <div className="container">
            <div className="hero-split-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(40px,6vw,96px)", alignItems: "center", direction: "rtl" }}>

              {/* ── Right (first in RTL): headline, subhead, trust bar ── */}
              <div style={{ textAlign: "right" }}>
                <div style={{ overflow: "hidden" }}>
                  <motion.h1
                    initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="t-d"
                    style={{ color: "var(--text-1)", marginBottom: 0 }}
                  >
                    نحوّل الملكية
                  </motion.h1>
                </div>
                <div style={{ overflow: "hidden", marginBottom: 32 }}>
                  <motion.h1
                    initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="t-d gt-warm"
                    style={{ marginBottom: 0 }}
                  >
                    إلى قيمة مستدامة.
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.85 }}
                  style={{ fontSize: "clamp(16px,1.5vw,20px)", lineHeight: 1.95, color: "var(--text-3)", maxWidth: 520, marginBottom: 44, marginRight: 0, marginLeft: "auto" }}
                >
                  منظومة عقارية متكاملة للعائلات والشركات والأفراد، تتخصص في إدارة الأصول
                  والحفاظ على قيمتها وتحقيق النمو المستدام على المدى البعيد.
                </motion.p>

              </div>

              {/* ── Left (second in RTL): rotating luxury card stack ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="hero-image-cluster hero-image-cluster-rtl"
              >
                <div className="hic-accent hic-accent-rtl" />
                <HeroCardStack images={HERO_STACK_IMAGES} />
              </motion.div>
            </div>

            {/* Trust bar — no container, logos sit directly on the page */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.75 }}
              className="trust-bar"
            >
              <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: 20, letterSpacing: "0.14em", textAlign: "right" }}>
                مرخّص ومنظَّم من قبل
              </div>
              <div className="trust-bar-row">
                {REGULATORS.map(r => {
                  const isLg = r.img.includes("STATE%20PROPERTY");
                  return (
                  <div key={r.name} className={`trust-logo-box${isLg ? " trust-logo-box-lg" : ""}${r.boost ? " trust-logo-box-boost" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolvedTheme === "dark" && r.hasDarkVariant ? darkLogoSrc(r.img) : r.img}
                      alt={r.name}
                      title={r.name}
                      className={`trust-logo${isLg ? " trust-logo-lg" : ""}`}
                      style={{ aspectRatio: r.aspect }}
                    />
                  </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          3. WHO WE ARE — EDITORIAL SPLIT (mirrored: text right, image left)
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }} dir="rtl">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(56px,8vw,120px)", alignItems: "center" }}>
            <div>
              <Reveal direction="right">
                <div style={{ overflow: "hidden", marginBottom: 24 }}>
                  <span className="pill pill-c">من نحن</span>
                </div>
              </Reveal>

              <LineReveal delay={0.1}>
                <h2 className="t-h2" style={{ color: "var(--text-1)", marginBottom: 0 }}>
                  منظومة عقارية متكاملة
                </h2>
              </LineReveal>

              <div className="accent-bar" style={{ marginTop: "clamp(20px,2.2vw,28px)" }} />

              <Reveal direction="right" delay={0.2}>
                <p style={{ fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.95, color: "var(--text-3)", marginBottom: 40, textAlign: "right" }}>
                  نساعد الملاك والعائلات والشركات والأوقاف على إدارة أصولهم العقارية
                  ضمن إطار واضح ومنظم يسهّل اتخاذ القرار ويحافظ على استدامة الأصول.
                  من خلال الجمع بين الخبرة العقارية والممارسات المؤسسية، نعمل على
                  تعزيز كفاءة الأصول ودعم نموها على المدى الطويل.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.32}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                  {[
                    { Icon: HomeIcon, label: "ملاك العقارات" },
                    { Icon: SuccessionIcon, label: "العائلات" },
                    { Icon: GovernanceIcon, label: "الشركات" },
                    { Icon: DocumentIcon, label: "الأوقاف" },
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
          4. HOW WE WORK — NUMBERED PROCESS (mirrored: image left, text right)
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }} dir="rtl">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="split-grid split-grid-rev" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,7vw,100px)", alignItems: "center" }}>

            <ImageReveal delay={0.1} className="split-order-first split-img-col" style={{ aspectRatio: "4/5", minHeight: 460, borderRadius: "clamp(16px,2vw,28px)" }}>
              <div className="split-img split-img-col" style={{ aspectRatio: "4/5", minHeight: 460, borderRadius: 0 }}>
                <SplitSlideshow slides={PROCESS_IMG} interval={12000} />
                <div className="img-grad qm-scrim-force" style={{ zIndex: 10 }} />
                <div className="img-corner-accent tl" style={{ zIndex: 11 }} />
                <div className="img-corner-accent br" style={{ zIndex: 11 }} />
              </div>
            </ImageReveal>

            <div style={{ textAlign: "right" }}>
              <LineReveal delay={0.08}>
                <h2 className="t-h2" style={{ color: "var(--text-1)", marginBottom: 40 }}>من التكليف إلى الإنجاز.</h2>
              </LineReveal>

              <div className="process-steps">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div key={step.num} {...FU(i * 0.08)} className="process-step process-step-rtl">
                    <div className="process-num t-xs" style={{ color: "var(--gold)" }}>{step.num}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>{step.title}</div>
                      <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text-3)" }}>{step.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="editorial-rule" /></div>

      {/* ══════════════════════════════════════════
          5. SERVICE LAYERS — EDITORIAL SPLIT (mirrored: image right, text left)
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }} dir="rtl">
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
                eyebrow="من نحن"
                title={<>منظومة عقارية متكاملة.</>}
                subtitle="نقدم نهجًا متكاملًا لإدارة الأصول العقارية وهيكلة الملكية، نساعد من خلاله عملاءنا على إدارة أصولهم وفق أطر حوكمة واضحة وإدارة فعّالة ونظرة بعيدة المدى."
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 36 }}>
                {SERVICE_LAYERS.map((layer, i) => (
                  <motion.div key={layer.label} {...FU(i * 0.1)}>
                    <div className="layer-item gc" style={{ padding: "clamp(18px,2.2vw,26px) clamp(20px,2.2vw,28px)", textAlign: "right" }}>
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
          6. FEATURED SERVICES / INVESTMENT COLLECTIONS
          ══════════════════════════════════════════ */}
      <section className="section-lux" style={{ position: "relative", overflow: "hidden" }} dir="rtl">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
            <SectionHeading
              wide
              eyebrow="الخدمات المميزة"
              title="هيكلة مناسبة لكل نوع من أنواع الملكية."
              subtitle="صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، بدءًا من هيكلة الملكية والحوكمة، مرورًا بإدارة الأصول، وصولًا إلى التطوير والاستثمار، مع مراعاة الاحتياجات الخاصة لكل نوع من العملاء."
            />
          </div>

          <PropertyShowcase items={HOME_SERVICES} rtl />

          <div style={{ textAlign: "center", marginTop: "clamp(40px,4.5vw,56px)" }}>
            <a href="/ar/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "15px 36px" }}>← عرض جميع الخدمات</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CTA — BEGIN A CONVERSATION (contained dark showcase band)
          ══════════════════════════════════════════ */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }} dir="rtl">
        <div className="container">
          <div className="showcase-dark" style={{ textAlign: "center" }}>
            <LineReveal delay={0.06}>
              <h2 className="showcase-quote" style={{ marginBottom: 18 }}>ابدأ محادثة.</h2>
            </LineReveal>
            <Reveal direction="up" delay={0.14}>
              <p className="showcase-sub" style={{ maxWidth: 460, margin: "0 auto 40px" }}>
                كل تواصل يُعامَل بسرية تامة.
              </p>
            </Reveal>
            <motion.div {...FU(0.2)} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/ar/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "15px 38px" }}>← تواصل معنا</a>
              <a href="/ar/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "15px 38px", color: "#F5F6F8", borderColor: "rgba(255,255,255,0.20)" }}>خدماتنا</a>
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

        /* ── Hero image cluster — mirrored for RTL (image on the left) ── */
        .hero-image-cluster{
          position:relative; width:100%; max-width:520px; margin-right:auto; margin-left:0;
          aspect-ratio:4/5;
        }
        .hic-accent-rtl{
          position:absolute; top:6%; left:-7%; right:auto; width:72%; height:72%;
          border-radius:24px; background:var(--blue); opacity:.9; z-index:0;
        }

        /* ── Rotating luxury card stack (front/middle/back) — mirrored for RTL ── */
        .hero-stack{
          position:absolute; inset:0; z-index:1;
        }
        .hero-stack-card{
          position:absolute; right:8%; top:2%; width:84%; height:84%;
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
        /* Dark theme only: each logo box hugs its own logo's rendered width
           instead of stretching into an equal-width slot, so the row's single
           gap value becomes the real, uniform visual distance between every
           logo, not just between box edges. The whole row is then centered
           as one balanced group. Light theme is untouched. */
        [data-theme="dark"] .trust-bar-row,
        .dark .trust-bar-row{
          justify-content:center;
          flex-wrap:nowrap;
        }
        [data-theme="dark"] .trust-logo-box,
        .dark .trust-logo-box{
          flex:0 1 auto;
        }
        /* AWQAF, EHKAAM and Ministry of Housing read visually smaller than
           REGA / State Properties at the shared box height, so their boxes
           get a ~20% taller height in dark mode only — width follows via the
           image's own aspect-ratio, so proportions stay exact. */
        [data-theme="dark"] .trust-logo-box-boost,
        .dark .trust-logo-box-boost{
          height:clamp(105px,12.24vw,149px);
        }
        /* The State Properties mark is intentionally scaled 1.55x (approved
           sizing, kept as-is) — that transform grows its painted box
           symmetrically from its own center, eating into the gap on its
           leading side. Compensate with margin so its visual gap matches
           every other pair, without touching the scale or the asset. */
        [data-theme="dark"] .trust-logo-box-lg,
        .dark .trust-logo-box-lg{
          margin-inline-start:calc(clamp(88px,10.2vw,124px) * 0.275);
        }
        @media(max-width:640px){
          .trust-bar-row{ justify-content:center; }
          .trust-logo-box{ flex:0 1 auto; height:68px; }
          [data-theme="dark"] .trust-bar-row,
          .dark .trust-bar-row{ flex-wrap:wrap; }
          [data-theme="dark"] .trust-logo-box-boost,
          .dark .trust-logo-box-boost{ height:82px; }
          [data-theme="dark"] .trust-logo-box-lg,
          .dark .trust-logo-box-lg{ margin-inline-start:calc(68px * 0.275); }
        }
        @media(max-width:1180px){
          .hero-split-grid{ grid-template-columns:1fr!important; }
          .hero-image-cluster{ max-width:420px; margin:0 auto; order:-1; }
        }

        /* ── How We Work — numbered process list (mirrored) ── */
        .process-steps{ display:flex; flex-direction:column; gap:0; }
        .process-step-rtl{
          display:grid; grid-template-columns:52px 1fr; gap:18px;
          padding:18px 0; border-bottom:1px solid var(--glass-border);
        }
        .process-step-rtl:last-child{ border-bottom:none; }
        .process-num{ letter-spacing:0; font-size:clamp(18px,1.8vw,24px); }
      `}</style>
    </main>
  );
}
