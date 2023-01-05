import { User } from './User.type'

export type TicketStyleGuideComment = {
  id?: number
  message: string
  ticketId: number
  user: User
  createdAt: Date
}
