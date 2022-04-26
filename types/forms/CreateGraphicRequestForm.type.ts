export type CreateGraphicRequestForm = {
  requestedBy: number
  clientId: number
  subject: string
  extras: Array<string>
  duedate: Date | null
  description: string
  attachments?: Array<File>
}
