import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'
import { NewEventForm } from '../../interfaces/NewEventForm.interface'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import PencilIcon from '../Common/Icons/Pencil.icon'
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
    attachment: [],
  }

  const submitForm = async (
    values: NewEventForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    await axios.post('/v1/tickets/event', values, {
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
              <Form>
                <div className="flex w-[560px] flex-col">
                  <div className="mb-[24px]">
                    <TextInput
                      label="Subject"
                      Icon={PencilIcon}
                      placeholder="Enter Subject"
                      name="subject"
                      disableAutoComplete
                    />
                  </div>
                  <div className="mb-[24px] flex space-x-[12px]">
                    <SelectService selectedServices={services} setFieldValue={setFieldValue} />
                    <TextInput
                      label="Due Date"
                      Icon={CalendarIcon}
                      placeholder="Enter Due Date"
                      name="duedate"
                      disableAutoComplete
                    />
                  </div>
                  <div className="mb-[24px]">
                    <TextAreaInput
                      label="Description"
                      Icon={PencilIcon}
                      placeholder="Enter Description"
                      name="description"
                    />
                  </div>
                  <div className="mb-[32px]">
                    <FileInput
                      label="Upload Attachments"
                      name="attachment"
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="flex space-x-[12px]">
                    <Button ariaLabel="Cancel" isLight onClick={onClose}>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </div>
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
