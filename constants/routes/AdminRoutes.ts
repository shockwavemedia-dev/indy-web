import ClipboardIcon from '../../components/icons/ClipboardIcon'
import UserIcon from '../../components/icons/UserIcon'
import VideoIcon from '../../components/icons/VideoIcon'
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
