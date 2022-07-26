import { TicketFile } from './TicketFile.type'

export type File = {
  id: number
  fileName: string
  originalFilename: string
  fileSize: string
  fileType: string
  filePath: string
  disk: string
  version: string
  url: string
  urlExpiration: Date | null
  uploadedBy: number
  deletedBy: number | null
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  bucket: string
  thumbnailUrl: string
  clientTicketFile: TicketFile
}
