import { Service } from './Service.type'

export interface Ticket {
  id: number
  ticketCode: string
  clientId?: number
  subject: string
  description: string
  departmentName: string
  duedate: Date
  type: 'email' | 'event' | 'graphic' | 'print' | 'task'
  status: 'closed' | 'new' | 'pending' | 'on_hold' | 'open' | 'resolved' | 'deleted'
  createdAt: Date
  attachment: string
  services?: Array<Service>
}
