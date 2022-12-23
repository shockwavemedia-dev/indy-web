export type CreateProjectBriefForm = {
  requestedBy: number
  clientId: number
  subject: string
  services: Array<{
    serviceId: number
    serviceName: string
    extras: Array<string>
    customFields: Array<string>
    updatedExtras: Array<{ name: string; quantity?: number | string | null }>
    postDate: Date | null | undefined
  }>
  description: string
  attachments: Array<File>
  priority: string
}
