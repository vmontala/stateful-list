import usePostsStore from './posts'

export default defineStore('options', () => {
  const postsStore = usePostsStore()

  const platforms = computed(() => postsStore.list.reduce((unique, post) => {
    if (unique.some((platform) => platform.value === post.platform.value)) {
      return unique
    }

    return [
      ...unique,
      post.platform,
    ]
  }, []))

  const statuses = computed(() => postsStore.list.reduce((unique, post) => {
    if (unique.some((status) => status.value === post.status.value)) {
      return unique
    }

    return [
      ...unique,
      post.status,
    ]
  }, []))

  return {
    platforms,
    statuses,
  }
})
