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
    className={`flex flex-col rounded border border-solid border-athensgray bg-white p-6 ${className}`}
  >
    <div className="font-inter text-lg font-semibold text-shark">{title}</div>
    {children}
  </div>
)

export default Card
