import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import NavLinks from './NavLinks'
import SearchButton from './SearchButton'
import DaveGoosemLogo from '@/data/DaveGoosemLogo.png'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200/70 py-8 dark:border-gray-800/70">
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
                  <div className="text-2x2 mb-[10px] h-6 sm:mb-4 sm:text-4xl">
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
      <div className="flex items-center gap-2 leading-5 sm:gap-3">
        <NavLinks />
        <SearchButton />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
