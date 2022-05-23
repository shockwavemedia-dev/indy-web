import { UserRole } from './UserRole.type'

export type User = {
  adminUserId: number
  id: number
  role: UserRole
  fullName: string
  firstName: string
  middleName: string
  lastName: string
  status: string
  email: string
  contactNumber: string
  gender: string
  birthDate: Date
  userType: {
    id: number
    type: string
    role: string
    departments: []
  }
}
