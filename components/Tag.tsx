import Link from './Link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  label?: string
  count?: number
  active?: boolean
}

const Tag = ({ text, label, count, active = false }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`mb-2 mr-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-inset transition-colors ${
        active
          ? 'bg-primary-500 text-white ring-primary-500'
          : 'bg-primary-50 text-primary-700 ring-primary-200 hover:bg-primary-100 dark:bg-primary-400/10 dark:text-primary-300 dark:ring-primary-400/20 dark:hover:bg-primary-400/20'
      }`}
    >
      {label ?? text}
      {count !== undefined && (
        <span
          className={active ? 'text-primary-100' : 'text-primary-500/70 dark:text-primary-300/60'}
        >
          {count}
        </span>
      )}
    </Link>
  )
}

export default Tag
