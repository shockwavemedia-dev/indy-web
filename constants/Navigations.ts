import CalendarIcon from '../components/Common/Icons/Calendar.icon'
import ChartIcon from '../components/Common/Icons/Chart.icon'
import ClipboardIcon from '../components/Common/Icons/Clipboard.icon'
import EmailIcon from '../components/Common/Icons/Email.icon'
import FolderIcon from '../components/Common/Icons/Folder.icon'
import MonitorIcon from '../components/Common/Icons/Monitor.icon'
import NotepadIcon from '../components/Common/Icons/Notepad.icon'
import PresentationChartIcon from '../components/Common/Icons/PresentationChart.icon'
import UserIcon from '../components/Common/Icons/User.icon'
import VideoIcon from '../components/Common/Icons/Video.icon'
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
