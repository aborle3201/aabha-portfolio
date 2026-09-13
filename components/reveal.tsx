"use client"

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms */
  delay?: number
  as?: ElementType
  id?: string
}

/**
 * Fades content upward once it scrolls into view. Renders visible immediately
 * when the user prefers reduced motion (handled in globals.css).
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible")
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
