import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { CreatePrinterSchema } from '../../schemas/CreatePrinterFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateScreenForm } from '../../types/forms/CreateScreenForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Card } from '../Card'
import { FileDropZone } from '../FileDropZone'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const CreateScreenModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: CreateScreenForm) => {
    try {
      const { status } = await axios.post('/v1/screens', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('screens')
        onClose()
        showToast({
          type: 'success',
          message: 'New Screen successfully created!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Screen" onClose={onClose}>
          <Formik
            validationSchema={CreatePrinterSchema}
            initialValues={{
              name: '',
              logo: null,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex max-h-130 w-175 flex-col space-y-5 overflow-y-auto">
                <Card className="h-fit w-full">
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Screen Name"
                    name="name"
                    className="mb-5"
                  />
                  <FileDropZone
                    label="Upload Logo"
                    name="logo"
                    className="mb-5"
                    maxSize={250}
                    mimeType="image/gif"
                    accept={['.jpeg', '.png', '.jpg']}
                  />
                  <div className="flex space-x-5">
                    <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                      Submit
                    </Button>
                  </div>
                </Card>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
