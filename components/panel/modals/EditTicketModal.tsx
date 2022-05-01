import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { TicketStatusOptions } from '../../../constants/options/TicketStatusOptions'
import { TicketTypeOptions } from '../../../constants/options/TicketTypeOptions'
import { EditTicketFormSchema } from '../../../schemas/EditTicketFormSchema'
import { EditTicketForm } from '../../../types/forms/EditTicketForm.type'
import { Ticket } from '../../../types/Ticket.type'
import Button from '../../common/Button'
import DateInput from '../../common/DateInput'
import ClipboardIcon from '../../common/icons/ClipboardIcon'
import EditIcon from '../../common/icons/EditIcon'
import FloppyDiskIcon from '../../common/icons/FloppyDiskIcon'
import RichTextInput from '../../common/RichTextInput'
import Select from '../../common/Select'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'

const EditTicketModal = ({
  isVisible,
  onClose,
  ticket,
}: {
  isVisible: boolean
  onClose: () => void
  ticket: Ticket
}) => {
  const queryClient = useQueryClient()

  const submitForm = async (
    values: EditTicketForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.put(`/v1/tickets/${ticket.id}`, values)

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      queryClient.invalidateQueries(['ticket', ticket.id])
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title={`Edit Ticket ${ticket.ticketCode}`} onClose={onClose}>
          <Formik
            initialValues={{
              subject: ticket.subject,
              description: ticket.description,
              type: ticket.type,
              duedate: ticket.duedate,
              status: ticket.status,
            }}
            validationSchema={EditTicketFormSchema}
            onSubmit={submitForm}
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
                  <DateInput label="Duedate" name="duedate" placeholder="Enter due date" />
                  <Select
                    label="Type"
                    name="type"
                    Icon={ClipboardIcon}
                    options={TicketTypeOptions}
                    defaultValue={TicketTypeOptions.find(({ value }) => value === ticket.type)}
                  />
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
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
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

export default EditTicketModal
