export interface NewEventForm {
  requestedBy: number
  clientId: number
  subject: string
  services: Array<{ serviceId: number; extras: Array<string> }>
  duedate: Date | null
  description: string
  attachment: File | null
}
