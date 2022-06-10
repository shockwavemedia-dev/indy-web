import { ChartIcon } from '../../components/icons/ChartIcon'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { EmailIcon } from '../../components/icons/EmailIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
import { MonitorIcon } from '../../components/icons/MonitorIcon'
import { Route } from '../../types/Route.type'

export const ClientRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
    Icon: ChartIcon,
  },
  {
    title: 'SMS Marketing',
    Icon: EmailIcon,
    pathname: 'https://c7s.transmitsms.com/',
    target: '_blank',
  },
  {
    title: 'Screen Manager',
    Icon: MonitorIcon,
  },
  {
    title: 'My Files',
    pathname: '/my-files',
    Icon: FolderIcon,
  },
  {
    title: 'Service Request',
    Icon: ClipboardIcon,
    subRoutes: [
      {
        title: 'Animation Library',
        pathname: '/animation-library',
      },
      {
        title: 'Graphic Design',
        pathname: '/graphic-design',
      },
      {
        title: 'Website Services',
        pathname: '/website-services',
      },
      {
        title: 'Graphic Design',
      },
      {
        title: 'Website',
      },
      {
        title: 'EDM',
      },
      {
        title: 'Social Media',
      },
      {
        title: 'Data Analytics',
      },
      {
        title: 'Photography',
      },
      {
        title: 'Videography',
      },
      {
        title: 'Print',
      },
    ],
  },
  {
    title: 'Analytics',
    Icon: ChartIcon,
    subRoutes: [
      {
        title: 'App',
      },
      {
        title: 'Website',
      },
      {
        title: 'ClevaQ',
      },
      {
        title: 'Social Media Ads',
      },
    ],
  },
]
