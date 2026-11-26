import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const today = new Date().toISOString().split('T')[0]
  const routes = ['', 'blog', 'tags', 'about', 'contact', 'privacy'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: today,
  }))

  const tagRoutes = Object.keys(tagData).map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: today,
  }))

  return [...routes, ...blogRoutes, ...tagRoutes]
}
