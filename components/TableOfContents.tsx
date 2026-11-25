'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Toc } from 'pliny/mdx-plugins/remark-toc-headings'

interface Props {
  toc: Toc
  maxDepth?: number
}

/** "On this page" list that highlights the section currently in view. */
export default function TableOfContents({ toc, maxDepth = 3 }: Props) {
  const items = useMemo(() => toc.filter((item) => item.depth <= maxDepth), [toc, maxDepth])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.url.replace(/^#/, '')))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null
  const minDepth = Math.min(...items.map((i) => i.depth))

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        On this page
      </p>
      <ul className="space-y-1 border-l border-gray-200 text-sm dark:border-gray-800">
        {items.map((item) => {
          const id = item.url.replace(/^#/, '')
          const active = id === activeId
          return (
            <li key={item.url} style={{ paddingLeft: `${(item.depth - minDepth) * 0.75}rem` }}>
              <a
                href={item.url}
                className={`-ml-px block border-l py-1 pl-3 leading-snug transition-colors ${
                  active
                    ? 'border-primary-500 font-medium text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-100'
                }`}
              >
                {item.value}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
