import CalendarIcon from '../components/Common/Icons/Calendar.icon'
import ChartIcon from '../components/Common/Icons/Chart.icon'
import ClipboardIcon from '../components/Common/Icons/Clipboard.icon'
import EmailIcon from '../components/Common/Icons/Email.icon'
import FolderIcon from '../components/Common/Icons/Folder.icon'
import MonitorIcon from '../components/Common/Icons/Monitor.icon'
import NotepadIcon from '../components/Common/Icons/Notepad.icon'
import PresentationChartIcon from '../components/Common/Icons/PresentationChart.icon'
import UserIcon from '../components/Common/Icons/User.icon'
import { Navigation } from '../interfaces/Navigation.interface'

export const navigations: Array<Navigation> = [
  {
    Icon: ChartIcon,
    title: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    Icon: UserIcon,
    title: 'Client',
    pathname: '/client',
  },
  {
    Icon: NotepadIcon,
    title: 'Event Manager',
  },
  {
    Icon: MonitorIcon,
    title: 'Screen Manager',
  },
  {
    Icon: EmailIcon,
    title: 'SMS Marketing',
  },
  {
    Icon: CalendarIcon,
    title: 'Marketing Planning',
    pathname: '/marketing-planning',
  },
  {
    Icon: FolderIcon,
    title: 'My Files',
  },
  {
    Icon: ClipboardIcon,
    title: 'Service Request',
    children: [
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
    Icon: PresentationChartIcon,
    title: 'Analytics',
    pathname: '/analytics',
    children: [
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
