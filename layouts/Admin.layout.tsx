import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import FancyButton from '../components/Admin/FancyButton.component'
import JobsStatusCountCard from '../components/Admin/JobsStatusCountCard.component'
import NewEventModal from '../components/Admin/NewEventModal.component'
import NewProjectBriefModal from '../components/Admin/NewProjectBriefModal.component'
import SupportRequestModal from '../components/Admin/SupportRequestModal.component'
import BellIcon from '../components/Common/Icons/Bell.icon'
import CaretDownIcon from '../components/Common/Icons/CaretDown.icon'
import CaretRightIcon from '../components/Common/Icons/CaretRight.icon'
import CaretRightSmallIcon from '../components/Common/Icons/CaretRightSmall.icon'
import MagnifyingGlassIcon from '../components/Common/Icons/MagnifyingGlass.icon'
import { Navigation } from '../interfaces/Navigation.interface'
import DailyPressLogoLight from '../public/images/daily-press-logo-light.png'
import DummyAvatar from '../public/images/dummy-avatar.png'

const navigations: Array<Navigation> = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    title: 'Event Manager',
  },
  {
    title: 'Screen Manager',
  },
  {
    title: 'SMS Marketing',
  },
  {
    title: 'Marketing Planning',
    pathname: '/marketing-planning',
  },
  {
    title: 'My Files',
  },
  {
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
        <div className="flex min-w-75 flex-col bg-mineshaft px-6 pt-7.5">
          <div className="mb-6">
            <Image
              draggable={false}
              src={DailyPressLogoLight}
              alt="Daily Press"
              height={50}
              width={50}
            />
          </div>
          <div className="mb-7 flex space-x-3">
            <JobsStatusCountCard value={12} description="Pending Jobs" />
            <JobsStatusCountCard value={4} description="Jobs To Review" />
          </div>
          <div className="flex flex-col space-y-5">
            {navigations.map((navigation, i) => {
              const isCurrentPath = navigation.pathname === pathname

              return (
                <div key={i} className="space-y-5">
                  <NavigationButton navigation={navigation} isCurrentPath={isCurrentPath} />
                  {navigation.children && (
                    <div className="space-y-4 pl-9.5">
                      {navigation.children?.map((navigationChild, i) => (
                        <ChildNavigationButton
                          key={i}
                          navigation={navigationChild}
                          isCurrentPath={isCurrentPath}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-wildsand p-6">
          <div className="mb-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="font-inter text-xs font-medium text-manatee">Admin Panel</div>
              <CaretRightSmallIcon className="stroke-frenchgray" />
              <div className="font-inter text-xs font-semibold capitalize text-shark">
                {pathname.split('/').pop()?.replace('-', ' ')}
              </div>
            </div>
            <div className="flex items-center">
              <button className="mr-5" name="Search">
                <MagnifyingGlassIcon />
              </button>
              <button className="relative mr-8" name="Notifications">
                <BellIcon />
                <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border border-solid border-wildsand bg-shark" />
              </button>
              <div className="mr-5 flex items-center space-x-3">
                <div className="flex">
                  <Image src={DummyAvatar} alt="Dummy" height={32} width={32} />
                </div>
                <div className="flex h-9 flex-col">
                  <div className="font-inter text-sm font-medium text-shark">
                    {session?.user.firstName} {session?.user.lastName}
                  </div>
                  <div className="font-inter text-xs font-normal text-stormgray">
                    Broncos Leagues Club
                  </div>
                </div>
              </div>
              <button onClick={() => signOut()}>
                <CaretDownIcon className="stroke-black" />
              </button>
            </div>
          </div>
          <div className="mb-4 font-inter text-2xl font-semibold capitalize text-shark">
            {pathname.split('/').pop()?.replace('-', ' ')}
          </div>
          <div className="mb-5 flex space-x-5">
            <FancyButton
              title="New Event"
              subtitle="Laborerivit rem cones mil"
              onClick={toggleNewEventModal}
            />
            <FancyButton
              title="New Project Brief"
              subtitle="Laborerivit rem cones mil"
              onClick={toggleNewProjectBriefModal}
            />
            <FancyButton
              title="Analytics"
              subtitle="Laborerivit rem cones mil"
              onClick={() => {}}
            />
            <FancyButton
              title="Support Request"
              subtitle="Laborerivit rem cones mil"
              onClick={toggleSupportRequestModal}
            />
          </div>
          <hr className="mb-5 border-t-athensgray" />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}

const NavigationButton = ({
  navigation,
  isCurrentPath,
}: {
  navigation: Navigation
  isCurrentPath: boolean
}) => (
  <div className="flex cursor-pointer items-center justify-end space-x-3">
    <div
      className={`inline-block h-5 w-5 rounded-full ${isCurrentPath ? 'bg-white' : 'bg-abbey'}`}
    />
    {navigation.children ? (
      <button
        className={`font-400 flex flex-1 items-center justify-between font-inter text-sm ${
          isCurrentPath ? 'text-white' : 'text-santasgray'
        }`}
      >
        <div>{navigation.title}</div>
        <CaretRightIcon className="stroke-stormgray" />
      </button>
    ) : (
      <Link href={navigation.pathname || '#'} passHref>
        <div
          className={`font-400 flex-1 font-inter text-sm ${
            isCurrentPath ? 'text-white' : 'text-santasgray'
          }`}
        >
          {navigation.title}
        </div>
      </Link>
    )}
  </div>
)

const ChildNavigationButton = ({
  navigation,
  isCurrentPath,
}: {
  navigation: Navigation
  isCurrentPath: boolean
}) => (
  <div className="flex cursor-pointer items-center space-x-3">
    <div
      className={`inline-block h-1.5 w-1.5 rounded-full  ${
        isCurrentPath ? 'bg-white' : 'bg-abbey'
      }`}
    />
    <Link href={navigation.pathname || '#'} passHref>
      <div
        className={`font-400 flex-1 font-inter text-sm ${
          isCurrentPath ? 'text-white' : 'text-santasgray'
        }`}
      >
        {navigation.title}
      </div>
    </Link>
  </div>
)

export default AdminLayout
