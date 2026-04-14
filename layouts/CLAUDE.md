# Layouts — Claude Code Context

## Post Layouts (used in blog post frontmatter)

| Layout       | Comments    | Hero image             | Author sidebar | Prev/Next | Use when                      |
| ------------ | ----------- | ---------------------- | -------------- | --------- | ----------------------------- |
| `DaveLayout` | Off         | Yes — from `images[0]` | Yes            | Yes       | **Default for all new posts** |
| `PostLayout` | On (Giscus) | Yes — from `images[0]` | Yes            | Yes       | Want Giscus comments enabled  |
| `PostBanner` | On (Giscus) | Full-bleed banner      | No             | No        | Feature/visual-heavy posts    |
| `PostSimple` | On (Giscus) | No                     | No             | No        | Minimal/short-form posts      |

`DaveLayout` is the default set in `app/blog/[...slug]/page.tsx`. Giscus is configured via env vars — see `data/siteMetadata.js`.

## System Layouts (not for posts)

| Layout               | Used by                                      |
| -------------------- | -------------------------------------------- |
| `ListLayout`         | `app/blog/page.tsx` — paginated post listing |
| `ListLayoutWithTags` | `app/tags/[tag]/page.tsx` — filtered by tag  |
| `AuthorLayout`       | `app/about/page.tsx` — author profile        |

Do not reference these in blog post frontmatter.

## Adding a New Layout

1. Create `layouts/YourLayout.tsx` — follow the `LayoutProps` interface pattern from an existing layout
2. Register it in the `layouts` map in `app/blog/[...slug]/page.tsx`
3. It becomes available as a `layout:` value in post frontmatter
