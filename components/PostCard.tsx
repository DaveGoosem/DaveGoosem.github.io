import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from './Link'
import Image from './Image'
import Tag from './Tag'
import PostMeta from './PostMeta'
import PostCover from './PostCover'

type Variant = 'featured' | 'grid' | 'row'

interface Props {
  post: CoreContent<Blog>
  /**
   * featured: large card, artwork beside the text
   * grid: card with artwork across the top
   * row: full-width list item with a thumbnail on the right
   * Artwork is the post's first image, or a generated cover when it has none.
   */
  variant?: Variant
  maxTags?: number
}

export default function PostCard({ post, variant = 'grid', maxTags = 4 }: Props) {
  const { slug, path, date, title, summary, tags, images, readingTime } = post
  const image = Array.isArray(images) && images.length > 0 ? images[0] : undefined
  const href = `/${path}`
  const featured = variant === 'featured'

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5 dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-primary-500/40 ${
        featured ? 'md:flex-row' : ''
      } ${variant === 'row' ? 'sm:flex-row-reverse' : ''}`}
    >
      {/* Accent line that lights up on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-primary-500 via-sky-400 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        className={`relative shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800 ${
          featured
            ? 'aspect-[2/1] md:aspect-auto md:min-h-[18rem] md:w-1/2'
            : variant === 'row'
              ? 'aspect-[2/1] sm:aspect-auto sm:w-56 sm:border-l sm:border-gray-200 dark:sm:border-gray-800'
              : 'aspect-[5/2]'
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes={
              featured
                ? '(min-width: 768px) 512px, 100vw'
                : variant === 'row'
                  ? '(min-width: 640px) 224px, 100vw'
                  : '(min-width: 768px) 480px, 100vw'
            }
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <PostCover
            slug={slug}
            tags={tags}
            showLabel={variant !== 'row'}
            className="transition duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className={`flex min-w-0 flex-1 flex-col ${featured ? 'p-6 md:p-8' : 'p-6'}`}>
        <PostMeta date={date} readingTime={readingTime} />
        <h2
          className={`mt-3 text-balance font-bold tracking-tight text-gray-900 dark:text-gray-100 ${
            featured ? 'text-2xl leading-8 md:text-3xl md:leading-10' : 'text-xl leading-7'
          }`}
        >
          {/* Stretched link: makes the whole card clickable while tags stay independently clickable */}
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-primary-600 dark:group-hover:text-primary-400"
          >
            {title}
          </Link>
        </h2>
        {summary && (
          <p
            className={`mt-3 text-gray-600 dark:text-gray-400 ${
              featured ? 'line-clamp-4 text-base leading-7' : 'line-clamp-3 text-sm leading-6'
            }`}
          >
            {summary}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="relative z-20 -mb-2 mt-auto flex flex-wrap pt-5">
            {tags.slice(0, maxTags).map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
