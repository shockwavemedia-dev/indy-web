import { ReactNode } from 'react'

export const Card = ({
  title,
  children,
  className,
  titlePosition,
}: {
  title?: string
  children?: ReactNode
  className?: string
  titlePosition?: 'center' | 'right'
}) => (
  <div className={`relative rounded-xl bg-white p-6 shadow ${className}`}>
    {title && (
      <div
        className={`mb-5 w-fit text-base font-semibold text-onyx ${
          titlePosition === 'center' ? 'mx-auto' : titlePosition === 'right' ? 'ml-auto' : ''
        }`}
      >
        {title}
      </div>
    )}
    {children}
  </div>
)
