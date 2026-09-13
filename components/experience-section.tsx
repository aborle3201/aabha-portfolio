import { Calendar, MapPin } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

type Experience = {
  company: string
  role: string
  location: string
  dates: string
  bullets: string[]
  tech: string[]
}

const experiences: Experience[] = [
  {
    company: "Arrcus Inc.",
    role: "Software Engineer Intern",
    location: "San Jose, United States",
    dates: "June 2026 – August 2026",
    bullets: [
      "Developed a production-grade Go daemon, integrating 5 distributed control-plane services through an event-driven publish/subscribe architecture to prioritize routing updates, reducing routing convergence latency by up to 60%.",
      "Extended the ArcOS routing stack by implementing MPLS label programming, IPv4/IPv6 cross-address-family routing, and resilient next-hop failover in Go and C.",
      "Resolved distributed systems issues across IPC, routing synchronization, label management, and multi-daemon coordination.",
      "Automated build, deployment, and validation workflows by executing 45+ unit, integration, and regression test scenarios across multi-node virtual environments.",
    ],
    tech: ["Go", "C", "Distributed Systems", "Routing", "IPC"],
  },
  {
    company: "Deloitte USI",
    role: "Software Engineer",
    location: "Mumbai, India",
    dates: "October 2023 – July 2025",
    bullets: [
      "Developed scalable Spring Boot microservices and reusable platform capabilities, designing modular software that accelerated feature delivery and increased product adoption by over 40%.",
      "Enhanced Deloitte's React-based LIFT framework by designing and integrating 40+ PrimeReact components, improving framework extensibility, reducing duplicate development, and accelerating feature development across 10+ client projects.",
      "Led root-cause analysis of production incidents using application logs, distributed tracing, and debugging tools, implementing permanent fixes that improved platform reliability and reduced recurring production defects across multiple modules.",
    ],
    tech: ["Java", "Spring Boot", "React", "Microservices"],
  },
  {
    company: "Intract Technologies",
    role: "Software Development Intern",
    location: "Mumbai, India",
    dates: "August 2021 – October 2021",
    bullets: [
      "Built reusable Vue.js components powering 10+ production-ready workflows for student and administrative applications.",
      "Improved application responsiveness through database query optimization, rendering enhancements, and comprehensive automated testing, resulting in a more stable and maintainable application.",
    ],
    tech: ["Vue.js", "JavaScript", "Databases", "Testing"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-border/60 bg-secondary/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 -z-0 h-[26rem] w-[26rem] rounded-full bg-violet/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
        <SectionHeading
          eyebrow="My journey"
          title="Experience"
          subtitle="Building scalable systems and software across networking, enterprise platforms, and web applications."
        />

        <ol className="relative mt-10 flex flex-col gap-10 md:gap-12">
          {/* Timeline rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[11px] top-6 w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:left-[calc(13rem+11px)]"
          />

          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.company} delay={i * 110} className="relative md:grid md:grid-cols-[13rem_1fr] md:gap-8">
              {/* Marker */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-7 flex size-[23px] items-center justify-center rounded-full border border-primary/30 bg-background md:left-[13rem]"
              >
                <span className="size-2 rounded-full bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]" />
              </span>

              {/* Meta column (desktop) */}
              <div className="hidden pr-10 pt-6 text-right md:block">
                <p className="text-sm font-medium text-foreground">{exp.dates}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{exp.location}</p>
              </div>

              {/* Card */}
              <article className="group ml-10 rounded-3xl border border-border/80 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift sm:p-8 md:ml-0">
                <header>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-[1.35rem]">
                    {exp.company}
                  </h3>
                  <p className="mt-1 text-[0.95rem] font-medium text-primary">{exp.role}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground md:hidden">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" strokeWidth={1.75} />
                      {exp.dates}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" strokeWidth={1.75} />
                      {exp.location}
                    </span>
                  </div>
                </header>

                <ul className="mt-5 flex flex-col gap-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-primary/50" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-border/70 pt-5">
                  {exp.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-secondary/70 px-3 py-1 font-mono text-[0.72rem] font-medium text-secondary-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
