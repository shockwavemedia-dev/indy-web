import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { TicketTypeOptions } from '../../constants/TicketTypeOptions'
import { Department } from '../../interfaces/Department.interface'
import { Page } from '../../interfaces/Page.interface'
import { TicketAssigneeForm } from '../../interfaces/TicketAssigneeForm.interface'
import Button from '../Common/Button.component'
import ClipboardIcon from '../Common/Icons/Clipboard.icon'
import UserIcon from '../Common/Icons/User.icon'
import Select from '../Common/Select.component'
import Modal from './Modal.component'

const TicketAssigneeModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: TicketAssigneeForm = {
    department: -1,
    admin_users: [],
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
    values: TicketAssigneeForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/v1/tickets/1/assign', values, {
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
        <Modal title="Ticket Assignee" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="departmentId"
                  Icon={ClipboardIcon}
                  placeholder="Select department"
                  options={departmentOptions || []}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <Select
                  name="admin_users"
                  Icon={UserIcon}
                  placeholder="Select Employee"
                  options={departmentOptions || []}
                  setFieldValue={setFieldValue}
                  className="mb-5"
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

export default TicketAssigneeModal
