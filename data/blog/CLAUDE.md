# Blog Posts — Claude Code Context

## Creating a New Post

- File name: `kebab-case-title.mdx` in this directory (`data/blog/`)
- Contentlayer picks up all `*.mdx` files here automatically — no registration needed

## Frontmatter Schema

```yaml
---
title: 'Your Post Title'
date: 'YYYY-MM-DD'
lastmod: 'YYYY-MM-DD'
tags: ['XMCloud', 'Sitecore', 'Next.js']
draft: true
summary: 'One-paragraph summary displayed on listing pages and in RSS.'
layout: DaveLayout
images: ['/static/images/posts/YYYY/post-slug-name/og-image.png']
authors: ['default']
canonicalUrl: ''
---
```

### Field notes

| Field          | Required | Notes                                                                                 |
| -------------- | -------- | ------------------------------------------------------------------------------------- |
| `title`        | yes      | Displayed in `<h1>` and `<title>`                                                     |
| `date`         | yes      | ISO format `'YYYY-MM-DD'` — original publish date, never change it                    |
| `lastmod`      | no       | ISO format — set when substantially updating a post; drives `dateModified` in JSON-LD |
| `tags`         | yes      | Array of strings; see tag list below — casing matters                                 |
| `draft`        | yes      | `true` while writing, `false` to publish                                              |
| `summary`      | yes      | Also used for OG description and RSS — write a complete sentence                      |
| `layout`       | no       | Default: `DaveLayout` — see `layouts/CLAUDE.md` for differences                       |
| `images`       | no       | **Must be non-empty before publishing.** First entry is the OG/social share image     |
| `authors`      | no       | Defaults to `['default']` (David Goosem)                                              |
| `canonicalUrl` | no       | Only set if this post was originally published elsewhere                              |

## Images

Store images at:

```
public/static/images/posts/YYYY/post-slug-name/image.png
```

Reference in MDX body as:

```md
![Alt text](/static/images/posts/YYYY/post-slug-name/image.png 'Optional title')
```

**The `images:` frontmatter field must be non-empty before setting `draft: false`.** It drives the OpenGraph/social share image — empty means the site falls back to the generic banner. Ideal OG dimensions: 1200×630px.

If no purpose-built banner exists, promote the first meaningful body image:

```yaml
images: ['/static/images/posts/YYYY/post-slug-name/image.png']
```

## Contentlayer Gotcha

Contentlayer scans the entire `data/` directory. Any `.md` file here (including instruction files like this one) must be listed in `contentDirExclude` in `contentlayer.config.ts`, otherwise Contentlayer logs a warning and skips it. The current exclude list is at the top of `makeSource()`.

## Common Tags (existing — keep casing consistent)

`XMCloud`, `Sitecore`, `JSS`, `SXA`, `SaaS`, `Next.js`, `Vercel`, `Azure`, `AWS`,
`CI/CD`, `Accessibility`, `SEO`, `Search`, `Solr`, `Architecture`, `Helix`

> ⚠️ **Tag casing is enforced by display** — use exactly the capitalisation above. In particular: `Solr` (not `SOLR`), `Next.js` (not `NextJS`), `XMCloud` (no space or hyphen).
