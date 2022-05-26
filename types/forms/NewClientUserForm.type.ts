export type NewClientUserForm = {
  email: string
  password: string
  birthDate: Date | null
  passwordConfirmation: string
  contactNumber: string
  firstName: string
  lastName: string
  middleName?: string
  gender: 'female' | 'male' | null
  role: 'group manager' | 'marketing manager' | 'marketing' | null
  clientId: number
}
