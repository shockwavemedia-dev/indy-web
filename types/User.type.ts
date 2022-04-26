import { UserRole } from './UserRole.type'

export type User = {
  adminUserId: number
  role: UserRole
  firstName: string
  middleName: string
  lastName: string
}
