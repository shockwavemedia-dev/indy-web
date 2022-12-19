import { File } from './File.type'

export type TicketNote = {
  id: number
  attachments: Array<File>
  ticketId: number
  file?: File | null
  note: string
  createdBy: string
  createdAt: Date
}
