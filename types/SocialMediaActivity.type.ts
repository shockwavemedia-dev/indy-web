export type SocialMediaActivity = {
  action: string
  user: string
  fields: Array<{
    post?: {
      new: string
      old: string
    }
    copy?: {
      new: string
      old: string
    }
    postDate?: {
      new: string
      old: string
    }
    status?: {
      new: string
      old: string
    }
    channels?: {
      new: string
      old: string
    }
  }>
}
