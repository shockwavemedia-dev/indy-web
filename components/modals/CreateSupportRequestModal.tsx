import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery } from 'react-query'
import { CreateSupportRequestFormSchema } from '../../schemas/CreateSupportRequestFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Department } from '../../types/Department.type'
import { CreateSupportRequestForm } from '../../types/forms/CreateSupportRequestForm.type'
import { Page } from '../../types/Page.type'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TextAreaInput } from '../TextAreaInput'

export const CreateSupportRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { showToast } = useToastStore()

  const { data: departments } = useQuery(
    'departments',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Department>
        page: Page
      }>('/v1/departments')

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const submitForm = async (values: CreateSupportRequestForm) => {
    try {
      const { status } = await axios.post('/v1/support-request', values)

      if (status === 201) {
        onClose()
        showToast({
          type: 'success',
          message: `Support Request successfully created!`,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Create Support Request" onClose={onClose}>
          <Formik
            validationSchema={CreateSupportRequestFormSchema}
            initialValues={{
              message: '',
              departmentId: -1,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="departmentId"
                  Icon={ClipboardIcon}
                  placeholder="Select Department"
                  options={
                    departments?.map((department) => ({
                      value: department.id,
                      label: department.name,
                    })) ?? []
                  }
                  className="mb-5"
                />
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter Message"
                  name="message"
                  className="mb-5"
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
