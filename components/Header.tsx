import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import DaveGoosemLogo from '@/data/DaveGoosemLogo.png'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image
                src={DaveGoosemLogo}
                alt="Dave Goosem Logo"
                width={100}
                height={100}
                className="w-auto"
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <>
                <div className="font-semibold sm:block">
                  <div className="h-6 text-2x2 sm:text-4xl mb-[10px] sm:mb-4">
                    {siteMetadata.headerTitle}
                  </div>
                  <div className="h-6 text-xs sm:text-lg">Incubating Sitecore Solutions</div>
                </div>
              </>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
