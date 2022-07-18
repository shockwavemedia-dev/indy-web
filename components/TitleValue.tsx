import { ReactNode } from 'react'

export const TitleValue = ({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) =>
  children ? (
    <div className={`space-y-1 ${className}`}>
      <div className=" text-xs font-medium text-metallic-silver">{title}</div>
      <div className="whitespace-nowrap text-sm font-medium text-onyx">{children}</div>
    </div>
  ) : null
