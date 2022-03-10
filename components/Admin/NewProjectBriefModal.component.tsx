import { MouseEventHandler } from 'react'
import Modal from './Modal.component'

const NewProjectBriefModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <>
      {isVisible && (
        <Modal title="New Project Brief" onClose={onClose}>
          something
        </Modal>
      )}
    </>
  )
}

export default NewProjectBriefModal
