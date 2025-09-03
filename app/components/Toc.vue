<template>
      <nav v-if="post.body.toc?.links?.length" class="toc">
        <h2 class="toc-title">目次</h2>
        <div class="toc-border">
            <ul>
                <li v-for="link in post.body.toc.links" :key="link.id">
                    <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>

                    <!-- サブ階層 -->
                    <ul v-if="link.children?.length">
                    <li v-for="child in link.children" :key="child.id">
                        <NuxtLink :to="`#${child.id}`">{{ child.text }}</NuxtLink>
                    </li>
                    </ul>
                </li>
            </ul>
        </div>
      </nav>  
</template>
  
<script setup>

const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

</script>


<style scoped>
.toc {
  margin-bottom: 2rem;
  padding: 1rem;
}

.toc-border {
    border-left: 4px solid #ccc;
}

.toc-title {
    font-size: 1.4rem;
    margin-bottom: 20px;
    margin-top: 22px;
}

.toc ul {
  list-style: none;
  margin-left: 1.6rem;
  padding-left: 0;
}
.toc li {
  margin: 0.3rem 0;
    padding: 0;
    font-size: 0.9rem;
}
.toc a {
  text-decoration: none;
  color: #333;
}
</style>