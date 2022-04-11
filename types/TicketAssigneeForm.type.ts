export interface TicketAssigneeForm {
  departmentId: number
  departmentName: string
  adminUserId: number
  role: 'account_manager' | 'admin' | 'manager' | 'staff'
  fullName: string
  ticketAssigneeId: number
  status: string
}
