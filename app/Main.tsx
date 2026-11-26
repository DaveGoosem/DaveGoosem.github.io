import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PostCard from '@/components/PostCard'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import AuthorCard from '@/components/AuthorCard'
import { allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { getTagLabels } from 'app/tag-labels'

const MAX_DISPLAY = 7
const MAX_TOPICS = 10

export default function Home({ posts }) {
  const [featured, ...rest] = posts.slice(0, MAX_DISPLAY)
  const tagCounts = tagData as Record<string, number>
  const tagLabels = getTagLabels()
  const author = allAuthors.find((a) => a.slug === 'default')
  const topTags = Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b] - tagCounts[a])
    .slice(0, MAX_TOPICS)

  return (
    <>
      {/* Intro */}
      <section className="relative pb-10 pt-6 md:pb-14 md:pt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/20 via-sky-400/10 to-indigo-500/20 blur-3xl dark:from-primary-500/15 dark:to-indigo-500/15"
        />
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl md:leading-tight">
          {siteMetadata.description}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          Practical write-ups on Sitecore technologies, Next.js and the occasional AI experiment,
          from someone who builds this stuff for a living.
        </p>
      </section>

      {/* Feed */}
      <section aria-labelledby="latest-heading">
        <div className="mb-6 flex items-end justify-between">
          <h2
            id="latest-heading"
            className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
          >
            Latest posts
          </h2>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all &rarr;
            </Link>
          )}
        </div>

        {!posts.length && <p>No posts found.</p>}

        {featured && (
          <div className="mb-6">
            <PostCard post={featured} variant="featured" maxTags={5} />
          </div>
        )}

        {rest.length > 0 && (
          <ul className="grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} variant="grid" maxTags={3} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Topics */}
      {topTags.length > 0 && (
        <section
          aria-labelledby="topics-heading"
          className="mt-16 rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-gray-900/40 md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="md:max-w-xs">
              <h2
                id="topics-heading"
                className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100"
              >
                Browse by topic
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Jump straight to the things you care about.
              </p>
            </div>
            <div className="-mb-2 flex flex-wrap md:max-w-xl md:justify-end">
              {topTags.map((t) => (
                <Tag key={t} text={t} label={tagLabels[t]} count={tagCounts[t]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length > MAX_DISPLAY && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-primary-400"
            aria-label="All posts"
          >
            Browse all posts &rarr;
          </Link>
        </div>
      )}

      {/* About the author + MVP badges */}
      {author && (
        <section aria-label="About the author" className="mt-16">
          <AuthorCard author={coreContent(author)} label="About the author" />
        </section>
      )}
    </>
  )
}
