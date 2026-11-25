import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import NavLinks from './NavLinks'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'
import HeaderShell from './HeaderShell'
import SectionContainer from './SectionContainer'
import DaveGoosemLogo from '@/data/DaveGoosemLogo.png'
import Image from 'next/image'

const Header = () => {
  return (
    <HeaderShell>
      <SectionContainer>
        <div className="flex h-28 items-center justify-between border-b border-gray-200/70 transition-[height,border-color] duration-300 group-data-[scrolled=true]:h-16 group-data-[scrolled=true]:border-transparent dark:border-gray-800/70 dark:group-data-[scrolled=true]:border-transparent sm:h-36">
          <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
            <Image
              src={DaveGoosemLogo}
              alt="Dave Goosem Logo"
              width={100}
              height={100}
              priority
              className="mr-3 h-20 w-auto transition-[height] duration-300 group-data-[scrolled=true]:h-11 sm:h-[100px]"
            />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="font-semibold">
                <div className="text-lg leading-tight transition-[font-size] duration-300 group-data-[scrolled=true]:text-lg sm:text-4xl">
                  {siteMetadata.headerTitle}
                </div>
                <div className="mt-1 text-xs transition-all duration-300 group-data-[scrolled=true]:mt-0 group-data-[scrolled=true]:h-0 group-data-[scrolled=true]:opacity-0 sm:mt-2 sm:text-lg">
                  Incubating Sitecore Solutions
                </div>
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>
          <div className="flex items-center gap-2 leading-5 sm:gap-3">
            <NavLinks />
            <div className="flex items-center gap-4 sm:ml-2">
              <SearchButton />
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </div>
      </SectionContainer>
    </HeaderShell>
  )
}

export default Header
