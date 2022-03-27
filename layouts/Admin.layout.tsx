import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import FancyButton from '../components/Admin/FancyButton.component'
import JobsStatusCountCard from '../components/Admin/JobStatsCard.component'
import NewEventModal from '../components/Admin/NewEventModal.component'
import NewProjectBriefModal from '../components/Admin/NewProjectBriefModal.component'
import SupportRequestModal from '../components/Admin/SupportRequestModal.component'
import BellIcon from '../components/Common/Icons/Bell.icon'
import BriefcaseIcon from '../components/Common/Icons/Briefcase.icon'
import CalendarIcon from '../components/Common/Icons/Calendar.icon'
import CalendarAddIcon from '../components/Common/Icons/CalendarAdd.icon'
import CaretIcon from '../components/Common/Icons/Caret.icon'
import CaretSmallIcon from '../components/Common/Icons/CaretSmall.icon'
import ChartIcon from '../components/Common/Icons/Chart.icon'
import ClipboardIcon from '../components/Common/Icons/Clipboard.icon'
import ClipboardCloseIcon from '../components/Common/Icons/ClipboardClose.icon'
import EmailIcon from '../components/Common/Icons/Email.icon'
import EyeOpenIcon from '../components/Common/Icons/EyeOpen.icon'
import FolderIcon from '../components/Common/Icons/Folder.icon'
import LifeBuoyIcon from '../components/Common/Icons/LifeBuoy.icon'
import MagnifyingGlassIcon from '../components/Common/Icons/MagnifyingGlass.icon'
import MonitorIcon from '../components/Common/Icons/Monitor.icon'
import NotepadIcon from '../components/Common/Icons/Notepad.icon'
import PresentationChartIcon from '../components/Common/Icons/PresentationChart.icon'
import { Navigation } from '../interfaces/Navigation.interface'
import DailyPressLogo from '../public/images/daily-press-logo.png'
import DummyAvatar from '../public/images/dummy-avatar.png'

const navigations: Array<Navigation> = [
  {
    Icon: ChartIcon,
    title: 'Dashboard',
    pathname: '/dashboard',
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

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { replace, pathname } = useRouter()
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      replace('/auth/login')
    },
  })

  const [isNewEventModalVisible, setNewEventModalVisible] = useState(false)
  const [isNewProjectBriefModalVisible, setNewProjectBriefModalVisible] = useState(false)
  const [isSupportRequestModalVisible, setSupportRequestModalVisible] = useState(false)

  const currentPath = pathname.split('/').pop()?.replace('-', ' ')

  const toggleNewEventModal = () => setNewEventModalVisible(!isNewEventModalVisible)

  const toggleNewProjectBriefModal = () =>
    setNewProjectBriefModalVisible(!isNewProjectBriefModalVisible)

  const toggleSupportRequestModal = () =>
    setSupportRequestModalVisible(!isSupportRequestModalVisible)

  if (status === 'loading') {
    return null
  }

  return (
    <>
      <NewEventModal isVisible={isNewEventModalVisible} onClose={toggleNewEventModal} />
      <NewProjectBriefModal
        isVisible={isNewProjectBriefModalVisible}
        onClose={toggleNewProjectBriefModal}
      />
      <SupportRequestModal
        isVisible={isSupportRequestModalVisible}
        onClose={toggleSupportRequestModal}
      />
      <div className="flex min-h-screen">
        <div className="flex min-w-75 flex-col bg-white pt-6">
          <div className="mb-5 pl-6">
            <Image
              draggable={false}
              src={DailyPressLogo}
              alt="Daily Press"
              height="50rem"
              width="50rem"
            />
          </div>
          <div className="mb-5 flex space-x-3 px-6">
            <JobsStatusCountCard Icon={BriefcaseIcon} value={12} description="Pending Jobs" />
            <JobsStatusCountCard Icon={EyeOpenIcon} value={4} description="Jobs To Review" />
          </div>
          {navigations.map((navigation, i) => (
            <NavigationButton
              key={i}
              navigation={navigation}
              isCurrentPath={navigation.pathname === pathname}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col bg-ghost-white p-6">
          <div className="mb-3.5 flex justify-between">
            <div className="flex items-center space-x-3">
              <div className="font-urbanist text-xs font-medium text-waterloo">Admin Panel</div>
              <CaretSmallIcon className="rotate-90 stroke-frenchgray" />
              <div className="font-urbanist text-xs font-semibold capitalize text-onyx">
                {currentPath}
              </div>
            </div>
            <div className="flex items-center">
              <button className="mr-6" name="Search">
                <MagnifyingGlassIcon className="stroke-waterloo" />
              </button>
              <button className="relative mr-8" name="Notifications">
                <BellIcon className="stroke-waterloo" />
                <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border border-solid border-ghost-white bg-vivid-red-tangelo" />
              </button>
              <Image src={DummyAvatar} alt="Dummy" height="32rem" width="32rem" />
              <div className="ml-3 mr-5 flex h-9 flex-col">
                <div className="font-urbanist text-sm font-medium text-onyx">
                  {session?.user.firstName} {session?.user.lastName}
                </div>
                <div className="font-urbanist text-xs font-medium text-metallic-silver">
                  Broncos Leagues Club
                </div>
              </div>
              <button onClick={() => signOut()}>
                <CaretIcon className="rotate-180 stroke-waterloo" />
              </button>
            </div>
          </div>
          <div className="mb-5 font-urbanist text-xxl font-semibold capitalize text-onyx">
            {currentPath}
          </div>
          <div className="mb-6 flex space-x-6">
            <FancyButton
              Icon={
                <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
                  <CalendarAddIcon className="stroke-jungle-green" />
                </div>
              }
              title="New Event"
              subtitle="Laborerivit rem cones mil"
              onClick={toggleNewEventModal}
            />
            <FancyButton
              Icon={
                <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-alice-blue">
                  <ClipboardCloseIcon className="stroke-bleu-de-france" />
                </div>
              }
              title="New Project Brief"
              subtitle="Laborerivit rem cones mil"
              onClick={toggleNewProjectBriefModal}
            />
            <FancyButton
              Icon={
                <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-cosmic-latte">
                  <PresentationChartIcon className="stroke-deep-saffron" />
                </div>
              }
              title="Analytics"
              subtitle="Laborerivit rem cones mil"
              onClick={() => {}}
            />
            <FancyButton
              Icon={
                <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-linen">
                  <LifeBuoyIcon className="fill-vivid-red-tangelo" />
                </div>
              }
              title="Support Request"
              subtitle="Laborerivit rem cones mil"
              onClick={toggleSupportRequestModal}
            />
          </div>
          <hr className="mb-6 border-t-bright-gray" />
          {children}
        </div>
      </div>
    </>
  )
}

const NavigationButton = ({
  navigation: { Icon, title, pathname, children },
  isCurrentPath,
}: {
  navigation: Navigation
  isCurrentPath: boolean
}) => (
  <>
    <div className="flex">
      {isCurrentPath && <div className="rounded-r border-r-4 border-r-jungle-green" />}
      <div
        className={`flex w-full items-center justify-between py-3.5 pr-6 ${
          isCurrentPath ? 'bg-ghost-white' : ''
        }`}
      >
        {children ? (
          <button className={`flex items-center ${isCurrentPath ? 'ml-5' : 'ml-6'}`}>
            {Icon && (
              <Icon className={isCurrentPath ? 'stroke-jungle-green' : 'stroke-lavender-gray'} />
            )}
            <div
              className={`ml-3 font-urbanist text-sm ${
                isCurrentPath ? 'font-semibold text-jungle-green' : 'font-medium text-rhythm'
              }`}
            >
              {title}
            </div>
          </button>
        ) : (
          <Link href={pathname || '#'} passHref>
            <div
              className={`flex w-fit cursor-pointer items-center space-x-3 ${
                isCurrentPath ? 'ml-5' : 'ml-6'
              }`}
            >
              {Icon && (
                <Icon className={isCurrentPath ? 'stroke-jungle-green' : 'stroke-lavender-gray'} />
              )}
              <div
                className={`font-urbanist text-sm font-semibold ${
                  isCurrentPath ? 'font-semibold text-jungle-green' : 'font-medium text-rhythm'
                }`}
              >
                {title}
              </div>
            </div>
          </Link>
        )}
        {children && (
          <CaretIcon
            className={isCurrentPath ? 'stroke-jungle-green' : 'rotate-180 stroke-lavender-gray'}
          />
        )}
      </div>
    </div>
    {children?.map((navigationChild, i) => (
      <ChildNavigationButton key={i} navigation={navigationChild} isCurrentPath={isCurrentPath} />
    ))}
  </>
)

const ChildNavigationButton = ({
  navigation: { title, pathname },
  isCurrentPath,
}: {
  navigation: Navigation
  isCurrentPath: boolean
}) => (
  <div className="ml-15.5 py-2">
    <Link href={pathname || '#'} passHref>
      <div className="flex w-fit cursor-pointer items-center space-x-3">
        <div
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            isCurrentPath ? 'bg-jungle-green' : 'bg-lavender-gray'
          }`}
        />
        <div
          className={`font-urbanist text-sm ${
            isCurrentPath ? 'font-medium text-onyx' : 'font-normal text-waterloo'
          }`}
        >
          {title}
        </div>
      </div>
    </Link>
  </div>
)

export default AdminLayout
