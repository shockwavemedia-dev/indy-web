export interface NewClientUserForm {
  email: string
  password: string
  birthDate: string
  passwordConfirmation: string
  contactNumber: string
  firstName: string
  lastName: string
  middleName?: string
  gender: 'female' | 'male' | null
  role: 'group_manager' | 'marketing_manager' | 'marketing' | null
  clientId: number
}
