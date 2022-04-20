export type CreateSupportRequestForm = {
  subject: string
  description: string
  type: string
  requestedBy: number
  clientId: number
  departmentId: number
  duedate: Date | null
}
