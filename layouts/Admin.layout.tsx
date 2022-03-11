import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import ChildNavigationButton from '../components/Admin/ChildNavigationButton.component'
import FancyButton from '../components/Admin/FancyButton.component'
import JobsStatusCountCard from '../components/Admin/JobsStatusCountCard.component'
import NavigationButton from '../components/Admin/NavigationButton.component'
import NewEventModal from '../components/Admin/NewEventModal.component'
import NewProjectBriefModal from '../components/Admin/NewProjectBriefModal.component'
import SupportRequestModal from '../components/Admin/SupportRequest.component'
import BellIcon from '../components/Common/Icons/Bell.icon'
import CaretDownIcon from '../components/Common/Icons/CaretDown.icon'
import CaretRightIcon from '../components/Common/Icons/CaretRight.icon'
import MagnifyingGlassIcon from '../components/Common/Icons/MagnifyingGlass.icon'
import { Navigation } from '../interfaces/Navigation.interface'
import DailyPressLogoLight from '../public/images/daily-press-logo-light.png'
import DummyAvatar from '../public/images/dummy-avatar.png'

const navigations: Array<Navigation> = [
  {
    title: 'Dashboard',
    pathname: '/admin/dashboard',
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
    pathname: '/admin/marketing-planning',
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
    pathname: '/admin/analytics',
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

  const toggleNewEventModal = () => {
    setNewEventModalVisible(!isNewEventModalVisible)
  }

  const toggleNewProjectBriefModal = () => {
    setNewProjectBriefModalVisible(!isNewProjectBriefModalVisible)
  }

  const toggleSupportRequestModal = () => {
    setSupportRequestModalVisible(!isSupportRequestModalVisible)
  }

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
      <div className="flex min-h-screen bg-wildsand">
        <div className="flex min-w-[300px] flex-col bg-codgray px-[24px] pt-[30px]">
          <div className="mb-[24px]">
            <Image
              draggable={false}
              src={DailyPressLogoLight}
              alt="Daily Press"
              height={50}
              width={50}
            />
          </div>
          <div className="mb-[28px] flex space-x-[12px]">
            <JobsStatusCountCard value={12} description="Pending Jobs" />
            <JobsStatusCountCard value={4} description="Jobs To Review" />
          </div>
          <div className="flex flex-col space-y-[20px]">
            {navigations.map((navigation, i) => {
              const isCurrentPath = navigation.pathname === pathname

              return (
                <div key={i} className="space-y-[20px]">
                  <NavigationButton navigation={navigation} isCurrentPath={isCurrentPath} />
                  {navigation.children && (
                    <div className="space-y-[16px] pl-[38px]">
                      {navigation.children?.map((navigationChild, i) => {
                        return (
                          <ChildNavigationButton
                            key={i}
                            navigation={navigationChild}
                            isCurrentPath={isCurrentPath}
                          />
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-[24px]">
          <div className="mb-[13px] flex items-center justify-between">
            <div className="flex items-center space-x-[12px]">
              <div className="font-inter text-[12px] font-medium text-manatee">Admin Panel</div>
              <CaretRightIcon isSmall className="stroke-frenchgray" />
              <div className="font-inter text-[12px] font-semibold capitalize text-shark">
                {pathname.split('/').pop()?.replace('-', ' ')}
              </div>
            </div>
            <div className="flex items-center">
              <button className="mr-[24px]" name="Search">
                <MagnifyingGlassIcon />
              </button>
              <button className="relative mr-[32px]" name="Notifications">
                <BellIcon />
                <div className="absolute top-[-2px] right-[-2px] h-[14px] w-[14px] rounded-full border border-solid border-wildsand bg-shark" />
              </button>
              <div className="mr-[20px] flex items-center space-x-[12px]">
                <div className="flex">
                  <Image src={DummyAvatar} alt="Dummy" height={32} width={32} />
                </div>
                <div className="flex h-[36px] flex-col">
                  <div className="font-inter text-[14px] font-medium text-shark">
                    {session?.user.firstName} {session?.user.lastName}
                  </div>
                  <div className="font-inter text-[12px] font-normal text-stormgray">
                    Broncos Leagues Club
                  </div>
                </div>
              </div>
              <button onClick={() => signOut()}>
                <CaretDownIcon className="stroke-black" />
              </button>
            </div>
          </div>
          <div className="mb-[16px] font-inter text-[24px] font-semibold capitalize text-shark">
            {pathname.split('/').pop()?.replace('-', ' ')}
          </div>
          <div className="mb-[20px] flex space-x-[20px]">
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
          <hr className="mb-[20px] border-t-athensgray" />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
