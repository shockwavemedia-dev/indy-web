import CalendarIcon from '../../components/icons/CalendarIcon'
import ChartIcon from '../../components/icons/ChartIcon'
import ClipboardIcon from '../../components/icons/ClipboardIcon'
import EmailIcon from '../../components/icons/EmailIcon'
import FolderIcon from '../../components/icons/FolderIcon'
import MonitorIcon from '../../components/icons/MonitorIcon'
import NotepadIcon from '../../components/icons/NotepadIcon'
import PresentationChartIcon from '../../components/icons/PresentationChartIcon'
import { Route } from '../../types/Route.type'

export const ClientRoutes: Array<Route> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
    Icon: ChartIcon,
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
    pathname: '/my-files',
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
