import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
// import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Bleed from 'pliny/ui/Bleed'
import SocialIcon from '@/components/social-icons'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

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

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, images, tags } = content
  const basePath = path.split('/')[0]
  const displayImage = images && images.length > 0 ? images[0] : ''

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="space-y-1 pb-10 text-center dark:border-gray-700">
          {displayImage && (
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
          )}
          <div className="relative pt-10">
            <PageTitle>{title}</PageTitle>
          </div>
          <div>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
            </dd>
          </div>
        </div>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <div className="flex items-center">
                              <div className="mr-2 inline-block">
                                <SocialIcon href={author.twitter} kind="twitter" size={5} />
                              </div>
                              <Link
                                href={author.twitter}
                                className="inline-block text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter
                                  .replace('https://twitter.com/', '@')
                                  .replace('https://x.com/', '@')}
                              </Link>
                            </div>
                          )}
                        </dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.bluesky && (
                            <div className="flex items-center">
                              <div className="mr-2 inline-block">
                                <SocialIcon href={author.bluesky} kind="bluesky" size={5} />
                              </div>
                              <Link
                                href={author.bluesky}
                                className="inline-block text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.bluesky.replace('https://bsky.app/profile/', '@').split('.bsky.social')[0]}
                              </Link>
                            </div>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              {/* <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )} */}
            </div>
            <footer>
              <div className="flex flex-wrap">
                <div className="w-1/4 pl-1 pt-1 sm:w-1/4 md:w-1/4 xl:w-1/2">
                  <Image
                    src={'/static/images/Logos/2024-Sitecore-MVP-Technology.png'}
                    alt="2024 Sitecore Technology MVP"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="w-1/4 pl-1 pt-1 sm:w-1/4 md:w-1/4 xl:w-1/2">
                  <Image
                    src={'/static/images/Logos/2023-Sitecore-MVP-Technology.jpg'}
                    alt="2023 Sitecore Technology MVP"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="w-1/4 pl-1 pt-1 sm:w-1/4 md:w-1/4 xl:w-1/2">
                  <Image
                    src={'/static/images/Logos/2022-Sitecore-MVP-Technology.jpg'}
                    alt="2022 Sitecore Technology MVP"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="w-1/4 pl-1 pt-1 sm:w-1/4 md:w-1/4 xl:w-1/2">
                  <Image
                    src={'/static/images/Logos/2021-Sitecore-MVP-Technology.jpg'}
                    alt="2021 Sitecore Technology MVP"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
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
