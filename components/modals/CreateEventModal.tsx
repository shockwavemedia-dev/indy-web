import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { CreateEventFormSchema } from '../../schemas/CreateEventFormSchema'
import { CreateEventForm } from '../../types/forms/CreateEventForm.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../Button'
import DateInput from '../DateInput'
import FileInput from '../FileInput'
import EditIcon from '../icons/EditIcon'
import Modal from '../Modal'
import RichTextInput from '../RichTextInput'
import SelectService from '../SelectService'
import TextInput from '../TextInput'
import CreateLinkModal from './CreateLinkModal'

const CreateEventModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: CreateEventForm = {
    requestedBy: session?.user.id || -1,
    clientId: session?.user.userType.clientId || -1,
    subject: '',
    services: [],
    duedate: null,
    description: '',
  }

  const submitForm = async (
    values: CreateEventForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/tickets/event', objectWithFileToFormData(values))

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="Create Event" onClose={onClose}>
          <Formik
            validationSchema={CreateEventFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            <Form className="flex w-140 flex-col">
              <TextInput
                type="text"
                Icon={EditIcon}
                placeholder="Enter subject"
                name="subject"
                className="mb-5"
              />
              <div className="mb-5 flex space-x-5">
                <SelectService />
                <DateInput name="duedate" placeholder="Enter due date" />
              </div>
              <RichTextInput
                Icon={EditIcon}
                placeholder="Enter description"
                name="description"
                className="mb-5"
              />
              <FileInput label="Upload Assets" name="attachment" className="mb-8" />
              <div className="flex space-x-5">
                <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                  Cancel
                </Button>
                <Button ariaLabel="Submit" disabled={false} type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      )}
      <CreateLinkModal />
    </>
  )
}

export default CreateEventModal
