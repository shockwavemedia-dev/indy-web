import axios from 'axios'
import { id } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { TicketAssigneeStatusOptions } from '../../../constants/options/TicketAssigneeStatusOptions'
import { TicketAssigneeForm } from '../../../types/forms/TicketAssigneeForm.type'
import { Option } from '../../../types/Option.type'
import ClipboardIcon from '../../common/icons/ClipboardIcon'
import Select from '../../common/Select'
import Modal from '../Modal'

const TicketAssigneeEditModal = ({
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

  const updateStatus = async (status: SingleValue<Option>) => {
    const { status: responseStatus } = await axios.put<TicketAssigneeForm>(
      `/v1/ticket-assignees/${ticketAssigneeId}`,
      {
        status: status?.value,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    if (responseStatus === 200) {
      queryClient.invalidateQueries('assignees')
      onClose()
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Ticket Assignee" onClose={onClose}>
          <div className="mb-8 flex w-140 flex-col">
            <div className="grid grid-cols-2 grid-rows-3 gap-6">
              <div className="col-span-2 space-y-1">
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
              <div className="col-span-2 space-y-1">
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
              <div className="col-span-2 space-y-1">
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
              <div className="col-span-2 space-y-1">
                <div
                  className={`mb-5 font-urbanist text-sm font-bold text-onyx ${
                    isLoading && 'w-20 animate-pulse rounded bg-metallic-silver text-transparent'
                  }`}
                >
                  Status
                </div>
                <Select
                  key={`ticketAssignee${id}${ticketAssignee?.status}`}
                  Icon={ClipboardIcon}
                  options={TicketAssigneeStatusOptions}
                  defaultValue={TicketAssigneeStatusOptions.find(
                    ({ value }) => value === ticketAssignee?.status
                  )}
                  onChange={updateStatus}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default TicketAssigneeEditModal
