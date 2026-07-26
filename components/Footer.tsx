"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const path = usePathname();
  const isAr = path.startsWith("/ar");

  const en = {
    navTitle:"Navigation",
    navLinks:[
      {l:"Home",h:"/"},{l:"About",h:"/about"},{l:"Services",h:"/services"},{l:"Contact",h:"/contact"},
    ],
    contactTitle:"Get In Touch",
    tagline:"Transforming Ownership into Enduring Value.",
    sub:"QMULATE is a specialist real estate platform. All communications are private and confidential.",
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
    sub:"كيوميليت منظومة عقارية متكاملة. جميع المراسلات سرية وخاصة.",
    email:"ceo@qmulate.com",
    phone:"+966 53 333 9052",
    phoneHref:"+966533339052",
    langLabel:"اللغة",
    langSwitch:"English",
  };
  const t = isAr ? ar : en;

  return (
    <footer className="qm-footer" style={{
      position:"relative",overflow:"hidden",
      direction:isAr?"rtl":"ltr",
      fontFamily:isAr?"var(--font-madani),sans-serif":"var(--font-geist,'Inter',sans-serif)",
    }}>
      {/* Ambient dark canvas — matches the brand's ink + blue duotone */}
      <div className="qm-footer-bg" />

      <div className="container" style={{position:"relative",zIndex:1,paddingTop:"clamp(56px,7vw,88px)",paddingBottom:"clamp(32px,4vw,48px)"}}>
        {/* Top section */}
        <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr",gap:"clamp(32px,4vw,64px)",marginBottom:"clamp(44px,5.5vw,64px)",alignItems:"start"}}>
          {/* Brand column */}
          <div>
            <Link href={isAr?"/ar":"/"} style={{display:"flex",alignItems:"center",gap:13,marginBottom:20,textDecoration:"none"}}>
              <img src="/Logo-light.svg" alt="QMULATE" className="qm-footer-logo" style={{height:'46px',width:'auto',display:'block',objectFit:'contain'}} />
              <div style={{fontFamily:"var(--font-geist,'Inter',sans-serif)",fontWeight:700,fontSize:16,letterSpacing:"0.04em",color:"#F5F6F8",lineHeight:1}}>QMULATE</div>
            </Link>
            <p style={{fontSize:14.5,color:"#B9BEC8",lineHeight:1.75,marginBottom:12,maxWidth:320}}>{t.tagline}</p>
            <p style={{fontSize:12,color:"#7A7F8A",lineHeight:1.7,maxWidth:320}}>{t.sub}</p>
          </div>

          {/* Navigation column */}
          <div>
            <div className="t-xs" style={{color:"#7A7F8A",marginBottom:18}}>{t.navTitle}</div>
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
            <div className="t-xs" style={{color:"#7A7F8A",marginBottom:18}}>{t.contactTitle}</div>
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
          <span style={{fontSize:11,color:"#5B5F69",fontFamily:"var(--font-geist-mono,'Courier New'),monospace"}}>v7.0 · 2026</span>
        </div>
      </div>

      <style>{`
        @media(max-width:760px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:520px){.footer-grid{grid-template-columns:1fr!important}}

        /* Deep navy-blue canvas — a more visibly bluish dark theme than the
           near-black ink used elsewhere, per design direction. */
        .qm-footer{
          background: linear-gradient(155deg, #0A0E1F 0%, #141B33 55%, #0A0E1F 100%);
        }
        .qm-footer-bg{
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background:
            radial-gradient(ellipse 65% 55% at 15% 0%, rgba(91,124,250,0.18) 0%, transparent 62%),
            radial-gradient(ellipse 60% 50% at 90% 100%, rgba(76,99,210,0.15) 0%, transparent 62%);
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
      `}</style>
    </footer>
  );
}
