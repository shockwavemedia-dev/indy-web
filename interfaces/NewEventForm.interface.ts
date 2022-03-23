export interface NewEventForm {
  requestedBy: number
  clientId: number
  subject: string
  services: Array<{ serviceId: number; extras: Array<string> }>
  duedate: string
  description: string
  attachment: File | null
}
