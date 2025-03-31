import type Post from '~/types/Post'
import type PostImage from '~/types/PostImage'

import data from '~/assets/social-posts-large.json'

import date from '~/utils/date'
import array from '~/utils/array'

interface UnformattedPost {
  id: number,
  platform: string,
  title: string | null,
  status: string,
  headline: string | null,
  content: string,
  published_date: string | null,
  link: string | null,
  meta: {
    author: string | null,
    tags: string[],
    images: PostImage[]
  }
}

const formatPost = (post: UnformattedPost): Post => {
  const formattedDate = !post.published_date || (post.published_date === 'Invalid Date') ? null : {
    label: {
      relative: date.getRelative(post.published_date),
      initial: post.published_date,
    },
    value: +(new Date(post.published_date)),
  }

  const formattedTitle = post.title || post.headline || '<Work in Progress>'

  return {
    id: post.id,
    status: {
      label: `${post.status[0].toUpperCase()}${post.status.slice(1)}`,
      value: post.status,
    },
    formattedTitle,
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
      ...(post.meta.author ? [post.meta.author] : []),
      ...(formattedDate ? [formattedDate.label.relative] : []),
    ].map((item) => item.toLowerCase()),
  }
}

export default defineStore('posts', () => {
  const list = ref((data as UnformattedPost[]).map(formatPost))

  const getById = (id: number) => list.value.find((post: Post) => post.id === id)

  return {
    list,
    getById,
  }
})
