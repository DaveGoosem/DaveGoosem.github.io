import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import { MvpShowcase } from '@/components/MvpAwards'

/** Author bio + MVP badges. Used at the end of posts and at the bottom of the home page. */
export default function AuthorCard({
  author,
  label = 'Written by',
}: {
  author: CoreContent<Authors>
  label?: string
}) {
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
            {label}
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
        <MvpShowcase />
      </div>
    </div>
  )
}
