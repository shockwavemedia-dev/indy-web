import { BriefcaseIcon } from '../../components/icons/BriefcaseIcon'
import { ChartIcon } from '../../components/icons/ChartIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
import { Route } from '../../types/Route.type'

export const SocialMediaStaffRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
    Icon: ChartIcon,
  },
  {
    title: 'Tickets',
    Icon: BriefcaseIcon,
    pathname: '/my-ticket',
  },
  {
    title: 'Client MyFiles',
    pathname: '/my-files',
    Icon: FolderIcon,
  },
]
