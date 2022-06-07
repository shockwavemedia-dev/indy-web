import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { CreateProjectBriefFormSchema } from '../../schemas/CreateProjectBriefFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateProjectBriefForm } from '../../types/forms/CreateProjectBriefForm'
import { Ticket } from '../../types/Ticket.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { DateInput } from '../DateInput'
import { FileDropZone } from '../FileDropZone'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { SelectService } from '../SelectService'
import { TextInput } from '../TextInput'
import { CreateLinkModal } from './CreateLinkModal'

export const CreateProjectBriefModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: CreateProjectBriefForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post<Ticket>('/v1/tickets/event', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('tickets')
        onClose()
        showToast({
          type: 'success',
          message: `New Ticket ${ticketCode} successfully created!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal
          title="Create Project Brief"
          onClose={onClose}
          className="-translate-x-[calc(50%_+_15.25rem)]"
        >
          <Formik
            validationSchema={CreateProjectBriefFormSchema}
            initialValues={{
              requestedBy: session?.user.id || -1,
              clientId: session?.user.userType.clientId || -1,
              subject: '',
              services: [],
              duedate: null,
              description: '',
              attachments: [],
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-130 flex-col">
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter subject"
                  name="subject"
                  className="mb-5"
                />
                <DateInput name="duedate" placeholder="Enter due date" className="mb-5" />
                <RichTextInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5"
                />
                <Checkbox label="Add to Marketing Plan" name="marketingPlan" className="mb-5" />
                <FileDropZone
                  label="Upload Assets"
                  name="attachments"
                  className="mb-8"
                  maxSize={250}
                  mimeType="image/gif"
                  accept={['.gif', '.jpeg', '.mp4', '.png']}
                  multiple
                />
                <SelectService enabled={isVisible} />
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
