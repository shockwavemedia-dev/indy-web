import { ChartIcon } from '../../components/icons/ChartIcon'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { GearIcon } from '../../components/icons/GearIcon'
import { MonitorIcon } from '../../components/icons/MonitorIcon'
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
  {
    title: 'Client Tickets',
    Icon: ChartIcon,
    pathname: '/client-tickets',
  },
  {
    title: 'Services',
    Icon: GearIcon,
    pathname: '/services',
  },
  {
    title: 'Providers Feature',
    Icon: MonitorIcon,
    subRoutes: [
      {
        title: 'Printers',
        pathname: '/printers',
      },
      {
        title: 'Screens',
        pathname: '/screens',
      },
    ],
  },
]
