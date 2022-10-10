export type CreateProjectBriefForm = {
  requestedBy: number
  clientId: number
  subject: string
  services: Array<{ serviceId: number; extras: Array<string>; customFields: Array<string> }>
  description: string
  attachments: Array<File>
  priority: string
}
