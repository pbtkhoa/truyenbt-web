import Chapter from '~/models/Chapter'

export default interface MangaChapter {
  _id: string
  slug: string
  name: string
  chapter: Chapter
  chapters: Chapter[]
  createdAt: string
  updatedAt: string
}
