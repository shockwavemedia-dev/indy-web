import { TicketFile } from './TicketFile.type'
import { Todo } from './Todo.type'

export type MarketingPlanner = {
  id: number
  eventName: string
  description: string
  todoList: Array<Todo>
  startDate: Date
  endDate: Date
  isRecurring: true
  createdBy: string
  updatedBy: string
  updatedAt: Date
  createdAt: Date
  attachments: Array<TicketFile>
}
