"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LangSwitcher() {
  const path = usePathname();
  const isAr = path.startsWith("/ar");

  const toggle = () => {
    if (isAr) return path.replace(/^\/ar/, "") || "/";
    return "/ar" + (path === "/" ? "" : path);
  };

  return (
    <Link
      href={toggle()}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontSize: "11px", fontFamily: "DM Mono, monospace",
        letterSpacing: "0.08em", color: "var(--text-muted)",
        border: "1px solid var(--border)", borderRadius: "4px",
        padding: "5px 10px", textDecoration: "none",
        transition: "all 0.2s",
        background: "rgba(0,212,184,0.03)",
      }}
    >
      {isAr ? (
        <><span>EN</span><span style={{ color: "var(--accent)" }}>🌐</span></>
      ) : (
        <><span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>ع</span><span style={{ color: "var(--accent)" }}>🌐</span></>
      )}
    </Link>
  );
}
