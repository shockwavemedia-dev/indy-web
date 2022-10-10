import { ProjectBriefPriority } from '../ProjectBriefPriority.type'
import { TicketStatus } from '../TicketStatus.type'
import { TicketType } from '../TicketType.type'

export type EditTicketForm = {
  subject: string
  description: string
  status: TicketStatus | null
  type: TicketType | null
  priority: ProjectBriefPriority | null
}
