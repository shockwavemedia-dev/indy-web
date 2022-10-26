export type SocialMediaCalendar = Record<
  'string',
  Array<{
    id: number
    clientId: number
    post: string
    copy?: string | null
    status: string
    channels?: Array<string> | null
    notes?: string
    postDate: Date
    createdBy: number
    updatedBy: number
    campaignType?: string | null
  }>
>
