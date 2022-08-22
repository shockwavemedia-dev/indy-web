import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { TimezoneOptions } from '../../constants/options/TimezoneOptions'
import { EditClientFormSchema } from '../../schemas/EditClientFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Client } from '../../types/Client.type'
import { Staff } from '../../types/Staff.type'
import { Button } from '../Button'
import { DateInput } from '../DateInput'
import { ClockIcon } from '../icons/ClockIcon'
import { EditIcon } from '../icons/EditIcon'
import { UserIcon } from '../icons/UserIcon'
import { Modal } from '../Modal'
import { RichTextInput } from '../RichTextInput'
import { Select } from '../Select'
import { TextInput } from '../TextInput'

export const useEditClientModal = createStore(
  combine(
    {
      client: undefined as Client | undefined,
    },
    (set) => ({
      toggleEditClientModal: (client?: Client) => set(() => ({ client })),
    })
  )
)

export const EditClientModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const client = useEditClientModal((state) => state.client)
  const toggleEditClientModal = useEditClientModal((state) => state.toggleEditClientModal)

  const { data: graphicDesigners } = useQuery(['staffs', 15], async () => {
    const { data } = await axios.get<Array<Staff>>('/v1/departments/15/staffs')

    return data
  })

  if (!client) return null

  return (
    <Modal title={`Edit ${client.name}`} onClose={toggleEditClientModal}>
      <Formik
        validationSchema={EditClientFormSchema}
        initialValues={{
          name: client.name,
          clientCode: client.clientCode,
          logo: null,
          address: client.address,
          phone: client.phone,
          timezone: client.timezone,
          overview: client.overview,
          clientSince: client.clientSince,
          rating: client.rating,
          designatedDesignerId: client.designatedDesignerId,
        }}
        onSubmit={async (values) => {
          try {
            const { status } = await axios.put(`/v1/clients/${client.id}`, values)

            if (status === 200) {
              queryClient.invalidateQueries('clients')
              toggleEditClientModal()
              showToast({
                type: 'success',
                message: `${client.name} updated!`,
              })
            }
          } catch (e) {
            showToast({
              type: 'error',
              message: 'Something went wrong! 😵',
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-140 flex-col">
            <div className="mb-8 space-y-5">
              <div className="flex space-x-5">
                <TextInput type="text" Icon={EditIcon} name="name" placeholder="Enter name" />
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  name="clientCode"
                  placeholder="Enter client code"
                />
              </div>
              <div className="flex space-x-5">
                <TextInput type="text" Icon={EditIcon} name="address" placeholder="Enter address" />
                <TextInput type="text" Icon={EditIcon} name="phone" placeholder="Enter phone" />
              </div>
              <div className="flex space-x-5">
                <Select
                  Icon={ClockIcon}
                  name="timezone"
                  placeholder="Enter timezone"
                  options={TimezoneOptions}
                  defaultValue={(() => {
                    const timezone = TimezoneOptions.find(({ value }) => value === client.timezone)

                    if (timezone) {
                      return timezone
                    }

                    return undefined
                  })()}
                />
                <DateInput name="clientSince" />
              </div>
              <RichTextInput name="overview" Icon={EditIcon} placeholder="Enter overview" />
              <div className="flex space-x-5">
                <TextInput type="text" Icon={EditIcon} name="rating" placeholder="Enter rating" />
                <Select
                  name="designatedDesigner"
                  Icon={UserIcon}
                  placeholder="Enter designated designer"
                  options={
                    graphicDesigners?.map(({ fullName, adminUserId }) => ({
                      label: fullName,
                      value: adminUserId,
                    })) ?? []
                  }
                  defaultValue={(() => {
                    const graphicDesigner = graphicDesigners?.find(
                      ({ adminUserId }) => adminUserId === client.designatedDesignerId
                    )

                    if (graphicDesigner) {
                      return {
                        label: graphicDesigner.fullName,
                        value: graphicDesigner.adminUserId,
                      }
                    }

                    return undefined
                  })()}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={toggleEditClientModal} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
