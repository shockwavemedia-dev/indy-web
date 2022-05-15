export type CreateEventForm = {
  requestedBy: number
  clientId: number
  subject: string
  services: Array<{ serviceId: number; extras: Array<string> }>
  duedate: Date | null
  description: string
  attachments: Array<File>
}
