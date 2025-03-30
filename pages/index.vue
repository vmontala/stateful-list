<template>
  <div class="posts">
    <div class="posts__filters">
      <Search v-model="filters.search" autofocus />
      <Dropdown v-model="filters.platform" :options="options.platforms" />
      <Dropdown v-model="filters.status" :options="options.statuses" />
      <Dropdown v-model="filters.sort" :options="options.sort" />
    </div>
    <div class="posts__list">
      <Post
        :post="post"
        v-for="post in sortedPosts"
        :key="post.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import usePostsStore from '~/stores/posts'
import useOptionsStore from '~/stores/options'

const postsStore = usePostsStore()
const optionsStore = useOptionsStore()

const filters = ref({
  search: '',
  platform: '',
  status: '',
  sort: 'date',
})

const options = {
  platforms: [
    { label: 'All', value: '' },
    ...optionsStore.platforms,
  ],
  statuses: [
    { label: 'All', value: '' },
    ...optionsStore.statuses,
  ],
  sort: [
    { label: 'Date', value: 'date' },
    { label: 'ID', value: 'id' },
    { label: 'Title', value: 'title' },
  ],
}

const posts = postsStore.list

const filteredPosts = computed(() => {
  const {
    search,
    platform,
    status,
  } = filters.value

  return posts.filter((post) => (
    (!search || post.searchable.some((value) => value.includes(search.toLowerCase())))
    && (platform === '' || post.platform.value === platform)
    && (status === '' || post.status.value === status)
  ))
})

const sortMethods = {
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
  const { sort } = filters.value

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
}
</style>
