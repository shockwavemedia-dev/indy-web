export type EditAdminUserForm = {
  birthDate: Date | null
  contactNumber: string
  firstName: string
  lastName: string
  middleName?: string | null
  gender: 'female' | 'male' | null
  role: string
  status: 'active' | 'inactive' | 'guest' | 'not_verified' | 'revoked' | 'deleted' | null
}
