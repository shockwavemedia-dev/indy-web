import { MouseEventHandler } from 'react'

const FancyButton = ({
  title,
  subtitle,
  onClick,
}: {
  title: string
  subtitle: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => (
  <button
    className="flex flex-1 items-center space-x-4 rounded border border-solid border-athensgray bg-white px-6 py-5"
    onClick={onClick}
  >
    <div className="min-h-10 min-w-10 rounded bg-iron" />
    <div>
      <div className="text-left font-inter text-base font-semibold text-shark line-clamp-1">
        {title}
      </div>
      <div className="text-left font-inter text-xs font-normal text-stormgray line-clamp-1">
        {subtitle}
      </div>
    </div>
  </button>
)

export default FancyButton
