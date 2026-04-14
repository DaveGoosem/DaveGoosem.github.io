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
| `/projects`         | `app/projects/page.tsx`         | Projects page                            |

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

**Structured data (JSON-LD)** — blog posts render two `<script type="application/ld+json">` blocks: `BlogPosting` (from Contentlayer's `structuredData` computed field, enriched with author in `page.tsx`) and `BreadcrumbList` (built inline in `page.tsx`). The root layout renders a `WebSite` schema. Do not add duplicate schema blocks.

**Auto-generated files** (do not edit manually):

- `app/tag-data.json` — tag counts, written by Contentlayer's `onSuccess` callback
- `public/search.json` — kbar search index, written by the same callback
- `robots.ts` and `sitemap.ts` generate `/robots.txt` and `/sitemap.xml` at build time

## No API Routes

This is a static blog — there are no `/api/` routes. Do not add them.
