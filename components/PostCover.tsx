import { slug as slugify } from 'github-slugger'

/**
 * Generated cover art for posts that don't set `images` in frontmatter.
 * Pure CSS + inline SVG (no network request). Colour and icon come from the post's most
 * specific tag; layout details are derived from the slug so each post's cover is stable.
 */

type Family = {
  label: string
  /** Mid-tone gradient, laid over a neutral base at low opacity */
  wash: string
  glow: string
  ink: string
  icon: string
}

// Icons: Heroicons outline paths (MIT)
const ICONS = {
  cube: 'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
  code: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
  cloud:
    'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z',
  search: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  layers:
    'M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3',
  sparkles:
    'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z',
  shield:
    'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  pencil:
    'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z',
}

// Full class strings so Tailwind's JIT picks them up.
const FAMILIES: Record<string, Family> = {
  platform: {
    label: 'Platform',
    wash: 'from-rose-500 to-orange-400',
    glow: 'bg-rose-400/40',
    ink: 'text-rose-500/60 dark:text-rose-300/50',
    icon: ICONS.cube,
  },
  frontend: {
    label: 'Front end',
    wash: 'from-sky-500 to-cyan-400',
    glow: 'bg-sky-400/40',
    ink: 'text-sky-600/60 dark:text-sky-300/50',
    icon: ICONS.code,
  },
  cloud: {
    label: 'Cloud',
    wash: 'from-blue-600 to-indigo-400',
    glow: 'bg-blue-400/40',
    ink: 'text-blue-600/60 dark:text-blue-300/50',
    icon: ICONS.cloud,
  },
  search: {
    label: 'Search',
    wash: 'from-emerald-500 to-teal-400',
    glow: 'bg-emerald-400/40',
    ink: 'text-emerald-600/60 dark:text-emerald-300/50',
    icon: ICONS.search,
  },
  architecture: {
    label: 'Architecture',
    wash: 'from-indigo-500 to-violet-400',
    glow: 'bg-violet-400/40',
    ink: 'text-violet-600/60 dark:text-violet-300/50',
    icon: ICONS.layers,
  },
  ai: {
    label: 'AI',
    wash: 'from-fuchsia-500 to-purple-400',
    glow: 'bg-fuchsia-400/40',
    ink: 'text-fuchsia-600/60 dark:text-fuchsia-300/50',
    icon: ICONS.sparkles,
  },
  quality: {
    label: 'Quality',
    wash: 'from-amber-500 to-orange-400',
    glow: 'bg-amber-400/40',
    ink: 'text-amber-600/70 dark:text-amber-300/50',
    icon: ICONS.shield,
  },
  default: {
    label: 'Notes',
    wash: 'from-slate-500 to-blue-400',
    glow: 'bg-slate-400/40',
    ink: 'text-slate-500/60 dark:text-slate-300/50',
    icon: ICONS.pencil,
  },
}

const TAG_FAMILY: Record<string, keyof typeof FAMILIES> = {
  sitecoreai: 'platform',
  xmcloud: 'platform',
  pages: 'platform',
  saas: 'platform',
  composable: 'platform',
  contenthub: 'platform',
  cdp: 'platform',
  'sitecore-send': 'platform',
  dxp: 'platform',
  jss: 'frontend',
  nextjs: 'frontend',
  react: 'frontend',
  headless: 'frontend',
  'headless-cms': 'frontend',
  storybook: 'frontend',
  'unit-testing': 'frontend',
  'atomic-design': 'frontend',
  'design-systems': 'frontend',
  azure: 'cloud',
  cloud: 'cloud',
  aws: 'cloud',
  vercel: 'cloud',
  devops: 'cloud',
  cicd: 'cloud',
  'github-workflows': 'cloud',
  solr: 'search',
  searchstax: 'search',
  search: 'search',
  'sitecore-search': 'search',
  sxa: 'architecture',
  helix: 'architecture',
  architecture: 'architecture',
  strategy: 'architecture',
  migration: 'architecture',
  serialization: 'architecture',
  unicorn: 'architecture',
  'multi-site': 'architecture',
  aspnet: 'architecture',
  ai: 'ai',
  claude: 'ai',
  'development-workflow': 'ai',
  seo: 'quality',
  accessibility: 'quality',
  security: 'quality',
}

const DIRECTIONS = [
  'bg-gradient-to-br',
  'bg-gradient-to-tr',
  'bg-gradient-to-bl',
  'bg-gradient-to-r',
]

function hash(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Picks the most specific tag: the first one (in frontmatter order) that maps to a family. */
export function coverFor(tags: string[] = []) {
  const tag =
    tags.find((t) => TAG_FAMILY[slugify(t)]) ?? tags.find((t) => slugify(t) !== 'sitecore')
  const family = FAMILIES[(tag && TAG_FAMILY[slugify(tag)]) || 'default']
  return { tag: tag ?? family.label, family }
}

interface Props {
  slug: string
  tags?: string[]
  className?: string
  /** Show the tag chip. Hide it on very small thumbnails. */
  showLabel?: boolean
}

export default function PostCover({ slug, tags = [], className = '', showLabel = true }: Props) {
  const { tag, family } = coverFor(tags)
  const h = hash(slug)
  // Stable per-post variation: gradient direction and where the light falls
  const glowX = 20 + (h % 60)
  const glowY = 15 + ((h >>> 7) % 50)
  const direction = DIRECTIONS[(h >>> 21) % DIRECTIONS.length]

  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden bg-gray-50 dark:bg-gray-900 ${className}`}
    >
      {/* Colour wash */}
      <div className={`absolute inset-0 ${direction} ${family.wash} opacity-20 dark:opacity-25`} />
      {/* Soft light */}
      <div
        className={`absolute h-3/4 w-2/3 rounded-full blur-3xl dark:opacity-60 ${family.glow}`}
        style={{ left: `${glowX}%`, top: `${glowY}%`, transform: 'translate(-50%, -50%)' }}
      />
      {/* Fine grid, faded toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(128,128,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }}
      />
      {/* Icon, centred */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute left-1/2 top-1/2 h-[42%] max-h-24 -translate-x-1/2 -translate-y-1/2 ${family.ink}`}
      >
        <path d={family.icon} />
      </svg>
      {showLabel && (
        <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold tracking-wide text-gray-700 ring-1 ring-black/5 backdrop-blur-sm dark:bg-gray-950/60 dark:text-gray-200 dark:ring-white/10">
          {tag}
        </span>
      )}
    </div>
  )
}
