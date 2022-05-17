import { Department } from '../Department.type'

export type AuthenticationResponseUser = {
  id: number
  email: string
  status: 'active' | 'deleted' | 'guest' | 'inactive' | 'not_verified' | 'revoked'
  firstName: string
  middleName: string
  lastName: string
  contactNumber: string
  gender: string
  birthDate: Date
  userType: {
    id: number
    type: 'admin_users' | 'client_users' | 'lead_client'
    role:
      | 'admin'
      | 'manager'
      | 'staff'
      | 'account_manager'
      | 'marketing'
      | 'marketing_manager'
      | 'group_manager'
    clientId: number
    departments: Array<Department>
  }
}
