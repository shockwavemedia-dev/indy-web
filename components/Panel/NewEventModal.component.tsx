import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { NewEventForm } from '../../interfaces/NewEventForm.interface'
import { NewEventFormSchema } from '../../schemas/NewEventFormSchema'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import EditIcon from '../Common/Icons/Edit.icon'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'
import SelectService from './SelectService.component'

const NewEventModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: NewEventForm = {
    requestedBy: session!.user.id,
    clientId: session!.user.userType.clientId,
    subject: '',
    services: [],
    duedate: '',
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
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={EditIcon}
                  placeholder="Enter subject"
                  name="subject"
                  disableAutoComplete
                  className="mb-5"
                  errorMessage={errors.subject}
                  touched={touched.subject}
                />
                <div className="mb-5 flex space-x-5">
                  <SelectService setFieldValue={setFieldValue} />
                  <TextInput
                    Icon={CalendarIcon}
                    placeholder="Enter due date"
                    name="duedate"
                    disableAutoComplete
                    errorMessage={errors.duedate}
                    touched={touched.duedate}
                  />
                </div>
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5"
                  errorMessage={errors.description}
                  touched={touched.description}
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
