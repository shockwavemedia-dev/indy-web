import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { NewClientFormSchema } from '../../schemas/NewClientFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { NewClientForm } from '../../types/forms/NewClientForm.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { DateInput } from '../DateInput'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { TextInput } from '../TextInput'

export const NewClientModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: NewClientForm) => {
    try {
      const { status } = await axios.post('/v1/clients', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('clients')
        onClose()
        showToast({
          type: 'success',
          message: 'New Client successfully created!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Client" onClose={onClose}>
          <Formik
            validationSchema={NewClientFormSchema}
            initialValues={{
              name: '',
              clientCode: '',
              logo: null,
              address: '',
              phone: '',
              timezone: '',
              overview: '',
              clientSince: null,
              rating: null,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex w-140 flex-col">
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Company Name"
                      name="name"
                    />
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Client Code"
                      name="clientCode"
                    />
                  </div>
                  {/* <FileDropZone label="Upload assets" name="logo" className="mb-5" /> */}
                  <RichTextInput
                    Icon={EditIcon}
                    placeholder="Enter Overview"
                    name="overview"
                    className="mb-5"
                  />
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      name="address"
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Address"
                    />
                    <TextInput type="text" Icon={EditIcon} placeholder="Enter Phone" name="phone" />
                  </div>
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      name="timezone"
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter Timezone"
                    />
                    <DateInput name="clientSince" placeholder="Enter Client Since" />
                  </div>
                  <TextInput
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Rating"
                    name="rating"
                    className="mb-8"
                  />
                  <div className="flex space-x-5">
                    <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
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
