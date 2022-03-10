export interface Navigation {
  title: string
  pathname?: string
  children?: Array<Navigation>
}
