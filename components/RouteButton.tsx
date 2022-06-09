import Link from 'next/link'
import { Route } from '../types/Route.type'
import { CaretIcon } from './icons/CaretIcon'
import { TinyDotIcon } from './icons/TinyDotIcon'

export const RouteButton = ({
  route: { Icon = TinyDotIcon, title, pathname = '#', target = '_self' },
  isCurrentPath,
  hasSubRoutes,
  subRoute = false,
}: {
  route: Route
  isCurrentPath: boolean
  hasSubRoutes?: boolean
  subRoute?: boolean
}) => (
  <div className={`flex items-center ${isCurrentPath && !subRoute ? 'bg-halloween-orange' : ''}`}>
    {!subRoute && (
      <div
        className={`h-full rounded-r border-r-4 ${
          isCurrentPath ? 'border-r-halloween-orange' : 'border-r-transparent'
        }`}
      />
    )}
    <Link href={pathname}>
      <a
        className={`flex items-center ${subRoute ? 'my-2 ml-15' : 'my-3.5 ml-5 '} ${
          pathname === '#' ? 'pointer-events-none opacity-20' : ''
        }`}
        target={target}
      >
        <Icon className={`${subRoute ? 'fill-white' : 'stroke-white'}`} />
        <div className="ml-3 font-urbanist text-sm text-white">{title}</div>
      </a>
    </Link>
    {/* todo add conditional color */}
    {hasSubRoutes && (
      <CaretIcon
        className={`ml-auto mr-7 rotate-180 stroke-white ${pathname === '#' ? 'opacity-20' : ''}`}
      />
    )}
  </div>
)
