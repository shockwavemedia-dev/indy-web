import axios from 'axios'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { PropsValue } from 'react-select'
import { Department } from '../../types/Department.type'
import { AddTicketAssigneeForm } from '../../types/forms/AddTicketAssigneeForm.type'
import { Page } from '../../types/Page.type'
import { SelectOption } from '../../types/SelectOption.type'
import { isSingleValue } from '../../utils/SelectHelpers'
import Button from '../Button'
import ClipboardIcon from '../icons/ClipboardIcon'
import UserIcon from '../icons/UserIcon'
import Modal from '../Modal'
import Select from '../Select'

const AddTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketId: number
}) => {
  const queryClient = useQueryClient()
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
          size: 100,
        },
      })

      return data
    },
    {
      enabled: isVisible,
    }
  )
  const [department, setDepartment] = useState<number | null>(null)

  const selectDepartment = (newValue: PropsValue<SelectOption<number>>) => {
    if (isSingleValue(newValue)) {
      setDepartment(newValue?.value || null)
    }
  }

  const submitForm = async (
    values: AddTicketAssigneeForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post(`/v1/tickets/${ticketId}/assign`, values)

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
          <Formik
            initialValues={{
              adminUserId: -1,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-96 flex-col">
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
                  onChange={selectDepartment}
                />
                <Select
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

export default AddTicketAssigneeModal
