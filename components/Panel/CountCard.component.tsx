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
  <div
    className={`flex items-center justify-center space-x-3 rounded-xl bg-white pr-3 pl-3.5 shadow ${className}`}
  >
    {Icon}
    <div>
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
      <div className="font-urbanist text-[11px] font-medium text-metallic-silver">
        {description}
      </div>
    </div>
  </div>
)

export default CountCard
