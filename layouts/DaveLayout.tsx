import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Toc } from 'pliny/mdx-plugins/remark-toc-headings'
import type { Blog, Authors } from 'contentlayer/generated'
// import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import PostMeta from '@/components/PostMeta'
import ReadingProgress from '@/components/ReadingProgress'
import TableOfContents from '@/components/TableOfContents'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Bleed from 'pliny/ui/Bleed'
import SocialIcon from '@/components/social-icons'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const mvpBadges = [
  { year: 2026, src: '/static/images/Logos/2026-Sitecore_MVP_Technology.png' },
  { year: 2025, src: '/static/images/Logos/2025-Sitecore-MVP-Technology.png' },
  { year: 2024, src: '/static/images/Logos/2024-Sitecore-MVP-Technology.png' },
  { year: 2023, src: '/static/images/Logos/2023-Sitecore-MVP-Technology.jpg' },
  { year: 2022, src: '/static/images/Logos/2022-Sitecore-MVP-Technology.jpg' },
  { year: 2021, src: '/static/images/Logos/2021-Sitecore-MVP-Technology.jpg' },
]

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

function AuthorCard({ author }: { author: CoreContent<Authors> }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-gray-900/40">
      <div className="flex items-start gap-4">
        {author.avatar && (
          <Image
            src={author.avatar}
            width={64}
            height={64}
            alt=""
            className="h-16 w-16 shrink-0 rounded-full ring-2 ring-white dark:ring-gray-800"
          />
        )}
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Written by
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">{author.name}</p>
          {(author.occupation || author.company) && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {[author.occupation, author.company].filter(Boolean).join(' at ')}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3">
            {author.linkedin && <SocialIcon kind="linkedin" href={author.linkedin} size={5} />}
            {author.bluesky && <SocialIcon kind="bluesky" href={author.bluesky} size={5} />}
            {author.twitter && <SocialIcon kind="twitter" href={author.twitter} size={5} />}
            {author.github && <SocialIcon kind="github" href={author.github} size={5} />}
            <Link
              href="/about"
              className="ml-1 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              More about me &rarr;
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-800">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Sitecore Technology MVP &middot; {mvpBadges.length} years running
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {mvpBadges.map((badge) => (
            <li key={badge.year}>
              <Image
                src={badge.src}
                alt={`${badge.year} Sitecore Technology MVP`}
                width={64}
                height={64}
                className="h-14 w-14 rounded-lg bg-white object-contain p-1 sm:h-16 sm:w-16"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PrevNextLink({
  post,
  direction,
}: {
  post: { path: string; title: string }
  direction: 'prev' | 'next'
}) {
  return (
    <Link
      href={`/${post.path}`}
      className={`group flex h-full flex-col rounded-2xl border border-gray-200 p-5 transition hover:border-primary-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-primary-500/40 dark:hover:bg-gray-900/40 ${
        direction === 'next' ? 'sm:items-end sm:text-right' : ''
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {direction === 'prev' ? '← Previous' : 'Next →'}
      </span>
      <span className="mt-2 font-semibold leading-snug text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
        {post.title}
      </span>
    </Link>
  )
}

export default function DaveLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, date, title, images, tags, readingTime } = content
  const toc = (content.toc as unknown as Toc) ?? []
  const basePath = path.split('/')[0]
  const displayImage = images && images.length > 0 ? images[0] : ''
  const primaryAuthor = authorDetails[0]

  return (
    <SectionContainer>
      <ReadingProgress />
      <ScrollTopAndComment />
      <article>
        {/* Header */}
        <header className="pb-10 pt-8">
          {displayImage && (
            <div className="mb-10">
              <Bleed>
                <div className="relative aspect-[2/1] w-full overflow-hidden xl:rounded-2xl">
                  <Image src={displayImage} alt={title} fill priority className="object-cover" />
                </div>
              </Bleed>
            </div>
          )}
          <div className="mx-auto max-w-3xl text-center">
            {tags && tags.length > 0 && (
              <div className="-mb-2 flex flex-wrap justify-center">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}
            <div className="mt-5">
              <PageTitle>{title}</PageTitle>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {primaryAuthor?.avatar && (
                <Image
                  src={primaryAuthor.avatar}
                  width={32}
                  height={32}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              )}
              {primaryAuthor && (
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {authorDetails.map((a) => a.name).join(', ')}
                </span>
              )}
              <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">
                &middot;
              </span>
              <PostMeta date={date} readingTime={readingTime} dateFormat={postDateTemplate} />
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="border-t border-gray-200 pt-10 dark:border-gray-800 xl:grid xl:grid-cols-4 xl:gap-x-10">
          <aside className="hidden xl:block">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-auto pb-8">
              <TableOfContents toc={toc} />
            </div>
          </aside>

          <div className="min-w-0 xl:col-span-3">
            <div className="prose max-w-none pb-8 dark:prose-invert">{children}</div>
            {/* Comments are switched off for this layout.
            {siteMetadata.comments && (
              <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )} */}

            <footer className="space-y-8 border-t border-gray-200 pt-10 dark:border-gray-800">
              {primaryAuthor && <AuthorCard author={primaryAuthor} />}

              {(next || prev) && (
                <nav aria-label="More articles" className="grid gap-4 sm:grid-cols-2">
                  <div>{prev && prev.path && <PrevNextLink post={prev} direction="prev" />}</div>
                  <div>{next && next.path && <PrevNextLink post={next} direction="next" />}</div>
                </nav>
              )}

              <div>
                <Link
                  href={`/${basePath}`}
                  className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
