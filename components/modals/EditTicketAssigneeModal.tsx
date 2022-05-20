import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { TicketAssigneeStatusOptions } from '../../constants/options/TicketAssigneeStatusOptions'
import { useToastStore } from '../../store/ToastStore'
import { EditTicketAssigneeForm } from '../../types/forms/EditTicketAssigneeForm.type'
import { TicketAssignee } from '../../types/TicketAssignee.type'
import { Button } from '../Button'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { Modal } from '../Modal'
import { Select } from '../Select'
import { TitleValue } from '../TitleValue'

export const EditTicketAssigneeModal = ({
  isVisible,
  onClose,
  ticketAssignee,
  ticketId,
}: {
  isVisible: boolean
  onClose: () => void
  ticketAssignee: TicketAssignee
  ticketId: number
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const submitForm = async (
    values: EditTicketAssigneeForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    try {
      const { status } = await axios.put(
        `/v1/ticket-assignees/${ticketAssignee.ticketAssigneeId}`,
        values
      )

      if (status === 200) {
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
        message: 'Something went wrong',
      })
    }

    setSubmitting(false)
  }

  return (
    <>
      {isVisible && (
        <Modal title="Ticket Assignee" onClose={onClose}>
          <Formik
            initialValues={{
              status: ticketAssignee.status,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-8 flex w-140 flex-col">
                  <div className="mb-5 flex space-x-20">
                    <TitleValue title="Department">{ticketAssignee.departmentName}</TitleValue>
                    <TitleValue title="Name" className="capitalize">
                      {ticketAssignee.fullName}
                    </TitleValue>
                    <TitleValue title="Role" className="capitalize">
                      {ticketAssignee.role}
                    </TitleValue>
                  </div>
                  <div className="mb-8 flex space-x-20">
                    <Select
                      label="Status"
                      name="status"
                      Icon={ClipboardIcon}
                      options={TicketAssigneeStatusOptions}
                      defaultValue={TicketAssigneeStatusOptions.find(
                        ({ value }) => value === ticketAssignee.status
                      )}
                    />
                  </div>
                  <div className="flex space-x-5">
                    <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                      <FloppyDiskIcon className="stroke-white" />
                      <div>Save</div>
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
