import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { TicketAssigneeForm } from '../../../types/forms/TicketAssigneeForm.type'
import Button from '../../common/Button'
import Modal from '../Modal'

const TicketAssigneeDeleteModal = ({
  isVisible,
  onClose,
  ticketAssigneeId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketAssigneeId: number
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data: ticketAssignee, isLoading } = useQuery('ticketAssigneeShow', async () => {
    const { data } = await axios.get<TicketAssigneeForm>(
      `/v1/ticket-assignees/${ticketAssigneeId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    return data
  })

  const deleteTicketAssignee = async () => {
    const { status } = await axios.delete(`/v1/ticket-assignees/${ticketAssigneeId}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

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
                <div
                  className={`font-urbanist text-sm font-bold text-onyx ${
                    isLoading && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  Name
                </div>
                <div
                  className={`font-urbanist text-sm font-medium text-waterloo ${
                    isLoading &&
                    'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  {!isLoading && ticketAssignee?.fullName}
                </div>
              </div>
              <div className="space-y-1">
                <div
                  className={`font-urbanist text-sm font-bold text-onyx ${
                    isLoading && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  Department
                </div>
                <div
                  className={`font-urbanist text-sm font-medium text-waterloo ${
                    isLoading &&
                    'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  {!isLoading && ticketAssignee?.departmentName}
                </div>
              </div>
              <div className="space-y-1">
                <div
                  className={`font-urbanist text-sm font-bold text-onyx ${
                    isLoading && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  Role
                </div>
                <div
                  className={`font-urbanist text-sm font-medium capitalize  text-waterloo ${
                    isLoading &&
                    'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  {!isLoading && ticketAssignee?.role}
                </div>
              </div>
              <div className="space-y-1">
                <div
                  className={`font-urbanist text-sm font-bold text-onyx ${
                    isLoading && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  Status
                </div>
                <div
                  className={`font-urbanist text-sm font-medium capitalize  text-waterloo ${
                    isLoading &&
                    'inline-block h-5 w-60 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  {!isLoading && ticketAssignee?.status}
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

export default TicketAssigneeDeleteModal
