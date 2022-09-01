import { Icon } from './Icon.type'

export type Route = {
  title: string
  pathname?: string
  Icon?: Icon
  subRoutes?: Array<Route>
  target?: '_blank' | '_self' | '_parent' | '_top'
  disabled?: boolean
}
