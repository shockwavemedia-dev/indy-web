export type TicketFile = {
  id: number
  name: string
  generatedName: string
  signedUrl: 'https://crm-api-v1.herokuapp.com/storage/blc-client/da7629c599ce488ed87b7e8f73c8f338bdfdc555-cat-explosion.gif'
  signedUrlExpiration: Date | null
  directory: string
  description: string | null
  status: 'approved' | 'back from review' | 'deleted' | 'in progress' | 'for review' | 'new'
  isApproved: boolean
  approvedById: number | null
  version: string
  approvedAt: Date | null
}
