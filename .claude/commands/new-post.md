Create a new blog post MDX file for this Next.js + Contentlayer2 blog.

The user will provide a title (or ask them for one if not given). Then:

1. Convert the title to a kebab-case filename: `data/blog/kebab-case-title.mdx`
2. Use today's date in `YYYY-MM-DD` format
3. Ask the user for a one-paragraph summary if they haven't provided one
4. Create the file with this exact frontmatter structure:

```mdx
---
title: 'Title Here'
date: 'YYYY-MM-DD'
tags: []
draft: true
summary: ''
layout: DaveLayout
images: []
authors: ['default']
---

Write your introduction here.
```

Set `draft: true` so it doesn't publish until the user is ready.
Leave `tags: []` empty — the user will add tags as they write.

After creating the file, tell the user:
- The file path created
- To run `yarn dev` to preview it at `http://localhost:3000/blog/[slug]`
- To change `draft: false` when ready to publish
