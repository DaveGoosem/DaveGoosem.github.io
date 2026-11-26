import ListLayout from '@/layouts/ListLayoutWithTags'
import { getTagLabels } from 'app/tag-labels'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import {
  breadcrumbSchema,
  jsonLdGraph,
  jsonLdScript,
  postListSchema,
  webPageSchema,
} from 'app/structured-data'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

const pageDescription = (n: number, total: number) =>
  `Page ${n} of ${total} of every post on DaveGoosem.com: practical write-ups on Sitecore, SitecoreAI, XM Cloud, headless Next.js and AI-assisted development.`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const n = parseInt((await params).page)
  const total = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  // Self-canonical (not /blog): each page lists different posts. Markdown agents get the full list.
  return genPageMetadata({
    title: `Blog: page ${n}`,
    description: pageDescription(n, total),
    markdownPath: 'blog.md',
  })
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  const jsonLd = jsonLdGraph(
    webPageSchema('CollectionPage', {
      path: `blog/page/${pageNumber}`,
      name: `All posts: page ${pageNumber}`,
      description: pageDescription(pageNumber, pagination.totalPages),
      extra: { mainEntity: postListSchema(initialDisplayPosts) },
    }),
    breadcrumbSchema([
      { name: 'Blog', path: 'blog' },
      { name: `Page ${pageNumber}`, path: `blog/page/${pageNumber}` },
    ])
  )

  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
        tagLabels={getTagLabels()}
      />
    </>
  )
}
