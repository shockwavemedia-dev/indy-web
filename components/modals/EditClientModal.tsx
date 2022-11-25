import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { ClientRatingOptions } from '../../constants/options/ClientRatingOptions'
import { TimezoneOptions } from '../../constants/options/TimezoneOptions'
import { EditClientFormSchema } from '../../schemas/EditClientFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { Client } from '../../types/Client.type'
import { Page } from '../../types/Page.type'
import { Printer } from '../../types/Printer.type'
import { Staff } from '../../types/Staff.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Card } from '../Card'
import { DateInput } from '../DateInput'
import { FileDropZone } from '../FileDropZone'
import { ClockIcon } from '../icons/ClockIcon'
import { EditIcon } from '../icons/EditIcon'
import { PrinterIcon } from '../icons/PrinterIcon'
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

  const { data: graphicDesigners } = useQuery(['graphicDesigners', 15], async () => {
    const { data } = await axios.get<Array<Staff>>('/v1/departments/graphic/users')

    return data
  })

  const { data: animators } = useQuery(['animators', 15], async () => {
    const { data } = await axios.get<Array<Staff>>('/v1/departments/animation/users')

    return data
  })

  const { data: webEditors } = useQuery(['webEditors', 15], async () => {
    const { data } = await axios.get<Array<Staff>>('/v1/departments/website/users')

    return data
  })

  const { data: printerUsers } = useQuery(['printerUsers', 15], async () => {
    const { data } = await axios.get<Array<Staff>>('/v1/departments/printer/users')

    return data
  })

  const { data: socialMediaManagers } = useQuery(['socialMediaManagers', 15], async () => {
    const { data } = await axios.get<Array<Staff>>('/v1/departments/social-media/users')

    return data
  })

  const { data: printer } = useQuery('printer', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Printer>
      page: Page
    }>('/v1/printers')

    return data
  })

  const printerOptions = printer
    ? printer.map(({ companyName, id }) => ({
        label: companyName,
        value: id,
      }))
    : []

  if (!client) return null

  return (
    <Modal title={`Edit ${client.name}`} onClose={toggleEditClientModal}>
      <Formik
        validationSchema={EditClientFormSchema}
        initialValues={{
          name: client.name,
          clientCode: client.clientCode,
          address: client.address,
          phone: client.phone,
          timezone: client.timezone,
          overview: client.overview,
          clientSince: client.clientSince,
          rating: client.rating,
          designatedDesignerId: client.designatedDesignerId,
          logo: null,
          printerId: (client?.printer && client?.printer.id) || -1,
          _method: 'PUT',
        }}
        onSubmit={async (values) => {
          try {
            const { status } = await axios.post(
              `/v1/clients/${client.id}`,
              objectWithFileToFormData({
                ...values,
                _method: 'PUT',
              })
            )

            if (status === 200) {
              queryClient.invalidateQueries('clients')
              queryClient.invalidateQueries('printerCompany')
              toggleEditClientModal()
              showToast({
                type: 'success',
                message: `${client.name} updated!`,
              })
            }
          } catch (e) {
            showToast({
              type: 'error',
              message: get422And400ResponseError(e),
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex max-h-130 w-175 flex-col space-y-5 overflow-y-auto">
            <Card className="h-fit w-full">
              <div className="mb-8">
                <div className="mb-5 flex space-x-5">
                  <TextInput
                    label="Name"
                    type="text"
                    Icon={EditIcon}
                    name="name"
                    placeholder="Enter name"
                  />
                  <TextInput
                    label="Client Code"
                    type="text"
                    Icon={EditIcon}
                    name="clientCode"
                    placeholder="Enter client code"
                  />
                </div>
                <div className="mb-5 flex space-x-5">
                  <TextInput
                    label="Address"
                    type="text"
                    Icon={EditIcon}
                    name="address"
                    placeholder="Enter address"
                  />
                  <TextInput
                    label="Phone"
                    type="text"
                    Icon={EditIcon}
                    name="phone"
                    placeholder="Enter phone"
                  />
                </div>
                <div className="mb-5 flex space-x-5">
                  <Select
                    label="Timezone"
                    Icon={ClockIcon}
                    name="timezone"
                    placeholder="Enter timezone"
                    options={TimezoneOptions}
                    defaultValue={(() => {
                      const timezone = TimezoneOptions.find(
                        ({ value }) => value === client.timezone
                      )

                      if (timezone) {
                        return timezone
                      }

                      return undefined
                    })()}
                  />
                  <DateInput label="Client Since" name="clientSince" />
                </div>
                <RichTextInput
                  label="Overview"
                  name="overview"
                  Icon={EditIcon}
                  className="mb-5"
                  placeholder="Enter overview"
                />
                <div className="mb-5 flex space-x-5">
                  <Select
                    label="Rating"
                    name="rating"
                    Icon={EditIcon}
                    placeholder="Select Rating"
                    options={ClientRatingOptions}
                    defaultValue={(() => {
                      const timezone = ClientRatingOptions.find(
                        ({ value }) => value === client.rating.toString()
                      )

                      if (timezone) {
                        return timezone
                      }

                      return undefined
                    })()}
                  />
                  <Select
                    label="Designated Designer"
                    name="designatedDesignerId"
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
                <div className="mb-5 flex space-x-5">
                  <Select
                    label="Designated Animator"
                    name="designatedAnimatorId"
                    Icon={UserIcon}
                    placeholder="Enter designated animator"
                    options={
                      animators?.map(({ fullName, adminUserId }) => ({
                        label: fullName,
                        value: adminUserId,
                      })) ?? []
                    }
                    defaultValue={(() => {
                      const animator = animators?.find(
                        ({ adminUserId }) => adminUserId === client.designatedAnimatorId
                      )

                      if (animator) {
                        return {
                          label: animator.fullName,
                          value: animator.adminUserId,
                        }
                      }

                      return undefined
                    })()}
                  />
                  <Select
                    name="designatedWebEditorId"
                    label="Designated Web Editor"
                    Icon={UserIcon}
                    placeholder="Enter designated web editor"
                    options={
                      webEditors?.map(({ fullName, adminUserId }) => ({
                        label: fullName,
                        value: adminUserId,
                      })) ?? []
                    }
                    defaultValue={(() => {
                      const webEditor = webEditors?.find(
                        ({ adminUserId }) => adminUserId === client.designatedWebEditorId
                      )

                      if (webEditor) {
                        return {
                          label: webEditor.fullName,
                          value: webEditor.adminUserId,
                        }
                      }

                      return undefined
                    })()}
                  />
                </div>
                <div className="mb-5 flex space-x-5">
                  <Select
                    label="Designated Social Media Manager"
                    name="designatedSocialMediaManagerId"
                    Icon={UserIcon}
                    placeholder="Enter designated social media manager"
                    options={
                      socialMediaManagers?.map(({ fullName, adminUserId }) => ({
                        label: fullName,
                        value: adminUserId,
                      })) ?? []
                    }
                    defaultValue={(() => {
                      const socialMediaManager = socialMediaManagers?.find(
                        ({ adminUserId }) => adminUserId === client.designatedSocialMediaManagerId
                      )

                      if (socialMediaManager) {
                        return {
                          label: socialMediaManager.fullName,
                          value: socialMediaManager.adminUserId,
                        }
                      }

                      return undefined
                    })()}
                  />
                  <Select
                    name="designatedPrinterManagerId"
                    label="Designated Printer Manager"
                    Icon={UserIcon}
                    placeholder="Enter designated printer manager"
                    options={
                      printerUsers?.map(({ fullName, adminUserId }) => ({
                        label: fullName,
                        value: adminUserId,
                      })) ?? []
                    }
                    defaultValue={(() => {
                      const printerManager = printerUsers?.find(
                        ({ adminUserId }) => adminUserId === client.designatedPrinterManagerId
                      )

                      if (printerManager) {
                        return {
                          label: printerManager.fullName,
                          value: printerManager.adminUserId,
                        }
                      }

                      return undefined
                    })()}
                  />
                </div>
                <Select
                  label="Printer"
                  name="printerId"
                  Icon={PrinterIcon}
                  options={printerOptions}
                  defaultValue={(() => {
                    const printerId = client?.printer !== null ? client?.printer.id : -1
                    const printer = printerOptions.find(({ value }) => value === printerId)

                    if (printer) {
                      return printer
                    }

                    return undefined
                  })()}
                  className="mb-5"
                />
                <FileDropZone
                  label="Logo"
                  name="logo"
                  accept={['.jpeg', '.png', '.jpg']}
                  maxSize={5}
                  mimeType="image/png"
                  className="mb-8"
                />
              </div>
              <div className="flex space-x-5">
                <Button ariaLabel="Cancel" onClick={toggleEditClientModal} type="button" light>
                  Cancel
                </Button>
                <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
