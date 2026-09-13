"use client"

import { useState } from "react"
import { Mail, Send, Check } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { LinkedinIcon } from "@/components/linkedin-icon"

const LINKEDIN_URL = "https://www.linkedin.com/in/aabha-borle-3a99221b2/"
const EMAIL = "aborle2@illinois.edu"

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.95rem] text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-violet/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet/20"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Frontend only — no backend wired up yet.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid-ink mask-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-5%] h-[26rem] w-[26rem] rounded-full bg-violet/20 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
        <SectionHeading eyebrow="Let's connect" title="Feedback" subtitle="I'd love to hear from you." tone="dark" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left: message + contact details */}
          <Reveal delay={80} className="flex flex-col">
            <p className="max-w-md text-pretty text-lg leading-relaxed text-ink-muted">
              I&apos;d love to hear from you. Feel free to leave a message or connect with me directly.
            </p>

            <ul className="mt-10 flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-white/[0.06]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet text-white shadow-lg shadow-indigo/30">
                    <Mail className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">Email</span>
                    <span className="mt-0.5 block truncate text-[0.95rem] font-medium text-white">{EMAIL}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-white/[0.06]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet text-white shadow-lg shadow-indigo/30">
                    <LinkedinIcon className="size-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">LinkedIn</span>
                    <span className="mt-0.5 block truncate text-[0.95rem] font-medium text-white">aabha-borle</span>
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>

          {/* Right: form card */}
          <Reveal delay={160}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-ink-soft/80 p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] backdrop-blur sm:p-8"
              noValidate={false}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">
                    Name
                  </label>
                  <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" className={fieldClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">
                    Email
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={fieldClass} />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Write your message…"
                  className={`${fieldClass} min-h-40 resize-y`}
                />
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo to-violet text-sm font-medium text-white shadow-lg shadow-indigo/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet/40"
              >
                {submitted ? (
                  <>
                    <Check className="size-4" />
                    Message Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              {submitted && (
                <p className="mt-4 text-center text-sm text-ink-muted" role="status">
                  Thanks for reaching out! This form isn&apos;t connected yet, so nothing was stored.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
