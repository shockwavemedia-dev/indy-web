import { TicketFile } from './TicketFile.type'

export type MarketingPlanner = {
  id: number
  eventName: string
  description: string
  todoList: Array<string>
  taskManagement: Array<string>
  startDate: Date
  endDate: Date
  isRecurring: true
  createdBy: string
  updatedBy: string
  updatedAt: Date
  createdAt: Date
  attachments: Array<TicketFile>
}
