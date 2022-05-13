import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { TicketAssignee } from '../../types/TicketAssignee.type'
import Button from '../Button'
import TrashIcon from '../icons/TrashIcon'
import Modal from '../Modal'
import TitleValue from '../TitleValue'

const DeleteTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketAssignee,
}: {
  isVisible: boolean
  onClose: () => void
  ticketAssignee: TicketAssignee
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const deleteTicketAssignee = async () => {
    const { status } = await axios.delete(`/v1/ticket-assignees/${ticketAssignee.adminUserId}`)

    if (status === 200) {
      queryClient.invalidateQueries('assignees')
      onClose()
      showToast({
        type: 'success',
        message: 'Succesfully deleted',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Are you sure you want to delete Ticket Assignee?" onClose={onClose}>
          <div className="mb-8 flex w-140 flex-col">
            <div className="mb-8 flex space-x-20">
              <TitleValue title="Department">{ticketAssignee.departmentName}</TitleValue>
              <TitleValue title="Name" className="capitalize">
                {ticketAssignee.fullName}
              </TitleValue>
              <TitleValue title="Role" className="capitalize">
                {ticketAssignee.role}
              </TitleValue>
              <TitleValue title="Status" className="capitalize">
                {ticketAssignee.status}
              </TitleValue>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteTicketAssignee} type="submit">
                <TrashIcon className="stroke-white" />
                <div>Delete</div>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeleteTicketAssigneeModal
