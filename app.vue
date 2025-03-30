<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import usePostsStore from '~/stores/posts'

const postsStore = usePostsStore()

await callOnce('posts', () => postsStore.fetch())
</script>
