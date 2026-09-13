import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

function Em({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-foreground underline decoration-primary/35 decoration-[1.5px] underline-offset-[5px]">
      {children}
    </span>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
        <SectionHeading eyebrow="Get to know me" title="About Me" />

        <div className="mt-10 grid items-start gap-12 md:grid-cols-[300px_1fr] md:gap-16 lg:grid-cols-[340px_1fr] lg:gap-24">
          <Reveal className="mx-auto w-full max-w-[300px] md:mx-0 lg:max-w-none" delay={80}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-[2rem] bg-gradient-to-br from-accent to-secondary"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border/80 bg-gradient-to-br from-accent via-card to-secondary shadow-soft">
                <Image
                  src="/aabha.jpeg"
                  alt="Portrait of Aabha Borle"
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 768px) 300px, 300px"
                  className="object-cover object-top"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 -z-10 h-24 w-24 rounded-full border border-dashed border-primary/25"
              />
            </div>
          </Reveal>

          <div className="flex max-w-[40rem] flex-col gap-6 text-pretty text-[1.05rem] leading-[1.8] text-muted-foreground">
            <Reveal as="p" delay={120}>
              I am currently pursuing a Master of Science in Information Management at the University of
              Illinois Urbana-Champaign, with an expected graduation in May 2027. I completed my Bachelor
              of Technology in Information Technology from the University of Mumbai.
            </Reveal>
            <Reveal as="p" delay={200}>
              My professional experience includes working as a Software Engineer Intern at Arrcus Inc.,
              where I worked on distributed routing systems using Go and C, and as a Software Engineer at
              Deloitte USI, where I developed Spring Boot microservices and worked on React-based platform
              capabilities. I also previously worked as a Software Development Intern at Intract
              Technologies.
            </Reveal>
            <Reveal as="p" delay={280}>
              My interests include software engineering, <Em>distributed systems</Em>,{" "}
              <Em>backend development</Em>, <Em>cloud infrastructure</Em>, and{" "}
              <Em>artificial intelligence</Em>.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
