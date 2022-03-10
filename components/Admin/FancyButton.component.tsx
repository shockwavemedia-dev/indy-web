import { MouseEventHandler } from 'react'

const FancyButton = ({
  title,
  subtitle,
  onClick,
}: {
  title: string
  subtitle: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      className="flex flex-1 items-center space-x-[16px] rounded-[4px] border border-solid border-athensgray bg-white px-[24px] py-[20px]"
      onClick={onClick}
    >
      <div className="min-h-[40px] min-w-[40px] rounded-[4px] bg-iron" />
      <div>
        <div className="text-left font-inter text-[16px] font-semibold text-shark line-clamp-1">
          {title}
        </div>
        <div className="text-left font-inter text-[12px] font-normal text-stormgray line-clamp-1">
          {subtitle}
        </div>
      </div>
    </button>
  )
}

export default FancyButton
