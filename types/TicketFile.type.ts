export type TicketFile = {
  id: number
  name: string
  generatedName: string
  signedUrl: string
  signedUrlExpiration: Date | null
  directory: string
  description: string | null
  status:
    | 'approved'
    | 'back from review'
    | 'deleted'
    | 'in progress'
    | 'for review'
    | 'new'
    | 'request revision'
  isApproved: boolean
  approvedById: number | null
  version: string
  approvedAt: Date | null
  fileType: string
  ticketId: number
  thumbnailUrl: string
  fileId: number
  ticketCode: string
}
