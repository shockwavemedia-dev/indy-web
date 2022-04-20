import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import DummyCompany from '../../../public/images/dummy-company.png'
import { Ticket } from '../../../types/Ticket.type'
import Button from '../../common/Button'
import TrashIcon from '../../common/icons/TrashIcon'
import Modal from '../Modal'
import TitleValue from '../TitleValue'

const DeleteTicketModal = ({
  isVisible,
  onClose,
  ticket,
  minimal = false,
}: {
  isVisible: boolean
  onClose: () => void
  ticket: Ticket
  minimal?: boolean
}) => {
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const deleteTicket = async () => {
    const { status } = await axios.delete(`/v1/tickets/${ticket.id}`)

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      onClose()
      replace('/client-panel/ticket')
    }
  }

  return (
    <>
      {isVisible && (
        <Modal
          title={`Are you sure you want to delete Ticket ${ticket.ticketCode}?`}
          onClose={onClose}
        >
          <div className="flex w-140 flex-col">
            {!minimal && (
              <div className="mb-8 flex space-x-8">
                <div className="min-w-25">
                  <Image src={DummyCompany} height={100} width={100} alt={ticket.clientName} />
                </div>
                <div className="grid w-full grid-cols-4 grid-rows-2 gap-y-5">
                  <TitleValue title="ID">{ticket.id}</TitleValue>
                  <TitleValue title="Company">{ticket.clientName}</TitleValue>
                  <TitleValue title="Date Created">
                    {format(ticket.createdAt, "yy MMM''dd")}
                  </TitleValue>
                  <TitleValue title="Due Created">
                    {format(ticket.duedate, "yy MMM''dd")}
                  </TitleValue>
                  <TitleValue title="Code">{ticket.ticketCode}</TitleValue>
                  <TitleValue title="Type" className="capitalize">
                    {ticket.type}
                  </TitleValue>
                  <TitleValue title="Status" className="capitalize">
                    {ticket.status}
                  </TitleValue>
                  <TitleValue title="Department">{ticket.departmentName}</TitleValue>
                  <TitleValue title="Subject" className="col-span-4">
                    {ticket.subject}
                  </TitleValue>
                </div>
              </div>
            )}
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteTicket} type="submit">
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

export default DeleteTicketModal
