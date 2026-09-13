"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark"

export function ThemeToggle({ className }: { className?: string }) {
  // null until mounted so server and client markup match
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
  }, [])

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem("theme", next)
    } catch {}
    setTheme(next)
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to night mode"}
      title={isDark ? "Light mode" : "Night mode"}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg border border-border/80 bg-card/70 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary",
        className,
      )}
    >
      <span className="relative size-[18px]">
        <Sun
          className={cn(
            "absolute inset-0 size-[18px] transition-all duration-300",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
          )}
          strokeWidth={1.75}
        />
        <Moon
          className={cn(
            "absolute inset-0 size-[18px] transition-all duration-300",
            isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
          strokeWidth={1.75}
        />
      </span>
    </button>
  )
}
