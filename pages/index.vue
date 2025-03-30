<template>
  <div class="posts">
    <Post
      :post="post"
      v-for="post in postsStore.list"
      :key="post.id"
    />
  </div>
</template>

<script lang="ts" setup>
import usePostsStore from '~/stores/posts'

const postsStore = usePostsStore()

definePageMeta({
  title: 'Post list'
})
</script>

<style scoped>
.posts {
  display: grid;
  gap: var(--s-lg);

  @container (min-width: 80rem) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
