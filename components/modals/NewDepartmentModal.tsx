import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { NewDepartmentFormSchema } from '../../schemas/NewDepartmentFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { NewDepartmentForm } from '../../types/forms/NewDepartmentForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { PencilIcon } from '../icons/PencilIcon'
import { Modal } from '../Modal'
import { SelectService } from '../SelectService'
import { TextInput } from '../TextInput'

export const NewDepartmentModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (values: NewDepartmentForm) => {
    try {
      const { status } = await axios.post('/v1/departments', values)

      if (status === 200) {
        queryClient.invalidateQueries('departments')
        onClose()
        showToast({
          type: 'success',
          message: 'New Department successfully created!',
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
        <Modal
          title="New Department"
          onClose={onClose}
          className="-translate-x-[calc(100%_-_11.75rem)]"
        >
          <Formik
            validationSchema={NewDepartmentFormSchema}
            initialValues={{
              name: '',
              description: '',
              services: [],
            }}
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
                <SelectService enabled={isVisible} />
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
