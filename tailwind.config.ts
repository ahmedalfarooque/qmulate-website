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
          DEFAULT: "#14171F",
          2: "#3A3F4B",
          3: "#6B7080",
        },
        warm: {
          50: "#FDFCF9",
          100: "#FAF8F4",
          200: "#F3EFE7",
          300: "#EBE4D8",
        },
        gold: {
          DEFAULT: "#B08D57",
          dark: "#8C6D3F",
          light: "#D9C08F",
        },
        ocean: {
          DEFAULT: "#123A57",
          dark: "#0C2A40",
          light: "#2B6E8F",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Playfair Display", "serif"],
      },
    },
  },
};

export default config;
