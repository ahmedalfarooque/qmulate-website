"use client";
import { useTheme, DARK_MODE_ENABLED } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ThemeSwitchControl({ isDark, toggle, ariaLabel, standalone }:{
  isDark:boolean; toggle:()=>void; ariaLabel:string; standalone?:boolean;
}) {
  return (
    <button onClick={toggle} aria-label={ariaLabel} title={ariaLabel} className={`theme-switch${standalone ? " theme-switch-standalone" : ""}`}>
      <motion.span
        whileHover={{scale:1.04}} whileTap={{scale:.94}}
        transition={{duration:.2,ease:[0.16,1,0.3,1]}}
        style={{display:"flex"}}>
        <span className={`theme-switch-track${isDark ? " is-dark" : ""}`}>
          <span className="theme-switch-knob"/>
        </span>
      </motion.span>
    </button>
  );
}

export function ThemeSwitcher({ compact=false, menuItem=false, isAr=false }:{
  compact?:boolean; menuItem?:boolean; isAr?:boolean;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>setMounted(true),[]);

  if (!DARK_MODE_ENABLED) return null;

  if (!mounted) {
    if (menuItem) return <div className="theme-menu-item" style={{opacity:0}} aria-hidden />;
    return <div style={{width:50,height:44,borderRadius:9999,background:"rgba(255,255,255,.05)"}} />;
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");
  const ariaLabel = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";

  if (menuItem) {
    const label = isDark ? (isAr ? "الوضع النهاري" : "Light Mode") : (isAr ? "الوضع الليلي" : "Dark Mode");
    return (
      <div className="theme-menu-item">
        <ThemeSwitchControl isDark={isDark} toggle={toggle} ariaLabel={ariaLabel} />
        <span className="theme-menu-item-label">{label}</span>
      </div>
    );
  }

  if (compact) return <ThemeSwitchControl isDark={isDark} toggle={toggle} ariaLabel={ariaLabel} standalone />;

  return (
    <motion.button
      onClick={toggle}
      whileHover={{scale:1.03}} whileTap={{scale:.97}}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        width:72,height:34,borderRadius:100,cursor:"pointer",
        background:isDark?"rgba(255,255,255,.07)":"rgba(13,17,23,.07)",
        border:`1px solid ${isDark?"rgba(255,255,255,.13)":"rgba(13,17,23,.10)"}`,
        position:"relative",padding:3,transition:"all .3s",flexShrink:0,
        boxShadow:isDark?"inset 0 1px 0 rgba(255,255,255,.05)":"inset 0 1px 0 rgba(255,255,255,.7)",
      }}>
      {/* Track icons */}
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 8px",pointerEvents:"none"}}>
        <span style={{fontSize:12,opacity:isDark?.4:1,transition:"opacity .3s"}}>☀️</span>
        <span style={{fontSize:12,opacity:isDark?1:.4,transition:"opacity .3s"}}>🌙</span>
      </div>
      {/* Thumb */}
      <motion.div
        layout
        animate={{x: isDark ? 38 : 0}}
        transition={{type:"spring",stiffness:500,damping:32}}
        style={{
          width:28,height:28,borderRadius:"50%",
          background:isDark
            ?"linear-gradient(135deg,#1E293B,#334155)"
            :"linear-gradient(135deg,#FFFFFF,#F1F5F9)",
          boxShadow:isDark
            ?"0 1px 4px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.06)"
            :"0 1px 4px rgba(13,17,23,.15),0 0 0 1px rgba(13,17,23,.06)",
          position:"relative",zIndex:1,
        }}
      />
    </motion.button>
  );
}
