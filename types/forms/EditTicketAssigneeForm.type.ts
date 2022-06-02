import { TicketAssigneeStatus } from '../TicketAssigneeStatus.type'

export type EditTicketAssigneeForm = {
  status: TicketAssigneeStatus | null
  links: Array<{
    ticketAssigneeId: number
    issue: 'blocks' | 'blocked by'
  }>
}
