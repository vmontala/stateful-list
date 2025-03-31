<template>
  <div class="posts">
    <div class="posts__filters">
      <Search v-model="filters.values.search" autofocus />
      <Dropdown v-model="filters.values.platform" :options="optionsStore.platforms" />
      <Dropdown v-model="filters.values.status" :options="optionsStore.statuses" />
      <Dropdown v-model="filters.values.sort" :options="optionsStore.sort" />
    </div>
    <div class="posts__list" v-if="sortedPosts.length">
      <Post
        :post="post"
        v-for="post in sortedPosts"
        :key="post.id"
      />
    </div>
    <div class="posts__empty" v-else>
      No posts matching the filters
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Post from '~/types/Post'

import useOptionsStore from '~/stores/options'
import usePostsStore from '~/stores/posts'

const optionsStore = useOptionsStore()
const postsStore = usePostsStore()

const posts = postsStore.list

const filters = reactive(useFilters({
  search: '',
  platform: '',
  status: '',
  sort: 'date',
}))

const filteredPosts = computed(() => {
  const {
    search,
    platform,
    status,
  } = filters.values

  return posts.filter((post) => (
    (!search || post.searchable.some((value) => value.includes(search.toLowerCase())))
    && (platform === '' || post.platform.value === platform)
    && (status === '' || post.status.value === status)
  ))
})

const sortMethods: { [key: string]: (a: Post, b: Post) => number } = {
  date: (a, b) => {
    if (!b.date?.value) {
      return -1
    }

    if (!a.date?.value) {
      return 1
    }

    return b.date?.value - a.date?.value
  },
  id: (a, b) => a.id - b.id,
  title: (a, b) => a.formattedTitle.localeCompare(b.formattedTitle),
}

const sortedPosts = computed(() => {
  const { sort } = filters.values

  if (!sortMethods[sort]) {
    return filteredPosts.value
  }

  return [...filteredPosts.value].sort(sortMethods[sort])
})

definePageMeta({
  title: 'Post list'
})
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  gap: var(--s-lg);

  .posts__filters {
    display: grid;
    gap: var(--s-lg);

    @container (min-width: 60rem) {
      grid-template-columns: repeat(2, 1fr);
    }

    @container (min-width: 90rem) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .posts__list {
    display: grid;
    gap: var(--s-lg);

    @container (min-width: 80rem) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .posts__empty {
    color: var(--color-generic-gray);
    font-style: italic;
    padding: var(--s-xl);
    text-align: center;
  }
}
</style>
