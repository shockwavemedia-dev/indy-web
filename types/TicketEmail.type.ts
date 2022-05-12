export type TicketEmail = {
  id: number
  clientId: number
  cc: string
  title: string
  message: string
  senderType: 'admin_users' | 'client_users' | 'lead_client'
  status: 'success' | 'failed' | 'pending'
  isRead: boolean
  senderName: string
  createdAt: Date
}
