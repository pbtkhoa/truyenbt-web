export default interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  accessCountToken: string
  fullName?: string
  updatedAt: string
  createdAt: string
}
