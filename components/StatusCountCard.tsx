export const StatusCountCard = ({
  value,
  description,
  className,
  classNameValue,
}: {
  value: number | string
  description: string
  className?: string
  classNameValue?: string
}) => (
  <div className={`grid place-content-center rounded-xl py-2 ${className}`}>
    <div className={`mb-1 text-center text-xl font-semibold text-white ${classNameValue}`}>
      {typeof value === 'number' ? Math.abs(value) : value}
    </div>
    <div className="px-1 text-center text-xs font-medium text-white">{description}</div>
  </div>
)
