import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { NewClientFormSchema } from '../../../schemas/NewClientFormSchema'
import { NewClientForm } from '../../../types/forms/NewClientForm.type'
import { objectWithFileToFormData } from '../../../utils/FormHelpers'
import Button from '../../Common/Button'
import DateInput from '../../Common/DateInput'
import FileInput from '../../Common/FileInput'
import EditIcon from '../../Common/icons/EditIcon'
import TextAreaInput from '../../Common/TextAreaInput'
import TextInput from '../../Common/TextInput'
import Modal from '../Modal'

const NewClientModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: NewClientForm = {
    name: '',
    clientCode: '',
    logo: null,
    address: '',
    phone: '',
    timezone: '',
    overview: '',
    clientSince: null,
    rating: -1,
  }

  const submitForm = async (
    values: NewClientForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/clients', objectWithFileToFormData(values), {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
      queryClient.invalidateQueries('clients')
      onClose()
    } else {
      setSubmitting(false)
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Client" onClose={onClose}>
          <Formik
            validationSchema={NewClientFormSchema}
            initialValues={formInitialValues}
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
                  <FileInput label="Upload assets" name="logo" className="mb-5" />
                  <TextAreaInput
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

export default NewClientModal
