import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { OrionVisual, RagVisual, AslVisual } from "@/components/project-visuals"

type Project = {
  category: string
  title: string
  description: ReactNode
  detail: ReactNode
  tech: string[]
  visual: ReactNode
}

/** Emphasises a metric inside a paragraph without changing its meaning */
function N({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-foreground">{children}</span>
}

const projects: Project[] = [
  {
    category: "Distributed Systems",
    title: "Orion – Distributed Workflow Orchestration Platform",
    description: (
      <>
        Architected a distributed workflow orchestration platform capable of coordinating{" "}
        <N>10,000+</N> durable workflow executions and <N>1,000</N> concurrent task executions through
        deterministic scheduling, persistent workflow state, and fault-tolerant recovery.
      </>
    ),
    detail: (
      <>
        Implemented an append-only execution history layer persisting <N>100K+</N> state transition
        events and integrated OpenTelemetry, Prometheus, and Grafana for workflow observability.
      </>
    ),
    tech: ["Go", "gRPC", "PostgreSQL", "Redis", "Docker", "OpenTelemetry"],
    visual: <OrionVisual />,
  },
  {
    category: "Generative AI",
    title: "Generative AI Research & Document Q&A Assistant",
    description: (
      <>
        Built a RAG pipeline using LangChain and FAISS to enable low-latency semantic search across{" "}
        <N>10,000+</N> documents.
      </>
    ),
    detail: (
      <>
        Implemented a document ingestion pipeline using PyPDF2 and Arxiv API for parsing, chunking, and
        embeddings, and integrated GPT-4 to generate concise summaries with properly formatted
        citations, improving retrieval accuracy by <N>25%</N>.
      </>
    ),
    tech: ["LangChain", "GPT-4", "FAISS", "Streamlit"],
    visual: <RagVisual />,
  },
  {
    category: "Accessibility & Machine Learning",
    title: "Social Interaction App for Differently Abled",
    description: (
      <>
        Built an end-to-end ASL communication platform using OpenCV, MediaPipe, TensorFlow LSTM, Django,
        and Flask APIs, achieving <N>92%+</N> gesture recognition accuracy and enabling real-time
        multimodal translation.
      </>
    ),
    detail: (
      <>
        Led a <N>3-member</N> team to implement NLTK-based NLP preprocessing and improve gesture-to-text
        mapping accuracy by <N>15%</N>.
      </>
    ),
    tech: ["Django", "Python", "OpenCV", "TensorFlow", "Flask API"],
    visual: <AslVisual />,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-20 border-t border-border/60">
      <div aria-hidden="true" className="bg-grid mask-fade pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="My Projects"
          subtitle="A selection of projects I've worked on across distributed systems, AI, and accessibility."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((project, i) => (
            <Reveal as="article" key={project.title} delay={i * 110} className="group flex h-full">
              <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift">
                {/* Visual */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/70 bg-gradient-to-br from-accent/70 via-card to-secondary">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--indigo)_10%,transparent),transparent_60%)]"
                  />
                  <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    {project.visual}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-balance text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-[0.925rem] leading-relaxed text-muted-foreground">{project.description}</p>
                  <p className="mt-3 text-[0.925rem] leading-relaxed text-muted-foreground">{project.detail}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border bg-secondary/70 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-secondary-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    {/* Placeholder — no project URL provided yet */}
                    <span
                      role="button"
                      aria-disabled="true"
                      className="inline-flex h-11 w-full cursor-default items-center justify-center gap-2 rounded-full border border-foreground/15 bg-transparent text-sm font-medium text-foreground transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/[0.04] group-hover:text-primary"
                    >
                      View Project
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
