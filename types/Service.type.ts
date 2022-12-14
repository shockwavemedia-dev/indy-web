export type Service = {
  id: number
  serviceId: number
  name: string
  serviceName: string
  marketingQuota: number
  extraQuota: number
  totalUsed: number
  isEnabled: boolean
  extras: Array<string>
  createdBy: number
  updatedBy: number
  customFields: Array<string>
  updatedExtras: Array<{ name: string; quantity?: number | string | null }>
  postDate: Date | null | undefined
}
