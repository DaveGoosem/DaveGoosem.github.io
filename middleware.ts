/**
 * Markdown content negotiation for AI agents.
 *
 * Only runs for requests whose Accept header asks for text/markdown (see `config.matcher`),
 * so normal browser traffic never invokes it. The Markdown itself is pre-generated at build
 * time into public/md/ by scripts/agent-files.ts; this just picks the right file, or returns a
 * Markdown 404 with a real 404 status for unknown paths.
 *
 * This is the one piece of request-time logic in an otherwise static site: there are no API
 * routes, no data store, and the matcher keeps it off the normal request path.
 */
import { NextRequest, NextResponse } from 'next/server'
import routes from './app/agent-routes.json'

const SITE = 'https://davegoosem.com'
const markdownHeaders = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept',
}

export function middleware(request: NextRequest) {
  const pathname = decodeURIComponent(request.nextUrl.pathname).replace(/\/+$/, '') || '/'
  const file = (routes as Record<string, string>)[pathname]

  if (file) {
    const response = NextResponse.rewrite(new URL(`/md/${file}`, request.url))
    Object.entries(markdownHeaders).forEach(([key, value]) => response.headers.set(key, value))
    response.headers.set('Link', `<${SITE}${pathname === '/' ? '' : pathname}>; rel="canonical"`)
    return response
  }

  const body = `# 404: Page not found

There is no page at \`${pathname}\` on DaveGoosem.com.

- Index of every post, for agents: ${SITE}/llms.txt
- All posts: ${SITE}/blog (Markdown: ${SITE}/md/blog.md)
- Topics: ${SITE}/tags
- Sitemap: ${SITE}/sitemap.xml
`
  return new NextResponse(body, { status: 404, headers: markdownHeaders })
}

export const config = {
  matcher: [
    {
      // Page paths only: skip Next internals and anything with a file extension (llms.txt, images, /md/*.md)
      source: '/((?!_next/|.*\\.[^/]+$).*)',
      has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
    },
  ],
}
