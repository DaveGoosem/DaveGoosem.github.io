/**
 * Shared schema.org JSON-LD. One Person and one WebSite entity, each with a stable @id, that
 * every page references, so search engines and AI agents see a single, consistent author.
 */
import { allAuthors } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { getTagLabels } from 'app/tag-labels'
import { mvpYearsLabel } from '@/data/mvpAwards'

const site = siteMetadata.siteUrl
export const PERSON_ID = `${site}/#person`
export const WEBSITE_ID = `${site}/#website`

export const absoluteUrl = (url: string) => (/^https?:\/\//.test(url) ? url : `${site}${url}`)

function defaultAuthor() {
  return allAuthors.find((a) => a.slug === 'default') ?? allAuthors[0]
}

/** Full Person entity: name, role, employer, profiles and topics. */
export function personSchema() {
  const a = defaultAuthor()
  const tagCounts = tagData as Record<string, number>
  const labels = getTagLabels()
  const knowsAbout = Object.keys(tagCounts)
    .sort((x, y) => tagCounts[y] - tagCounts[x])
    .slice(0, 12)
    .map((t) => labels[t] ?? t)

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: a.name,
    url: `${site}/about`,
    ...(a.avatar && { image: absoluteUrl(a.avatar) }),
    ...(a.description && { description: a.description }),
    ...(a.occupation && { jobTitle: a.occupation }),
    ...(a.company && {
      worksFor: {
        '@type': 'Organization',
        name: a.company,
        ...(a.companyUrl && { url: a.companyUrl }),
      },
    }),
    award: `Sitecore Technology MVP (${mvpYearsLabel})`,
    knowsAbout,
    sameAs: [a.linkedin, a.github, a.bluesky, a.twitter].filter(Boolean),
  }
}

/** Short reference to the Person, for author fields. */
export function personRef() {
  const a = defaultAuthor()
  return { '@type': 'Person', '@id': PERSON_ID, name: a.name, url: `${site}/about` }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteMetadata.title,
    url: site,
    description: siteMetadata.description,
    inLanguage: siteMetadata.language,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${site}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site}${item.path ? `/${item.path}` : ''}`,
    })),
  }
}

/** A page-level entity (ProfilePage, ContactPage, CollectionPage, ...) tied to the site. */
export function webPageSchema(
  type: string,
  {
    path,
    name,
    description,
    extra = {},
  }: { path: string; name: string; description?: string; extra?: object }
) {
  return {
    '@type': type,
    '@id': `${site}/${path}#webpage`,
    url: `${site}/${path}`,
    name,
    ...(description && { description }),
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: siteMetadata.language,
    ...extra,
  }
}

/** Wraps entities in a single @graph document. */
export function jsonLdGraph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

/** <script> props for injecting JSON-LD. */
export function jsonLdScript(data: object) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, '\\u003c') },
  }
}

/** Link to the Markdown version of a page, for <head> metadata (`alternates.types`). */
export const markdownAlternate = (mdPath: string) => ({ 'text/markdown': `/md/${mdPath}` })

/** ItemList of posts for listing pages (blog index, tag pages). */
export function postListSchema(posts: { title: string; path: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site}/${p.path}`,
      name: p.title,
    })),
  }
}
