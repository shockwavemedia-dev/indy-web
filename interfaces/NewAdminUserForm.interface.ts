export interface NewAdminUserForm {
  email: string
  password: string
  birthDate: string
  passwordConfirmation: string
  contactNumber: string
  firstName: string
  lastName: string
  middleName?: string
  gender: 'female' | 'male' | null
  role: 'admin' | 'account_manager' | 'manager' | 'staff' | null
}
