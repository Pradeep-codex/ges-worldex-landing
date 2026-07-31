"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "ges-theme";

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return "light";
}

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const nextTheme = useMemo<ThemeMode>(() => (theme === "dark" ? "light" : "dark"), [theme]);

  const onToggle = () => {
    const newTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, newTheme);
    }
  };

  // Avoid hydration mismatch: render neutral until mounted.
  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className={
        "theme-toggle cursor-pointer relative grid place-items-center w-10 h-10 rounded-2xl border border-[color:var(--border)] bg-background/55 backdrop-blur-xl shadow-[var(--toggle-shadow)] " +
        className
      }
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl theme-toggle-ring" />

      <span className="relative w-5 h-5">
        {isDark ? (
          <span className="absolute inset-0 grid place-items-center">
            <Moon className="w-5 h-5" />
          </span>
        ) : (
          <span className="absolute inset-0 grid place-items-center">
            <Sun className="w-5 h-5" />
          </span>
        )}
      </span>
    </button>
  );
}
