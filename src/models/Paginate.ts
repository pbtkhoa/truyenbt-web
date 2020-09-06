interface Paginate<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
}
