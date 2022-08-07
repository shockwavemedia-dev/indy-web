import { Todo } from '../Todo.type'

export type CreateMarketingPlannerForm = {
  eventName: string
  description: string
  todoList: Array<Todo>
  startDate: Date | null
  endDate: Date | null
  isRecurring: boolean
  attachments?: Array<File>
}
