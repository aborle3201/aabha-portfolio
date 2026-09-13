"use client"

import { useCallback, useEffect, useState } from "react"
import { Mail, Send, Check, Star, Loader2, MessageSquare, AlertCircle } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { LinkedinIcon } from "@/components/linkedin-icon"
import { getSupabase, type FeedbackRow } from "@/lib/supabase"
import { cn } from "@/lib/utils"

const LINKEDIN_URL = "https://www.linkedin.com/in/aabha-borle-3a99221b2/"
const EMAIL = "aborle2@illinois.edu"

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.95rem] text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-violet/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet/20 disabled:opacity-60"

type Status = { type: "idle" } | { type: "success"; text: string } | { type: "error"; text: string }

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })
}

/** Read-only star row used on feedback cards */
function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn("size-3.5", n <= value ? "fill-violet text-violet" : "text-white/20")}
          strokeWidth={1.75}
        />
      ))}
    </span>
  )
}

/** Interactive 1–5 star selector for the form */
function RatingInput({ value, onChange, disabled }: { value: number; onChange: (n: number) => void; disabled?: boolean }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <div className="flex items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Rating from 1 to 5"
        className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1.5"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            disabled={disabled}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(n)}
            className="rounded-md p-1 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 disabled:opacity-60"
          >
            <Star
              className={cn(
                "size-6 transition-colors duration-150",
                n <= shown ? "fill-violet text-violet" : "text-white/25",
              )}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <span className="font-mono text-xs text-ink-muted" aria-live="polite">
        {value ? `${value} / 5` : "Select"}
      </span>
    </div>
  )
}

export function ContactSection() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ type: "idle" })

  const [feedback, setFeedback] = useState<FeedbackRow[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const supabase = getSupabase()

  // Newest first; de-dupe by id so realtime + optimistic inserts never double up
  const upsertRow = useCallback((row: FeedbackRow) => {
    setFeedback((prev) => {
      if (prev.some((r) => r.id === row.id)) return prev
      return [row, ...prev].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    })
  }, [])

  // Initial fetch + realtime subscription
  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      setLoadError("Feedback is unavailable right now.")
      return
    }

    let cancelled = false

    supabase
      .from("feedback")
      .select("id, name, message, rating, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setLoadError("Couldn't load feedback. Please try again later.")
        } else {
          setFeedback((data ?? []) as FeedbackRow[])
        }
        setLoading(false)
      })

    const channel = supabase
      .channel("feedback-inserts")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "feedback" }, (payload) => {
        upsertRow(payload.new as FeedbackRow)
      })
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [supabase, upsertRow])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabase) {
      setStatus({ type: "error", text: "Feedback isn't available right now. Please email me instead." })
      return
    }
    if (rating < 1 || rating > 5) {
      setStatus({ type: "error", text: "Please choose a rating from 1 to 5." })
      return
    }

    setSubmitting(true)
    setStatus({ type: "idle" })

    const { data, error } = await supabase
      .from("feedback")
      .insert({ name: name.trim(), message: message.trim(), rating })
      .select("id, name, message, rating, created_at")
      .single()

    setSubmitting(false)

    if (error) {
      setStatus({ type: "error", text: "Something went wrong while sending your feedback. Please try again." })
      return
    }

    if (data) upsertRow(data as FeedbackRow)
    setName("")
    setMessage("")
    setRating(0)
    setStatus({ type: "success", text: "Thank you! Your feedback has been submitted." })
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

          {/* Right: feedback form card */}
          <Reveal delay={160}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-ink-soft/80 p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] backdrop-blur sm:p-8"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="feedback-name" className="text-sm font-medium text-white/80">
                  Name
                </label>
                <input
                  id="feedback-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={80}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                  className={fieldClass}
                />
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="feedback-message" className="text-sm font-medium text-white/80">
                  Feedback Message
                </label>
                <textarea
                  id="feedback-message"
                  name="message"
                  rows={5}
                  required
                  maxLength={1000}
                  placeholder="Share your thoughts…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={submitting}
                  className={`${fieldClass} min-h-32 resize-y`}
                />
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <span className="text-sm font-medium text-white/80">Rating</span>
                <RatingInput value={rating} onChange={setRating} disabled={submitting} />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo to-violet text-sm font-medium text-white shadow-lg shadow-indigo/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet/40 disabled:pointer-events-none disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              {status.type !== "idle" && (
                <p
                  role={status.type === "error" ? "alert" : "status"}
                  className={cn(
                    "mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
                    status.type === "success"
                      ? "border-violet/30 bg-violet/10 text-white"
                      : "border-red-400/30 bg-red-400/10 text-red-100",
                  )}
                >
                  {status.type === "success" ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-violet" />
                  ) : (
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-300" />
                  )}
                  {status.text}
                </p>
              )}
            </form>
          </Reveal>
        </div>

        {/* Existing feedback */}
        <Reveal delay={120} className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">What people are saying</h3>
            {!loading && !loadError && (
              <span className="font-mono text-xs text-ink-muted">
                {feedback.length} {feedback.length === 1 ? "entry" : "entries"}
              </span>
            )}
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
                ))}
              </div>
            ) : loadError ? (
              <p className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-ink-muted">
                <AlertCircle className="size-4 shrink-0" />
                {loadError}
              </p>
            ) : feedback.length === 0 ? (
              <p className="flex items-center gap-2 rounded-2xl border border-dashed border-white/15 px-5 py-6 text-sm text-ink-muted">
                <MessageSquare className="size-4 shrink-0" />
                No feedback yet — be the first to leave a note.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {feedback.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-white/[0.05] animate-in fade-in slide-in-from-bottom-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo/80 to-violet/80 font-mono text-xs font-medium uppercase text-white">
                          {item.name.trim().charAt(0) || "?"}
                        </span>
                        <p className="truncate text-[0.95rem] font-semibold text-white">{item.name}</p>
                      </div>
                      <Stars value={item.rating} />
                    </div>
                    <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-ink-muted">{item.message}</p>
                    <time dateTime={item.created_at} className="mt-4 font-mono text-[0.7rem] text-white/40">
                      {formatDate(item.created_at)}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
