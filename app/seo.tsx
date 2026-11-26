import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  /** Path under /md/ of this page's Markdown version, e.g. 'about.md' */
  markdownPath?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  markdownPath,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    ...(description && { description }),
    ...(markdownPath && {
      alternates: {
        canonical: './',
        types: {
          'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
          'text/markdown': `/md/${markdownPath}`,
        },
      },
    }),
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
