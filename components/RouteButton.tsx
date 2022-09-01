import Link from 'next/link'
import { Route } from '../types/Route.type'
import { CaretIcon } from './icons/CaretIcon'
import { TinyDotIcon } from './icons/TinyDotIcon'

export const RouteButton = ({
  route: { Icon = TinyDotIcon, title, pathname = '#', target = '_self' },
  isCurrentPath,
  hasSubRoutes,
  subRoute = false,
  disabled,
}: {
  route: Route
  isCurrentPath: boolean
  hasSubRoutes?: boolean
  subRoute?: boolean
  disabled?: boolean
}) => (
  <div
    className={`flex items-center ${isCurrentPath ? 'bg-halloween-orange' : ''} ${
      disabled ? 'pointer-events-none opacity-40' : ''
    }`}
  >
    <Link href={pathname}>
      <a
        className={`flex items-center transition-all ${
          subRoute
            ? 'my-2 ml-15 2xl:hidden 2xl:group-hover:flex'
            : 'my-3.5 ml-5 2xl:mx-auto 2xl:group-hover:ml-5'
        }`}
        target={target}
      >
        <Icon className={`${subRoute ? 'fill-white' : 'stroke-white'}`} />
        <div className="ml-3 text-sm text-white transition-all 2xl:hidden 2xl:group-hover:flex">
          {title}
        </div>
      </a>
    </Link>
    {/* todo add conditional color */}
    {hasSubRoutes && (
      <CaretIcon
        className={`ml-auto mr-7 rotate-180 stroke-white transition-all 2xl:hidden 2xl:group-hover:flex`}
      />
    )}
  </div>
)
