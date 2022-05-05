import { Icon } from '../types/Icon.type'

const JobsStatusCountCard = ({
  Icon,
  value,
  description,
}: {
  Icon: Icon
  value: number
  description: string
}) => (
  <div className="flex h-30 flex-1 flex-col rounded-xl border border-bright-gray border-opacity-50 py-4.5 pl-5">
    <div className="mb-2.5 flex min-h-9.5 w-9.5 items-center justify-center rounded-md bg-cosmic-latte">
      <Icon className="stroke-deep-saffron" />
    </div>
    <div className="mb-1 font-urbanist text-sm font-semibold text-onyx">{value}</div>
    <div className="font-urbanist text-xs font-medium text-metallic-silver">{description}</div>
  </div>
)

export default JobsStatusCountCard
