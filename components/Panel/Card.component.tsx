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
  <div className={`relative flex flex-col rounded-xl bg-white p-6 shadow ${className}`}>
    <div className="absolute top-6 left-6 font-urbanist text-base font-semibold text-onyx">
      {title}
    </div>
    {children}
  </div>
)

export default Card
