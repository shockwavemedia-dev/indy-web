export type AddTicketAssigneeForm = {
  adminUserId: number
  links: Array<{
    ticketAssigneeId: number
    issue: 'blocks' | 'blocked by'
  }>
}
