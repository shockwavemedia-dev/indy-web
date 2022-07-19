export type CreateMarketingPlannerForm = {
  eventName: string
  description: string
  taskManagement?: Array<string>
  todoList?: Array<string>
  startDate: Date | null
  endDate: Date | null
  isRecurring: boolean
  attachments?: Array<File>
}
