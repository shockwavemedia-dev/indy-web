import { AdminRole } from '../AdminRole.type'

export type DepartmentMember = {
  adminUserId: number
  role: AdminRole
  firstName: string
  middleName?: string
  lastName: string
  fullName: string
}
