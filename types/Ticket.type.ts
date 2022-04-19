import { Service } from './Service.type'
import { TicketType } from './TicketType.type'

export type Ticket = {
  id: number
  ticketCode: string
  clientId?: number
  subject: string
  description: string
  departmentName: string
  duedate: Date
  type: TicketType
  status: 'closed' | 'new' | 'pending' | 'on_hold' | 'open' | 'resolved' | 'deleted'
  createdAt: Date
  attachment: string
  services?: Array<Service>
}
