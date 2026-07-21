"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryItem {
  src: string;
  caption: string;
  category: string;
}

const BGI = (file: string) => `/Background%20Images/${file}`;

/* ── Gallery — masonry showcase with category filter + lightbox ────────
   The visual centerpiece: CSS-column masonry (genuine variable-height
   tiles, not a forced bento grid), floating glass caption on hover,
   category filter pills, and a full-screen lightbox with prev/next.
   ──────────────────────────────────────────────────────────────────── */
export function Gallery({ items, rtl = false, allLabel = "All" }: { items: GalleryItem[]; rtl?: boolean; allLabel?: string }) {
  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(items.map((i) => i.category)))],
    [items, allLabel]
  );
  const [active, setActive] = useState(allLabel);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === allLabel ? items : items.filter((i) => i.category === active);

  const openAt = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const step = (dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + filtered.length) % filtered.length);
  };

  return (
    <div className="qm-gal-root" dir={rtl ? "rtl" : undefined}>
      {/* Filter pills */}
      <div className="qm-gal-filters" style={rtl ? { justifyContent: "flex-end" } : undefined}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="qm-gal-pill"
            data-active={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <div className="qm-gal-masonry">
        {filtered.map((item, i) => (
          <motion.div
            key={item.src}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="qm-gal-tile"
            onClick={() => openAt(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BGI(item.src)} alt={item.caption} className="qm-gal-img" loading="lazy" />
            <div className="qm-gal-caption">
              <span className="qm-gal-cat">{item.category}</span>
              <span className="qm-gal-cap-text">{item.caption}</span>
            </div>
            <div className="qm-gal-zoom-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            className="qm-gal-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <motion.div
              key={filtered[lightbox].src}
              className="qm-gal-lightbox-inner"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BGI(filtered[lightbox].src)} alt={filtered[lightbox].caption} />
              <div className="qm-gal-lightbox-cap">
                <span className="qm-gal-cat">{filtered[lightbox].category}</span>
                <span className="qm-gal-cap-text">{filtered[lightbox].caption}</span>
              </div>
              <button className="qm-gal-close" onClick={close} aria-label="Close">✕</button>
              <button className="qm-gal-nav prev" onClick={() => step(-1)} aria-label="Previous">‹</button>
              <button className="qm-gal-nav next" onClick={() => step(1)} aria-label="Next">›</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .qm-gal-filters{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:clamp(28px,3.5vw,44px); }
        .qm-gal-pill{
          padding:8px 20px; border-radius:100px; font-size:11.5px; font-weight:600;
          letter-spacing:.06em; text-transform:uppercase; cursor:pointer;
          font-family:var(--font-geist,'Inter',sans-serif);
          background:var(--g2,rgba(255,255,255,.62)); color:var(--text-3,#6B7080);
          border:1px solid var(--glass-border,rgba(20,23,31,.07));
          transition:all .3s cubic-bezier(.25,.46,.45,.94);
        }
        .qm-gal-pill[data-active="true"]{
          background:var(--gold,#5B7CFA); color:#fff; border-color:var(--gold,#5B7CFA);
          box-shadow:0 4px 18px rgba(91,124,250,0.35);
        }
        .qm-gal-pill:hover{ transform:translateY(-1px); }

        .qm-gal-masonry{
          column-count:3; column-gap:clamp(12px,1.6vw,20px);
        }
        @media(max-width:900px){ .qm-gal-masonry{ column-count:2; } }
        @media(max-width:560px){ .qm-gal-masonry{ column-count:1; } }

        .qm-gal-tile{
          position:relative; break-inside:avoid; margin-bottom:clamp(12px,1.6vw,20px);
          border-radius:clamp(12px,1.6vw,18px); overflow:hidden; cursor:zoom-in;
          box-shadow:0 2px 0 rgba(20,23,31,0.06),0 16px 40px rgba(20,23,31,0.12),0 0 0 1px rgba(20,23,31,0.05);
          transition:box-shadow .4s ease;
        }
        .qm-gal-tile:hover{ box-shadow:0 2px 0 rgba(20,23,31,0.08),0 24px 56px rgba(20,23,31,0.20),0 0 0 1px rgba(91,124,250,0.28); }
        .qm-gal-img{
          display:block; width:100%; height:auto;
          filter:brightness(0.94) saturate(0.96) contrast(1.04);
          transition:transform 1s cubic-bezier(.16,1,.3,1), filter .5s ease;
        }
        .qm-gal-tile:hover .qm-gal-img{ transform:scale(1.06); filter:brightness(0.98) saturate(1) contrast(1.02); }

        .qm-gal-caption{
          position:absolute; left:0; right:0; bottom:0; padding:16px 18px 14px;
          display:flex; flex-direction:column; gap:4px;
          background:linear-gradient(180deg,transparent 0%,rgba(6,10,18,0.80) 100%);
          opacity:0; transform:translateY(6px);
          transition:opacity .4s ease, transform .4s ease;
        }
        .qm-gal-tile:hover .qm-gal-caption{ opacity:1; transform:translateY(0); }
        .qm-gal-cat{
          font-size:9.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
          color:rgba(168,187,255,0.92); font-family:var(--font-geist-mono,'Courier New'),monospace;
        }
        .qm-gal-cap-text{ font-size:13px; font-weight:600; color:#fff; }

        .qm-gal-zoom-hint{
          position:absolute; top:12px; right:12px; width:30px; height:30px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:rgba(6,10,18,0.42); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
          opacity:0; transition:opacity .35s ease;
        }
        .qm-gal-tile:hover .qm-gal-zoom-hint{ opacity:1; }

        .qm-gal-lightbox{
          position:fixed; inset:0; z-index:9999;
          background:rgba(4,6,12,0.92); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
          display:flex; align-items:center; justify-content:center; padding:clamp(20px,5vw,64px);
        }
        .qm-gal-lightbox-inner{
          position:relative; max-width:1100px; max-height:88vh; width:100%;
          display:flex; align-items:center; justify-content:center;
        }
        .qm-gal-lightbox-inner img{
          max-width:100%; max-height:80vh; width:auto; height:auto; display:block;
          border-radius:12px; box-shadow:0 40px 100px rgba(0,0,0,0.6);
        }
        .qm-gal-lightbox-cap{
          position:absolute; left:0; right:0; bottom:-40px;
          display:flex; align-items:center; gap:12px; justify-content:center;
        }
        .qm-gal-lightbox-cap .qm-gal-cap-text{ color:rgba(255,255,255,0.75); }
        .qm-gal-close, .qm-gal-nav{
          position:absolute; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18);
          color:#fff; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;
          transition:background .25s ease, transform .25s ease;
        }
        .qm-gal-close{ top:-48px; right:0; width:36px; height:36px; font-size:14px; }
        .qm-gal-nav{ top:50%; transform:translateY(-50%); width:44px; height:44px; font-size:24px; }
        .qm-gal-nav.prev{ left:clamp(-8px,-4vw,10px); }
        .qm-gal-nav.next{ right:clamp(-8px,-4vw,10px); }
        .qm-gal-close:hover, .qm-gal-nav:hover{ background:rgba(255,255,255,0.16); }
        @media(max-width:700px){
          .qm-gal-nav{ width:36px; height:36px; font-size:20px; }
          .qm-gal-nav.prev{ left:4px; } .qm-gal-nav.next{ right:4px; }
        }
      `}</style>
    </div>
  );
}
