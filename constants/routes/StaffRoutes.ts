import { ChartIcon } from '../../components/icons/ChartIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
import { ShareIcon } from '../../components/icons/ShareIcon'
import { Route } from '../../types/Route.type'

export const StaffRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
    Icon: ChartIcon,
  },
  {
    title: 'My Files',
    Icon: FolderIcon,
  },
  {
    title: 'Social Media',
    Icon: ShareIcon,
    pathname: '/social-media',
  },
]
