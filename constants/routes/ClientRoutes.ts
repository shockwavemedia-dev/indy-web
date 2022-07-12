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
    pathname: '/screen-manager',
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
        title: 'EDM',
        pathname: '/edm',
      },
      {
        title: 'Social Media',
        pathname: '/social-media',
      },
      {
        title: 'Data Analytics',
        pathname: '/data-analytics',
      },
      {
        title: 'Photography',
        pathname: '/photography',
      },
      {
        title: 'Videography',
        pathname: '/videography',
      },
      {
        title: 'Print',
        pathname: '/print',
      },
    ],
  },
  {
    title: 'Analytics',
    Icon: ChartIcon,
    subRoutes: [
      {
        title: 'App',
        pathname: '/app',
      },
      {
        title: 'Website',
        pathname: '/website',
      },
      {
        title: 'ClevaQ',
        pathname: '/clevaq',
      },
      {
        title: 'Social Media Ads',
        pathname: '/social-media-ads',
      },
    ],
  },
]
