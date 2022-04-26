import { ReactNode } from 'react'

const TitleValue = ({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) => (
  <div className={`space-y-1 ${className}`}>
    <div className="font-urbanist text-xs font-medium text-metallic-silver">{title}</div>
    <div className="font-urbanist text-sm font-medium text-onyx">{children}</div>
  </div>
)

export default TitleValue
