import Chapter from '~/models/Chapter'

export default interface MangaChapter {
  _id: string
  slug: string
  name: string
  imagePreview: string
  chapter: Chapter
  chapters: Chapter[]
  publishedAt: string
}
