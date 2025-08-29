// utils/getBlogRoutes.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function getBlogRoutes() {
  const blogDir = path.join(__dirname, '../content/blog')
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir)
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => '/blog/' + f.replace(/\.md$/, ''))
}
