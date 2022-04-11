export type User = {
  adminUserId: number
  role: 'account_manager' | 'admin' | 'manager' | 'staff'
  firstName: string
  middleName: string
  lastName: string
}
