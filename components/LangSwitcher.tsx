"use client";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export function LangSwitcher() {
  const path = usePathname();
  const router = useRouter();
  const isAr = path.startsWith("/ar");
  const target = isAr ? (path.replace(/^\/ar/, "") || "/") : ("/ar" + (path === "/" ? "" : path));

  useEffect(() => { router.prefetch(target); }, [target, router]);

  return (
    <button
      onClick={() => startTransition(() => router.push(target))}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontSize: "11px", fontFamily: "DM Mono, monospace",
        letterSpacing: "0.08em", color: "var(--text-muted)",
        border: "1px solid var(--border)", borderRadius: "4px",
        padding: "5px 10px",
        transition: "all 0.2s",
        background: "rgba(0,212,184,0.03)",
        cursor: "pointer",
      }}
    >
      {isAr ? (
        <><span>EN</span><span style={{ color: "var(--accent)" }}></span></>
      ) : (
        <><span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>ع</span><span style={{ color: "var(--accent)" }}></span></>
      )}
    </button>
  );
}
