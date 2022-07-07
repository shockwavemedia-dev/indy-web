import axios from 'axios'
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, ReactNode, useMemo } from 'react'
import { useQuery } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Crumbs } from '../components/Crumbs'
import { IndyIcon } from '../components/icons/IndyIcon'
import { LogoutIcon } from '../components/icons/LogoutIcon'
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon'
import { RouteButton } from '../components/RouteButton'
import { TicketsAndNotifacationsCountCard } from '../components/TicketsAndNotifacationsCountCard'
import { AdminRoutes } from '../constants/routes/AdminRoutes'
import { ClientRoutes } from '../constants/routes/ClientRoutes'
import { ManagerRoutes } from '../constants/routes/ManagerRoutes'
import { StaffRoutes } from '../constants/routes/StaffRoutes'
import DailyPressLogoWhite from '../public/images/daily-press-logo-white.png'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { TicketsAndNotifacationsCount } from '../types/TicketsAndNotifacationsCount.type'

export const usePanelLayoutStore = createStore(
  combine(
    {
      header: '',
      subHeader: '',
    },
    (set) => ({
      setHeader: (header: string) => set(() => ({ header })),
      setSubHeader: (subHeader: string) => set(() => ({ subHeader })),
    })
  )
)

const PanelLayout = ({ children }: { children: ReactNode }) => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      replace('/auth/login')
    },
  })
  const { replace, asPath } = useRouter()
  const { header, subHeader } = usePanelLayoutStore()

  const { data: ticketsAndNotifacationsCount, isLoading: ticketsAndNotifacationsCountIsLoading } =
    useQuery(
      'tickes-and-notifications-count',
      async () => {
        const { data } = await axios.get<TicketsAndNotifacationsCount>(
          `/v1/${
            session?.isClient ? `clients/${session.user.userType.clientId}` : 'backend-users'
          }/ticket-notification-counts`
        )

        return data
      },
      {
        enabled: !!session && !session.isAdmin,
      }
    )

  const { panelName, routes } = useMemo(() => {
    if (!!session) {
      const { isAdmin, isClient, isManager, isStaff } = session

      if (isAdmin) {
        return { panelName: 'Admin Panel', routes: AdminRoutes }
      } else if (isClient) {
        return { panelName: 'Client Panel', routes: ClientRoutes }
      } else if (isManager) {
        return { panelName: 'Manager Panel', routes: ManagerRoutes }
      } else if (isStaff) {
        return { panelName: 'Staff Panel', routes: StaffRoutes }
      }
    }

    return { panelName: null, routes: [] }
  }, [!!session])

  if (status === 'loading' || !!!panelName) {
    return null
  }

  const signOut = () => nextAuthSignOut()

  return (
    <>
      <div className="fixed z-10 flex w-full items-center bg-white py-1 px-6 shadow-md">
        <div className="mr-102 whitespace-nowrap font-urbanist font-semibold text-onyx">
          Broncos Club
        </div>
        <MagnifyingGlassIcon className="mr-6 stroke-waterloo" />
        <Link href="#">
          <a className="mr-6 whitespace-nowrap font-urbanist font-semibold text-onyx underline-offset-1 hover:underline">
            Edit Profile
          </a>
        </Link>
        <Link href="#">
          <a className="whitespace-nowrap font-urbanist font-semibold text-onyx underline-offset-1 hover:underline">
            Settings
          </a>
        </Link>
        <IndyIcon className="m-0 ml-auto -mr-20 scale-50 p-0" />
        <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
        <div className="ml-3 mr-5 flex flex-col">
          <div className="font-urbanist text-sm font-medium text-onyx">
            {session?.user.firstName} {session?.user.lastName}
          </div>
        </div>
        <button onClick={signOut}>
          <LogoutIcon className="rotate-180 stroke-waterloo" />
        </button>
      </div>
      <div className="flex min-h-screen bg-cultured pt-14">
        <div className="relative w-75 flex-none bg-charleston-green pt-6">
          {!session.isAdmin && (
            <div className="mb-5 grid grid-cols-3 grid-rows-1 gap-2 px-6">
              <TicketsAndNotifacationsCountCard
                isLoading={ticketsAndNotifacationsCountIsLoading}
                value={ticketsAndNotifacationsCount?.openTicketCount}
                description="Pending Jobs"
              />
              <TicketsAndNotifacationsCountCard
                isLoading={ticketsAndNotifacationsCountIsLoading}
                value={ticketsAndNotifacationsCount?.newTicketCount}
                description="New Jobs"
              />
              <TicketsAndNotifacationsCountCard
                isLoading={ticketsAndNotifacationsCountIsLoading}
                value={ticketsAndNotifacationsCount?.newNotificationCount}
                description="New Notifications"
              />
            </div>
          )}
          {routes.map(({ title, Icon, pathname, subRoutes = [], target }, i) => (
            <Fragment key={`route-group-${i}`}>
              <RouteButton
                route={{ title, Icon, pathname, target }}
                hasSubRoutes={subRoutes.length > 0}
                isCurrentPath={pathname === asPath}
              />
              {subRoutes.map(({ title, Icon, pathname, target }) => (
                <RouteButton
                  key={`sub-${title}-${pathname}`}
                  route={{ title, Icon, pathname, target }}
                  isCurrentPath={pathname === asPath}
                  subRoute
                />
              ))}
            </Fragment>
          ))}
          <div className="absolute bottom-0 flex w-full items-center justify-center space-x-2 border-t border-t-white border-opacity-20 py-5">
            <Image src={DailyPressLogoWhite} alt="DailyPress" height={25} width={25} />
            <div className="font-urbanist text-xs text-metallic-silver">
              Copyright Daily Press {new Date().getFullYear()}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col p-6">
          <div className="mb-6 flex items-center">
            <Crumbs panelName={panelName} />
          </div>
          <div className="font-urbanist text-3xl font-bold text-onyx">{header}</div>
          <div className="mb-10 font-urbanist font-semibold text-halloween-orange">{subHeader}</div>
          <div className="absolute right-0 top-25 px-6 font-circular-std text-5xl text-charleston-green">
            Indy<span className="text-halloween-orange">.</span>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default PanelLayout
