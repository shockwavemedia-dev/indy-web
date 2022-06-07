export const Pill = ({
  value,
  pillColor,
  twBackgroundColor,
  twTextColor = 'text-onyx',
}: {
  value: string
  pillColor?: string
  twBackgroundColor?: string
  twTextColor?: string
}) => (
  <div
    className={`${twBackgroundColor} flex h-6 w-fit items-center space-x-1.5 rounded-lg border border-bright-gray px-2.5`}
  >
    {pillColor && <div className={`h-1.5 w-1.5 rounded-full ${pillColor}`} />}
    <div className={`${twTextColor} font-urbanist text-sm font-medium capitalize`}>{value}</div>
  </div>
)
