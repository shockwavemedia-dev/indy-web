export interface NewEventForm {
  title: string
  service: Array<{ serviceId: number; extras: Array<string> }>
  date: string
  taskDescription: string
  assets: undefined
}
