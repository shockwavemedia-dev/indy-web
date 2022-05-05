import { signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, ReactNode } from 'react'
import BellIcon from '../components/icons/BellIcon'
import BriefcaseIcon from '../components/icons/BriefcaseIcon'
import CaretIcon from '../components/icons/CaretIcon'
import EyeIcon from '../components/icons/EyeIcon'
import MagnifyingGlassIcon from '../components/icons/MagnifyingGlassIcon'
import JobsStatusCountCard from '../components/JobStatsCard'
import RouteButton from '../components/RouteButton'
import ToastContainer from '../components/ToastContainer'
import DailyPressLogo from '../public/images/daily-press-logo.png'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { Route } from '../types/Route.type'

const PanelLayout = ({ routes, children }: { routes: Array<Route>; children: ReactNode }) => {
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
    <>
      <ToastContainer />
      <div className="flex min-h-screen overflow-x-clip bg-ghost-white">
        <div className="flex min-w-75 flex-col bg-white pt-6">
          <div className="mb-5 pl-6">
            <Image
              draggable={false}
              src={DailyPressLogo}
              alt="Daily Press"
              height={50}
              width={50}
            />
          </div>
          <div className="mb-5 flex space-x-3 px-6">
            <JobsStatusCountCard Icon={BriefcaseIcon} value={12} description="Pending Jobs" />
            <JobsStatusCountCard Icon={EyeIcon} value={4} description="Jobs To Review" />
          </div>
          {routes.map(({ title, Icon, pathname, subRoutes = [] }, i) => (
            <Fragment key={`route-group-${i}`}>
              <RouteButton
                route={{ title, Icon, pathname }}
                hasSubRoutes={subRoutes.length > 0}
                isCurrentPath={pathname === asPath}
              />
              {subRoutes.map(({ title, Icon, pathname }) => (
                <RouteButton
                  key={`sub-${title}-${pathname}`}
                  route={{ title, Icon, pathname }}
                  isCurrentPath={pathname === asPath}
                  subRoute
                />
              ))}
            </Fragment>
          ))}
        </div>
        <div className="flex w-full flex-col overflow-y-scroll p-6">
          <div className="mb-3.5 flex items-center">
            {asPath
              .split('/')
              .filter((s) => s !== '')
              .map((s, i, paths) => (
                <Fragment key={`crumbs-${i}`}>
                  <div
                    className={`font-urbanist text-xs capitalize ${
                      i + 1 === paths.length
                        ? 'mr-auto font-semibold text-onyx'
                        : 'mr-3 font-medium text-waterloo'
                    } `}
                  >
                    {s.replace('-', ' ')}
                  </div>
                  {i + 1 !== paths.length && (
                    <CaretIcon className="mr-3 rotate-90 stroke-lavender-gray" small />
                  )}
                </Fragment>
              ))}
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
          {children}
        </div>
      </div>
    </>
  )
}

export default PanelLayout
