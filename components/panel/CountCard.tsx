import { ReactNode } from 'react'

const CountCard = ({
  Icon,
  value,
  description,
  className,
}: {
  Icon: ReactNode
  value: number
  description: string
  className?: string
}) => (
  <div className={`flex w-full items-center space-x-3 rounded-xl bg-white p-4 shadow ${className}`}>
    {Icon}
    <div>
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
      <div className="font-urbanist text-xxs font-medium text-metallic-silver line-clamp-2">
        {description}
      </div>
    </div>
  </div>
)

export default CountCard
