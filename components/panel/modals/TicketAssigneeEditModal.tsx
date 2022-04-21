import axios from 'axios'
import { id } from 'date-fns/locale'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { TicketAssigneeStatusOptions } from '../../../constants/options/TicketAssigneeStatusOptions'
import { Option } from '../../../types/Option.type'
import { TicketAssignee } from '../../../types/TicketAssignee.type'
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
  const queryClient = useQueryClient()

  const { data: ticketAssignee, isLoading } = useQuery(
    'ticketAssigneeShow',
    async () => {
      const { data } = await axios.get<TicketAssignee>(`/v1/ticket-assignees/${ticketAssigneeId}`)

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const updateStatus = async (status: SingleValue<Option>) => {
    const { status: responseStatus } = await axios.put<TicketAssignee>(
      `/v1/ticket-assignees/${ticketAssigneeId}`,
      { status: status?.value }
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
