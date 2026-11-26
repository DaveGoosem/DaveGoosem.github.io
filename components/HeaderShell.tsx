'use client'

import { ReactNode, useEffect, useState } from 'react'

/**
 * Fixed header that condenses once the page is scrolled. A spacer of the expanded height
 * keeps the page from jumping when the header shrinks. Children style themselves with
 * `group-data-[scrolled=true]:` variants.
 */
export default function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div aria-hidden="true" className="h-28 shrink-0 sm:h-36" />
      <header
        data-scrolled={scrolled}
        className="group fixed inset-x-0 top-0 z-40 h-28 pl-[calc(100vw-100%)] transition-[height] duration-300 data-[scrolled=true]:h-16 sm:h-36 sm:data-[scrolled=true]:h-16"
      >
        {/* Background lives on its own layer: backdrop-filter on the header itself would
            trap the fixed-position mobile menu inside the header's box. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 border-b border-transparent transition-colors duration-300 group-data-[scrolled=true]:border-gray-200/70 group-data-[scrolled=true]:bg-white/80 group-data-[scrolled=true]:backdrop-blur-md dark:group-data-[scrolled=true]:border-gray-800/70 dark:group-data-[scrolled=true]:bg-gray-950/80"
        />
        {children}
      </header>
    </>
  )
}
