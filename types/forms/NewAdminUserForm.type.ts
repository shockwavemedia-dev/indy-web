export type NewAdminUserForm = {
  email: string
  position: string
  password?: string
  sendInvite: boolean
  passwordConfirmation?: string
  contactNumber?: string
  birthDate: Date | null
  firstName: string
  lastName: string
  middleName?: string | null
  gender: 'female' | 'male' | null
  role: 'admin' | 'account manager' | 'manager' | 'staff' | null
}
