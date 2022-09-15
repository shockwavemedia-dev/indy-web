export type SocialMediaActivityFields = Record<
  string,
  {
    old: string | Array<string> | Date | null
    new: string | Array<string> | Date | null
  }
>
