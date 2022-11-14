export type EditAdminUserForm = {
  id?: number | null
  contactNumber?: string | null
  firstName: string
  position: string
  lastName?: string | null
  role: string
  status: 'active' | 'inactive' | 'guest' | 'not verified' | 'revoked' | 'deleted' | null
}
