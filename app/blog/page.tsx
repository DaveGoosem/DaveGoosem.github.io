import ListLayout from '@/layouts/ListLayoutWithTags'
import { getTagLabels } from 'app/tag-labels'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import {
  breadcrumbSchema,
  jsonLdGraph,
  jsonLdScript,
  postListSchema,
  webPageSchema,
} from 'app/structured-data'

const POSTS_PER_PAGE = 5

const description =
  'Every post on DaveGoosem.com: practical write-ups on Sitecore, SitecoreAI, XM Cloud, headless Next.js and AI-assisted development.'

export const metadata = genPageMetadata({ title: 'Blog', description, markdownPath: 'blog.md' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
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
      path: 'blog',
      name: 'All posts',
      description,
      extra: { mainEntity: postListSchema(posts) },
    }),
    breadcrumbSchema([{ name: 'Blog', path: 'blog' }])
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
