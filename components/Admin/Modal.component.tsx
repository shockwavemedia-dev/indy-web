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
    <div className="max-h-full overflow-y-auto modal-dialog modal-dialog-scrollable fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded bg-white p-10">
      <button className="absolute top-6 right-6" onClick={onClose}>
        <CrossMarkIcon className="stroke-black" />
      </button>
      <div className="mb-4.5 font-inter text-xl font-semibold text-tuna">{title}</div>
      {children}
    </div>
  </>
)

export default Modal
