/**
 * Generates the files AI agents read, from the same content the site is built from.
 * Called from Contentlayer's onSuccess (so it runs on `npm run dev` and `npm run build`).
 *
 * Outputs (gitignored, regenerated on every build):
 *   public/md/**            Markdown version of every page (served for `Accept: text/markdown` by middleware.ts)
 *   public/llms.txt         Site overview, when-to-use guidance and an index of posts (llmstxt.org)
 *   public/llms-full.txt    Every post's full Markdown in one file
 * Output (committed, like tag-data.json):
 *   app/agent-routes.json   Map of page path -> Markdown file, imported by middleware.ts
 */
import { mkdirSync, rmSync, writeFileSync } from 'fs'
import path from 'path'
import { slug as slugify } from 'github-slugger'

type Doc = {
  title?: string
  name?: string
  date?: string
  lastmod?: string
  summary?: string
  tags?: string[]
  draft?: boolean
  slug: string
  path: string
  body: { raw: string }
  readingTime?: { minutes?: number }
  [key: string]: unknown
}

interface SiteMeta {
  title: string
  siteUrl: string
  description: string
}

const PUBLIC_MD = path.join('public', 'md')

/** Turn MDX into plain Markdown agents can read: drop MDX-only syntax, make links absolute. */
export function mdxToMarkdown(raw: string, siteUrl: string): string {
  const parts = raw.split(/(^```[\s\S]*?^```)/m)
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part // fenced code block: keep exactly
      return part
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, '') // MDX comments
        .replace(/^(import|export) .*$/gm, '') // MDX import/export lines
        .replace(/<TOCInline[^>]*\/>/g, '')
        .replace(/\]\(\//g, `](${siteUrl}/`) // root-relative links and images
        .replace(/(src|href)="\//g, `$1="${siteUrl}/`)
    })
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const isoDate = (d?: string) => (d ? new Date(d).toISOString().split('T')[0] : '')

function write(file: string, content: string) {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, content.trimEnd() + '\n')
}

export function generateAgentFiles({
  posts: allPosts,
  author,
  pages = [],
  siteMetadata,
  tagLabel,
}: {
  posts: Doc[]
  author: Doc
  pages?: Doc[]
  siteMetadata: SiteMeta
  tagLabel: (tagSlug: string) => string
}) {
  const site = siteMetadata.siteUrl
  const posts = allPosts
    .filter((p) => p.draft !== true)
    .sort((a, b) => (a.date! < b.date! ? 1 : -1))
  const mdUrl = (file: string) => `${site}/md/${file}`
  const routes: Record<string, string> = {}
  const add = (route: string, file: string, content: string) => {
    routes[route] = file
    write(path.join(PUBLIC_MD, file), content)
  }

  rmSync(PUBLIC_MD, { recursive: true, force: true })

  const authorLine = `${author.name}, ${author.occupation} at ${author.company}`
  const postLine = (p: Doc) =>
    `- [${p.title}](${site}/${p.path}) (${isoDate(p.date)}): ${p.summary?.replace(/\s+/g, ' ').trim() ?? ''}`

  // Tag index
  const tagCounts: Record<string, number> = {}
  posts.forEach((p) =>
    p.tags?.forEach((t) => (tagCounts[slugify(t)] = (tagCounts[slugify(t)] ?? 0) + 1))
  )
  const tags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  // Posts
  for (const p of posts) {
    const meta = [
      `- URL: ${site}/${p.path}`,
      `- Author: ${authorLine}`,
      `- Published: ${isoDate(p.date)}`,
      p.lastmod ? `- Updated: ${isoDate(p.lastmod)}` : '',
      p.tags?.length ? `- Tags: ${p.tags.join(', ')}` : '',
      p.readingTime?.minutes
        ? `- Reading time: ${Math.max(1, Math.round(p.readingTime.minutes))} min`
        : '',
    ]
      .filter(Boolean)
      .join('\n')
    add(
      `/${p.path}`,
      `${p.path}.md`,
      `# ${p.title}\n\n${meta}\n\n${p.summary ? `> ${p.summary.replace(/\s+/g, ' ').trim()}\n\n` : ''}${mdxToMarkdown(p.body.raw, site)}`
    )
  }

  // Home
  add(
    '/',
    'index.md',
    `# ${siteMetadata.title}\n\n> ${siteMetadata.description}. ${author.description ?? ''}\n\n## Latest posts\n\n${posts
      .slice(0, 10)
      .map(postLine)
      .join(
        '\n'
      )}\n\n## More\n\n- [All posts](${site}/blog)\n- [Topics](${site}/tags)\n- [About the author](${site}/about)\n- [llms.txt](${site}/llms.txt)\n- [Sitemap](${site}/sitemap.xml)\n- [RSS feed](${site}/feed.xml)`
  )

  // Blog index (also used for paginated /blog/page/N)
  const blogMd = `# All posts\n\n${posts.length} posts by ${authorLine}, newest first.\n\n${posts.map(postLine).join('\n')}`
  add('/blog', 'blog.md', blogMd)
  const pagesCount = Math.ceil(posts.length / 5)
  for (let n = 2; n <= pagesCount; n++) routes[`/blog/page/${n}`] = 'blog.md'

  // Tags
  add(
    '/tags',
    'tags.md',
    `# Topics\n\n${tags.map((t) => `- [${tagLabel(t)}](${site}/tags/${t}) (${tagCounts[t]} posts)`).join('\n')}`
  )
  for (const t of tags) {
    const tagged = posts.filter((p) => p.tags?.some((x) => slugify(x) === t))
    add(
      `/tags/${t}`,
      `tags/${t}.md`,
      `# Posts tagged ${tagLabel(t)}\n\n${tagged.map(postLine).join('\n')}`
    )
  }

  // About
  const socials = ['linkedin', 'github', 'bluesky', 'twitter']
    .filter((k) => author[k])
    .map((k) => `- ${k[0].toUpperCase()}${k.slice(1)}: ${author[k]}`)
    .join('\n')
  add(
    '/about',
    'about.md',
    `# About ${author.name}\n\n${author.occupation} at ${author.company}.\n\n${mdxToMarkdown(author.body.raw, site)}\n\n## Elsewhere\n\n${socials}`
  )

  // Standalone pages (contact, privacy, ...)
  for (const pg of pages) {
    const updated = pg.lastmod ? `\n\n_Last updated: ${isoDate(pg.lastmod)}_` : ''
    add(
      `/${pg.slug}`,
      `${pg.slug}.md`,
      `# ${pg.title}\n\n${mdxToMarkdown(pg.body.raw, site)}${updated}`
    )
  }

  // llms.txt
  const topTopics = tags.slice(0, 12).map((t) => `[${tagLabel(t)}](${mdUrl(`tags/${t}.md`)})`)
  const llms = `# ${siteMetadata.title}

> Personal technical blog of ${author.name}. ${author.description ?? ''}

Every page on this site is also available as Markdown. Request any page URL with the header \`Accept: text/markdown\`, or use the /md/ links below.

## When to use this site

- Use it for practitioner-level answers about implementing and running Sitecore solutions: SitecoreAI and XM Cloud, Sitecore XM/XP, headless builds with Next.js and JSS, SXA, Content Hub, Sitecore Search, Solr and SearchStax, and hosting and DevOps on Azure and Vercel.
- It is strongest on real-world detail the official docs don't cover: migration approaches, architecture and multi-site decisions, configuration gotchas, workarounds, and working with AI coding agents on Sitecore projects.
- It is not official product documentation, an API reference, or a source for pricing or licensing. For those, use Sitecore's own documentation at https://doc.sitecore.com.
- Posts are dated and some cover older platform versions (for example Sitecore 8 and 9). Check the published date before applying advice to a current version.
- How to use it: pick posts from the index below (or by topic), fetch the Markdown link, and cite the canonical page URL (shown at the top of each Markdown file) when quoting.

## Topics

${topTopics.join(', ')}. All topics: ${mdUrl('tags.md')}

## Posts

${posts
  .map(
    (p) =>
      `- [${p.title}](${mdUrl(`${p.path}.md`)}): ${p.summary?.replace(/\s+/g, ' ').trim() ?? ''} (${isoDate(p.date)})`
  )
  .join('\n')}

## Optional

- [About the author](${mdUrl('about.md')})
${pages.map((pg) => `- [${pg.title}](${mdUrl(`${pg.slug}.md`)})`).join('\n')}
- [Full text of every post](${site}/llms-full.txt)
- [Sitemap](${site}/sitemap.xml)
- [RSS feed](${site}/feed.xml)
`
  write(path.join('public', 'llms.txt'), llms)

  // llms-full.txt
  write(
    path.join('public', 'llms-full.txt'),
    `# ${siteMetadata.title}: full text\n\n> Every post by ${authorLine}, newest first. Index: ${site}/llms.txt\n\n` +
      posts
        .map(
          (p) =>
            `---\n\n# ${p.title}\n\n- URL: ${site}/${p.path}\n- Published: ${isoDate(p.date)}\n\n${mdxToMarkdown(p.body.raw, site)}`
        )
        .join('\n\n')
  )

  // Route manifest for middleware.ts (sorted keys + 2-space indent so Prettier leaves it alone)
  const sorted = Object.fromEntries(
    Object.keys(routes)
      .sort()
      .map((k) => [k, routes[k]])
  )
  writeFileSync(path.join('app', 'agent-routes.json'), JSON.stringify(sorted, null, 2) + '\n')

  console.log(
    `Agent files generated: ${Object.keys(routes).length} Markdown routes, llms.txt, llms-full.txt`
  )
}
