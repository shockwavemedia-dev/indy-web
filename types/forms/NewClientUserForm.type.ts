export type NewClientUserForm = {
  email: string
  password: string
  passwordConfirmation: string
  contactNumber: string
  firstName: string
  lastName?: string
  role: 'group manager' | 'marketing manager' | 'marketing' | null
  clientId: number
}
