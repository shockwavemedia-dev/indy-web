export const TicketsAndNotifacationsCountCard = ({
  value,
  description,
  isLoading,
  className = '',
}: {
  value?: number
  description: string
  isLoading: boolean
  className?: string
}) => (
  <div
    className={`flex aspect-square flex-col items-center justify-center rounded-xl bg-quartz ${className}`}
  >
    {isLoading ? (
      <>
        <div className="h-7 w-7 animate-pulse rounded-md bg-bright-gray" />
        <div className="w-full space-y-1">
          <div className="mx-auto h-2 w-3/4 animate-pulse rounded-sm bg-bright-gray px-2" />
          <div className="mx-auto h-2 w-1/2 animate-pulse rounded-sm bg-bright-gray px-2" />
        </div>
      </>
    ) : (
      <>
        <div className="font-urbanist text-xl font-semibold text-white">{value}</div>
        <div className="px-4 text-center font-urbanist text-xs font-medium text-white">
          {description}
        </div>
      </>
    )}
  </div>
)
