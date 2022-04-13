import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { TicketTypeOptions } from '../../../constants/options/TicketTypeOptions'
import { SupportRequestFormSchema } from '../../../schemas/SupportRequestFormSchema'
import { Department } from '../../../types/Department.type'
import { SupportRequestForm } from '../../../types/forms/SupportRequestForm.type'
import { Page } from '../../../types/Page.type'
import Button from '../../common/Button'
import DateInput from '../../common/DateInput'
import ClipboardIcon from '../../common/icons/ClipboardIcon'
import EditIcon from '../../common/icons/EditIcon'
import LightbulbIcon from '../../common/icons/LightbulbIcon'
import Select from '../../common/Select'
import TextAreaInput from '../../common/TextAreaInput'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'

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
    duedate: null,
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
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Subject"
                  name="subject"
                  className="mb-5"
                />
                <Select
                  name="type"
                  Icon={LightbulbIcon}
                  placeholder="Select Type"
                  options={typeOptions}
                  className="mb-5"
                />
                <DateInput name="duedate" placeholder="Enter due date" className="mb-5" />
                <Select
                  name="departmentId"
                  Icon={ClipboardIcon}
                  placeholder="Select department"
                  options={departmentOptions || []}
                  className="mb-5"
                />
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter Description"
                  name="description"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} submit>
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
