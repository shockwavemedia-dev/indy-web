import { TicketAssigneeStatus } from './TicketAssigneeStatus.type'
import { UserRole } from './UserRole.type'

export type TicketAssignee = {
  departmentId: number
  departmentName: string
  adminUserId: number
  role: UserRole
  fullName: string
  ticketAssigneeId: number
  status: TicketAssigneeStatus | null
}
