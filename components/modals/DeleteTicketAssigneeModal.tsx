import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useTicketAssigneeStore } from '../../store/TicketAssigneeStore'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { TitleValue } from '../TitleValue'

export const DeleteTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketId: number
}) => {
  const queryClient = useQueryClient()
  const { activeTicketAssignee } = useTicketAssigneeStore()
  const { showToast } = useToastStore()

  const deleteTicketAssignee = async () => {
    try {
      const { status } = await axios.delete(
        `/v1/ticket-assignees/${activeTicketAssignee.ticketAssigneeId}`
      )

      if (status === 200) {
        queryClient.invalidateQueries(['assignees', Number(ticketId)])
        onClose()
        showToast({
          type: 'success',
          message: 'Ticket Assignee successfully deleted!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Are you sure you want to delete Ticket Assignee?" onClose={onClose}>
          <div className="w-140">
            <div className="mx-auto mb-8 flex w-fit space-x-10">
              <TitleValue title="Department">{activeTicketAssignee.departmentName}</TitleValue>
              <TitleValue title="Name" className="capitalize">
                {activeTicketAssignee.fullName}
              </TitleValue>
              <TitleValue title="Role" className="capitalize">
                {activeTicketAssignee.role}
              </TitleValue>
              <TitleValue title="Status" className="capitalize">
                {activeTicketAssignee.status}
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
