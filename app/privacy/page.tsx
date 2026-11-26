import { allPages } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import PageLayout from '@/layouts/PageLayout'
import { genPageMetadata } from 'app/seo'
import { breadcrumbSchema, jsonLdGraph, jsonLdScript, webPageSchema } from 'app/structured-data'

const page = allPages.find((p) => p.slug === 'privacy')!

export const metadata = genPageMetadata({
  title: page.title,
  description: page.summary,
  markdownPath: 'privacy.md',
})

export default function PrivacyPage() {
  const jsonLd = jsonLdGraph(
    webPageSchema('WebPage', {
      path: 'privacy',
      name: page.title,
      description: page.summary,
      extra: page.lastmod ? { dateModified: page.lastmod } : {},
    }),
    breadcrumbSchema([{ name: page.title, path: 'privacy' }])
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
