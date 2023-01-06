import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { TicketAssigneeStatusOptions } from '../../constants/options/TicketAssigneeStatusOptions'
import { useTicketAssigneeStore } from '../../store/TicketAssigneeStore'
import { useToastStore } from '../../store/ToastStore'
import { EditTicketAssigneeForm } from '../../types/forms/EditTicketAssigneeForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TitleValue } from '../TitleValue'

export const EditTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketId: number
}) => {
  const queryClient = useQueryClient()
  const { activeTicketAssignee } = useTicketAssigneeStore()
  const { showToast } = useToastStore()

  const submitForm = async (values: EditTicketAssigneeForm) => {
    try {
      const { status } = await axios.put(
        `/v1/ticket-assignees/${activeTicketAssignee.ticketAssigneeId}/status`,
        values
      )

      if (status === 200) {
        queryClient.invalidateQueries(['ticket', Number(ticketId)])
        queryClient.invalidateQueries(['assignees', Number(ticketId)])
        onClose()
        showToast({
          type: 'success',
          message: 'Status was successfully saved',
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
        <Modal title="Edit Ticket Assignee" onClose={onClose}>
          <Formik
            initialValues={{
              status: activeTicketAssignee.status,
              links: [],
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="w-96">
                <div className="mb-5 flex space-x-10">
                  <TitleValue title="Department">{activeTicketAssignee.departmentName}</TitleValue>
                  <TitleValue title="Name" className="capitalize">
                    {activeTicketAssignee.fullName}
                  </TitleValue>
                  <TitleValue title="Role" className="capitalize">
                    {activeTicketAssignee.role}
                  </TitleValue>
                </div>
                <Select
                  label="Status"
                  name="status"
                  Icon={ClipboardIcon}
                  options={TicketAssigneeStatusOptions}
                  defaultValue={TicketAssigneeStatusOptions.find(
                    ({ value }) => value === activeTicketAssignee.status
                  )}
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    <FloppyDiskIcon className="stroke-white" />
                    <div>Save</div>
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
