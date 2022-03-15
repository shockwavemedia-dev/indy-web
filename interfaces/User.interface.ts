export interface User {
  id: number
  email: string
  status: 'active' | 'deleted' | 'inactive' | 'not_verified' | 'revoked'
  firstName: string
  middleName: string
  lastName: string
  contactNumber: string
  gender: string
  birthDate: Date
  userType: {
    id: number
    type: 'admin_users' | 'client_users'
    role:
      | 'account_manager'
      | 'admin'
      | 'manager'
      | 'staff'
      | 'marketing'
      | 'marketing_manager'
      | 'group_manager'
    clientId: number
  }
}
