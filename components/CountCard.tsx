import { ReactNode } from 'react'

export const CountCard = ({
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
  <div className={`flex w-full items-center space-x-3 rounded-xl p-4 ${className}`}>
    <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-white bg-opacity-10">
      {Icon}
    </div>
    <div>
      <div className=" text-lg font-semibold text-onyx">{value}</div>
      <div className=" text-sm font-medium text-onyx line-clamp-2">{description}</div>
    </div>
  </div>
)
