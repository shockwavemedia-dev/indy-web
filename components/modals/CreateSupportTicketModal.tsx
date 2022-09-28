import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
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

export const useCreateSupportTicketModalStore = createStore(
  combine(
    {
      isModalVisible: false,
      clientId: -1,
    },
    (set, get) => ({
      toggleModal: (clientId?: number) =>
        set(() => ({ isModalVisible: !get().isModalVisible, clientId: clientId ?? -1 })),
    })
  )
)

export const CreateSupportTicketModal = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { clientId, isModalVisible, toggleModal } = useCreateSupportTicketModalStore()

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
      enabled: isModalVisible,
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
      enabled: isModalVisible,
    }
  )

  const clientOptions = clients
    ? clients.map(({ name, id }) => ({
        label: name,
        value: id,
      }))
    : []

  const submitForm = async (values: CreateSupportTicketForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post<Ticket>('/v1/tickets', values)

      if (status === 200) {
        queryClient.invalidateQueries('tickets')
        toggleModal()
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
      {isModalVisible && (
        <Modal title="Create New Ticket" onClose={toggleModal}>
          <Formik
            validationSchema={CreateSupportTicketFormSchema}
            initialValues={{
              subject: '',
              description: '',
              type: '',
              requestedBy: session?.user.id || -1,
              clientId:
                session?.user.userType.type == 'client_users'
                  ? session?.user.userType.client.id
                  : clientId !== -1
                  ? clientId
                  : -1,
              departmentId: -1,
              duedate: null,
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                {clientId == -1 && (
                  <Select
                    name="clientId"
                    Icon={ClipboardIcon}
                    placeholder="Select Client"
                    options={clientOptions}
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
                  className="mb-5 h-40"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
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
