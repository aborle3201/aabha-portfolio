import { Code2, Layers, Database, Cloud, Wrench, Brain, type LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

type SkillGroup = {
  category: string
  icon: LucideIcon
  skills: string[]
}

const groups: SkillGroup[] = [
  {
    category: "Languages",
    icon: Code2,
    skills: ["Java", "Python", "Go", "C/C++", "JavaScript"],
  },
  {
    category: "Frameworks & Technologies",
    icon: Layers,
    skills: ["Spring Boot", "React.js", "Vue.js", "Django", "Flask", "Express.js", "Node.js", "gRPC", "REST APIs"],
  },
  {
    category: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "FAISS"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "Linux"],
  },
  {
    category: "Developer Tools & Testing",
    icon: Wrench,
    skills: ["Git", "GitHub", "Jenkins", "JUnit", "Selenium", "Jira", "OpenTelemetry", "Prometheus", "Grafana"],
  },
  {
    category: "Machine Learning / AI",
    icon: Brain,
    skills: ["TensorFlow", "PyTorch", "OpenCV", "MediaPipe", "Scikit-learn", "Pandas", "NumPy"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-border/60 bg-secondary/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-0 h-[24rem] w-[24rem] rounded-full bg-sky/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Technical toolkit"
          title="Skills & Technologies"
          subtitle="Technologies I've worked with across software engineering, cloud infrastructure, and AI."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {groups.map((group, i) => {
            const Icon = group.icon
            return (
              <Reveal key={group.category} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-border/80 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift sm:p-7">
                  <div className="flex items-center gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-accent/70 text-primary">
                      <Icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em] text-foreground">{group.category}</h3>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-[0.8rem] font-medium text-foreground/80 transition-colors duration-200 hover:border-primary/35 hover:bg-accent hover:text-primary"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
