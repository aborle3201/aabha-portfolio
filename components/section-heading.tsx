import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  tone?: "light" | "dark"
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark"
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className={cn("eyebrow", dark && "text-violet before:bg-violet/60")}>{eyebrow}</span>
      <h2
        className={cn(
          "mt-4 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            dark ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
