import { ReactNode } from 'react'
import { CloseModalIcon } from './icons/CloseModalIcon'

export const Modal = ({
  title,
  children,
  onClose,
  bgColor = 'bg-white',
  className,
}: {
  title?: string
  children: ReactNode
  onClose: () => void
  bgColor?: string
  className?: string
}) => (
  <>
    <button
      onClick={onClose}
      className="fixed top-0 left-0 z-40 h-full w-full cursor-default bg-onyx bg-opacity-20"
    />
    <div
      className={`fixed top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl p-10 ${bgColor} ${className}`}
    >
      <button className="absolute top-6 right-6" onClick={onClose}>
        <CloseModalIcon className="stroke-lavender-gray" />
      </button>
      <div className="mb-6 text-xl font-semibold text-onyx">{title}</div>
      {children}
    </div>
  </>
)
