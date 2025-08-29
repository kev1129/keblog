import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getBlogRoutes() {
  const blogDir = path.join(__dirname, 'content/blog')
  const files = fs.readdirSync(blogDir)
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => '/blog/' + f.replace(/\.md$/, ''))
}



// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true, 
  site: { 
    url: 'https://keblog.org', 
    name: 'This is keblog.' 
  }, 
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'keblog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1'},
        { name: 'description', content: 'keblog | 遠征登山の情報や記録をまとめたブログ'},
        { name: 'keywords', content: 'レーニン峰, 登山, 高所登山, 装備, 記録, Lenin Peak, Expedition' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},

        // OGP用
        { property: 'og:title', content: 'keblog' },
        { property: 'og:description', content: 'keblog | 遠征登山の情報や記録をまとめたブログ' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://keblog.org' },
        { property: 'og:image', content: 'https://keblog.org/og-image.png' },

        // Twitterカード
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'keblog' },
        { name: 'twitter:description', content: 'keblog | 遠征登山の情報や記録をまとめたブログ' },
        { name: 'twitter:image', content: 'https://keblog.org/og-image.png' }
      ],
      link: [
          { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
          { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
          { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }, // apple home icon
          { rel: 'manifest', href: '/site.webmanifest' }, // Android系
        ],
  
    }
  },
  devtools: { enabled: true },
  pages: true,
  modules: ['@nuxt/content', 
    '@nuxtjs/google-fonts', 
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  gtag: {
    id: 'G-64QE574FWB'
  },
  css: [
    '/assets/scss/global.scss',
    '/assets/scss/article.scss',
//    '/assets/scss/typora-base.scss',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  sitemap: {
    siteUrl: 'https://keblog.org',
    gzip: true,
//    routes: async () => {
//      const { $content } = require('@nuxt/content')
//      const articles = await $content('blog').only(['path']).fetch()
//      return ['/', '/contact', ...articles.map(a => a.path)]
//    },

//    routes: [
//      '/',
//      '/contact',
//      ...getBlogRoutes(),
//      '/blog/lenin-doc',
//      '/blog/lenin-guide',
//      '/blog/island',
//      '/blog/howto-select-crampon',
//    ],

//routes: async () => {
//  const { $content } = require('@nuxt/content')
//  const articles = await $content('blog').only(['path']).fetch()
//  return articles.map(article => article.path)
//}
  },
  nitro: {
    prerender: {
      // 静的生成したいページだけ prerender
      routes: ['/contact']
    }
  },
  googleFonts: {
    families: {
      'Lato': true,
      'Noto+Sans+JP': true,
      'Roboto': true,
      'Open Sans': true,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})