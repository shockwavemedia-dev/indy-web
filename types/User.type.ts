import { UserRole } from './UserRole.type'

export type User = {
  adminUserId: number
  id: number
  role: UserRole
  firstName: string
  middleName: string
  lastName: string
  status: string
  userType: {
    id: number
    type: string
    role: string
    departments: []
  }
}
