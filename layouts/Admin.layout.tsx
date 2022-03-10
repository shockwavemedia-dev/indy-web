import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler, ReactNode } from 'react'
import BellIcon from '../components/Common/Icons/Bell.icon'
import CaretDownIcon from '../components/Common/Icons/CaretDown.icon'
import CaretRightIcon from '../components/Common/Icons/CaretRight.icon'
import MagnifyingGlassIcon from '../components/Common/Icons/MagnifyingGlass.icon'
import DailyPressLogoLight from '../public/images/daily-press-logo-light.png'
import DummyAvatar from '../public/images/dummy-avatar.png'

interface Navigation {
  title: string
  pathname?: string
  children?: Array<Navigation>
}

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
  const { pathname } = useRouter()
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen bg-wildsand">
      <div className="flex min-w-[300px] flex-col bg-codgray px-[24px] pt-[30px]">
        <div className="mb-[24px] select-none">
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
                  <ChildNavigationButtons
                    navigations={navigation.children}
                    isCurrentPath={isCurrentPath}
                  />
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
            <button className="mr-[24px]">
              <MagnifyingGlassIcon />
            </button>
            <button className="relative mr-[32px]">
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
          <FancyButton title="New Event" subtitle="Laborerivit rem cones mil" onClick={() => {}} />
          <FancyButton
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            onClick={() => {}}
          />
          <FancyButton title="Analytics" subtitle="Laborerivit rem cones mil" onClick={() => {}} />
          <FancyButton
            title="Support Request"
            subtitle="Laborerivit rem cones mil"
            onClick={() => {}}
          />
        </div>
        <hr className="mb-[20px] border-t-athensgray" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

const JobsStatusCountCard = ({ value, description }: { value: number; description: string }) => {
  return (
    <div className="flex h-[73px] flex-1 flex-col items-center justify-center rounded-[4px] bg-woodsmoke">
      <div className="font-inter text-[18px] font-semibold text-white">{value}</div>
      <div className="font-inter text-[12px] font-normal text-santasgray">{description}</div>
    </div>
  )
}

const NavigationButton = ({
  navigation,
  isCurrentPath,
}: {
  navigation: Navigation
  isCurrentPath: boolean
}) => {
  return (
    <div className="flex cursor-pointer items-center justify-end space-x-[12px]">
      <div
        className={`inline-block h-[20px] w-[20px] rounded-full ${
          isCurrentPath ? 'bg-white' : 'bg-abbey'
        }`}
      />
      {navigation.children ? (
        <button
          className={`font-400 flex flex-1 items-center justify-between font-inter text-[14px] ${
            isCurrentPath ? 'text-white' : 'text-santasgray'
          }`}
        >
          <div>{navigation.title}</div>
          <CaretRightIcon className="stroke-stormgray" />
        </button>
      ) : (
        <Link href={navigation.pathname || '#'} passHref>
          <div
            className={`font-400 flex-1 font-inter text-[14px] ${
              isCurrentPath ? 'text-white' : 'text-santasgray'
            }`}
          >
            {navigation.title}
          </div>
        </Link>
      )}
    </div>
  )
}

const ChildNavigationButtons = ({
  navigations,
  isCurrentPath,
}: {
  navigations: Array<Navigation>
  isCurrentPath: boolean
}) => {
  return (
    <div className="space-y-[16px] pl-[38px]">
      {navigations.map((navigation, i) => {
        return (
          <div key={i} className="flex cursor-pointer items-center space-x-[12px]">
            <div
              className={`inline-block h-[6px] w-[6px] rounded-full  ${
                isCurrentPath ? 'bg-white' : 'bg-abbey'
              }`}
            />
            <Link href={navigation.pathname || '#'} passHref>
              <div
                className={`font-400 flex-1 font-inter text-[14px] ${
                  isCurrentPath ? 'text-white' : 'text-santasgray'
                }`}
              >
                {navigation.title}
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

const FancyButton = ({
  title,
  subtitle,
  onClick,
}: {
  title: string
  subtitle: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      className="flex flex-1 items-center space-x-[16px] rounded-[4px] border border-solid border-athensgray bg-white px-[24px] py-[20px]"
      onClick={onClick}
    >
      <div className="min-h-[40px] min-w-[40px] rounded-[4px] bg-iron" />
      <div>
        <div className="text-left font-inter text-[16px] font-semibold text-shark line-clamp-1">
          {title}
        </div>
        <div className="text-left font-inter text-[12px] font-normal text-stormgray line-clamp-1">
          {subtitle}
        </div>
      </div>
    </button>
  )
}

export default AdminLayout
