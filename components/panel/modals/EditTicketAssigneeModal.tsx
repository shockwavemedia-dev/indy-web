import axios from 'axios'
import { useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { TicketAssigneeStatusOptions } from '../../../constants/options/TicketAssigneeStatusOptions'
import { Option } from '../../../types/Option.type'
import { TicketAssignee } from '../../../types/TicketAssignee.type'
import ClipboardIcon from '../../common/icons/ClipboardIcon'
import Select from '../../common/Select'
import Modal from '../Modal'

const EditTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketAssignee,
}: {
  isVisible: boolean
  onClose: () => void
  ticketAssignee: TicketAssignee
}) => {
  const queryClient = useQueryClient()

  const updateStatus = async (status: SingleValue<Option>) => {
    const { status: responseStatus } = await axios.put<TicketAssignee>(
      `/v1/ticket-assignees/${ticketAssignee.adminUserId}`,
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
                <div className={`font-urbanist text-sm font-bold text-onyx`}>Name</div>
                <div className={`font-urbanist text-sm font-medium text-waterloo`}>
                  {ticketAssignee?.fullName}
                </div>
              </div>
              <div className="col-span-2 space-y-1">
                <div className={`font-urbanist text-sm font-bold text-onyx`}>Department</div>
                <div className={`font-urbanist text-sm font-medium text-waterloo`}>
                  {ticketAssignee?.departmentName}
                </div>
              </div>
              <div className="col-span-2 space-y-1">
                <div className={`font-urbanist text-sm font-bold text-onyx`}>Role</div>
                <div className={`font-urbanist text-sm font-medium capitalize  text-waterloo`}>
                  {ticketAssignee?.role}
                </div>
              </div>
              <div className="col-span-2 space-y-1">
                <div className={`mb-5 font-urbanist text-sm font-bold text-onyx`}>Status</div>
                <Select
                  Icon={ClipboardIcon}
                  options={TicketAssigneeStatusOptions}
                  defaultValue={TicketAssigneeStatusOptions.find(
                    ({ value }) => value === ticketAssignee
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

export default EditTicketAssigneeModal
