import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { DateInput } from '../../../components/DateInput'
import { FileDropZone } from '../../../components/FileDropZone'
import { ClockIcon } from '../../../components/icons/ClockIcon'
import { EditIcon } from '../../../components/icons/EditIcon'
import { PrinterIcon } from '../../../components/icons/PrinterIcon'
import { UserIcon } from '../../../components/icons/UserIcon'
import { RichTextInput } from '../../../components/RichTextInput'
import { Select } from '../../../components/Select'
import { TextInput } from '../../../components/TextInput'
import { ClientRatingOptions } from '../../../constants/options/ClientRatingOptions'
import { TimezoneOptions } from '../../../constants/options/TimezoneOptions'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { EditClientFormSchema } from '../../../schemas/EditClientFormSchema'
import { useToastStore } from '../../../store/ToastStore'
import { Client } from '../../../types/Client.type'
import { Page } from '../../../types/Page.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Printer } from '../../../types/Printer.type'
import { Staff } from '../../../types/Staff.type'
import { get422And400ResponseError } from '../../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../../utils/FormHelpers'

const ClientSetting: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data } = useQuery(['clients', Number(id)], async () => {
    const { data } = await axios.get<Client>(`/v1/clients/${id}`)

    return data
  })

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

  if (!data) return null

  return (
    <>
      <div className="mx-auto w-full max-w-8xl space-y-5">
        <Formik
          validationSchema={EditClientFormSchema}
          initialValues={{
            name: data.name,
            clientCode: data.clientCode,
            address: data.address,
            phone: data.phone,
            timezone: data.timezone,
            overview: data.overview,
            clientSince: data.clientSince,
            rating: data.rating,
            designatedDesignerId: data.designatedDesignerId,
            logo: null,
            printerId: (data?.printer && data?.printer.id) || -1,
            _method: 'PUT',
          }}
          onSubmit={async (values) => {
            try {
              const { status } = await axios.post(
                `/v1/clients/${data.id}`,
                objectWithFileToFormData({
                  ...values,
                  _method: 'PUT',
                })
              )

              if (status === 200) {
                queryClient.invalidateQueries('clients')
                queryClient.invalidateQueries('printerCompany')
                showToast({
                  type: 'success',
                  message: `${data.name} updated!`,
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
            <Form className="flex w-full flex-col space-y-5">
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
                          ({ value }) => value === data.timezone
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
                          ({ value }) => value === data.rating.toString()
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
                          ({ adminUserId }) => adminUserId === data.designatedDesignerId
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
                          ({ adminUserId }) => adminUserId === data.designatedAnimatorId
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
                          ({ adminUserId }) => adminUserId === data.designatedWebEditorId
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
                          ({ adminUserId }) => adminUserId === data.designatedSocialMediaManagerId
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
                          ({ adminUserId }) => adminUserId === data.designatedPrinterManagerId
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
                      const printerId = data?.printer !== null ? data?.printer.id : -1
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
                  <Button
                    className="w-2/6"
                    ariaLabel="Submit"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

ClientSetting.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientSetting
