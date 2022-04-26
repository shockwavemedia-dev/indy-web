import { TicketStatus } from '../TicketStatus.type'
import { TicketType } from '../TicketType.type'

export type EditTicketForm = {
  subject: string
  description: string
  duedate: Date | null
  status: TicketStatus | null
  type: TicketType | null
}
