import { ReactNode } from 'react'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  title: string
  summary?: string
  lastmod?: string
  children: ReactNode
}

/** Simple prose page (contact, privacy, ...) styled to match the About page. */
export default function PageLayout({ title, summary, lastmod, children }: Props) {
  return (
    <div className="pt-6">
      <div className="pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {summary && (
          <p className="mt-3 max-w-2xl text-lg text-gray-500 dark:text-gray-400">{summary}</p>
        )}
      </div>
      <div className="prose max-w-3xl pb-8 dark:prose-invert md:prose-lg">{children}</div>
      {lastmod && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated{' '}
          <time dateTime={lastmod}>
            {new Date(lastmod).toLocaleDateString(siteMetadata.locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
      )}
    </div>
  )
}
