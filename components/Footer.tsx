"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export function Footer() {
  const path = usePathname();
  const isAr = path.startsWith("/ar");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const en = {
    navTitle:"Navigation",
    navLinks:[
      {l:"Home",h:"/"},{l:"About",h:"/about"},{l:"Services",h:"/services"},{l:"Contact",h:"/contact"},
    ],
    contactTitle:"Get In Touch",
    tagline:"Transforming Ownership into Enduring Value.",
    sub:"QMULATE is a Saudi real estate consultancy, brokerage, and property management platform.",
    email:"ceo@qmulate.com",
    phone:"+966 53 333 9052",
    phoneHref:"+966533339052",
    langLabel:"Language",
    langSwitch:"العربية",
  };
  const ar = {
    navTitle:"روابط",
    navLinks:[
      {l:"الرئيسية",h:"/ar"},{l:"من نحن",h:"/ar/about"},{l:"خدماتنا",h:"/ar/services"},{l:"تواصل",h:"/ar/contact"},
    ],
    contactTitle:"تواصل معنا",
    tagline:"نحوّل الملكية إلى قيمة مستدامة.",
    sub:"كيوموليت منصة سعودية متخصصة في الاستشارات العقارية والوساطة العقارية وإدارة الأملاك.",
    email:"ceo@qmulate.com",
    phone:"+966 53 333 9052",
    phoneHref:"+966533339052",
    langLabel:"اللغة",
    langSwitch:"English",
  };
  const t = isAr ? ar : en;

  return (
    <footer className="qm-footer" style={{
      position:"relative",overflow:"hidden",isolation:"isolate",zIndex:100,
      direction:isAr?"rtl":"ltr",
      fontFamily:isAr?"var(--font-madani),sans-serif":"var(--font-geist,'Inter',sans-serif)",
    }}>
      {/* Solid, fully-opaque background layer in light mode — unchanged.
         Dark mode: transparent, so the footer continues the page's own
         dark background instead of reading as a separate boxed-off
         section; only the text/columns below remain visible. */}
      <div
        className="footer-background"
        style={isDark ? { background: "transparent" } : undefined}
      />

      <div className="footer-content container" style={{position:"relative",zIndex:1,paddingTop:"clamp(56px,7vw,88px)",paddingBottom:"clamp(32px,4vw,48px)"}}>
        {/* Top section */}
        <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr",gap:"clamp(32px,4vw,64px)",marginBottom:"clamp(44px,5.5vw,64px)",alignItems:"start"}}>
          {/* Brand column */}
          <div>
            <Link href={isAr?"/ar":"/"} style={{display:"flex",alignItems:"center",gap:13,marginBottom:20,textDecoration:"none"}}>
              <img src="/Logo-light.svg" alt="QMULATE" className="qm-footer-logo" style={{height:'46px',width:'auto',display:'block',objectFit:'contain'}} />
              <div style={{fontFamily:"var(--font-geist,'Inter',sans-serif)",fontWeight:700,fontSize:16,letterSpacing:"0.04em",color:"#F5F6F8",lineHeight:1}}>QMULATE</div>
            </Link>
            <p style={{fontSize:14.5,color:isDark?"rgba(220,225,235,0.88)":"#B9BEC8",lineHeight:1.75,marginBottom:12,maxWidth:320}}>{t.tagline}</p>
            <p style={{fontSize:12,color:isDark?"rgba(190,200,215,0.75)":"#7A7F8A",lineHeight:1.7,maxWidth:320}}>{t.sub}</p>
            <p style={{fontSize:12,color:isDark?"rgba(190,200,215,0.75)":"#7A7F8A",lineHeight:1.7,maxWidth:320,marginTop:12}}>
              {isAr ? (
                <>مرخص من الهيئة العامة للعقار (REGA) بموجب الترخيصين رقم <span dir="ltr" style={{unicodeBidi:"isolate"}}>2200005389</span> و<span dir="ltr" style={{unicodeBidi:"isolate"}}>1200049558</span>.</>
              ) : (
                <>Licensed by the Real Estate General Authority (REGA) under license numbers 2200005389 and 1200049558.</>
              )}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <div className="t-xs" style={{color:isDark?"rgba(190,200,215,0.75)":"#7A7F8A",marginBottom:18}}>{t.navTitle}</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {t.navLinks.map(item=>(
                <Link key={item.l} href={item.h} className="qm-footer-link" style={{fontSize:13.5,lineHeight:1.5}}>
                  {item.l}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <div className="t-xs" style={{color:isDark?"rgba(190,200,215,0.75)":"#7A7F8A",marginBottom:18}}>{t.contactTitle}</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <a href={`mailto:${t.email}`} className="qm-footer-link" style={{fontSize:13.5}}>{t.email}</a>
              <a href={`tel:${t.phoneHref}`} className="qm-footer-link" style={{fontSize:13.5, direction:"ltr", textAlign:isAr?"right":"left"}}>{t.phone}</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="qm-footer-rule" style={{marginBottom:22}}/>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:14}}>
          <Link href={isAr?"/":"/ar"} className="qm-footer-lang">
            {t.langSwitch}
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:760px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:520px){.footer-grid{grid-template-columns:1fr!important}}

        /* Single opaque background layer — exact Home footer canvas,
           identical on every page (one shared component, no per-page
           variant possible). Covers 100% of the footer box at z-index 0,
           beneath footer-content at z-index 1. */
        .footer-background{
          position:absolute; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(ellipse 65% 55% at 15% 0%, rgba(91,124,250,0.18) 0%, transparent 62%),
            radial-gradient(ellipse 60% 50% at 90% 100%, rgba(76,99,210,0.15) 0%, transparent 62%),
            linear-gradient(155deg, #0A0E1F 0%, #141B33 55%, #0A0E1F 100%);
        }
        .qm-footer-rule{
          height:1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }
        .qm-footer-link{
          color:#B9BEC8; transition:color .2s ease;
        }
        .qm-footer-link:hover{ color:#FFFFFF; }
        .qm-footer-lang{
          display:inline-flex; align-items:center;
          padding:6px 14px; border-radius:100px;
          font-size:11.5px; font-weight:600;
          color:#B9BEC8; border:1px solid rgba(255,255,255,0.14);
          background:rgba(255,255,255,0.04);
          transition:color .2s ease, border-color .2s ease, background .2s ease;
        }
        .qm-footer-lang:hover{
          color:#FFFFFF; border-color:rgba(91,124,250,0.45); background:rgba(91,124,250,0.10);
        }

        /* ── Dark mode only — one unified 3D glass card wrapping all footer
           content (brand + navigation + contact), instead of three separate
           boxes. Light mode never matches these selectors; the footer's
           permanent light-mode look is untouched. */
        [data-theme="dark"] .qm-footer .footer-grid,
        .dark .qm-footer .footer-grid{
          position:relative;
          background:rgba(255,255,255,0.05) !important;
          border:1px solid rgba(255,255,255,0.15) !important;
          backdrop-filter:blur(30px) saturate(160%) !important;
          -webkit-backdrop-filter:blur(30px) saturate(160%) !important;
          border-radius:28px !important;
          padding:clamp(28px,3.4vw,44px) !important;
          box-shadow:
            0 25px 80px rgba(0,0,0,0.45),
            inset 0 1px 1px rgba(255,255,255,0.12) !important;
          overflow:hidden;
        }
        [data-theme="dark"] .qm-footer .footer-grid::after,
        .dark .qm-footer .footer-grid::after{
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(135deg,rgba(255,255,255,0.10),transparent 40%);
          pointer-events:none;
        }
        [data-theme="dark"] .qm-footer-link,
        .dark .qm-footer-link{
          color:rgba(180,200,255,0.9) !important;
        }
        [data-theme="dark"] .qm-footer-link:hover,
        .dark .qm-footer-link:hover{
          color:#FFFFFF !important;
          text-shadow:0 0 14px rgba(91,124,250,0.45);
        }
      `}</style>
    </footer>
  );
}
