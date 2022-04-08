import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { TicketTypeOptions } from '../../constants/TicketTypeOptions'
import { Department } from '../../interfaces/Department.interface'
import { Page } from '../../interfaces/Page.interface'
import { SupportRequestForm } from '../../interfaces/SupportRequestForm.interface'
import { SupportRequestFormSchema } from '../../schemas/SupportRequestFormSchema'
import Button from '../Common/Button.component'
import DateInput from '../Common/DateInput.component'
import ClipboardIcon from '../Common/Icons/Clipboard.icon'
import EditIcon from '../Common/Icons/Edit.icon'
import LightbulbIcon from '../Common/Icons/Lightbulb.icon'
import Select from '../Common/Select.component'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const SupportRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: SupportRequestForm = {
    subject: '',
    description: '',
    type: '',
    requestedBy: session?.user.id || -1,
    clientId: session?.user.userType.clientId || -1,
    departmentId: -1,
    duedate: '',
  }

  const typeOptions = TicketTypeOptions

  const { data: departments } = useQuery('departments', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Department>
      page: Page
    }>('/v1/departments', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  })

  const departmentOptions = departments?.map((department) => ({
    value: department.id,
    label: department.name,
  }))

  const submitForm = async (
    values: SupportRequestForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/tickets', values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    if (status === 200) {
      queryClient.invalidateQueries('tickets')
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="Support Request" onClose={onClose}>
          <Formik
            validationSchema={SupportRequestFormSchema}
            initialValues={formInitialValues}
            onSubmit={submitForm}
          >
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  Icon={EditIcon}
                  placeholder="Enter Subject"
                  name="subject"
                  className="mb-5"
                  errorMessage={errors.subject}
                  touched={touched.subject}
                />
                <Select
                  name="type"
                  Icon={LightbulbIcon}
                  placeholder="Select Type"
                  options={typeOptions}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                  errorMessage={errors.type}
                  touched={touched.type}
                />
                <DateInput
                  name="duedate"
                  placeholder="Enter due date"
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <Select
                  name="departmentId"
                  Icon={ClipboardIcon}
                  placeholder="Select department"
                  options={departmentOptions || []}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                  errorMessage={errors.departmentId}
                  touched={touched.departmentId}
                />
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter Description"
                  name="description"
                  className="mb-8"
                  errorMessage={errors.description}
                  touched={touched.description}
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

export default SupportRequestModal
