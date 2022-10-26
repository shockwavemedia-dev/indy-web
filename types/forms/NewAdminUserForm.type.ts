export type NewAdminUserForm = {
  email: string
  position: string
  password: string
  birthDate: Date | null
  passwordConfirmation: string
  contactNumber: string
  firstName: string
  lastName: string
  middleName?: string | null
  gender: 'female' | 'male' | null
  role: 'admin' | 'account manager' | 'manager' | 'staff' | null
}
