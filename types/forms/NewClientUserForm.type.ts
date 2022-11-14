export type NewClientUserForm = {
  email: string
  password?: string | null
  passwordConfirmation?: string | null
  contactNumber?: string
  firstName: string
  lastName?: string | null
  sendInvite: boolean
  role: 'group manager' | 'marketing manager' | 'marketing' | null
  clientId: number
}
