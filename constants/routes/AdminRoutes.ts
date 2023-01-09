import { ChartIcon } from '../../components/icons/ChartIcon'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { DatabaseIcon } from '../../components/icons/DatabaseIcon'
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
    title: 'Users',
    pathname: '/users',
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
    title: 'Data Restoration',
    Icon: DatabaseIcon,
    pathname: '/configuration',
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
