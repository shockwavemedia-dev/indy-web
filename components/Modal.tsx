import { ReactNode } from 'react'
import CloseModalIcon from './icons/CloseModalIcon'

const Modal = ({
  title,
  children,
  onClose,
  className,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  className?: string
}) => (
  <div className={className}>
    <button
      onClick={onClose}
      className="fixed top-0 left-0 z-10 h-full w-full cursor-default bg-onyx bg-opacity-20"
    />
    <div className="fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl bg-white p-10">
      <button className="absolute top-6 right-6" onClick={onClose}>
        <CloseModalIcon className="stroke-lavender-gray" />
      </button>
      <div className="mb-6 font-urbanist text-xl font-semibold text-onyx">{title}</div>
      {children}
    </div>
  </div>
)

export default Modal
