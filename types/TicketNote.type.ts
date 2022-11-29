import { File } from './File.type'

export type TicketNote = {
  id: number
  ticketId: number
  file?: File | null
  note: string
  createdBy: string
  createdAt: Date
}
