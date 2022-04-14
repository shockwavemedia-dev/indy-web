import ChartIcon from '../../components/common/icons/ChartIcon'
import FolderIcon from '../../components/common/icons/FolderIcon'
import UserIcon from '../../components/common/icons/UserIcon'
import VideoIcon from '../../components/common/icons/VideoIcon'
import { Route } from '../../types/Route.type'

export const StaffRoutes: Array<Route> = [
  {
    title: 'Dashboard',
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
