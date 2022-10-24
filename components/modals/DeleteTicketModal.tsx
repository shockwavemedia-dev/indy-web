import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import DummyCompany from '../../public/images/dummy-company.png'
import { useToastStore } from '../../store/ToastStore'
import { Ticket } from '../../types/Ticket.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { TitleValue } from '../TitleValue'

export const useDeleteTicketModal = create(
  combine(
    {
      ticket: undefined as Ticket | undefined,
    },
    (set) => ({
      toggleDeleteTicketModal: (ticket?: Ticket) => set({ ticket }),
    })
  )
)

export const DeleteTicketModal = ({
  minimal = false,
  graphic = false,
  animation = false,
  website = false,
}: {
  minimal?: boolean
  graphic?: boolean
  animation?: boolean
  website?: boolean
}) => {
  const { replace } = useRouter()
  const queryClient = useQueryClient()
  const ticket = useDeleteTicketModal((state) => state.ticket)
  const toggleDeleteTicketModal = useDeleteTicketModal((state) => state.toggleDeleteTicketModal)
  const { showToast } = useToastStore()

  return (
    <>
      {ticket && (
        <Modal
          title={`Are you sure you want to delete Ticket ${ticket.ticketCode}?`}
          onClose={toggleDeleteTicketModal}
        >
          <div className="flex w-175 flex-col">
            {!minimal && (
              <div className="mb-8 flex space-x-8">
                <Image src={DummyCompany} height={100} width={100} alt={ticket.clientName} />
                <div className="grid w-full grid-cols-4 grid-rows-2 gap-y-5">
                  <TitleValue title="ID">{ticket.id}</TitleValue>
                  <TitleValue title="Company">{ticket.clientName}</TitleValue>
                  <TitleValue title="Date Created">
                    {format(ticket.createdAt, 'dd/MM/yyyy')}
                  </TitleValue>
                  <TitleValue title="Priority">{ticket?.priority}</TitleValue>
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
              <Button
                ariaLabel="Cancel"
                onClick={() => toggleDeleteTicketModal()}
                type="button"
                light
              >
                Cancel
              </Button>
              <Button
                ariaLabel="Submit"
                onClick={async () => {
                  try {
                    const { status } = await axios.delete(`/v1/tickets/${ticket.id}`)

                    if (status === 200) {
                      if (graphic) {
                        queryClient.invalidateQueries('graphics')
                        replace('/graphic-design')
                      } else if (animation) {
                        queryClient.invalidateQueries('animations')
                        replace('/animations')
                      } else if (website) {
                        queryClient.invalidateQueries('websites')
                        replace('/website-services')
                      } else {
                        queryClient.invalidateQueries('tickets')
                        replace('/dashboard')
                      }
                      toggleDeleteTicketModal()
                      showToast({
                        type: 'success',
                        message: `Ticket successfully deleted!`,
                      })
                    }
                  } catch (e) {
                    showToast({
                      type: 'error',
                      message: 'Something went wrong! 😵',
                    })
                  }
                }}
                type="submit"
              >
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
