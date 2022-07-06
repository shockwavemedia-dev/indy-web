export const StatusCountCard = ({
  value,
  description,
  className,
}: {
  value: number
  description: string
  className?: string
}) => (
  <div
    className={`flex aspect-square flex-col items-center justify-center rounded-xl py-2 ${className}`}
  >
    <div className="mb-1 font-urbanist text-xl font-semibold text-white">{value}</div>
    <div className="mx-1 text-center font-urbanist text-xs font-medium text-white">
      {description}
    </div>
  </div>
)
