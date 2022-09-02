export type CreateSocialMediaForm = {
  post: string
  postDate: string | null
  postTime?: string | null
  attachments: Array<File>
  copy?: string | null
  status: string
  channels: Array<string>
  notes?: string | null
}
