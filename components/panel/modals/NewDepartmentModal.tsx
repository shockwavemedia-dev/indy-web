import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { NewDepartmentFormSchema } from '../../../schemas/NewDepartmentFormSchema'
import { NewDepartmentForm } from '../../../types/forms/NewDepartmentForm.type'
import Button from '../../common/Button'
import PencilIcon from '../../common/icons/PencilIcon'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'

const NewDepartmentModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()

  const formInitialValues: NewDepartmentForm = {
    name: '',
    description: '',
    minDeliveryDays: -1,
  }

  const submitForm = async (
    values: NewDepartmentForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/departments', values)

    if (status === 200) {
      queryClient.invalidateQueries('departments')
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Department" onClose={onClose}>
          <Formik
            validationSchema={NewDepartmentFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Department Name"
                  name="name"
                  className="mb-5"
                />
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Description"
                  name="description"
                  className="mb-5"
                />
                <TextInput
                  type="text"
                  Icon={PencilIcon}
                  placeholder="Minimum Delivery Days"
                  name="minDeliveryDays"
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
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}

export default NewDepartmentModal
