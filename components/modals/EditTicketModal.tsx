import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { TicketStatusOptions } from '../../constants/options/TicketStatusOptions'
import { TicketTypeOptions } from '../../constants/options/TicketTypeOptions'
import { EditTicketFormSchema } from '../../schemas/EditTicketFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditTicketForm } from '../../types/forms/EditTicketForm.type'
import { Ticket } from '../../types/Ticket.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { DateInput } from '../DateInput'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const useEditTicketModal = create(
  combine(
    {
      ticket: undefined as Ticket | undefined,
    },
    (set) => ({
      toggleEditTicketModal: (ticket?: Ticket) => set({ ticket }),
    })
  )
)

export const EditTicketModal = ({
  graphic = false,
  animation = false,
  website = false,
}: {
  graphic?: boolean
  animation?: boolean
  website?: boolean
}) => {
  const queryClient = useQueryClient()
  const ticket = useEditTicketModal((state) => state.ticket)
  const toggleEditTicketModal = useEditTicketModal((state) => state.toggleEditTicketModal)
  const { showToast } = useToastStore()

  return (
    <>
      {ticket && (
        <Modal title={`Edit Ticket ${ticket.ticketCode}`} onClose={toggleEditTicketModal}>
          <Formik
            initialValues={{
              subject: ticket.subject,
              description: ticket.description,
              type: ticket.type,
              duedate: ticket.duedate,
              status: ticket.status,
            }}
            validationSchema={EditTicketFormSchema}
            onSubmit={async (values: EditTicketForm) => {
              try {
                const { status } = await axios.put(`/v1/tickets/${ticket.id}`, values)

                if (status === 200) {
                  if (graphic) {
                    queryClient.invalidateQueries('graphics')
                  } else if (animation) {
                    queryClient.invalidateQueries('animations')
                  } else if (website) {
                    queryClient.invalidateQueries('websites')
                  } else {
                    queryClient.invalidateQueries('tickets')
                  }
                  queryClient.invalidateQueries(['ticket', ticket.id])
                  queryClient.invalidateQueries(['activities', ticket.id])
                  toggleEditTicketModal()
                  showToast({
                    type: 'success',
                    message: 'All changes was successfully saved',
                  })
                }
              } catch (e) {
                showToast({
                  type: 'error',
                  message: get422And400ResponseError(e),
                })
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-130 flex-col">
                <TextInput
                  label="Subject"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Subject"
                  name="subject"
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <Select
                    label="Type"
                    name="type"
                    Icon={ClipboardIcon}
                    options={TicketTypeOptions}
                    defaultValue={TicketTypeOptions.find(({ value }) => value === ticket.type)}
                  />
                  <DateInput label="Duedate" name="duedate" placeholder="Enter due date" />
                </div>
                <Select
                  label="Status"
                  name="status"
                  Icon={ClipboardIcon}
                  options={TicketStatusOptions}
                  defaultValue={TicketStatusOptions.find(({ value }) => value === ticket.status)}
                  className="mb-5"
                />
                <RichTextInput
                  label="Description"
                  Icon={EditIcon}
                  placeholder="Enter Description"
                  name="description"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Cancel"
                    onClick={() => toggleEditTicketModal()}
                    type="button"
                    light
                  >
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    <FloppyDiskIcon className="stroke-white" />
                    <div>Save</div>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
