# App Router — Claude Code Context

## Route Structure
| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Home (recent posts via `Main.tsx`) |
| `/blog` | `app/blog/page.tsx` | Post listing |
| `/blog/[...slug]` | `app/blog/[...slug]/page.tsx` | Individual post — slug from MDX filename |
| `/blog/page/[page]` | `app/blog/page/[page]/page.tsx` | Paginated listing |
| `/tags` | `app/tags/page.tsx` | All tags |
| `/tags/[tag]` | `app/tags/[tag]/page.tsx` | Posts by tag |
| `/about` | `app/about/page.tsx` | About page |
| `/projects` | `app/projects/page.tsx` | Projects page |

## Blog Post Rendering
Posts flow: MDX file → Contentlayer2 (generates typed object) → `app/blog/[...slug]/page.tsx` → layout component (e.g. `DaveLayout`).

## SEO
- Use `app/seo.tsx` utilities for metadata — do not write raw `<meta>` tags
- `robots.ts` and `sitemap.ts` are auto-generated at build time

## No API Routes
This is a static blog — there are no `/api/` routes. Do not add them.
