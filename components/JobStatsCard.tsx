export const JobsStatusCountCard = ({
  value,
  description,
}: {
  value: number
  description: string
}) => (
  <div className="flex h-30 w-full flex-col items-center justify-center rounded-xl bg-quartz py-4.5">
    <div className="mb-1 font-urbanist text-4xl font-semibold text-white">{value}</div>
    <div className="font-urbanist text-xs font-medium text-white">{description}</div>
  </div>
)
