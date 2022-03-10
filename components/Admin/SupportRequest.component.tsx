import { MouseEventHandler } from 'react'
import Modal from './Modal.component'

const SupportRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <>
      {isVisible && (
        <Modal title="Support Request" onClose={onClose}>
          something
        </Modal>
      )}
    </>
  )
}

export default SupportRequestModal
