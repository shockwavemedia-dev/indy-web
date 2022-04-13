import CalendarIcon from '../components/common/icons/CalendarIcon'
import ChartIcon from '../components/common/icons/ChartIcon'
import ClipboardIcon from '../components/common/icons/ClipboardIcon'
import EmailIcon from '../components/common/icons/EmailIcon'
import FolderIcon from '../components/common/icons/FolderIcon'
import MonitorIcon from '../components/common/icons/MonitorIcon'
import NotepadIcon from '../components/common/icons/NotepadIcon'
import PresentationChartIcon from '../components/common/icons/PresentationChartIcon'
import UserIcon from '../components/common/icons/UserIcon'
import VideoIcon from '../components/common/icons/VideoIcon'
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
