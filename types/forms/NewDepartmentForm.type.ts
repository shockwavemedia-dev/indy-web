export type NewDepartmentForm = {
  name: string
  description?: string
  minDeliveryDays?: number
  services: Array<number>
}
