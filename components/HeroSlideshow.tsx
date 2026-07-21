"use client";
import { useState, useEffect } from "react";

export interface SlideImage {
  src: string;
  position?: string;
}

/* ── Hero Slideshow — Full-bleed hero sections ─────────────────────────────
   Uses the .hero-img CSS class (position:absolute;inset:0;object-fit:cover).
   Ken Burns zoom runs via hero-kb-slide CSS animation on the <img>.
   Crossfade is a CSS opacity transition on each slide wrapper.
   An incrementing key on <img> forces React to remount it (restarting the
   animation) each time a slide rotates back into view.
   ───────────────────────────────────────────────────────────────────────── */
export function HeroSlideshow({
  slides,
  interval = 9000,
}: {
  slides: SlideImage[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [keys, setKeys] = useState<number[]>(() => slides.map((_, i) => i));

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive(curr => {
        const next = (curr + 1) % slides.length;
        setKeys(ks => {
          const k = [...ks];
          k[next] = k[next] + slides.length;
          return k;
        });
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.6s ease-in-out",
            zIndex: i === active ? 1 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={keys[i]}
            src={slide.src}
            alt=""
            className="hero-img img-cinema"
            loading={i === 0 ? "eager" : "lazy"}
            style={{
              objectPosition: slide.position ?? "center 50%",
              animation: "hero-kb-slide 15s ease-out both",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Split / Section Slideshow — Portrait panels, split layouts ─────────────
   Does NOT use .hero-img class (inset absolute is applied inline).
   Cinema filter applied inline for consistent brand treatment.
   ───────────────────────────────────────────────────────────────────────── */
export function SplitSlideshow({
  slides,
  interval = 7000,
}: {
  slides: SlideImage[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [keys, setKeys] = useState<number[]>(() => slides.map((_, i) => i));

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive(curr => {
        const next = (curr + 1) % slides.length;
        setKeys(ks => {
          const k = [...ks];
          k[next] = k[next] + slides.length;
          return k;
        });
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.4s ease-in-out",
            zIndex: i === active ? 1 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={keys[i]}
            src={slide.src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              objectPosition: slide.position ?? "center 50%",
              animation: "hero-kb-slide 12s ease-out both",
              willChange: "transform",
              filter: "brightness(0.80) saturate(0.78) contrast(1.10)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
