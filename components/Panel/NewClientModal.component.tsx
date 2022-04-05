import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQueryClient } from 'react-query'
import { NewClientForm } from '../../interfaces/NewClientForm.interface'
import { NewClientFormSchema } from '../../schemas/NewClientFormSchema'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import EditIcon from '../Common/Icons/Edit.icon'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const NewClientModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: NewClientForm = {
    name: '',
    clientCode: '',
    logo: 'testlogo.png',
    address: '',
    phone: '',
    timezone: '',
    overview: '',
    clientSince: '',
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
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="flex w-140 flex-col">
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      Icon={EditIcon}
                      placeholder="Enter Company Name"
                      name="name"
                      disableAutoComplete
                      errorMessage={errors.name}
                      touched={touched.name}
                    />
                    <TextInput
                      Icon={EditIcon}
                      placeholder="Enter Client Code"
                      name="clientCode"
                      disableAutoComplete
                      errorMessage={errors.clientCode}
                      touched={touched.clientCode}
                    />
                  </div>
                  <FileInput
                    label="Upload assets"
                    name="logo"
                    setFieldValue={setFieldValue}
                    className="mb-5"
                  />
                  <TextAreaInput
                    Icon={EditIcon}
                    placeholder="Enter Overview"
                    name="overview"
                    className="mb-5"
                    errorMessage={errors.overview}
                    touched={touched.overview}
                  />
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      Icon={EditIcon}
                      placeholder="Enter Address"
                      name="address"
                      disableAutoComplete
                      errorMessage={errors.address}
                      touched={touched.address}
                    />
                    <TextInput
                      Icon={EditIcon}
                      placeholder="Enter Phone"
                      name="phone"
                      disableAutoComplete
                      errorMessage={errors.phone}
                      touched={touched.phone}
                    />
                  </div>
                  <div className="mb-5 flex space-x-5">
                    <TextInput
                      Icon={EditIcon}
                      placeholder="Enter Timezone"
                      name="timezone"
                      disableAutoComplete
                      errorMessage={errors.timezone}
                      touched={touched.timezone}
                    />
                    <TextInput
                      Icon={CalendarIcon}
                      placeholder="Enter Client Since"
                      name="clientSince"
                      disableAutoComplete
                      errorMessage={errors.clientSince}
                      touched={touched.clientSince}
                    />
                  </div>
                  <TextInput
                    Icon={EditIcon}
                    placeholder="Enter Rating"
                    name="rating"
                    disableAutoComplete
                    className="mb-8"
                    errorMessage={errors.rating}
                    touched={touched.rating}
                  />
                  <div className="flex space-x-5">
                    <Button ariaLabel="Cancel" light onClick={onClose}>
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

export default NewClientModal
