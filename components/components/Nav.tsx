"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/",          label: "Home"      },
  { href: "/about",     label: "About"     },
  { href: "/services",  label: "Services"  },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects",  label: "Projects"  },
  { href: "/contact",   label: "Contact"   },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "64px",
        background: scrolled ? "rgba(9,9,11,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.8)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s cubic-bezier(0.25,0,0,1)",
      }}>
        <div className="container-wide" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: "28px", height: "28px",
              background: "linear-gradient(135deg,#6366F1,#818CF8)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <rect x="4" y="0" width="10" height="2" rx="1" fill="white" opacity="0.5"/>
                <rect x="2" y="3" width="12" height="2" rx="1" fill="white" opacity="0.7"/>
                <rect x="0" y="6" width="14" height="2" rx="1" fill="white" opacity="0.9"/>
                <rect x="0" y="9" width="14" height="2" rx="1" fill="#818CF8"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.02em", color: "#FAFAFA" }}>QMULATE</span>
          </Link>

          {/* Center nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden md:flex">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: "7px 14px", borderRadius: "980px",
                fontSize: "14px", fontWeight: 500, textDecoration: "none",
                color: path === l.href ? "#FAFAFA" : "#71717A",
                background: path === l.href ? "rgba(255,255,255,0.08)" : "transparent",
                transition: "all 0.2s",
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/ar" style={{ fontSize: "13px", color: "#52525B", textDecoration: "none", padding: "6px 10px" }} className="hidden md:block">ع</Link>
            <Link href="/contact" className="btn-primary hidden md:inline-flex" style={{ padding: "9px 20px", fontSize: "14px", borderRadius: "980px" }}>
              Get in touch
            </Link>
            <button onClick={() => setOpen(o => !o)} className="md:hidden" style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "#FAFAFA" }}>
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(9,9,11,0.98)", paddingTop: "64px", backdropFilter: "blur(24px)" }}>
          <nav style={{ display: "flex", flexDirection: "column", padding: "24px" }}>
            {LINKS.map((l, i) => (
              <Link key={l.href} href={l.href} style={{
                padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontSize: "24px", fontWeight: 600, textDecoration: "none",
                color: path === l.href ? "#6366F1" : "#FAFAFA",
                opacity: 0, animation: `fadeUp 0.4s ${i * 50}ms both`,
                letterSpacing: "-0.02em",
              }}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary" style={{ marginTop: "32px", justifyContent: "center" }}>Get in touch</Link>
          </nav>
        </div>
      )}
    </>
  );
}
