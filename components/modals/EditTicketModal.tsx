import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { ProjectBriefPriorityOptions } from '../../constants/options/ProjectBriefPriorityOptions'
import { TicketStatusOptions } from '../../constants/options/TicketStatusOptions'
import { TicketTypeOptions } from '../../constants/options/TicketTypeOptions'
import { EditTicketFormSchema } from '../../schemas/EditTicketFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditTicketForm } from '../../types/forms/EditTicketForm.type'
import { ProjectBriefPriority } from '../../types/ProjectBriefPriority.type'
import { SelectOption } from '../../types/SelectOption.type'
import { Ticket } from '../../types/Ticket.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { Modal } from '../Modal'
import { ProjectBriefPrioritySelect } from '../ProjectBriefPrioritySelect'
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
  const { data: session } = useSession()

  const value = ticket && ticket?.priority ? ticket.priority : 'Relax'

  const [priority, setPriority] = useState<SingleValue<SelectOption<ProjectBriefPriority>>>({
    label: value,
    value,
  })

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
              priority: ticket.priority,
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
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-130 flex-col">
                <TextInput
                  label="Subject"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Subject"
                  name="subject"
                  className="mb-5"
                />
                <Select
                  label="Type"
                  name="type"
                  Icon={ClipboardIcon}
                  options={TicketTypeOptions}
                  defaultValue={TicketTypeOptions.find(({ value }) => value === ticket.type)}
                  className="mb-5"
                />
                <label className="mb-2 inline-block text-xs font-medium text-metallic-silver">
                  Priority
                </label>
                <ProjectBriefPrioritySelect
                  options={ProjectBriefPriorityOptions}
                  placeholder="Select Priority"
                  defaultValue={ProjectBriefPriorityOptions.find(
                    ({ value }) => value === ticket.priority
                  )}
                  onChange={(priority) => {
                    setPriority(priority)
                    setFieldValue('priority', priority!.value)
                  }}
                  className="mb-5"
                />
                {!!session && !session.isClient && (
                  <Select
                    label="Status"
                    name="status"
                    Icon={ClipboardIcon}
                    options={TicketStatusOptions}
                    defaultValue={TicketStatusOptions.find(({ value }) => value === ticket.status)}
                    className="mb-5"
                  />
                )}
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
