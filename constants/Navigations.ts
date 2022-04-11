import CalendarIcon from '../components/common/Icons/Calendar.icon'
import ChartIcon from '../components/common/Icons/Chart.icon'
import ClipboardIcon from '../components/common/Icons/Clipboard.icon'
import EmailIcon from '../components/common/Icons/Email.icon'
import FolderIcon from '../components/common/Icons/Folder.icon'
import MonitorIcon from '../components/common/Icons/Monitor.icon'
import NotepadIcon from '../components/common/Icons/Notepad.icon'
import PresentationChartIcon from '../components/common/Icons/PresentationChart.icon'
import UserIcon from '../components/common/Icons/User.icon'
import VideoIcon from '../components/common/Icons/Video.icon'
import { Navigation } from '../types/Navigation.type'

export const navigations: Array<Navigation> = [
  {
    Icon: ChartIcon,
    title: 'Dashboard',
    pathname: '/dashboard',
  },
  // {
  //   Icon: NotepadIcon,
  //   title: 'Tickets',
  //   pathname: '/ticket',
  // },
  {
    Icon: UserIcon,
    title: 'Clients',
    pathname: '/client',
  },
  {
    Icon: VideoIcon,
    title: 'Animations',
    pathname: '/animation',
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
        pathname: '/service-request/animation',
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
