import Chapter from '~/models/Chapter'
import Author from '~/models/Author'
import { MangaStatus } from '~/utils/constants'
import Tag from '~/models/Tag'

export default interface Manga {
  _id: string
  status: MangaStatus
  slug: string
  description: string
  imagePreview: string
  name: string
  otherName: string
  viewCount: number
  like: number
  follow: number
  chapters: Chapter[]
  author: Author
  tags: Tag[]
  publishedAt: string
  isLike: boolean
  isFollow: boolean
}
