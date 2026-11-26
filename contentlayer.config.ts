import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeExternalLinks from 'rehype-external-links'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { generateAgentFiles } from './scripts/agent-files'

const root = process.cwd()
const absoluteUrl = (url: string) =>
  /^https?:\/\//.test(url) ? url : `${siteMetadata.siteUrl}${url}`
const isProduction = process.env.NODE_ENV === 'production'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  // 2-space indent + trailing newline matches Prettier, so the committed file doesn't churn
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount, null, 2) + '\n')
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        // Absolute URL: Google ignores relative image paths in structured data
        image: absoluteUrl(doc.images?.[0] ?? siteMetadata.socialBanner),
        keywords: doc.tags,
        inLanguage: siteMetadata.language,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        },
        publisher: {
          '@type': 'Organization',
          name: siteMetadata.title,
          logo: {
            '@type': 'ImageObject',
            url: `${siteMetadata.siteUrl}/static/images/Logos/DaveGoosem.com_Logo_Black.png`,
          },
        },
      }),
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    companyUrl: { type: 'string' },
    description: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    bluesky: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

/** Standalone pages such as /contact and /privacy (data/pages/<slug>.mdx -> /<slug>) */
export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string' },
    lastmod: { type: 'date' },
  },
  computedFields,
}))

/** Most common frontmatter spelling of each tag slug, e.g. sitecoreai -> SitecoreAI */
function tagLabeller(allBlogs) {
  const variants: Record<string, Record<string, number>> = {}
  allBlogs.forEach((post) =>
    (post.tags ?? []).forEach((t) => {
      const key = slug(t)
      variants[key] ??= {}
      variants[key][t] = (variants[key][t] ?? 0) + 1
    })
  )
  return (key: string) =>
    Object.entries(variants[key] ?? { [key]: 1 }).sort((a, b) => b[1] - a[1])[0][0]
}

export default makeSource({
  contentDirPath: 'data',
  contentDirExclude: ['blog/CLAUDE.md'],
  documentTypes: [Blog, Authors, Page],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      // @ts-ignore
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs, allAuthors, allPages } = await importData()
    createTagCount(allBlogs)
    createSearchIndex(allBlogs)
    generateAgentFiles({
      posts: allBlogs,
      author: allAuthors.find((a) => a.slug === 'default') ?? allAuthors[0],
      pages: allPages,
      siteMetadata,
      tagLabel: tagLabeller(allBlogs),
    })
  },
})
