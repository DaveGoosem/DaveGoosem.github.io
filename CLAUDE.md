# DaveGoosem.com — Claude Code Context

## Stack
- **Framework**: Next.js 14 (App Router), TypeScript
- **Content**: Contentlayer2 — MDX files in `data/blog/` and `data/authors/`
- **Styles**: Tailwind CSS 3 (class-based dark mode, Space Grotesk font)
- **Deployment**: Vercel
- **Package manager**: `yarn` — never use `npm install` or `npm run`
- **Comments**: Giscus (GitHub Discussions), configured via env vars
- **Search**: kbar (local `public/search.json`, regenerated on build)
- **Analytics**: Google Analytics via Pliny

## Key Commands
```bash
yarn dev          # start dev server
yarn build        # production build + postbuild (RSS, search index)
yarn lint         # ESLint with auto-fix
```

## Path Aliases (tsconfig.json)
| Alias | Resolves to |
|-------|------------|
| `@/components/*` | `components/*` |
| `@/data/*` | `data/*` |
| `@/layouts/*` | `layouts/*` |
| `@/css/*` | `css/*` |
| `contentlayer/generated` | `.contentlayer/generated` |

## Key Directories
| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages |
| `components/` | Shared React components |
| `layouts/` | Blog post layout templates |
| `data/blog/` | MDX blog posts (39 posts) |
| `data/authors/` | Author MDX profiles |
| `data/siteMetadata.js` | Site-wide config (title, URL, socials) |
| `public/static/images/` | Static image assets |
| `scripts/` | postbuild.mjs (RSS + search index) |

## Constraints
- Do not add API routes — this is a static/SSG blog with no backend
- Do not add a database or server-side state
- Contentlayer2 auto-generates TypeScript types on `yarn build` / `yarn dev` — do not edit `.contentlayer/` manually
- ESLint uses flat config (`eslint.config.mjs`) — not `.eslintrc`
- External links require `target="_blank"` and `rel="noopener noreferrer"` (enforced by ESLint)
