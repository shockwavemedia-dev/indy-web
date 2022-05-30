import { MouseEventHandler, ReactNode } from 'react'

export const FancyButton = ({
  Icon,
  title,
  subtitle,
  onClick,
  className,
  twBackgroundColor,
  twIconBackgroundColor,
}: {
  Icon: ReactNode
  title: string
  subtitle: string
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  twBackgroundColor: string
  twIconBackgroundColor: string
}) => (
  <button
    className={`flex items-center space-x-4 rounded-xl px-6 py-4 ${className} ${twBackgroundColor}`}
    onClick={onClick}
  >
    <div
      className={`grid h-11 w-11 flex-none place-items-center rounded-lg ${twIconBackgroundColor}`}
    >
      {Icon}
    </div>
    <div>
      <div className="text-left font-urbanist text-base font-semibold text-white line-clamp-1">
        {title}
      </div>
      <div className="text-left font-urbanist text-xs font-normal text-white line-clamp-1">
        {subtitle}
      </div>
    </div>
  </button>
)
