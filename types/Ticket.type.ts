import { Attachment } from './Attachment.type'
import { Service } from './Service.type'
import { TicketStatus } from './TicketStatus.type'
import { TicketType } from './TicketType.type'

export type Ticket = {
  id: number
  ticketCode: string
  clientId: number
  clientName: string
  subject: string
  description: string
  departmentName: string
  duedate: Date
  type: TicketType
  status: TicketStatus
  createdAt: Date
  attachments: Array<Attachment>
  services?: Array<Service>
  priority: string
}
