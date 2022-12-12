import { ChartIcon } from '../../components/icons/ChartIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
import { Route } from '../../types/Route.type'

export const ManagerRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
    Icon: ChartIcon,
  },
  {
    title: 'Client MyFiles',
    pathname: '/my-files',
    Icon: FolderIcon,
  },
]
