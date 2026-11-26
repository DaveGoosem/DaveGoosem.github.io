import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import {
  breadcrumbSchema,
  jsonLdGraph,
  jsonLdScript,
  postListSchema,
  webPageSchema,
} from 'app/structured-data'
import { getTagLabels } from 'app/tag-labels'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag: tagParam } = await params
  const tag = decodeURI(tagParam)
  const label = getTagLabels()[tag] ?? tag
  return genPageMetadata({
    title: label,
    description: `Posts about ${label} on ${siteMetadata.title}, from David Goosem.`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
        'text/markdown': `/md/tags/${tag}.md`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagParam } = await params
  const tag = decodeURI(tagParam)
  // Capitalize first letter and convert space to dash
  const tagLabels = getTagLabels()
  const title = tagLabels[tag] ?? tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const jsonLd = jsonLdGraph(
    webPageSchema('CollectionPage', {
      path: `tags/${tag}`,
      name: `Posts tagged ${title}`,
      extra: { mainEntity: postListSchema(filteredPosts) },
    }),
    breadcrumbSchema([
      { name: 'Tags', path: 'tags' },
      { name: title, path: `tags/${tag}` },
    ])
  )

  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <ListLayout posts={filteredPosts} title={title} tagLabels={tagLabels} />
    </>
  )
}
