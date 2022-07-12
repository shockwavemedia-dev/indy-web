export const StatusCountCard = ({
  value,
  description,
  className,
}: {
  value: number
  description: string
  className?: string
}) => (
  <div className={`grid place-content-center rounded-xl py-2 ${className}`}>
    <div className="mb-1 text-center font-urbanist text-xl font-semibold text-white">{value}</div>
    <div className="px-1 text-center font-urbanist text-xs font-medium text-white">
      {description}
    </div>
  </div>
)
