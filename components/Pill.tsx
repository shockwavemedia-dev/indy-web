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
    className={`${
      twBackgroundColor ?? 'border border-bright-gray'
    }  flex w-fit items-center space-x-1.5 rounded-lg py-0.5 px-2.5`}
  >
    {pillColor && <div className={`h-1.5 w-1.5 rounded-full ${pillColor}`} />}
    <div className={`${twTextColor}  whitespace-nowrap text-sm font-medium capitalize`}>
      {value}
    </div>
  </div>
)
