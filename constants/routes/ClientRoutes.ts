import CalendarIcon from '../../components/common/icons/CalendarIcon'
import ChartIcon from '../../components/common/icons/ChartIcon'
import ClipboardIcon from '../../components/common/icons/ClipboardIcon'
import EmailIcon from '../../components/common/icons/EmailIcon'
import FolderIcon from '../../components/common/icons/FolderIcon'
import MonitorIcon from '../../components/common/icons/MonitorIcon'
import NotepadIcon from '../../components/common/icons/NotepadIcon'
import PresentationChartIcon from '../../components/common/icons/PresentationChartIcon'
import { Route } from '../../types/Route.type'

export const ClientRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/client-panel/dashboard',
    Icon: ChartIcon,
  },
  {
    title: 'Tickets',
    pathname: '/client-panel/ticket',
    Icon: NotepadIcon,
  },
  {
    title: 'Event Manager',
    Icon: NotepadIcon,
  },
  {
    title: 'Screen Manager',
    Icon: MonitorIcon,
  },
  {
    title: 'SMS Marketing',
    Icon: EmailIcon,
  },
  {
    title: 'Marketing Planning',
    Icon: CalendarIcon,
  },
  {
    title: 'My Files',
    Icon: FolderIcon,
  },
  {
    title: 'Service Request',
    Icon: ClipboardIcon,
    subRoutes: [
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
        title: 'Animations',
        pathname: '/service-request/animations',
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
    Icon: PresentationChartIcon,
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
