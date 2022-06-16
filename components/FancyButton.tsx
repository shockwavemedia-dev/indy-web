import { MouseEventHandler, ReactNode } from 'react'

export const FancyButton = ({
  Icon,
  title,
  subtitle,
  onClick,
  className,
}: {
  Icon: ReactNode
  title: string
  subtitle: string
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
}) => (
  <button
    className={`flex items-center space-x-4 rounded-xl border border-halloween-orange bg-white px-6 py-4 ${className}`}
    onClick={onClick}
  >
    <div className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-halloween-orange">
      {Icon}
    </div>
    <div>
      <div className="text-left font-urbanist text-base font-semibold text-halloween-orange line-clamp-1">
        {title}
      </div>
      <div className="text-left font-urbanist text-xs font-normal text-halloween-orange line-clamp-1">
        {subtitle}
      </div>
    </div>
  </button>
)
