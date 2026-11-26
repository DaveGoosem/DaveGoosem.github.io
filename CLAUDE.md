# DaveGoosem.com — Claude Code Context

## Stack

- **Framework**: Next.js 15 (App Router), TypeScript
- **Content**: Contentlayer2 — MDX files in `data/blog/` and `data/authors/`
- **Styles**: Tailwind CSS 3 (class-based dark mode, Space Grotesk font)
- **Deployment**: Vercel
- **Package manager**: `npm`
- **Comments**: Giscus (GitHub Discussions), configured via env vars
- **Search**: kbar (local `public/search.json`, regenerated on build)
- **Analytics**: Google Analytics via Pliny

## Key Commands

```bash
npm run dev       # start dev server
npm run build     # production build + postbuild (RSS, search index)
npm run lint      # ESLint with auto-fix
```

## Path Aliases (tsconfig.json)

| Alias                    | Resolves to               |
| ------------------------ | ------------------------- |
| `@/components/*`         | `components/*`            |
| `@/data/*`               | `data/*`                  |
| `@/layouts/*`            | `layouts/*`               |
| `@/css/*`                | `css/*`                   |
| `contentlayer/generated` | `.contentlayer/generated` |

## Key Directories

| Path                    | Purpose                                |
| ----------------------- | -------------------------------------- |
| `app/`                  | Next.js App Router pages               |
| `components/`           | Shared React components                |
| `layouts/`              | Blog post layout templates             |
| `data/blog/`            | MDX blog posts (41 posts)              |
| `data/authors/`         | Author MDX profiles                    |
| `data/siteMetadata.js`  | Site-wide config (title, URL, socials) |
| `public/static/images/` | Static image assets                    |
| `scripts/`              | postbuild.mjs (RSS + search index)     |

## SEO & Structured Data

The following are already implemented — do not duplicate or replace them:

- **Canonical URLs** — set in `generateMetadata()` in `app/blog/[...slug]/page.tsx` via `post.canonicalUrl ?? computed URL`
- **JSON-LD** — shared helpers in `app/structured-data.ts`. `WebSite` + `Person` on every page (`app/layout.tsx`); `BlogPosting` (base from Contentlayer's `structuredData` in `contentlayer.config.ts`, enriched in `app/blog/[...slug]/page.tsx`) + `BreadcrumbList` on posts; `ProfilePage` (/about), `ContactPage` (/contact), `CollectionPage` (/blog, /tags/[tag])
- **Publisher logo** — uses `DaveGoosem.com_Logo_Black.png` (not the white variant) so it is legible on white backgrounds as Google requires
- **Sitemap** — `app/sitemap.ts`, auto-generated, excludes drafts
- **Robots** — `app/robots.ts`, auto-generated

## Agent readiness (AI agents / AEO)

Generated from content on every `npm run dev` / `npm run build` by `scripts/agent-files.ts` (called from Contentlayer's `onSuccess`) — do not edit the outputs:

- `public/md/**` — Markdown version of every page (gitignored)
- `public/llms.txt` (index + "when to use this site" guidance) and `public/llms-full.txt` (all posts) — gitignored
- `app/agent-routes.json` — page path → Markdown file map, committed (like `app/tag-data.json`)

`middleware.ts` serves those Markdown files for requests with `Accept: text/markdown`, and a Markdown 404 (real 404 status) for unknown paths. Its matcher only fires on that header, so normal traffic never invokes it.

Shared JSON-LD lives in `app/structured-data.ts`: one `Person` (`#person`) and `WebSite` (`#website`) emitted on every page by `app/layout.tsx`, referenced by `BlogPosting`, `ProfilePage`, `ContactPage` and `CollectionPage`. Person fields come from `data/authors/default.mdx` (`description`, `companyUrl`, socials) and `data/mvpAwards.ts`. Pages pass `markdownPath` to `genPageMetadata()` to advertise their Markdown version.

Standalone pages (`/contact`, `/privacy`) are MDX in `data/pages/<slug>.mdx` (Contentlayer `Page` type).

After adding a Contentlayer document type or field, restart `npm run dev` — the dev watcher keeps serving stale data until restarted.

## Constraints

- Do not add API routes — this is a static/SSG blog with no backend. The one exception is `middleware.ts` (Markdown negotiation for agents, header-gated); keep it free of data stores and outbound calls
- Do not add a database or server-side state
- Contentlayer2 auto-generates TypeScript types on `npm run build` / `npm run dev` — do not edit `.contentlayer/` manually
- ESLint uses flat config (`eslint.config.mjs`) — not `.eslintrc`
- External links require `target="_blank"` and `rel="noopener noreferrer"` (enforced by ESLint)

## Gotchas

**Contentlayer scans all of `data/`** — any plain `.md` file placed inside `data/` (e.g. a `CLAUDE.md`) must be added to `contentDirExclude` in `contentlayer.config.ts` → `makeSource()`, otherwise Contentlayer warns and skips it at startup.

**Content Security Policy** — `next.config.js` contains a hand-written CSP string. If you add any external script, font, frame, or image source (e.g. a new analytics provider, embed, or CDN), add its hostname to the appropriate CSP directive in that file or the browser will silently block it.

**Remote images** — `next/image` only proxies domains listed in `next.config.js` → `images.remotePatterns`. Currently only `picsum.photos` is allowed. Add new domains there before using external image URLs in posts or components.

**Bundle analysis** — run `ANALYZE=true npm run build` to open the webpack bundle visualiser. Useful before committing large new dependencies.
