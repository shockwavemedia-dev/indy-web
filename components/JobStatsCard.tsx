import { Icon } from '../types/Icon.type'

export const JobsStatusCountCard = ({
  Icon,
  value,
  description,
}: {
  Icon: Icon
  value: number
  description: string
}) => (
  <div className="flex h-30 w-full flex-col rounded-xl bg-quartz py-4.5 pl-5">
    <div className="mb-2.5 grid h-9.5 w-9.5 flex-none place-items-center rounded-md bg-charleston-green">
      <Icon className="stroke-halloween-orange" />
    </div>
    <div className="mb-1 font-urbanist text-sm font-semibold text-white">{value}</div>
    <div className="font-urbanist text-xs font-medium text-white">{description}</div>
  </div>
)
