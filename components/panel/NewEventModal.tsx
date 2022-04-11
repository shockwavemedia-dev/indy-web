import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { NewEventFormSchema } from '../../schemas/NewEventFormSchema'
import { NewEventForm } from '../../types/forms/NewEventForm.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../common/Button'
import DateInput from '../common/DateInput'
import FileInput from '../common/FileInput'
import EditIcon from '../common/icons/EditIcon'
import TextAreaInput from '../common/TextAreaInput'
import TextInput from '../common/TextInput'
import Modal from './Modal'
import SelectService from './SelectService'

const NewEventModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: NewEventForm = {
    requestedBy: session!.user.id,
    clientId: session!.user.userType.clientId,
    subject: '',
    services: [],
    duedate: null,
    description: '',
    attachment: null,
  }

  const submitForm = async (
    values: NewEventForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/tickets/event', objectWithFileToFormData(values), {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Event" onClose={onClose}>
          <Formik
            validationSchema={NewEventFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={EditIcon}
                  placeholder="Enter subject"
                  name="subject"
                  disableAutoComplete
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <SelectService name="services" setFieldValue={setFieldValue} />
                  <DateInput
                    name="duedate"
                    placeholder="Enter due date"
                    setFieldValue={setFieldValue}
                  />
                </div>
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5"
                />
                <FileInput
                  label="Upload Assets"
                  name="attachment"
                  setFieldValue={setFieldValue}
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                    Submit
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

export default NewEventModal
