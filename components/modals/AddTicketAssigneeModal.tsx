import axios from 'axios'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { AddTicketAssigneeFormSchema } from '../../schemas/AddTicketAssigneeFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Department } from '../../types/Department.type'
import { AddTicketAssigneeForm } from '../../types/forms/AddTicketAssigneeForm.type'
import { Page } from '../../types/Page.type'
import { SelectOption } from '../../types/SelectOption.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'

export const AddTicketAssigneeModal = ({
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
  const [department, setDepartment] = useState<SingleValue<SelectOption<number>>>()

  const submitForm = async (values: AddTicketAssigneeForm) => {
    try {
      const { status } = await axios.post(`/v1/tickets/${ticketId}/assign`, values)

      if (status === 200) {
        queryClient.invalidateQueries(['assignees', Number(ticketId)])
        onClose()
        showToast({
          type: 'success',
          message: 'New Ticket Assignee successfully created!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  useEffect(() => {
    setDepartment(null)
  }, [isVisible])

  return (
    <>
      {isVisible && (
        <Modal title="Add Ticket Assignee" onClose={onClose}>
          <Formik
            initialValues={{
              adminUserId: -1,
              links: [],
            }}
            validationSchema={AddTicketAssigneeFormSchema}
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
                  onChange={setDepartment}
                />
                <Select
                  name="adminUserId"
                  Icon={UserIcon}
                  placeholder="Select Employee"
                  options={
                    departments
                      ?.find(({ id }) => id === department?.value)
                      ?.users?.map(({ adminUserId, firstName, lastName, openTickets }) => ({
                        label: `${firstName} ${lastName} - ${openTickets}`,
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
