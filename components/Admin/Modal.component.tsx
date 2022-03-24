import { MouseEventHandler, ReactNode } from 'react'
import CrossMarkIcon from '../Common/Icons/CrossMark.icon'

const Modal = ({
  title,
  children,
  onClose,
}: {
  title: string
  children: ReactNode
  onClose: MouseEventHandler<HTMLButtonElement>
}) => (
  <>
    <button
      onClick={onClose}
      className="fixed top-0 left-0 z-10 h-full w-full cursor-default bg-tuna bg-opacity-30"
    />
    <div className="fixed top-1/2 left-1/2 z-20 flex max-h-full -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-y-auto rounded-xl bg-white p-10">
      <button className="absolute top-6 right-6" onClick={onClose}>
        <CrossMarkIcon className="stroke-lavender-gray" />
      </button>
      <div className="mb-6 font-urbanist text-xl font-semibold text-onyx">{title}</div>
      {children}
    </div>
  </>
)

export default Modal
