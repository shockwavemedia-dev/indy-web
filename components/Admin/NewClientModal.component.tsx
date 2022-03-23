import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { MouseEventHandler } from 'react'
import { NewClientForm } from '../../interfaces/NewClientForm.interface'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import PencilIcon from '../Common/Icons/Pencil.icon'
import TextInput from '../Common/TextInput.component'
import TextAreaInput from '../Common/TextAreaInput.component'
import Modal from './Modal.component'

const NewClientModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const { data: session } = useSession()

  const formInitialValues: NewClientForm = {
    name: '',
    clientCode: '',
    logo: 'testlogo.png',
    address: '',
    phone: '',
    timezone: '',
    overview: '',
    clientSince: '',
    rating: ''
  }

  const submitForm = async (
      values: NewClientForm,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    await axios.post('/v1/clients', values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Client" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="flex w-[560px] flex-col">
                  <div className="mb-[24px]">
                    <TextInput
                      label="Company Name"
                      Icon={PencilIcon}
                      placeholder="Enter Company Name"
                      name="name"
                      disableAutoComplete
                    />
                  </div>
                  <div className="mb-[24px]">
                    <TextInput
                        label="Client Code"
                        Icon={PencilIcon}
                        placeholder="Enter Client Code"
                        name="clientCode"
                        disableAutoComplete
                    />
                  </div>
                  <div className="mb-[24px]">
                    <FileInput
                        label="Logo"
                        name="logo"
                        setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="mb-[24px]">
                    <TextAreaInput
                        label="Overview"
                        Icon={PencilIcon}
                        placeholder="Enter Overview"
                        name="overview"
                    />
                  </div>
                  <div className="mb-[24px]">
                    <TextAreaInput
                      label="Address"
                      Icon={PencilIcon}
                      placeholder="Enter Address"
                      name="address"
                    />
                  </div>
                  <div className="mb-[24px]">
                    <TextInput
                        label="Phone"
                        Icon={PencilIcon}
                        placeholder="Enter Phone"
                        name="phone"
                        disableAutoComplete
                    />
                  </div>
                  <div className="mb-[24px]">
                    <TextInput
                        label="Timezone"
                        Icon={PencilIcon}
                        placeholder="Enter Timezone"
                        name="timezone"
                        disableAutoComplete
                    />
                  </div>
                  <div className="mb-[24px] flex space-x-[12px]">
                    <TextInput
                        label="Client Since"
                        Icon={CalendarIcon}
                        placeholder="Enter Client Since"
                        name="clientSince"
                        disableAutoComplete
                    />
                  </div>
                  <div className="mb-[24px] flex space-x-[12px]">
                    <TextInput
                        label="Rating"
                        Icon={PencilIcon}
                        placeholder="Enter Rating"
                        name="rating"
                        disableAutoComplete
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

export default NewClientModal
