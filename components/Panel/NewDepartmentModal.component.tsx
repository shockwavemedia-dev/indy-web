import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { NewDepartmentForm } from '../../interfaces/NewDepartmentForm.interface'
import Button from '../Common/Button.component'
import PencilIcon from '../Common/Icons/Pencil.icon'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const NewDepartmentModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()

  const formInitialValues: NewDepartmentForm = {
    name: '',
    description: '',
    minDeliveryDays: '',
  }

  const submitForm = async (
    values: NewDepartmentForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/departments', values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
    } else {
      setSubmitting(false)
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Department" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Department Name"
                  name="name"
                  disableAutoComplete
                  className="mb-5"
                />
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Description"
                  name="description"
                  disableAutoComplete
                  className="mb-5"
                />
                <TextInput
                  Icon={PencilIcon}
                  placeholder="Minimum Delivery Days"
                  name="minDeliveryDays"
                  disableAutoComplete
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}

export default NewDepartmentModal
