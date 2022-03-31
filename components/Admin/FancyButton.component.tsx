import { MouseEventHandler, ReactNode } from 'react'

const FancyButton = ({
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
    className={`flex flex-1 items-center space-x-4 rounded-xl bg-white px-6 py-4 shadow ${className}`}
    onClick={onClick}
  >
    {Icon}
    <div>
      <div className="text-left font-urbanist text-base font-semibold text-onyx line-clamp-1">
        {title}
      </div>
      <div className="text-left font-urbanist text-xs font-normal text-metallic-silver line-clamp-1">
        {subtitle}
      </div>
    </div>
  </button>
)

export default FancyButton
