import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'
import {
  BLOG_ID,
  PERSON_ID,
  blogSchema,
  jsonLdGraph,
  jsonLdScript,
  webPageSchema,
} from 'app/structured-data'

// Home-specific title and description: the site-wide ones ("Technology thoughts and ramblings")
// say nothing about the topics, which is what search results and AI summaries match on.
const title = 'DaveGoosem.com: Sitecore, SitecoreAI and headless Next.js blog'
const description =
  'Practical Sitecore, SitecoreAI, XM Cloud and headless Next.js guides from Sitecore Technology MVP David Goosem: migrations, architecture, search and AI.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description, images: [siteMetadata.socialBanner] },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      'text/markdown': '/md/index.md',
    },
  },
}

const LATEST_IN_SCHEMA = 10

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  const jsonLd = jsonLdGraph(
    webPageSchema('CollectionPage', {
      path: '',
      name: title,
      description,
      extra: { mainEntity: { '@id': BLOG_ID }, about: { '@id': PERSON_ID } },
    }),
    blogSchema(posts.slice(0, LATEST_IN_SCHEMA), description)
  )

  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <Main posts={posts} />
    </>
  )
}
