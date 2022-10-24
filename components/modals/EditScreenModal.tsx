import axios from 'axios'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import { CreateScreenSchema } from '../../schemas/CreateScreenFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreateScreenForm } from '../../types/forms/CreateScreenForm.type'
import { Screen } from '../../types/Screen.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Card } from '../Card'
import { FileDropZone } from '../FileDropZone'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const EditScreenModal = ({
  isVisible,
  onClose,
  screen,
}: {
  isVisible: boolean
  onClose: () => void
  screen: Screen
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: CreateScreenForm) => {
    try {
      if (values.logo === null) {
        values = { name: values.name }
      }
      const { status } = await axios.post(
        `/v1/screens/${screen.id}`,
        objectWithFileToFormData({
          ...values,
          _method: 'PUT',
        })
      )

      if (status === 200) {
        queryClient.invalidateQueries('screens')
        onClose()
        showToast({
          type: 'success',
          message: 'All changes was successfully saved',
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
        <Modal title="Edit Screen" onClose={onClose}>
          <Formik
            validationSchema={CreateScreenSchema}
            initialValues={{
              name: screen.name,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex max-h-130 w-175 flex-col space-y-5 overflow-y-auto">
                <Card className="h-fit w-full">
                  <div className="mb-5 flex space-x-5">
                    {screen?.logo && screen.logo.url && (
                      <div className="rounded-md">
                        <Image
                          src={screen.logo.url}
                          alt={screen.logo.fileName}
                          height={150}
                          width={150}
                        />
                      </div>
                    )}
                    <TextInput
                      label="Screen Name"
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Screen Name"
                      name="name"
                      className="mb-5"
                    />
                  </div>
                  <FileDropZone
                    label="Upload New Logo"
                    name="logo"
                    className="mb-8"
                    maxSize={250}
                    mimeType="image/png"
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
