"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Temporary global switch — dark theme is fully implemented below but
// disabled site-wide for now. Flip back to `true` to restore normal
// light/dark switching everywhere (ThemeSwitcher, Navbar) with no other
// code changes needed.
export const DARK_MODE_ENABLED = false;

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always starts "light" — no localStorage/sessionStorage/cookie/system-
  // preference read of any kind. Matches the server-rendered
  // data-theme="light" in app/layout.tsx exactly, so there is no
  // hydration mismatch and no flash of the wrong theme. A visitor's
  // choice is intentionally never remembered across reload/tab/device.
  const [theme, setThemeState] = useState<Theme>("light");
  const resolvedTheme: Theme = DARK_MODE_ENABLED ? theme : "light";
  const setTheme = DARK_MODE_ENABLED ? setThemeState : () => {};

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.classList.toggle("light", resolvedTheme === "light");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
