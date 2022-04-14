import { Icon } from './Icon.type'

export type Route = {
  title: string
  pathname?: string
  Icon?: Icon
  subRoutes?: Array<Route>
}
