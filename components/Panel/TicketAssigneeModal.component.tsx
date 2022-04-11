import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
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
  ticketId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketId?: number | string | Array<string>
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const formInitialValues: TicketAssigneeForm = {
    departmentId: -1,
    adminUserId: -1,
    departmentName: '',
    role: 'staff',
    fullName: '',
    ticketAssigneeId: -1,
    status: '',
  }

  const { data: departments } = useQuery('departmentsWithUsers', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Department>
      page: Page
    }>('/v1/departments', {
      params: {
        with_users: true,
      },
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  })

  const submitForm = async (
    values: TicketAssigneeForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post(
      `/v1/tickets/${ticketId}/assign`,
      { adminUserId: values.adminUserId },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    if (status === 200) {
      queryClient.invalidateQueries('assignees')
      onClose()
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="Ticket Assignee" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={submitForm}>
            {({ values: { departmentId }, isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="departmentId"
                  Icon={ClipboardIcon}
                  placeholder="Select department"
                  options={
                    departments?.map(({ name, id }) => ({
                      label: name,
                      value: id,
                    })) || []
                  }
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <Select
                  name="adminUserId"
                  Icon={UserIcon}
                  placeholder="Select Employee"
                  options={
                    departments
                      ?.find(({ id }) => id === departmentId)
                      ?.users?.map(({ adminUserId, firstName, lastName }) => ({
                        label: `${firstName} ${lastName}`,
                        value: adminUserId,
                      })) || []
                  }
                  setFieldValue={setFieldValue}
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

export default TicketAssigneeModal
