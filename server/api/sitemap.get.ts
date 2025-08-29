// server/api/sitemap.get.ts
import { getBlogRoutes } from '../../utils/getBlogRoutes'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

export default async (req, res) => {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/contact', changefreq: 'monthly', priority: 0.5 },
    ...getBlogRoutes().map(path => ({ url: path, changefreq: 'weekly', priority: 0.7 }))
  ]

  const stream = new SitemapStream({ hostname: 'https://keblog.org' })
  res.setHeader('Content-Type', 'application/xml')
  const xml = await streamToPromise(Readable.from(links).pipe(stream))
  res.end(xml.toString())
}
