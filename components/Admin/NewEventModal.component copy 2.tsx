import { MouseEventHandler } from 'react'
import Modal from './Modal.component'

const NewEventModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <>
      {isVisible && (
        <Modal title="New Event" onClose={onClose}>
          something
        </Modal>
      )}
    </>
  )
}

export default NewEventModal
