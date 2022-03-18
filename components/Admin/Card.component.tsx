import { ReactNode } from 'react'

const Card = ({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) => (
  <div
    className={`flex flex-col rounded-[4px] border border-solid border-athensgray bg-white p-[24px] ${className}`}
  >
    <div className="font-inter text-[18px] font-semibold text-shark">{title}</div>
    {children}
  </div>
)

export default Card
