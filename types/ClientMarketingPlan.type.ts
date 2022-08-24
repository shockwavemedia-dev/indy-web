export type ClientMarketingPlan = {
  id: number
  serviceId: number
  serviceName: string
  extras: Array<string>
  marketingQuota: number
  extraQuota: number
  totalUsed: number
  isEnabled: boolean
}
