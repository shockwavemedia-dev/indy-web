export type EditAdminUserForm = {
  birthDate: Date | null
  contactNumber: string
  firstName: string
  lastName: string
  middleName?: string | null
  gender: string | null
  role: string
}
