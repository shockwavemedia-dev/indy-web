import { TicketAssignee } from '../../types/TicketAssignee.type'
import Modal from '../Modal'
import TitleValue from '../TitleValue'

const EditTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketAssignee,
}: {
  isVisible: boolean
  onClose: () => void
  ticketAssignee: TicketAssignee
}) => {
  return (
    <>
      {isVisible && (
        <Modal title="Ticket Assignee" onClose={onClose}>
          <div className="flex w-140 flex-col">
            <div className="flex space-x-20">
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
          </div>
        </Modal>
      )}
    </>
  )
}

export default EditTicketAssigneeModal
