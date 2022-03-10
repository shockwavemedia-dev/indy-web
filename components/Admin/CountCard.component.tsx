const CountCard = ({
  value,
  description,
  className,
}: {
  value: number
  description: string
  className?: string
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[4px] border border-solid border-athensgray bg-white px-[10px] ${className}`}
    >
      <div className="font-inter text-[20px] font-semibold text-shark">{value}</div>
      <div className="text-center font-inter text-[14px] font-normal text-stormgray">
        {description}
      </div>
    </div>
  )
}

export default CountCard
