"use client";
/**
 * AboutGlassArt — abstract, photo-free centerpiece for the About page.
 *
 * Three floating crystal-glass panels at different depths, a soft
 * ambient glow, and two thin architectural line-rings. Pure CSS +
 * SVG + Framer Motion transforms (y / rotate only — GPU accelerated,
 * no layout-affecting properties), no imagery of any kind.
 */
import { motion } from "framer-motion";

export function AboutGlassArt() {
  return (
    <div className="about-art" aria-hidden="true">
      <div className="about-art-glow about-art-glow-a" />
      <div className="about-art-glow about-art-glow-b" />
      <div className="about-art-glow about-art-glow-c" />

      <svg className="about-art-ring about-art-ring-a" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="98" stroke="rgba(18,58,87,0.16)" strokeWidth="1" />
      </svg>
      <svg className="about-art-ring about-art-ring-b" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="98" stroke="rgba(176,141,87,0.20)" strokeWidth="1" />
      </svg>

      <motion.div
        className="about-art-cube about-art-cube-1"
        animate={{ y: [0, -14, 0], rotate: [-4, -1.5, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        <span className="about-art-mark" />
      </motion.div>

      <motion.div
        className="about-art-cube about-art-cube-2"
        animate={{ y: [0, 12, 0], rotate: [4, 7, 4] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        style={{ willChange: "transform" }}
      />

      <motion.div
        className="about-art-cube about-art-cube-3"
        animate={{ y: [0, -9, 0], rotate: [7, 4, 7] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
