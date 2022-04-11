import { signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import BellIcon from '../components/Common/Icons/Bell.icon'
import BriefcaseIcon from '../components/Common/Icons/Briefcase.icon'
import CaretIcon from '../components/Common/Icons/Caret.icon'
import EyeOpenIcon from '../components/Common/Icons/EyeOpen.icon'
import MagnifyingGlassIcon from '../components/Common/Icons/MagnifyingGlass.icon'
import JobsStatusCountCard from '../components/Panel/JobStatsCard.component'
import { navigations } from '../constants/Navigations'
import DailyPressLogo from '../public/images/daily-press-logo.png'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { Navigation } from '../types/Navigation.type'

const PanelLayout = ({ header, children }: { header: string; children: ReactNode }) => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      replace('/auth/login')
    },
  })
  const { replace, asPath } = useRouter()

  if (status === 'loading') {
    return null
  }

  const signOut = () => nextAuthSignOut()

  return (
    <div className="flex min-h-screen">
      <div className="flex min-w-75 flex-col bg-white pt-6">
        <div className="mb-5 pl-6">
          <Image draggable={false} src={DailyPressLogo} alt="Daily Press" height={50} width={50} />
        </div>
        <div className="mb-5 flex space-x-3 px-6">
          <JobsStatusCountCard Icon={BriefcaseIcon} value={12} description="Pending Jobs" />
          <JobsStatusCountCard Icon={EyeOpenIcon} value={4} description="Jobs To Review" />
        </div>
        {navigations.map((navigation, i) => (
          <NavigationButton
            key={i}
            navigation={navigation}
            isCurrentPath={navigation.pathname === asPath}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col bg-ghost-white p-6">
        <div className="mb-3.5 flex justify-between">
          <div className="flex items-center space-x-3">
            <div className="font-urbanist text-xs font-medium text-waterloo">
              {session?.isAdmin ? 'Admin' : 'Client'} Panel
            </div>
            <CaretIcon className="rotate-90 stroke-lavender-gray" small />
            <div className="font-urbanist text-xs font-semibold text-onyx">{header}</div>
          </div>
          <div className="flex items-center">
            <button className="mr-6" name="Search">
              <MagnifyingGlassIcon className="stroke-waterloo" />
            </button>
            <button className="relative mr-8" name="Notifications">
              <BellIcon className="stroke-waterloo" />
              <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border border-solid border-ghost-white bg-vivid-red-tangelo" />
            </button>
            <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
            <div className="ml-3 mr-5 flex h-9 flex-col">
              <div className="font-urbanist text-sm font-medium text-onyx">
                {session?.user.firstName} {session?.user.lastName}
              </div>
              <div className="font-urbanist text-xs font-medium text-metallic-silver">
                Broncos Club
              </div>
            </div>
            <button onClick={signOut}>
              <CaretIcon className="rotate-180 stroke-waterloo" />
            </button>
          </div>
        </div>
        <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">{header}</div>
        {children}
      </div>
    </div>
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
          <button
            className={`flex items-center ${isCurrentPath ? 'ml-5' : 'ml-6'}`}
            disabled={!!!pathname}
          >
            {Icon && (
              <Icon
                className={
                  isCurrentPath
                    ? 'stroke-jungle-green'
                    : `stroke-lavender-gray ${!!!pathname && '!stroke-bright-gray'}`
                }
              />
            )}
            <div
              className={`ml-3 font-urbanist text-sm ${
                isCurrentPath ? 'font-semibold text-jungle-green' : 'font-medium text-rhythm'
              } ${!!!pathname && '!text-bright-gray'}`}
            >
              {title}
            </div>
          </button>
        ) : (
          <Link href={pathname || '#'}>
            <a
              className={`flex w-fit cursor-pointer items-center space-x-3 ${
                isCurrentPath ? 'ml-5' : 'ml-6'
              } ${!!!pathname && 'cursor-default'}`}
            >
              {Icon && (
                <Icon
                  className={
                    isCurrentPath
                      ? 'stroke-jungle-green'
                      : `stroke-lavender-gray ${!!!pathname && '!stroke-bright-gray'}`
                  }
                />
              )}
              <div
                className={`font-urbanist text-sm ${
                  isCurrentPath ? 'font-semibold text-jungle-green' : 'font-medium text-rhythm'
                } ${!!!pathname && '!text-bright-gray'}`}
              >
                {title}
              </div>
            </a>
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
    <Link href={pathname || '#'}>
      <a className="flex w-fit cursor-pointer items-center space-x-3">
        <div
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            isCurrentPath
              ? 'bg-jungle-green'
              : `bg-lavender-gray ${!!!pathname && '!bg-bright-gray'}`
          }`}
        />
        <div
          className={`font-urbanist text-sm ${
            isCurrentPath ? 'font-medium text-onyx' : 'font-normal text-waterloo'
          } ${!!!pathname && '!text-bright-gray'}`}
        >
          {title}
        </div>
      </a>
    </Link>
  </div>
)

export default PanelLayout
