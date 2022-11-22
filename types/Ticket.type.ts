import { Attachment } from './Attachment.type'
import { ProjectBriefPriority } from './ProjectBriefPriority.type'
import { Service } from './Service.type'
import { TicketAssignee } from './TicketAssignee.type'
import { TicketStatus } from './TicketStatus.type'
import { TicketType } from './TicketType.type'

export type Ticket = {
  id: number
  ticketCode: string
  emailHtml?: string
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
  priority: ProjectBriefPriority
  assignees?: Array<TicketAssignee>
  userNotes?: string
}
