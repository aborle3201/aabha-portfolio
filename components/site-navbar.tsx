"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view to underline the matching nav link
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        "border-b backdrop-blur-xl supports-[backdrop-filter]:bg-background/70",
        scrolled
          ? "border-border/70 bg-background/85 shadow-[0_1px_0_0_rgb(23_25_55_/_0.03)]"
          : "border-transparent bg-background/40",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Aabha Borle — back to top"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo to-violet font-mono text-[0.7rem] font-medium tracking-tight text-white shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5">
            AB
          </span>
          <span className="text-[0.95rem] font-semibold tracking-[-0.01em] text-foreground">
            Aabha Borle
          </span>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                      "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out",
                      "hover:after:scale-x-100",
                      isActive && "after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border/80 bg-card/70 text-foreground transition-colors hover:bg-muted"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="relative size-5">
              <Menu
                className={cn(
                  "absolute inset-0 size-5 transition-all duration-300",
                  open
                    ? "rotate-90 scale-50 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 size-5 transition-all duration-300",
                  open
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-50 opacity-0",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 border-t border-border/70 px-4 py-4">
            {links.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  "transition-all duration-300",
                  open
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-1 opacity-0",
                )}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
