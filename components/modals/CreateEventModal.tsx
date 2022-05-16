import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { CreateEventFormSchema } from '../../schemas/CreateEventFormSchema'
import { CreateEventForm } from '../../types/forms/CreateEventForm.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../Button'
import DateInput from '../DateInput'
import FileDropZone from '../FileDropZone'
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
    attachments: [],
  }

  const submitForm = async (values: CreateEventForm) => {
    const { status } = await axios.post('/v1/tickets/event', objectWithFileToFormData(values))

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      onClose()
    }
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
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter subject"
                  name="subject"
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <SelectService enabled={isVisible} />
                  <DateInput name="duedate" placeholder="Enter due date" />
                </div>
                <RichTextInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5"
                />
                <FileDropZone
                  label="Upload Assets"
                  name="attachments"
                  className="mb-8"
                  maxSize={250}
                  mimeType="image/gif"
                  accept={['.gif', '.jpeg', '.mp4', '.png']}
                  multiple
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
      <CreateLinkModal />
    </>
  )
}

export default CreateEventModal
