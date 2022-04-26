import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { CreateEventFormSchema } from '../../../schemas/NewEventFormSchema'
import { CreateEventForm } from '../../../types/forms/CreateEventFormSchema.type'
import { objectWithFileToFormData } from '../../../utils/FormHelpers'
import Button from '../../common/Button'
import DateInput from '../../common/DateInput'
import FileInput from '../../common/FileInput'
import EditIcon from '../../common/icons/EditIcon'
import TextAreaInput from '../../common/TextAreaInput'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'
import SelectService from '../SelectService'

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
                <SelectService name="services" />
                <DateInput name="duedate" placeholder="Enter due date" />
              </div>
              <TextAreaInput
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
    </>
  )
}

export default CreateEventModal
