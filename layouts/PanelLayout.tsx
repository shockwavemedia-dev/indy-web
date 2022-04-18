import { signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import BellIcon from '../components/common/icons/BellIcon'
import BriefcaseIcon from '../components/common/icons/BriefcaseIcon'
import CaretIcon from '../components/common/icons/CaretIcon'
import EyeIcon from '../components/common/icons/EyeIcon'
import MagnifyingGlassIcon from '../components/common/icons/MagnifyingGlassIcon'
import JobsStatusCountCard from '../components/panel/JobStatsCard'
import RouteButton from '../components/panel/RouteButton'
import DailyPressLogo from '../public/images/daily-press-logo.png'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { Route } from '../types/Route.type'

const PanelLayout = ({
  routes,
  header,
  children,
}: {
  routes: Array<Route>
  header: string
  children: ReactNode
}) => {
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
          <JobsStatusCountCard Icon={EyeIcon} value={4} description="Jobs To Review" />
        </div>
        {routes.map(({ title, Icon, pathname, subRoutes = [] }) => (
          <>
            <RouteButton
              key={title}
              route={{ title, Icon, pathname }}
              hasSubRoutes={subRoutes.length > 0}
              isCurrentPath={pathname === asPath}
            />
            {subRoutes.map(({ title, Icon, pathname }) => (
              <RouteButton
                key={title}
                route={{ title, Icon, pathname }}
                isCurrentPath={pathname === asPath}
                subRoute
              />
            ))}
          </>
        ))}
      </div>
      <div className="flex flex-1 flex-col bg-ghost-white p-6">
        <div className="mb-3.5 flex items-center">
          <div className="mr-3 font-urbanist text-xs font-medium text-waterloo">
            {session?.isAdmin ? 'Admin' : 'Client'} Panel
          </div>
          <CaretIcon className="mr-3 rotate-90 stroke-lavender-gray" small />
          <div className="mr-auto font-urbanist text-xs font-semibold text-onyx">{header}</div>
          <MagnifyingGlassIcon className="mr-6 stroke-waterloo" />
          <button className="relative mr-8">
            <BellIcon className="stroke-waterloo" />
            <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border border-ghost-white bg-vivid-red-tangelo" />
          </button>
          <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
          <div className="ml-3 mr-5 flex flex-col">
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
        <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">{header}</div>
        {children}
      </div>
    </div>
  )
}

export default PanelLayout
