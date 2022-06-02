import axios from 'axios'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { ReAssignTicketAssigneeFormSchema } from '../../schemas/ReAssignTicketAssigneeFormSchema'
import { useTicketAssigneeStore } from '../../store/TicketAssigneeStore'
import { useToastStore } from '../../store/ToastStore'
import { Department } from '../../types/Department.type'
import { ReAssignTicketAssigneeForm } from '../../types/forms/ReAssignTicketAssigneeForm.type'
import { Page } from '../../types/Page.type'
import { SelectOption } from '../../types/SelectOption.type'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'

export const ReAssignTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketId: number
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { activeTicketAssignee } = useTicketAssigneeStore()

  const { data: departments } = useQuery(
    'departmentsWithUsers',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Department>
        page: Page
      }>('/v1/departments/staff-list', {
        params: {
          size: 100,
        },
      })

      return data
    },
    {
      enabled: isVisible,
    }
  )
  const [department, setDepartment] = useState<number>(activeTicketAssignee.departmentId)

  const selectDepartment = (newValue: SingleValue<SelectOption<number>>) =>
    setDepartment(newValue?.value ?? -1)

  const submitForm = async (values: ReAssignTicketAssigneeForm) => {
    try {
      const { status } = await axios.put(
        `/v1/ticket-assignees/${activeTicketAssignee.ticketAssigneeId}`,
        values
      )

      if (status === 200) {
        queryClient.invalidateQueries(['assignees', Number(ticketId)])
        onClose()
        showToast({
          type: 'success',
          message: 'New Ticket Assignee successfully re-assigned!',
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
        <Modal title="Re-assign Ticket Assignee" onClose={onClose}>
          <Formik
            initialValues={{
              adminUserId: activeTicketAssignee.adminUserId,
            }}
            validationSchema={ReAssignTicketAssigneeFormSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-96 flex-col">
                <Select
                  Icon={ClipboardIcon}
                  placeholder="Select department"
                  options={
                    departments?.map(({ name, id }) => ({
                      label: name,
                      value: id,
                    })) || []
                  }
                  className="mb-5"
                  defaultValue={(() => {
                    const department = departments?.find(
                      ({ name }) => name === activeTicketAssignee.departmentName
                    )

                    if (department) {
                      return {
                        label: department.name,
                        value: department.id,
                      }
                    }
                  })()}
                  onChange={selectDepartment}
                />
                <Select
                  name="adminUserId"
                  Icon={UserIcon}
                  placeholder="Select Employee"
                  options={
                    departments
                      ?.find(({ id }) => id === department)
                      ?.users?.map(({ adminUserId, firstName, lastName }) => ({
                        label: `${firstName} ${lastName}`,
                        value: adminUserId,
                      })) || []
                  }
                  className="mb-8"
                  defaultValue={{
                    label: activeTicketAssignee.fullName,
                    value: activeTicketAssignee.adminUserId,
                  }}
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
