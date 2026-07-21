import type { Config } from "tailwindcss";

/**
 * QMULATE — Tailwind v4 config.
 *
 * NOTE: Tailwind v4 is CSS-first — the authoritative luxury design tokens
 * (colors, font-display) live in an `@theme` block at the top of
 * app/globals.css (--color-ink, --color-gold, --color-warm-*, --color-ocean,
 * --font-display, etc.) and are picked up automatically by the v4 engine,
 * exposing utilities like `bg-ink`, `text-gold`, `bg-warm-100`, `font-display`.
 * This file is kept mainly for content globs; the `theme.extend` below
 * mirrors the same palette for editor IntelliSense / tooling that still
 * reads the JS config, and is safe to keep in sync with globals.css.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0B0D",
          2: "#16181C",
          3: "#6B7080",
        },
        warm: {
          50: "#FAFBFC",
          100: "#F7F8FA",
          200: "#F2F4F7",
          300: "#E7EAEF",
        },
        blue: {
          DEFAULT: "#5B7CFA",
          dark: "#3B54C4",
          light: "#A8BBFF",
        },
        gold: {
          DEFAULT: "#5B7CFA",
          dark: "#3B54C4",
          light: "#A8BBFF",
        },
        ocean: {
          DEFAULT: "#0A0B0D",
          dark: "#000000",
          light: "#5B7CFA",
        },
      },
      fontFamily: {
        display: ["var(--font-geist)", "Geist", "Inter", "sans-serif"],
      },
    },
  },
};

export default config;
