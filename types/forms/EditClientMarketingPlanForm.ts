export type EditClientMarketingForm = {
  clientServices: Array<{
    id: number
    serviceId: number
    serviceName: string
    marketingQuota: number
    extraQuota: number
    totalUsed: number
    isEnabled: boolean
    extras: Array<string>
  }>
}
