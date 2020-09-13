export interface ChapterImage {
  _id: string
  order: number
  imageUrl: string
}

export default interface Chapter {
  _id: string
  number: string
  viewCount: number
  images: ChapterImage[]
  updatedAt: string
}
