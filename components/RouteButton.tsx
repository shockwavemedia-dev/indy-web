import Link from 'next/link'
import { Route } from '../types/Route.type'
import CaretIcon from './icons/CaretIcon'
import TinyDotIcon from './icons/TinyDotIcon'

const RouteButton = ({
  route: { Icon = TinyDotIcon, title, pathname = '#' },
  isCurrentPath,
  hasSubRoutes,
  subRoute = false,
}: {
  route: Route
  isCurrentPath: boolean
  hasSubRoutes?: boolean
  subRoute?: boolean
}) => (
  <div className={`flex items-center ${isCurrentPath && !subRoute ? 'bg-ghost-white' : ''}`}>
    {!subRoute && (
      <div
        className={`h-full rounded-r border-r-4 ${
          isCurrentPath ? 'border-r-jungle-green' : 'border-r-transparent'
        }`}
      />
    )}
    <Link href={pathname}>
      <a
        className={`flex items-center ${subRoute ? 'my-2 ml-15' : 'my-3.5 ml-5 '} ${
          pathname === '#' ? 'pointer-events-none opacity-20' : ''
        }`}
      >
        <Icon
          className={`${
            subRoute
              ? isCurrentPath
                ? 'fill-jungle-green'
                : 'fill-lavender-gray'
              : isCurrentPath
              ? 'stroke-jungle-green'
              : 'stroke-lavender-gray'
          }`}
        />
        <div
          className={`ml-3 font-urbanist text-sm ${
            subRoute
              ? isCurrentPath
                ? 'font-medium text-onyx'
                : 'font-normal text-waterloo'
              : isCurrentPath
              ? 'font-semibold text-jungle-green'
              : 'font-medium text-waterloo'
          }`}
        >
          {title}
        </div>
      </a>
    </Link>
    {/* todo add conditional color */}
    {hasSubRoutes && (
      <CaretIcon
        className={`ml-auto mr-7 rotate-180 stroke-lavender-gray ${
          pathname === '#' ? 'opacity-20' : ''
        }`}
      />
    )}
  </div>
)

export default RouteButton
