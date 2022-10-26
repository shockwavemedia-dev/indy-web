import { TodoStatus } from '../TodoStatus.type'

export type CreateMarketingPlannerForm = {
  eventName: string
  description: string
  todoList: Array<{
    id?: number
    name: string
    status?: TodoStatus
    assignees?: Array<number>
    deadline?: Date
    notify: boolean
    custom: boolean
    selected: boolean
  }>
  startDate: Date | null
  endDate: Date | null
  isRecurring: boolean
  attachments?: Array<File>
}
