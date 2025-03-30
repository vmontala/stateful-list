import data from '~/assets/social-posts-large.json'

import date from '~/utils/date'
import array from '~/utils/array'

const formatPost = (post) => {
  const formattedDate = !post.published_date || (post.published_date === 'Invalid Date') ? null : {
    label: {
      relative: date.getRelative(post.published_date),
      initial: post.published_date,
    },
    value: new Date(post.published_date),
  }

  const formattedTitle = post.title || post.headline || '<Work in Progress>'

  return {
    id: post.id,
    formattedTitle,
    status: {
      label: `${post.status[0].toUpperCase()}${post.status.slice(1)}`,
      value: post.status,
    },
    title: post.title,
    headline: post.headline,
    content: post.content,
    platform: {
      label: post.platform,
      value: post.platform.toLowerCase(),
    },
    author: post.meta.author,
    date: formattedDate,
    link: post.link,
    tags: array.conjunction(post.meta.tags || []),
    images: post.meta.images,
    searchable: [
      `#${post.id}`,
      post.status,
      formattedTitle,
      post.platform,
      ...(post.author ? [post.author] : []),
      ...(formattedDate ? [formattedDate.label.relative] : []),
    ].map((item) => item.toLowerCase()),
  }
}

export default defineStore('posts', () => {
  const list = ref(data.map(formatPost))

  const getById = (id) => list.value.find((post) => post.id === id)

  return {
    list,
    getById,
  }
})
