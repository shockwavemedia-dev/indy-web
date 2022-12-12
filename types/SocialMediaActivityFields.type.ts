export type SocialMediaActivityFields = Record<
  string,
  {
    old: Array<{ name: string; quantity: number }>
    new: Array<{ name: string; quantity: number }>
  }
>
