export type NewAdminUserForm = {
  email: string
  password: string
  birthDate: Date | null
  passwordConfirmation: string
  contactNumber: string
  firstName: string
  lastName: string
  middleName?: string | null
  gender: 'female' | 'male' | null
  role: 'admin' | 'account_manager' | 'manager' | 'staff' | null
}
