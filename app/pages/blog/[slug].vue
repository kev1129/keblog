<template>
    <v-container class="article">
        <!-- Render the blog post as Prose & Vue components -->
        <template v-if="post">
            <h1 class="post-title">{{ post.title }}</h1>
            <Toc />
            <ContentRenderer v-if="post" :value="post" />
        </template>
        <template v-else>
            <div>
                <h1>Page Not Found</h1>
                <p>Oops! The content you're looking for doesn't exist.</p>
                <NuxtLink to="/">Go back home</NuxtLink>
            </div>
        </template>
    </v-container>
</template>

<script setup>
const slug = useRoute().params.slug

const route = useRoute()

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

useHead({
  title: post.title,
  meta: [
    { name: 'description', content: post.description },
//    { name: 'keywords', content: post.keywords },
    // OGPも記事ごとに出したい場合
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.description },
//    { property: 'og:image', content: post.ogImage || '/default-og.png' },
  ],
  link: [
        {
        rel: 'canonical',
        href: `https://keblog.org${route.path}`
        }
    ]
})



</script>

<style>
.post-title {
    display: inline-block;
    padding: 0;
    font-size: 1.6rem;
}
</style>


