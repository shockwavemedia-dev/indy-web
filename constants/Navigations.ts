import CalendarIcon from '../components/Common/icons/CalendarIcon'
import ChartIcon from '../components/Common/icons/ChartIcon'
import ClipboardIcon from '../components/Common/icons/ClipboardIcon'
import EmailIcon from '../components/Common/icons/EmailIcon'
import FolderIcon from '../components/Common/icons/FolderIcon'
import MonitorIcon from '../components/Common/icons/MonitorIcon'
import NotepadIcon from '../components/Common/icons/NotepadIcon'
import PresentationChartIcon from '../components/Common/icons/PresentationChartIcon'
import UserIcon from '../components/Common/icons/UserIcon'
import VideoIcon from '../components/Common/icons/VideoIcon'
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
