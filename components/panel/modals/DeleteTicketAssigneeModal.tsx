import axios from 'axios'
import { useQueryClient } from 'react-query'
import { TicketAssignee } from '../../../types/TicketAssignee.type'
import Button from '../../common/Button'
import Modal from '../Modal'

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

  const deleteTicketAssignee = async () => {
    const { status } = await axios.delete(`/v1/ticket-assignees/${ticketAssignee.adminUserId}`)

    if (status === 200) {
      queryClient.invalidateQueries('assignees')
      onClose()
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Are you sure you want to delete Ticket Assignee?" onClose={onClose}>
          <div className="mb-8 flex w-140 flex-col">
            <div className="grid grid-cols-2 grid-rows-3 gap-6">
              <div className="space-y-1">
                <div className={`font-urbanist text-sm font-bold text-onyx`}>Name</div>
                <div
                  className={`font-urbanist text-sm font-medium text-waterloo ${'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'}`}
                >
                  {ticketAssignee?.fullName}
                </div>
              </div>
              <div className="space-y-1">
                <div className={`font-urbanist text-sm font-bold text-onyx`}>Department</div>
                <div
                  className={`font-urbanist text-sm font-medium text-waterloo ${'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'}`}
                >
                  {ticketAssignee?.departmentName}
                </div>
              </div>
              <div className="space-y-1">
                <div className={`font-urbanist text-sm font-bold text-onyx`}>Role</div>
                <div
                  className={`font-urbanist text-sm font-medium capitalize  text-waterloo ${'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'}`}
                >
                  {ticketAssignee?.role}
                </div>
              </div>
              <div className="space-y-1">
                <div className={`font-urbanist text-sm font-bold text-onyx`}>Status</div>
                <div
                  className={`font-urbanist text-sm font-medium capitalize  text-waterloo ${'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'}`}
                >
                  {ticketAssignee?.status}
                </div>
              </div>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteTicketAssignee} type="submit">
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeleteTicketAssigneeModal
