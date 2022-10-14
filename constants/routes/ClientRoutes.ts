import { BriefcaseIcon } from '../../components/icons/BriefcaseIcon'
import { ChartIcon } from '../../components/icons/ChartIcon'
import { EmailIcon } from '../../components/icons/EmailIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
import { ImageIcon } from '../../components/icons/ImageIcon'
import { MonitorIcon } from '../../components/icons/MonitorIcon'
import { PrintIcon } from '../../components/icons/PrintIcon'
import { ShareIcon } from '../../components/icons/ShareIcon'
import { VideoIcon } from '../../components/icons/VideoIcon'
import { Route } from '../../types/Route.type'

export const ClientRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
    Icon: ChartIcon,
  },
  {
    title: 'Marketing Planner',
    Icon: BriefcaseIcon,
    pathname: '/marketing-planner',
  },
  {
    title: 'My Files',
    pathname: '/my-files',
    Icon: FolderIcon,
  },
  {
    title: 'Screen Manager',
    Icon: MonitorIcon,
    pathname: '/screen-manager',
  },
  {
    title: 'SMS Marketing',
    Icon: EmailIcon,
    pathname: 'https://c7s.transmitsms.com/',
    target: '_blank',
  },
  {
    title: 'Visual Displays',
    Icon: ImageIcon,
    pathname: '/visual-displays',
  },
  {
    title: 'Animation Library',
    Icon: VideoIcon,
    pathname: '/animation-library',
  },
  {
    title: 'Data Analytics',
    Icon: ChartIcon,
    pathname: '/data-analytics',
  },
  {
    title: 'EDM',
    Icon: EmailIcon,
    pathname: '/edm',
  },
  {
    title: 'Social Media',
    Icon: ShareIcon,
    pathname: '/social-media',
  },
  {
    title: 'Photography/Videography',
    Icon: VideoIcon,
    pathname: '/photography-videography',
  },
  {
    title: 'Printer Jobs',
    Icon: PrintIcon,
    pathname: '/printer-jobs',
  },
  {
    title: 'Website Services',
    Icon: MonitorIcon,
    pathname: '/website-services',
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
