const CountCard = ({
  value,
  description,
  className,
}: {
  value: number
  description: string
  className?: string
}) => (
  <div
    className={`flex flex-col items-center justify-center rounded border border-solid border-athensgray bg-white px-2.5 ${className}`}
  >
    <div className="font-inter text-xl font-semibold text-shark">{value}</div>
    <div className="text-center font-inter text-sm font-normal text-stormgray">{description}</div>
  </div>
)

export default CountCard
