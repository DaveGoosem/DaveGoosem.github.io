import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { MvpGallery } from '@/components/MvpAwards'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="pt-6">
        <div className="pb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
            About
          </h1>
        </div>
        <div className="items-start space-y-8 xl:grid xl:grid-cols-3 xl:gap-x-10 xl:space-y-0">
          <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-gray-50/60 p-8 text-center dark:border-gray-800 dark:bg-gray-900/40 xl:sticky xl:top-24">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-40 w-40 rounded-full ring-4 ring-white dark:ring-gray-800"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
          </div>
          <div className="pb-8 xl:col-span-2">
            <div className="prose max-w-none dark:prose-invert">{children}</div>
            <div className="mt-10">
              <MvpGallery />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
