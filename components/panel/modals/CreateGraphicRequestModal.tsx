import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { CreateGraphicRequestFormSchema } from '../../../schemas/CreateGraphicRequestFormSchema.type'
import { CreateGraphicRequestForm } from '../../../types/forms/CreateGraphicRequestForm.type'
import Button from '../../common/Button'
import DateInput from '../../common/DateInput'
import FileInput from '../../common/FileInput'
import EditIcon from '../../common/icons/EditIcon'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'
import SelectService from '../SelectService'

const CreateGraphicRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: CreateGraphicRequestForm = {
    subject: '',
    description: '',
    requestedBy: session?.user.id || -1,
    clientId: session?.user.userType.clientId || -1,
    duedate: null,
    extras: [],
    attachments: [],
  }

  const submitForm = async (
    values: CreateGraphicRequestForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)
    values.extras = ['DL', 'A4']
    const { status } = await axios.post('/v1/graphics', values)

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="Create Graphic" onClose={onClose}>
          <Formik
            validationSchema={CreateGraphicRequestFormSchema}
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
                <SelectService name="service" />
                <DateInput name="duedate" placeholder="Enter due date" />
              </div>
              <RichTextInput
                Icon={EditIcon}
                placeholder="Enter description"
                name="description"
                className="mb-5"
              />
              <FileInput label="Upload Assets" name="attachments" className="mb-8" multiple />
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

export default CreateGraphicRequestModal
