'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostCard from '@/components/PostCard'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  tagLabels?: Record<string, string>
}

const pagerButton =
  'inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition'
const pagerEnabled = `${pagerButton} border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-primary-400 dark:hover:text-primary-400`
const pagerDisabled = `${pagerButton} cursor-not-allowed border-gray-100 text-gray-300 dark:border-gray-800 dark:text-gray-600`

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <nav className="flex items-center justify-between pb-8 pt-10" aria-label="Pagination">
      {prevPage ? (
        <Link
          className={pagerEnabled}
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
        >
          &larr; Previous
        </Link>
      ) : (
        <span className={pagerDisabled} aria-disabled="true">
          &larr; Previous
        </span>
      )}
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      {nextPage ? (
        <Link className={pagerEnabled} href={`/${basePath}/page/${currentPage + 1}`} rel="next">
          Next &rarr;
        </Link>
      ) : (
        <span className={pagerDisabled} aria-disabled="true">
          Next &rarr;
        </span>
      )}
    </nav>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tagLabels = {},
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = pathname.split('/tags/')[1]

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const sidebarLink =
    'flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium transition-colors'
  const sidebarIdle = `${sidebarLink} text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white`
  const sidebarActive = `${sidebarLink} bg-primary-50 text-primary-700 dark:bg-primary-400/10 dark:text-primary-300`

  return (
    <div className="pt-6">
      <div className="pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>
      <div className="flex gap-10">
        <aside className="hidden w-60 shrink-0 sm:block">
          <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto rounded-2xl border border-gray-200 bg-gray-50/60 p-3 dark:border-gray-800 dark:bg-gray-900/40">
            <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Topics
            </p>
            <ul className="space-y-0.5">
              <li>
                {pathname.startsWith('/blog') ? (
                  <span className={sidebarActive} aria-current="page">
                    All posts
                  </span>
                ) : (
                  <Link href="/blog" className={sidebarIdle}>
                    All posts
                  </Link>
                )}
              </li>
              {sortedTags.map((t) => (
                <li key={t}>
                  {activeTag === slug(t) ? (
                    <span className={sidebarActive} aria-current="page">
                      {tagLabels[t] ?? t}
                      <span className="text-xs opacity-70">{tagCounts[t]}</span>
                    </span>
                  ) : (
                    <Link
                      href={`/tags/${slug(t)}`}
                      className={sidebarIdle}
                      aria-label={`View posts tagged ${t}`}
                    >
                      {tagLabels[t] ?? t}
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {tagCounts[t]}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <ul className="space-y-6">
            {displayPosts.map((post) => (
              <li key={post.path}>
                <PostCard post={post} variant="row" />
              </li>
            ))}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
