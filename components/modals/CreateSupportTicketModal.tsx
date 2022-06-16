import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import { TicketTypeOptions } from '../../constants/options/TicketTypeOptions'
import { CreateSupportTicketFormSchema } from '../../schemas/CreateSupportTicketFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Client } from '../../types/Client.type'
import { Department } from '../../types/Department.type'
import { CreateSupportTicketForm } from '../../types/forms/CreateSupportTicketForm.type'
import { Page } from '../../types/Page.type'
import { Ticket } from '../../types/Ticket.type'
import { Button } from '../Button'
import { DateInput } from '../DateInput'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const CreateSupportTicketModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data: departments } = useQuery(
    'departments',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Department>
        page: Page
      }>('/v1/departments')

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const { data: clients } = useQuery(
    'clients',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Client>
        page: Page
      }>('/v1/clients')

      return data
    },
    {
      enabled: isVisible,
    }
  )

  const submitForm = async (values: CreateSupportTicketForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post<Ticket>('/v1/tickets', values)

      if (status === 200) {
        queryClient.invalidateQueries('tickets')
        onClose()
        showToast({
          type: 'success',
          message: `New Ticket ${ticketCode} successfully created!`,
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
        <Modal title="Create Support Request" onClose={onClose}>
          <Formik
            validationSchema={CreateSupportTicketFormSchema}
            initialValues={{
              subject: '',
              description: '',
              type: '',
              requestedBy: session?.user.id || -1,
              clientId: session?.user.userType.clientId || -1,
              departmentId: -1,
              duedate: null,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                {session?.user.userType.type == 'admin_users' && (
                  <Select
                    name="clientId"
                    Icon={ClipboardIcon}
                    placeholder="Select Client"
                    options={
                      clients?.map((client) => ({
                        value: client.id,
                        label: client.name,
                      })) ?? []
                    }
                    className="mb-5"
                  />
                )}
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Subject"
                  name="subject"
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <Select
                    name="type"
                    Icon={ClipboardIcon}
                    placeholder="Select Type"
                    options={TicketTypeOptions}
                  />
                  <DateInput name="duedate" placeholder="Enter due date" />
                </div>
                <Select
                  name="departmentId"
                  Icon={ClipboardIcon}
                  placeholder="Select department"
                  options={
                    departments?.map((department) => ({
                      value: department.id,
                      label: department.name,
                    })) ?? []
                  }
                  className="mb-5"
                />
                <RichTextInput
                  Icon={EditIcon}
                  placeholder="Enter Description"
                  name="description"
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
