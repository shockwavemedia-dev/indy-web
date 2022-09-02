export type CreateSocialMediaForm = {
  post: string
  postDate: string | null
  postTime?: string | null
  attachments: Array<File>
  copy?: string | null
  status: 'To do' | 'In progress' | 'To approve' | 'Approved' | 'Scheduled'
  channels: Array<'Story' | 'Facebook' | 'Instagram' | 'Twitter' | 'Linkedin'>
  notes?: string | null
}
