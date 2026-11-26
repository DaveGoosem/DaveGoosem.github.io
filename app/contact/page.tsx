import { allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import PageLayout from '@/layouts/PageLayout'
import { genPageMetadata } from 'app/seo'
import {
  PERSON_ID,
  breadcrumbSchema,
  jsonLdGraph,
  jsonLdScript,
  webPageSchema,
} from 'app/structured-data'

const page = allPages.find((p) => p.slug === 'contact')!

export const metadata = genPageMetadata({
  title: page.title,
  description: page.summary,
  markdownPath: 'contact.md',
})

export default function ContactPage() {
  const jsonLd = jsonLdGraph(
    webPageSchema('ContactPage', {
      path: 'contact',
      name: page.title,
      description: page.summary,
      extra: {
        mainEntity: { '@id': PERSON_ID },
        ...(page.lastmod && { dateModified: page.lastmod }),
      },
    }),
    breadcrumbSchema([{ name: page.title, path: 'contact' }])
  )

  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <PageLayout title={page.title} lastmod={page.lastmod}>
        <MDXLayoutRenderer code={page.body.code} components={components} />
      </PageLayout>
    </>
  )
}
