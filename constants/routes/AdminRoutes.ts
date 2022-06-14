import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { UserIcon } from '../../components/icons/UserIcon'
import { VideoIcon } from '../../components/icons/VideoIcon'
import { Route } from '../../types/Route.type'

export const AdminRoutes: Array<Route> = [
  {
    title: 'Clients',
    pathname: '/clients',
    Icon: UserIcon,
  },
  {
    title: 'Library',
    pathname: '/animation-library',
    Icon: VideoIcon,
  },
  {
    title: 'Staffs',
    pathname: '/staffs',
    Icon: UserIcon,
  },
  {
    title: 'Departments',
    Icon: ClipboardIcon,
    pathname: '/departments',
  },
]
