import { Mail } from "lucide-react"
import { LinkedinIcon } from "@/components/linkedin-icon"

const iconLink =
  "flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/50 hover:bg-white/[0.07] hover:text-white"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo to-violet font-mono text-[0.7rem] font-medium text-white">
            AB
          </span>
          <span className="text-[0.95rem] font-semibold tracking-[-0.01em]">Aabha Borle</span>
        </a>

        <p className="order-last text-sm text-ink-muted sm:order-none">© 2026 Aabha Borle. All rights reserved.</p>

        <div className="flex items-center gap-3">
          <a href="mailto:aborle2@illinois.edu" aria-label="Email" className={iconLink}>
            <Mail className="size-4" strokeWidth={1.75} />
          </a>
          <a
            href="https://www.linkedin.com/in/aabha-borle-3a99221b2/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconLink}
          >
            <LinkedinIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
