"use client";
import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MagneticButton } from "@/components/Motion";
import { MenuIcon, CloseIcon } from "./icons/GlassIcons";

const EN_LINKS = [
  {h:"/",l:"Home"},{h:"/#about",l:"About"},{h:"/#services",l:"Services"},{h:"/#contact",l:"Contact"},
];
const AR_LINKS = [
  {h:"/ar",l:"الرئيسية"},{h:"/ar#about",l:"من نحن"},{h:"/ar#services",l:"خدماتنا"},{h:"/ar#contact",l:"تواصل"},
];

const SECTION_IDS = ["home","about","services","contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const path = usePathname();
  const router = useRouter();
  const isAr = path.startsWith("/ar");
  const links = isAr ? AR_LINKS : EN_LINKS;
  const { scrollY } = useScroll();

  // Prefetch the other language route on mount for instant switching
  useEffect(() => {
    router.prefetch(isAr ? (path.replace(/^\/ar/, "") || "/") : ("/ar" + (path === "/" ? "" : path)));
  }, [isAr, path, router]);

  useMotionValueEvent(scrollY,"change",(v)=>{
    setScrolled(v>16);
    setCompact(v>72);
  });
  useEffect(()=>setOpen(false),[path]);

  useEffect(()=>{
    const onScroll = () => {
      const sy = window.scrollY + 80;
      let current = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (sy >= top) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  },[path]);

  const isActive = (h:string) => {
    if (h==="/"||h==="/ar") return (activeSection==="home") && (path==="/"||path==="/ar");
    const hash = h.split("#")[1];
    return hash ? activeSection===hash : false;
  };

  return (
    <>
      <motion.header
        animate={{
          height: compact ? 52 : 64,
          background: scrolled ? "rgba(var(--nav-bg-rgb,2,4,10),.88)" : "rgba(2,4,10,0)",
          backdropFilter: scrolled ? "blur(48px) saturate(220%)" : "blur(0px)",
          borderBottomColor: scrolled ? "rgba(255,255,255,.055)" : "rgba(255,255,255,0)",
        }}
        transition={{duration:.28}}
        style={{
          position:"fixed",top:0,left:0,right:0,zIndex:9999,
          WebkitBackdropFilter:scrolled?"blur(48px) saturate(220%)":"blur(0px)",
          borderBottom:"1px solid transparent",
        }}
      >
        {/* Cyan shimmer line on scroll */}
        <motion.div animate={{opacity:scrolled?1:0}}
          style={{position:"absolute",top:0,left:0,right:0,height:1,
            background:isAr
              ?"linear-gradient(270deg,transparent 5%,rgba(0,212,255,.5) 40%,rgba(138,92,255,.35) 65%,transparent 95%)"
              :"linear-gradient(90deg,transparent 5%,rgba(0,212,255,.5) 40%,rgba(138,92,255,.35) 65%,transparent 95%)"}}/>

        <div className="cw" style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,direction:isAr?"rtl":"ltr"}}>

          {/* ── Logo ── */}
          <Link href={isAr?"/ar":"/"} style={{display:"flex",alignItems:"center",gap:11,flexShrink:0}}>
            <img
              src="/Logo.png"
              alt="QMULATE logo"
              width={28}
              height={36}
              className="qlogo-img"
              style={{
                objectFit: 'contain',
                display: 'block',
                background: 'transparent',
                mixBlendMode: 'screen',
              }}
            />
            <div>
              <div style={{fontFamily:"var(--font-geist,'Inter',sans-serif)",fontWeight:800,fontSize:12,
                letterSpacing:"0.17em",color:"var(--text-1)",lineHeight:1}}>QMULATE</div>
              {isAr
                ? <div style={{fontFamily:"'Madani Arabic',sans-serif",fontSize:9,color:"var(--text-4)",marginTop:2}}>كيوميليت</div>
                : <div style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:8,
                    color:"var(--text-4)",letterSpacing:"0.10em",marginTop:2}}>FAMILY OFFICE</div>}
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav style={{display:"flex",alignItems:"center",gap:2,direction:isAr?"rtl":"ltr"}} className="d-nav">
            {links.map(l=>(
              <Link key={l.h} href={l.h} style={{
                padding:"7px 14px",borderRadius:100,fontSize:13,fontWeight:500,
                fontFamily:isAr?"'Madani Arabic',sans-serif":"var(--font-geist,'Inter',sans-serif)",
                color:isActive(l.h)?"var(--text-1)":"var(--text-3)",
                background:isActive(l.h)?"rgba(0,212,255,.09)":"transparent",
                border:`1px solid ${isActive(l.h)?"rgba(0,212,255,.22)":"transparent"}`,
                transition:"all .2s",
              }}>{l.l}</Link>
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button
              onClick={() => startTransition(() => {
                router.push(isAr ? (path.replace(/^\/ar/, "") || "/") : ("/ar" + (path === "/" ? "" : path)));
              })}
              style={{
                width:32,height:32,borderRadius:"50%",
                background:"var(--g2)",border:"1px solid var(--glass-border)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:isAr?10:12,color:"var(--text-3)",transition:"all .2s",flexShrink:0,
                cursor:"pointer",
              }}>
              {isAr?"EN":"ع"}
            </button>

            <MagneticButton strength={0.25}>
              <Link href={isAr?"/ar#contact":"/#contact"} className="btn btn-primary d-cta"
                style={{padding:"8px 18px",fontSize:12,borderRadius:100}}>
                {isAr?"تواصل":"Get in touch"}
              </Link>
            </MagneticButton>

            {/* ── Mobile hamburger — glass icon ── */}
            <button onClick={()=>setOpen(o=>!o)} className="m-btn"
              aria-label={open?"Close menu":"Open menu"}
              style={{background:"none",border:"none",cursor:"pointer",display:"none",padding:0}}>
              {open
                ? <CloseIcon size="sm" animated={false}/>
                : <MenuIcon  size="sm" animated={false}/>}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity:0,x:"100%"}} animate={{opacity:1,x:0}} exit={{opacity:0,x:"100%"}}
            transition={{duration:.32,ease:[.4,0,.2,1]}}
            style={{
              position:"fixed",inset:0,zIndex:9998,
              background:"rgba(var(--mob-bg-rgb,2,4,10),.97)",
              backdropFilter:"blur(48px)",
              paddingTop:64,direction:isAr?"rtl":"ltr",
              display:"flex",flexDirection:"column",
            }}>
            <nav style={{flex:1,display:"flex",flexDirection:"column",padding:"24px 28px",overflowY:"auto",direction:isAr?"rtl":"ltr"}}>
              {links.map((l,i)=>(
                <Link key={l.h} href={l.h} style={{
                  padding:"20px 0",borderBottom:"1px solid var(--glass-border)",
                  fontSize:"clamp(22px,6vw,34px)",fontWeight:800,
                  letterSpacing:isAr?0:"-0.03em",
                  fontFamily:isAr?"'Madani Arabic',sans-serif":"var(--font-geist,'Inter',sans-serif)",
                  color:isActive(l.h)?"var(--cyan)":"var(--text-1)",
                  textAlign:isAr?"right":"left",
                  animation:`fade-up .42s ${i*55}ms both`,
                }}>
                  {l.l}
                </Link>
              ))}
              <Link href={isAr?"/ar#contact":"/#contact"} className="btn btn-primary"
                style={{marginTop:28,justifyContent:"center",fontSize:15,padding:16}}>
                {isAr?"طلب تواصل ←":"Request an introduction →"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fade-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:900px){.d-nav,.d-cta{display:none!important}.m-btn{display:flex!important;align-items:center}}
        @media(min-width:901px){.m-btn{display:none!important}}
      `}</style>
    </>
  );
}
