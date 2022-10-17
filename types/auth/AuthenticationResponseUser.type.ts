import { Client } from '../Client.type'
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
    type: 'admin_users' | 'client_users' | 'lead_client' | 'printer'
    role:
      | 'admin'
      | 'manager'
      | 'staff'
      | 'account manager'
      | 'marketing'
      | 'marketing manager'
      | 'group manager'
      | 'print manager'
    clientId: number
    department: Department
    client: Client
  }
}
