import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'

/**
 * Maps each tag slug (as stored in tag-data.json) to the display casing authors use in
 * frontmatter, e.g. `sitecoreai` -> `SitecoreAI`. If a tag is written several ways,
 * the most common spelling wins.
 */
export function getTagLabels(): Record<string, string> {
  const variants: Record<string, Record<string, number>> = {}
  for (const post of allBlogs) {
    for (const tag of post.tags ?? []) {
      const key = slug(tag)
      variants[key] ??= {}
      variants[key][tag] = (variants[key][tag] ?? 0) + 1
    }
  }
  return Object.fromEntries(
    Object.entries(variants).map(([key, counts]) => [
      key,
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0],
    ])
  )
}
