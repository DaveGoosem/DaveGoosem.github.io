import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-20 flex flex-col items-center border-t border-gray-200/70 pb-10 pt-10 dark:border-gray-800/70">
        <div className="mb-4 flex space-x-5">
          {/* <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} /> */}
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          {/* <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} /> */}
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} /> */}
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={6} />
          {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} /> */}
          {/* <SocialIcon kind="threads" href={siteMetadata.threads} size={6} /> */}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <nav aria-label="Site information" className="mb-2 flex space-x-4 text-sm">
          {[
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
            { href: '/privacy', label: 'Privacy' },
            { href: '/llms.txt', label: 'llms.txt' },
          ].map((item) => {
            const className =
              'text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
            // llms.txt is a plain file, not a page, so skip client-side routing for it
            return item.href.endsWith('.txt') ? (
              <a key={item.href} href={item.href} className={className}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}
