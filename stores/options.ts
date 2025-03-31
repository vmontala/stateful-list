import usePostsStore from './posts'

export default defineStore('options', () => {
  const postsStore = usePostsStore()

  const all = { label: 'All', value: '' }

  // Although this could be done on the `posts` store, I thought it would be better abstracted to a
  // different store or composable, and decided on a store so I can show stores with dependencies
  const platforms = computed(() => postsStore.list.reduce((unique, post) => {
    if (unique.some((platform) => platform.value === post.platform.value)) {
      return unique
    }

    return [
      ...unique,
      post.platform,
    ]
  }, [all]))

  const statuses = computed(() => postsStore.list.reduce((unique, post) => {
    // Most of this logic is the same, could be easily abstracted
    if (unique.some((status) => status.value === post.status.value)) {
      return unique
    }

    return [
      ...unique,
      post.status,
    ]
  }, [all]))

  const sort = [
    { label: 'Date', value: 'date' },
    { label: 'ID', value: 'id' },
    { label: 'Title', value: 'title' },
  ]

  return {
    platforms,
    statuses,
    sort,
  }
})
