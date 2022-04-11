import { Icon } from '../types/Icon.type'

export type Navigation = {
  Icon?: Icon
  title: string
  pathname?: string
  children?: Array<Navigation>
}
