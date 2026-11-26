'use client'

import { usePathname } from 'next/navigation'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
      {headerNavLinks
        .filter((link) => link.href !== '/')
        .map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.title}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                active
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-white'
              }`}
            >
              {link.title}
            </Link>
          )
        })}
    </nav>
  )
}
