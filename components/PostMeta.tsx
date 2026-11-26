import siteMetadata from '@/data/siteMetadata'

interface Props {
  date: string
  readingTime?: { text?: string; minutes?: number }
  className?: string
  dateFormat?: Intl.DateTimeFormatOptions
}

const defaultFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export default function PostMeta({ date, readingTime, className = '', dateFormat }: Props) {
  const minutes = readingTime?.minutes ? Math.max(1, Math.round(readingTime.minutes)) : undefined
  return (
    <dl
      className={`flex flex-wrap items-center gap-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 ${className}`}
    >
      <dt className="sr-only">Published on</dt>
      <dd>
        <time dateTime={date}>
          {new Date(date).toLocaleDateString(siteMetadata.locale, dateFormat ?? defaultFormat)}
        </time>
      </dd>
      {minutes && (
        <>
          <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">
            &middot;
          </span>
          <dt className="sr-only">Reading time</dt>
          <dd>{minutes} min read</dd>
        </>
      )}
    </dl>
  )
}
