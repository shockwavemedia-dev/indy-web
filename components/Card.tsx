import { ReactNode } from 'react'

export const Card = ({
  title,
  children,
  className,
}: {
  title?: string
  children?: ReactNode
  className?: string
}) => (
  <div className={`relative rounded-xl bg-white p-6 shadow ${className}`}>
    {title && <div className="mb-5 font-urbanist text-base font-semibold text-onyx">{title}</div>}
    {children}
  </div>
)
