# App Router — Claude Code Context

## Route Structure

| Route               | File                            | Notes                                    |
| ------------------- | ------------------------------- | ---------------------------------------- |
| `/`                 | `app/page.tsx`                  | Home (recent posts via `Main.tsx`)       |
| `/blog`             | `app/blog/page.tsx`             | Post listing                             |
| `/blog/[...slug]`   | `app/blog/[...slug]/page.tsx`   | Individual post — slug from MDX filename |
| `/blog/page/[page]` | `app/blog/page/[page]/page.tsx` | Paginated listing                        |
| `/tags`             | `app/tags/page.tsx`             | All tags                                 |
| `/tags/[tag]`       | `app/tags/[tag]/page.tsx`       | Posts by tag                             |
| `/about`            | `app/about/page.tsx`            | About page                               |
| `/projects`         | `app/projects/page.tsx`         | Template placeholder, `noindex`          |
| `/contact`          | `app/contact/page.tsx`          | MDX from `data/pages/contact.mdx`        |
| `/privacy`          | `app/privacy/page.tsx`          | MDX from `data/pages/privacy.mdx`        |

## Blog Post Rendering

Posts flow: MDX file → Contentlayer2 (generates typed object) → `app/blog/[...slug]/page.tsx` → layout component (e.g. `DaveLayout`).

## SEO & Metadata

**For static pages** (`/about`, `/projects`, `/tags`, etc.) — use `genPageMetadata()` from `app/seo.tsx`:

```ts
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: 'Page Title', description: '...' })
```

**For blog posts** — metadata is generated dynamically in `app/blog/[...slug]/page.tsx` via `generateMetadata()`. It reads from the post's Contentlayer fields directly — do not duplicate it elsewhere.

**Do not write raw `<meta>` tags** — always go through the Next.js Metadata API or `genPageMetadata()`.

**Structured data (JSON-LD)** — built with the helpers in `app/structured-data.ts`. The root layout renders a `@graph` with `WebSite` + `Person` on every page; pages add their own `@graph` (`BlogPosting` + `BreadcrumbList` on posts, `ProfilePage`, `ContactPage`, `CollectionPage` on listings) that reference those by `@id`. Do not add duplicate `WebSite`/`Person` blocks.

**Auto-generated files** (do not edit manually):

- `app/tag-data.json` — tag counts, written by Contentlayer's `onSuccess` callback
- `public/search.json` — kbar search index, written by the same callback
- `public/md/**`, `public/llms.txt`, `public/llms-full.txt`, `app/agent-routes.json` — agent files, written by `scripts/agent-files.ts` from the same callback
- `robots.ts` and `sitemap.ts` generate `/robots.txt` and `/sitemap.xml` at build time

## No API Routes

This is a static blog — there are no `/api/` routes. Do not add them. The only request-time code is the root `middleware.ts`, which serves pre-generated Markdown to agents (see root CLAUDE.md).
