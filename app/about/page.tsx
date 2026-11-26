import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import {
  PERSON_ID,
  breadcrumbSchema,
  jsonLdGraph,
  jsonLdScript,
  webPageSchema,
} from 'app/structured-data'

export const metadata = genPageMetadata({
  title: 'About',
  description:
    'About David Goosem: Technical Architect at Aceik and Sitecore Technology MVP, writing about Sitecore, SitecoreAI, XM Cloud and headless Next.js.',
  markdownPath: 'about.md',
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const jsonLd = jsonLdGraph(
    webPageSchema('ProfilePage', {
      path: 'about',
      name: `About ${author.name}`,
      extra: { mainEntity: { '@id': PERSON_ID } },
    }),
    breadcrumbSchema([{ name: 'About', path: 'about' }])
  )

  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
