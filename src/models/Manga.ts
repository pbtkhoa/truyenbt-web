import Chapter from '~/models/Chapter'

export default interface Manga {
  _id: string
  status: number
  slug: string
  description: string
  imagePreview: string
  name: string
  otherName: string
  createdAt: string
  updatedAt: string
  chapters: Chapter[]
}
