import { Icon } from '../types/Icon.type'

export interface Navigation {
  Icon?: Icon
  title: string
  pathname?: string
  children?: Array<Navigation>
  forAdmin?: true
}
