import { ChartIcon } from '../../components/icons/ChartIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
import { UserIcon } from '../../components/icons/UserIcon'
import { VideoIcon } from '../../components/icons/VideoIcon'
import { Route } from '../../types/Route.type'

export const StaffRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
    Icon: ChartIcon,
  },
  {
    title: 'Clients',
    Icon: UserIcon,
  },
  {
    title: 'Animations',
    Icon: VideoIcon,
  },
  {
    title: 'My Files',
    Icon: FolderIcon,
  },
]
