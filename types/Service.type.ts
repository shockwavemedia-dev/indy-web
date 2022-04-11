export type Service = {
  id: number
  serviceId: number
  serviceName: string
  marketingQuota: number
  extraQuota: number
  totalUsed: number
  isEnabled: boolean
  extras: Array<string>
  createdBy: number
  updatedBy: number
}
