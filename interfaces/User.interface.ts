export interface User {
  id: number
  email: string
  morphableType: string
  morphableId: number
  status: string
  firstName: string
  middleName: string
  lastName: string
  contactNumber: string
  gender: string
  birthDate: string
  emailVerifiedAt: Date
  createdAt: Date
  updatedAt: Date
}
