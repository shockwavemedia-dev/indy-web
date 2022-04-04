export interface NewProjectBriefForm {
  services: Array<{ serviceId: number; extras: Array<string> }>
  date: string
  briefName: string
  content: string
  assets: File | null
}
