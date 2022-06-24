import { Tooltip } from '@mui/material'
import axios from 'axios'
import { Form, Formik, useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { DateInput } from '../components/DateInput'
import { FileDropZone } from '../components/FileDropZone'
import { CheckIcon } from '../components/icons/CheckIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { FloppyDiskIcon } from '../components/icons/FloppyDiskIcon'
import { ServiceCheckIcon } from '../components/icons/ServiceCheckIcon'
import { RichTextInput } from '../components/RichTextInput'
import { TextInput } from '../components/TextInput'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { CreateProjectBriefFormSchema } from '../schemas/CreateProjectBriefFormSchema'
import { useToastStore } from '../store/ToastStore'
import { CreateProjectBriefForm } from '../types/forms/CreateProjectBriefForm'
import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { Service } from '../types/Service.type'
import { Ticket } from '../types/Ticket.type'
import { objectWithFileToFormData } from '../utils/FormHelpers'

const ProjectBriefPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const submitForm = async (values: CreateProjectBriefForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post<Ticket>('/v1/tickets/event', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('tickets')
        replace('/dashboard')
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

  useEffect(() => {
    setHeader('Project Brief')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Project Brief</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl">
        <Formik
          validationSchema={CreateProjectBriefFormSchema}
          initialValues={{
            requestedBy: session?.user.id || -1,
            clientId: session?.user.userType.clientId || -1,
            subject: '',
            services: [],
            duedate: null,
            description: '',
            attachments: [],
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex justify-center space-x-6">
                <div className="w-130 space-y-5 rounded-xl bg-white">
                  <div className="p-6">
                    <TextInput
                      type="text"
                      Icon={EditIcon}
                      placeholder="Enter subject"
                      name="subject"
                      className="mb-5"
                    />
                    <DateInput name="duedate" placeholder="Enter due date" className="mb-5" />
                    <RichTextInput
                      Icon={EditIcon}
                      placeholder="Enter description"
                      name="description"
                      className="mb-5"
                    />
                    <Checkbox label="Add to Marketing Plan" name="marketingPlan" className="mb-5" />
                    <FileDropZone
                      label="Upload Assets"
                      name="attachments"
                      className="mb-8"
                      maxSize={250}
                      mimeType="image/gif"
                      accept={['.gif', '.jpeg', '.mp4', '.png']}
                      multiple
                    />
                    <div className="flex space-x-5">
                      <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
                <SelectService />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

const SelectService = () => {
  const { data: session } = useSession()
  const { values, setFieldValue } = useFormikContext<CreateProjectBriefForm>()
  const [activeService, setActiveService] = useState<Service | null>(null)

  const { data: services } = useQuery('services', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>(`/v1/clients/${session?.user.userType.clientId}/services`)

    return data
  })

  const removeActiveService = () => setActiveService(null)

  return (
    <>
      <div className="flex h-fit w-60 flex-col items-center space-y-2 rounded-xl bg-white p-5">
        <div className="mb-3 font-urbanist text-lg font-semibold text-onyx">Select Services</div>
        {services?.map((service) => {
          const toggleService = () => {
            if (values.services.find(({ serviceId }) => serviceId === service.serviceId)) {
              removeActiveService()
              setFieldValue(
                'services',
                values.services.filter(({ serviceId }) => serviceId !== service.serviceId)
              )
              return
            }

            if (service && service.extras.length > 0) {
              setActiveService(service)
            }

            setFieldValue('services', [
              {
                serviceId: service.serviceId,
                extras: [],
              },
              ...values.services,
            ])
          }

          return (
            <ServiceButton
              key={`service-${service.serviceId}`}
              disabled={!service.isEnabled}
              onClick={toggleService}
              serviceName={service.serviceName}
              selected={values.services.some(({ serviceId: sid }) => sid === service.serviceId)}
            />
          )
        })}
      </div>
      {activeService && activeService.extras.length > 0 && (
        <div className="flex h-fit w-52 flex-col items-center rounded-xl bg-white p-5">
          <div className="mb-3 font-urbanist text-lg font-semibold text-onyx">
            Select {activeService.extraQuota > 0 && activeService.extraQuota} Extras
          </div>
          <div className="space-y-2">
            {activeService.extras.map((extras) => {
              const foundedExtras = values.services.find(
                ({ serviceId }) => serviceId === activeService.serviceId
              )?.extras

              return (
                <Extras
                  disabled={
                    activeService.extraQuota === 0
                      ? false
                      : foundedExtras?.length === activeService.extraQuota &&
                        !foundedExtras?.includes(extras)
                  }
                  key={`${activeService.serviceId}-${extras}`}
                  extrasName={extras}
                  serviceId={activeService.serviceId}
                />
              )
            })}
          </div>
          <Button
            ariaLabel="Save Extras"
            onClick={removeActiveService}
            type="button"
            className="mt-6"
          >
            <FloppyDiskIcon className="stroke-white" />
            <div>Save</div>
          </Button>
        </div>
      )}
    </>
  )
}

const ServiceButton = ({
  serviceName,
  selected,
  disabled,
  onClick,
}: {
  serviceName: string
  selected: boolean
  disabled: boolean
  onClick: () => void
}) => {
  const serviceButton = (
    <button
      type="button"
      onClick={disabled ? () => {} : onClick}
      className={`flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl px-6 disabled:opacity-50 ${
        selected ? 'bg-halloween-orange' : 'border-1.5 border-solid border-bright-gray bg-white'
      } ${disabled ? 'cursor-default opacity-40' : ''}`}
    >
      <div
        className={`text-left font-urbanist text-sm font-medium ${
          selected ? 'text-white' : 'text-onyx'
        }`}
      >
        {serviceName}
      </div>
      {selected && <ServiceCheckIcon />}
    </button>
  )

  return disabled ? (
    <Tooltip title="Sorry but you no longer have access to this service." placement="top">
      {serviceButton}
    </Tooltip>
  ) : (
    serviceButton
  )
}

const Extras = ({
  disabled,
  serviceId,
  extrasName,
}: {
  disabled: boolean
  serviceId: number
  extrasName: string
}) => {
  const { values, setFieldValue } = useFormikContext<CreateProjectBriefForm>()

  const toggleExtras = ({ currentTarget: { checked } }: ChangeEvent<HTMLInputElement>) => {
    const services = values.services.filter(({ serviceId: sid }) => sid !== serviceId)
    const activeService = values.services.find(({ serviceId: sid }) => sid === serviceId)

    if (activeService) {
      if (checked) {
        activeService.extras.push(extrasName)
      } else {
        activeService.extras = activeService.extras.filter((extras) => extras !== extrasName)
      }
    }

    setFieldValue('services', [...services, activeService])
  }

  const extras = (
    <div className={`relative flex items-center ${disabled ? 'cursor-default opacity-40' : ''}`}>
      <input
        type="checkbox"
        name={extrasName}
        id={extrasName}
        className="mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray checked:bg-halloween-orange checked:ring-0"
        onChange={disabled ? () => {} : toggleExtras}
        disabled={disabled}
      />
      <CheckIcon className="pointer-events-none absolute left-0.75 stroke-white" />
      <label htmlFor={extrasName} className="font-urbanist text-sm font-medium text-onyx">
        {extrasName}
      </label>
    </div>
  )

  return disabled ? (
    <Tooltip title="Sorry but you have reached your extras quota." placement="top">
      {extras}
    </Tooltip>
  ) : (
    extras
  )
}

ProjectBriefPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ProjectBriefPage
