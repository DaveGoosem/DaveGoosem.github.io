# Blog Posts — Claude Code Context

## Creating a New Post
- File name: `kebab-case-title.mdx` in this directory (`data/blog/`)
- Contentlayer picks up all `*.mdx` files here automatically — no registration needed

## Frontmatter Schema
```yaml
---
title: 'Your Post Title'
date: 'YYYY-MM-DD'
tags: ['XMCloud', 'Sitecore', 'Next.js']
draft: false
summary: 'One-paragraph summary displayed on listing pages and in RSS.'
layout: DaveLayout
images: []
authors: ['default']
---
```

### Field notes
| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Displayed in `<h1>` and `<title>` |
| `date` | yes | ISO format `'YYYY-MM-DD'` |
| `tags` | yes | Array of strings; capitalise consistently (e.g. `'XMCloud'` not `'xmcloud'`) |
| `draft` | yes | `false` to publish, `true` to hide from listings |
| `summary` | yes | Also used for OG description |
| `layout` | no | Default: `DaveLayout`. Options: `DaveLayout`, `PostLayout`, `PostSimple`, `PostBanner` |
| `images` | no | Array of image paths or `[]`. First image used as OG image if provided |
| `authors` | no | Defaults to `['default']` (David Goosem) |

## Images
Store post images at:
```
public/static/images/posts/YYYY/post-slug-name/image1.png
```
Reference in MDX as:
```md
![Alt text](/static/images/posts/YYYY/post-slug-name/image1.png 'Optional title')
```

## Common Tags (existing — keep casing consistent)
`XMCloud`, `Sitecore`, `JSS`, `SXA`, `SaaS`, `Next.js`, `Vercel`, `Azure`, `AWS`,
`CI/CD`, `Accessibility`, `SEO`, `Search`, `Solr`, `Architecture`, `Helix`
