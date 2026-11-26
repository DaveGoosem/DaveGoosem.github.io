import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { getTagLabels } from 'app/tag-labels'

export const metadata = genPageMetadata({
  title: 'Tags',
  description:
    'Every topic covered on DaveGoosem.com, from Sitecore and SitecoreAI to Next.js, search and DevOps.',
  markdownPath: 'tags.md',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagLabels = getTagLabels()
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className="pt-6">
      <div className="pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          Tags
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {tagKeys.length} topics, most written about first.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-gray-900/40 md:p-8">
        {tagKeys.length === 0 && 'No tags found.'}
        <div className="-mb-2 flex flex-wrap">
          {sortedTags.map((t) => (
            <Tag key={t} text={t} label={tagLabels[t]} count={tagCounts[t]} />
          ))}
        </div>
      </div>
    </div>
  )
}
