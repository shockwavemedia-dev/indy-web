import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'
import { NewEventForm } from '../../interfaces/NewEventForm.interface'
import { objectWithFileToFormData } from '../../utils/form-helpers'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import EditIcon from '../Common/Icons/Edit.icon'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'
import SelectService from './SelectService.component'

const NewEventModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const { data: session } = useSession()

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

    await axios.post('/v1/tickets/event', objectWithFileToFormData(values), {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Event" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ isSubmitting, setFieldValue, values: { services } }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={EditIcon}
                  placeholder="Enter subject"
                  name="subject"
                  disableAutoComplete
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <SelectService setFieldValue={setFieldValue} />
                  <TextInput
                    Icon={CalendarIcon}
                    placeholder="Enter due date"
                    name="duedate"
                    disableAutoComplete
                  />
                </div>
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5"
                />
                <FileInput name="attachment" setFieldValue={setFieldValue} className="mb-8" />
                <div className="flex space-x-3">
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
