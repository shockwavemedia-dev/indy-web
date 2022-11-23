import { BriefcaseIcon } from '../../components/icons/BriefcaseIcon'
import { CalendarAddIcon } from '../../components/icons/CalendarAddIcon'
import { ChartIcon } from '../../components/icons/ChartIcon'
import { CheckDocumentIcon } from '../../components/icons/CheckDocumentIcon'
import { EmailIcon } from '../../components/icons/EmailIcon'
import { FolderIcon } from '../../components/icons/FolderIcon'
import { GearIcon } from '../../components/icons/GearIcon'
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
    title: 'New Project Brief',
    Icon: CalendarAddIcon,
    pathname: '/project-brief',
  },
  {
    title: 'Social Media',
    Icon: ShareIcon,
    pathname: '/social-media',
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
    title: 'SMS Marketing',
    Icon: EmailIcon,
    pathname: 'https://c7s.transmitsms.com/',
    target: '_blank',
  },
  {
    title: 'Screen Manager',
    Icon: MonitorIcon,
    pathname: '/screen-manager',
  },
  {
    title: 'EDM',
    Icon: EmailIcon,
    pathname: '/edm',
  },
  {
    title: 'Website Services',
    Icon: MonitorIcon,
    pathname: '/website-services',
  },
  {
    title: 'Animation Library',
    Icon: VideoIcon,
    pathname: '/animation-library',
  },
  {
    title: 'Photography/Videography',
    Icon: VideoIcon,
    pathname: '/photography-videography',
  },
  {
    title: 'Print',
    Icon: PrintIcon,
    pathname: '/print',
  },
  {
    title: 'Compliance Signage Regulations',
    Icon: CheckDocumentIcon,
    pathname: '/compliance-signage-regulations',
  },
  {
    title: 'Data Analytics',
    Icon: ChartIcon,
    pathname: '/data-analytics',
  },
  {
    title: 'Analytics',
    Icon: ChartIcon,
    subRoutes: [
      {
        title: 'POS',
        pathname: '/analytics/pos',
      },
      {
        title: 'Website',
        pathname: '/analytics/website',
      },
      {
        title: 'Social Media',
        pathname: '/analytics/social-media',
      },
      {
        title: 'Google',
        pathname: '/analytics/google',
      },
      {
        title: 'EDM',
        pathname: '/analytics/edm',
      },
      {
        title: 'SMS',
        pathname: '/analytics/sms',
      },
      {
        title: 'Gaming/Tiered',
        pathname: '/analytics/gaming-tiered',
      },
      {
        title: 'F & B',
        pathname: '/analytics/f&b',
      },
      {
        title: 'Digital Health Check',
        pathname: '/analytics/digital-health-check',
      },
    ],
  },
  {
    title: 'Settings',
    Icon: GearIcon,
    pathname: '/settings',
  },
]
