export const TicketsAndNotifacationsCountCard = ({
  value,
  description,
  isLoading,
}: {
  value?: number
  description: string
  isLoading: boolean
}) => (
  <div className="flex aspect-square w-full flex-col items-center justify-center space-y-1 rounded-xl bg-quartz">
    {isLoading ? (
      <div className="h-7 w-7 animate-pulse rounded-md bg-bright-gray" />
    ) : (
      <div className="font-urbanist text-xl font-semibold text-white">{value}</div>
    )}
    {isLoading ? (
      <div className="w-full space-y-1">
        <div className="mx-auto h-3 w-3/4 animate-pulse rounded-sm bg-bright-gray px-2" />
        <div className="mx-auto h-3 w-1/2 animate-pulse rounded-sm bg-bright-gray px-2" />
      </div>
    ) : (
      <div className="px-3 text-center font-urbanist text-xs font-medium text-white">
        {description}
      </div>
    )}
  </div>
)
