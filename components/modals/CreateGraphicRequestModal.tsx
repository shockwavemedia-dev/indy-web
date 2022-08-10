import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { GraphicExtraOptions } from '../../constants/options/GraphicExtraOptions'
import { CreateGraphicRequestFormSchema } from '../../schemas/CreateGraphicRequestFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateGraphicRequestForm } from '../../types/forms/CreateGraphicRequestForm.type'
import { Ticket } from '../../types/Ticket.type'
import { Button } from '../Button'
import { DateInput } from '../DateInput'
import { FileDropZone } from '../FileDropZone'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const CreateGraphicRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { replace } = useRouter()

  const submitForm = async (values: CreateGraphicRequestForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post<Ticket>('/v1/graphics', values)

      if (status === 200) {
        queryClient.invalidateQueries('tickets')
        replace('/dashboard')
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
        <Modal title="Create Graphic" onClose={onClose}>
          <Formik
            validationSchema={CreateGraphicRequestFormSchema}
            initialValues={{
              subject: '',
              description: '',
              requestedBy: session?.user.id || -1,
              clientId: session?.user.userType.client.id || -1,
              duedate: null,
              extras: [],
              attachments: [],
            }}
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
                <Select
                  name="extras"
                  Icon={ClipboardIcon}
                  placeholder="Select Services"
                  options={GraphicExtraOptions}
                  isMulti
                  closeMenuOnSelect={false}
                />
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
                accept={['.gif', '.jpeg', '.mp4', '.png', '.jpg']}
                multiple
              />
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
