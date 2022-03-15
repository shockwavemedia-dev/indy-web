export interface Service {
  id: number
  serviceId: number
  marketingQuota: number
  extraQuota: number
  totalUsed: number
  isEnabled: boolean
  extras: Array<string>
  createdBy: number
  updatedBy: number
}
