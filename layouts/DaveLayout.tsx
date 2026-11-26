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
import PostCover from '@/components/PostCover'
import ReadingProgress from '@/components/ReadingProgress'
import TableOfContents from '@/components/TableOfContents'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Bleed from 'pliny/ui/Bleed'
import AuthorCard from '@/components/AuthorCard'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
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
  const { slug, path, date, title, images, tags, readingTime } = content
  const toc = (content.toc as unknown as Toc) ?? []
  const basePath = path.split('/')[0]
  const displayImage = images && images.length > 0 ? images[0] : ''
  const primaryAuthor = authorDetails[0]

  return (
    <SectionContainer>
      <ReadingProgress />
      <ScrollTopAndComment showComment={false} />
      <article>
        {/* Header */}
        <header className="pb-10 pt-8">
          {/* Same artwork as the post's card: its own image, or the generated cover */}
          <div className="mb-10">
            <Bleed>
              <div
                className={`relative w-full overflow-hidden xl:rounded-2xl ${
                  displayImage ? 'aspect-[2/1]' : 'aspect-[3/1] sm:aspect-[4/1]'
                }`}
              >
                {displayImage ? (
                  <Image src={displayImage} alt={title} fill priority className="object-cover" />
                ) : (
                  <PostCover slug={slug} tags={tags} showLabel={false} />
                )}
              </div>
            </Bleed>
          </div>
          <div className="text-center">
            <PageTitle>{title}</PageTitle>
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
              <span
                aria-hidden="true"
                className="hidden text-gray-300 dark:text-gray-600 sm:inline"
              >
                &middot;
              </span>
              <PostMeta date={date} readingTime={readingTime} dateFormat={postDateTemplate} />
            </div>
            {tags && tags.length > 0 && (
              <div className="-mb-2 mt-5 flex flex-wrap justify-center">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="border-t border-gray-200 pt-10 dark:border-gray-800 xl:grid xl:grid-cols-4 xl:gap-x-10">
          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto pb-8">
              <TableOfContents toc={toc} />
            </div>
          </aside>

          <div className="min-w-0 xl:col-span-3">
            <div className="prose max-w-none pb-8 dark:prose-invert md:prose-lg">{children}</div>
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
