export type NewProjectBriefForm = {
  services: Array<{ serviceId: number; extras: Array<string> }>
  date: Date | null
  briefName: string
  content: string
  assets: File | null
}
