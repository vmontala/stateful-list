import data from '~/assets/social-posts-large.json'

import date from '~/utils/date'

const formatPost = (post) => ({
  id: post.id,
  status: post.status,
  title: post.title,
  headline: post.headline,
  platform: post.platform,
  author: post.meta.author,
  date: !post.published_date || (post.published_date === 'Invalid Date') ? null : {
    label: {
      relative: date.getRelative(post.published_date),
      initial: post.published_date,
    },
    value: new Date(post.published_date),
  },
})

export default defineStore('posts', () => {
  const list = ref([])

  const fetch = async () => {
    list.value = data.map(formatPost).sort((a, b) => {
      if (!b.date?.value) {
        return -1
      }

      if (!a.date?.value) {
        return 1
      }

      return b.date?.value - a.date?.value
    })
  }

  return {
    list,
    fetch,
  }
})
