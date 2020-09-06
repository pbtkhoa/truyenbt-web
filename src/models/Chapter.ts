export interface ChapterImage {
  _id: string
  order: number
  imageUrl: string
}

export default interface Chapter {
  _id: string
  number: number
  view: number
  images: ChapterImage[]
  updatedAt: string
}
