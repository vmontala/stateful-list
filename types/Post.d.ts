import type PostImage from './PostImage'
import type PostStatus from './PostStatus'

interface PostDate {
  label: {
    relative: string,
    initial: string,
  },
  value: number,
}

export default interface Post {
  id: number,
  status: PostStatus,
  formattedTitle: string,
  title: string | null,
  headline: string | null,
  content: string,
  platform: {
    label: string,
    value: string,
  },
  author: string | null,
  date: PostDate | null,
  link: string | null,
  tags: string,
  images: PostImage[],
  searchable: string[],
}
