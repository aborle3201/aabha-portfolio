import Image from "next/image"
import { ArrowRight, MapPin } from "lucide-react"
import type { CSSProperties } from "react"

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Background: faint grid + two soft orbs */}
      <div aria-hidden="true" className="bg-grid mask-fade pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-indigo/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-[-12%] -z-10 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-[110px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-14 pt-10 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pb-20 md:pt-16 lg:px-8">
        {/* Copy */}
        <div className="flex flex-col">
          <span className="animate-rise font-mono text-[0.8rem] font-medium tracking-wide text-primary" style={delay(0)}>
            Hello, I&apos;m
          </span>

          <h1
            className="animate-rise mt-4 text-balance text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4.75rem]"
            style={delay(80)}
          >
            Aabha <span className="text-gradient">Borle</span>
          </h1>

          <p className="animate-rise mt-5 text-lg font-medium text-foreground/85 sm:text-xl" style={delay(160)}>
            Software Engineer &amp; MS Information Management Student
          </p>

          <p
            className="animate-rise mt-5 max-w-[34rem] text-pretty text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]"
            style={delay(240)}
          >
            I&apos;m a software engineer with experience building distributed systems, scalable backend
            services, and full-stack applications. I&apos;m currently pursuing my Master&apos;s in
            Information Management at the University of Illinois Urbana-Champaign.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(320)}>
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_18px_36px_-14px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
            >
              View My Work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border border-foreground/15 bg-card/60 px-6 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:text-primary"
            >
              Contact Me
            </a>
          </div>

          <p className="animate-rise mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground" style={delay(400)}>
            <MapPin className="size-4 text-primary/80" strokeWidth={1.75} />
            Champaign, Illinois
          </p>
        </div>

        {/* Portrait */}
        <div className="animate-drift-in flex justify-center md:justify-end" style={delay(200)}>
          <div className="relative">
            {/* Decorative frame elements */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.75rem] bg-gradient-to-br from-indigo/25 via-violet/15 to-sky/25 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-5 -z-10 h-28 w-28 rounded-[1.5rem] border border-primary/15 bg-card/40"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full border border-dashed border-primary/25"
            />

            <div className="rounded-[2rem] border border-card bg-gradient-to-br from-card via-accent to-secondary p-2 shadow-lift">
              <div className="relative aspect-[4/5] w-[17rem] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-accent via-card to-secondary sm:w-[19rem] lg:w-[21rem]">
                <Image
                  src="/aabha.jpeg"
                  alt="Portrait of Aabha Borle"
                  fill
                  sizes="(min-width: 1024px) 336px, (min-width: 640px) 304px, 272px"
                  priority
                  className="object-cover object-top"
                />
                {/* Fallback initials sit beneath the photo; visible if the image is swapped out */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 flex items-center justify-center font-mono text-6xl font-medium text-primary/30"
                >
                  AB
                </span>
              </div>
            </div>

            {/* Floating card */}
            <div className="animate-float absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-2xl border border-border/80 bg-card/90 px-4 py-3 shadow-lift backdrop-blur md:-left-10 md:translate-x-0">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <p className="font-mono text-[0.72rem] font-medium tracking-wide text-foreground">
                  Distributed Systems <span className="text-muted-foreground">•</span> AI{" "}
                  <span className="text-muted-foreground">•</span> Backend
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
