"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeSwitcher({ compact=false }:{ compact?:boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>setMounted(true),[]);
  if (!mounted) return <div style={{width:compact?36:72,height:36,borderRadius:compact?'50%':100,background:"rgba(255,255,255,.05)"}} />;

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (compact) return (
    <motion.button
      onClick={toggle}
      whileHover={{scale:1.08}} whileTap={{scale:.94}}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        width:36,height:36,borderRadius:"50%",cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"center",
        background:isDark?"rgba(255,255,255,.07)":"rgba(13,17,23,.07)",
        border:`1px solid ${isDark?"rgba(255,255,255,.12)":"rgba(13,17,23,.10)"}`,
        fontSize:16,transition:"all .25s",
      }}>
      <AnimatePresence mode="wait">
        <motion.span key={resolvedTheme}
          initial={{opacity:0,rotate:-30,scale:.7}}
          animate={{opacity:1,rotate:0,scale:1}}
          exit={{opacity:0,rotate:30,scale:.7}}
          transition={{duration:.22}}>
          {isDark ? "☀️" : "🌙"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );

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
