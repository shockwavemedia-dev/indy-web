import { ChartIcon } from '../../components/icons/ChartIcon'
import { ClipboardIcon } from '../../components/icons/ClipboardIcon'
import { EmailIcon } from '../../components/icons/EmailIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
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
    title: 'My Files',
    pathname: '/my-files',
    Icon: FolderIcon,
  },
  {
    title: 'Service Request',
    Icon: ClipboardIcon,
    subRoutes: [
      {
        title: 'Animations',
        pathname: '/service-request/animations',
      },
      {
        title: 'Graphic Design',
        pathname: '/service-request/graphic-design',
      },
    ],
  },
]
