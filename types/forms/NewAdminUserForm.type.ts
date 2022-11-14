export type NewAdminUserForm = {
  email: string
  position: string
  password?: string
  sendInvite: boolean
  passwordConfirmation?: string
  contactNumber?: string | null
  firstName: string
  lastName?: string | null
  role: 'admin' | 'account manager' | 'manager' | 'staff' | null
}
