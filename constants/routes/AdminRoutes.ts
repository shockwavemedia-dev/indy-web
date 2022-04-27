import ClipboardIcon from '../../components/common/icons/ClipboardIcon'
import UserIcon from '../../components/common/icons/UserIcon'
import VideoIcon from '../../components/common/icons/VideoIcon'
import { Route } from '../../types/Route.type'

export const AdminRoutes: Array<Route> = [
  {
    title: 'Clients',
    pathname: '/admin-panel/clients',
    Icon: UserIcon,
  },
  {
    title: 'Animations',
    pathname: '/admin-panel/animations',
    Icon: VideoIcon,
  },
  {
    title: 'Staffs',
    Icon: UserIcon,
  },
  {
    title: 'Departments',
    Icon: ClipboardIcon,
    pathname: '/admin-panel/departments',
  },
]
