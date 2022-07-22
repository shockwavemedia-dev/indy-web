import { ReactNode } from 'react'

export const TitleValue = ({
  title,
  children,
  className,
  childrenClassName,
}: {
  title: string
  children: ReactNode
  className?: string
  childrenClassName?: string
}) =>
  children ? (
    <div className={`space-y-1 ${className}`}>
      <div className=" text-xs font-medium text-metallic-silver">{title}</div>
      <div
        className={`text-sm font-medium text-onyx ${
          childrenClassName ? childrenClassName : 'whitespace-nowrap'
        }`}
      >
        {children}
      </div>
    </div>
  ) : null
