import ClipboardIcon from '../../components/common/icons/ClipboardIcon'
import UserIcon from '../../components/common/icons/UserIcon'
import { Route } from '../../types/Route.type'

export const AdminRoutes: Array<Route> = [
  {
    title: 'Staffs',
    Icon: UserIcon,
  },

  {
    title: 'Departments',
    Icon: ClipboardIcon,
  },
]
