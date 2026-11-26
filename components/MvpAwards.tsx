import Image from '@/components/Image'
import mvpAwards, { mvpYearsLabel } from '@/data/mvpAwards'

type Award = (typeof mvpAwards)[number]

const TITLE = 'Sitecore Technology MVP'
const latest = mvpAwards[0]

function Badge({
  award,
  size,
  className = '',
}: {
  award: Award
  size: number
  className?: string
}) {
  return (
    <Image
      src={award.src}
      alt={`${award.year} ${TITLE} badge`}
      width={size}
      height={size}
      className={`rounded-xl bg-white object-contain shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 ${className}`}
    />
  )
}

function BadgeGrid({ wide = false }: { wide?: boolean }) {
  return (
    <ul className={`grid grid-cols-3 gap-3 ${wide ? 'sm:grid-cols-6' : 'sm:gap-4'}`}>
      {mvpAwards.map((a) => (
        <li key={a.year}>
          <Badge award={a} size={160} className="aspect-square h-auto w-full" />
        </li>
      ))}
    </ul>
  )
}

function Summary() {
  return (
    <>
      <p className="font-bold text-gray-900 dark:text-gray-100">{TITLE}</p>
      <p className="mt-0.5 text-sm tabular-nums text-gray-600 dark:text-gray-400">
        {mvpYearsLabel}
      </p>
    </>
  )
}

/**
 * Author card section: latest badge large; the whole row is the toggle that reveals every badge,
 * with the "Show all badges" cue sitting under the title and years.
 */
export function MvpShowcase() {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-4 sm:gap-5 [&::-webkit-details-marker]:hidden">
        <Badge award={latest} size={112} className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" />
        <div className="min-w-0">
          <Summary />
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-500 dark:text-primary-400 dark:group-hover:text-primary-300">
            <span className="group-open:hidden">Show all badges</span>
            <span className="hidden group-open:inline">Hide badges</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform group-open:rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </summary>
      <div className="mt-5">
        <BadgeGrid wide />
      </div>
    </details>
  )
}

/** Full, always-visible gallery for the About page (/about#mvp). */
export function MvpGallery() {
  return (
    <section
      id="mvp"
      aria-labelledby="mvp-heading"
      className="scroll-mt-28 rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-gray-900/40"
    >
      <h2
        id="mvp-heading"
        className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
      >
        Recognition
      </h2>
      <div className="mt-3">
        <Summary />
      </div>
      <div className="mt-5">
        <BadgeGrid />
      </div>
    </section>
  )
}
