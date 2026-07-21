"use client";
import { motion } from "framer-motion";
import { FU } from "@/components/DS";

export interface ShowcaseItem {
  num: string;
  category: string;
  title: string;
  body: string;
  image: string;
}

const BGI = (file: string) => `/Background%20Images/${file}`;

/* ── Featured Developments / Investment Collections ────────────────────
   Presents the platform's real service lines as curated, property-style
   showcase cards: full-bleed photograph, category pill, ghost accent
   number, title + descriptor over a permanent dark scrim (independent of
   the light/dark site theme — a photo caption plate always needs a dark
   scrim under white text, the same convention used by .hero-overlay).
   ──────────────────────────────────────────────────────────────────── */
export function PropertyShowcase({ items, rtl = false }: { items: ShowcaseItem[]; rtl?: boolean }) {
  return (
    <div className="grid-3 qm-prop-grid" dir={rtl ? "rtl" : undefined}>
      {items.map((item, i) => (
        <motion.div key={item.num} {...FU(i * 0.08)}>
          <div className="qm-prop-card">
            <div className="qm-prop-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BGI(item.image)} alt={item.title} className="qm-prop-img" loading="lazy" />
              <div className="qm-prop-scrim" />
              <div className={rtl ? "qm-prop-ghost qm-prop-ghost-rtl" : "qm-prop-ghost"}>{item.num}</div>
              <span className={rtl ? "qm-prop-pill qm-prop-pill-rtl" : "qm-prop-pill"}>{item.category}</span>
              <div className="qm-prop-copy" style={rtl ? { textAlign: "right", direction: "rtl" } : undefined}>
                <h3 className="qm-prop-title">{item.title}</h3>
                <p className="qm-prop-body">{item.body}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <style>{`
        .qm-prop-card{ height:100%; }
        .qm-prop-img-wrap{
          position:relative; overflow:hidden; border-radius:clamp(14px,1.8vw,22px);
          aspect-ratio:3/4; background:#0A0E14;
          border:1px solid rgba(255,255,255,0.55);
          box-shadow:0 1px 0 rgba(255,255,255,0.5) inset,0 30px 70px -18px rgba(20,40,70,0.20),0 0 0 1px rgba(20,40,70,0.06);
          transition:transform .5s cubic-bezier(.25,.46,.45,.94), box-shadow .5s ease;
        }
        .qm-prop-img-wrap:hover{ transform:translateY(-6px); box-shadow:0 1px 0 rgba(255,255,255,0.55) inset,0 40px 100px -24px rgba(20,40,70,0.28),0 0 0 1px rgba(176,141,87,0.30); }
        .qm-prop-img-wrap::before{
          content:""; position:absolute; inset:0; z-index:1; pointer-events:none;
          background:linear-gradient(120deg,transparent 40%,rgba(255,255,255,0.16) 50%,transparent 62%);
        }
        .qm-prop-img{
          position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; z-index:0;
          filter:brightness(0.86) saturate(0.92) contrast(1.06);
          transition:transform 1.2s cubic-bezier(.16,1,.3,1), filter .6s ease;
        }
        .qm-prop-img-wrap:hover .qm-prop-img{ transform:scale(1.07); filter:brightness(0.90) saturate(0.96) contrast(1.04); }
        .qm-prop-scrim{
          position:absolute; inset:0; z-index:2;
          background:linear-gradient(180deg,rgba(6,10,18,0.05) 0%,rgba(6,10,18,0.12) 42%,rgba(6,10,18,0.86) 100%);
          pointer-events:none;
        }
        .qm-prop-ghost{
          position:absolute; top:clamp(10px,1.6vw,18px); right:clamp(14px,2vw,22px); z-index:3;
          font-size:clamp(42px,5.5vw,64px); font-weight:900; line-height:1; letter-spacing:-.04em;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.30); pointer-events:none; user-select:none;
        }
        .qm-prop-ghost-rtl{ right:auto; left:clamp(14px,2vw,22px); }
        .qm-prop-pill-rtl{ left:auto; right:clamp(14px,2vw,22px); }
        .qm-prop-pill{
          position:absolute; top:clamp(14px,2vw,22px); left:clamp(14px,2vw,22px); z-index:3;
          display:inline-flex; align-items:center; padding:6px 14px; border-radius:100px;
          font-size:10.5px; font-weight:700; letter-spacing:.09em; text-transform:uppercase;
          font-family:var(--font-geist-mono,'Courier New'),monospace;
          background:rgba(255,255,255,0.14); border:1px solid rgba(255,255,255,0.30);
          backdrop-filter:blur(16px) saturate(160%); -webkit-backdrop-filter:blur(16px) saturate(160%);
          color:#fff;
        }
        .qm-prop-copy{ position:absolute; left:0; right:0; bottom:0; padding:clamp(18px,2.4vw,28px); z-index:3; }
        .qm-prop-title{ font-size:clamp(17px,1.9vw,21px); font-weight:700; color:#fff; margin-bottom:8px; line-height:1.28; }
        .qm-prop-body{ font-size:12.5px; line-height:1.72; color:rgba(255,255,255,0.78); }
        @media(max-width:767px){
          .qm-prop-pill{ backdrop-filter:none; -webkit-backdrop-filter:none; background:rgba(20,23,31,0.55); }
        }
      `}</style>
    </div>
  );
}
