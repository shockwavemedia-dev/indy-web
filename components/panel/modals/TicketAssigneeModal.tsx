import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import { Department } from '../../../types/Department.type'
import { TicketAssigneeForm } from '../../../types/forms/TicketAssigneeForm.type'
import { Page } from '../../../types/Page.type'
import Button from '../../common/Button'
import ClipboardIcon from '../../common/icons/ClipboardIcon'
import UserIcon from '../../common/icons/UserIcon'
import Select from '../../common/Select'
import Modal from '../Modal'

const TicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketId?: number | string | Array<string>
}) => {
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

  const { data: departments } = useQuery(
    'departmentsWithUsers',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Department>
        page: Page
      }>('/v1/departments', {
        params: {
          with_users: true,
        },
      })

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const submitForm = async (
    values: TicketAssigneeForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post(`/v1/tickets/${ticketId}/assign`, {
      adminUserId: values.adminUserId,
    })

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
            {({ values: { departmentId }, isSubmitting }) => (
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

export default TicketAssigneeModal
