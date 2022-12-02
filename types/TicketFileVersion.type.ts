export type TicketFileVersion = {
  id: number
  name: string
  ticketFileId: number
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
  isLatest: boolean
  fileVersion: number
  approvedAt: Date | null
  fileType: string
  ticketId: number
  thumbnailUrl: string
  fileId: number
}
