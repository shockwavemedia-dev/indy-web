import { Tooltip } from '@mui/material'
import axios from 'axios'
import { Form, Formik, useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { Button } from '../components/Button'
import { CheckboxNoFormik } from '../components/CheckboxNoFormik'
import { DateInput } from '../components/DateInput'
import { FileDropZone } from '../components/FileDropZone'
import { CheckIcon } from '../components/icons/CheckIcon'
import { DollarIcon } from '../components/icons/DollarIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { ServiceCheckIcon } from '../components/icons/ServiceCheckIcon'
import { ProjectBriefPrioritySelect } from '../components/ProjectBriefPrioritySelect'
import { RichTextInput } from '../components/RichTextInput'
import { TextInput } from '../components/TextInput'
import { ProjectBriefPriorityOptions } from '../constants/options/ProjectBriefPriorityOptions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { CreateProjectBriefFormSchema } from '../schemas/CreateProjectBriefFormSchema'
import { useToastStore } from '../store/ToastStore'
import { CreateProjectBriefForm } from '../types/forms/CreateProjectBriefForm'
import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { ProjectBriefPriority } from '../types/ProjectBriefPriority.type'
import { SelectOption } from '../types/SelectOption.type'
import { Service } from '../types/Service.type'
import { Ticket } from '../types/Ticket.type'
import { get422And400ResponseError } from '../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../utils/FormHelpers'
export const useProjectBrief = create(
  combine(
    {
      ticket: undefined as undefined | Ticket,
    },
    (set) => ({
      setTicket: (ticket?: Ticket) => set({ ticket }),
    })
  )
)

const ProjectBriefPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const { replace } = useRouter()
  const queryClient = useQueryClient()
  const ticket = useProjectBrief((state) => state.ticket)
  const setTicket = useProjectBrief((state) => state.setTicket)
  const [marketingDateVisible, setMarketingDateVisible] = useState(false)

  const toggleMarketingDate = () => setMarketingDateVisible(!marketingDateVisible)

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
        message: get422And400ResponseError(e),
      })
    }
  }

  const value = 'Relax'

  const [priority, setPriority] = useState<SingleValue<SelectOption<ProjectBriefPriority>>>({
    label: value,
    value,
  })

  useEffect(() => {
    setHeader('Project Brief')
    setTicket()
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Project Brief</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <Formik
          validationSchema={CreateProjectBriefFormSchema}
          initialValues={{
            requestedBy: session?.user.id || -1,
            clientId: session?.user.userType.client.id || -1,
            subject: '',
            services:
              ticket && ticket.services
                ? ticket.services.map(({ serviceId, extras }) => ({
                    serviceId,
                    extras,
                    customFields: [],
                  }))
                : [],
            duedate: null,
            description: ticket ? ticket.description : '',
            attachments: [],
            priority: 'Relax',
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="mx-auto flex w-fit space-x-6">
              <div className="flex w-130 flex-col rounded-xl bg-white p-6">
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter subject"
                  name="subject"
                  className="mb-5"
                  hint="Give your project a name e.g Melbourne Cup"
                />
                <ProjectBriefPrioritySelect
                  options={ProjectBriefPriorityOptions}
                  placeholder="Select Priority"
                  value={priority}
                  onChange={(priority) => {
                    setPriority(priority)
                    setFieldValue('priority', priority!.value)
                  }}
                  className="mb-5"
                />
                <RichTextInput
                  Icon={EditIcon}
                  placeholder="Enter description"
                  name="description"
                  className="mb-5 h-86"
                />
                <CheckboxNoFormik
                  onChange={toggleMarketingDate}
                  label="Add to Marketing Plan"
                  checked={marketingDateVisible}
                />
                {marketingDateVisible && (
                  <div className="mt-2 flex space-x-5">
                    <DateInput name="marketingPlanStartDate" placeholder="Enter Start Date" />
                    <DateInput name="marketingPlanEndDate" placeholder="Enter End Date" />
                  </div>
                )}
                <FileDropZone
                  label="Upload Assets"
                  name="attachments"
                  className="mb-8 mt-5"
                  maxSize={250}
                  mimeType="image/gif"
                  accept={['.gif', '.jpeg', '.mp4', '.png', '.jpg']}
                  multiple
                />
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex space-x-5">
                  <SelectService />
                </div>
                <div className="flex w-60 space-x-5">
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                </div>
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
    }>(`/v1/clients/${session?.user.userType.client.id}/services`)

    return data
  })

  const removeActiveService = () => setActiveService(null)

  return (
    <>
      <div className="flex h-fit w-60 flex-col items-center space-y-2 rounded-xl bg-white p-5">
        <div className="mb-3 text-lg font-semibold text-onyx">Select Services</div>
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
        <div className="h-fit w-60 rounded-xl bg-white p-5">
          <div className="mb-3 text-center text-lg font-semibold text-onyx">
            Select {activeService.extraQuota > 0 && activeService.extraQuota} Extras
          </div>
          <div className="space-y-2">
            {activeService.extras.map((extras, i) => {
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
                  key={`${activeService.serviceId}-${i}-${extras}`}
                  extrasName={extras}
                  serviceId={activeService.serviceId}
                />
              )
            })}
          </div>
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
      <div className={`text-left  text-sm font-medium ${selected ? 'text-white' : 'text-onyx'}`}>
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

  const services = values.services.filter(({ serviceId: sid }) => sid !== serviceId)
  const activeService = values.services.find(({ serviceId: sid }) => sid === serviceId)

  const [customFieldVisible, setCustomFieldVisible] = useState(false)

  const toggleCustomField = () => setCustomFieldVisible(!customFieldVisible)

  const [advertisingCustomFieldVisible, setAdvertisingCustomFieldVisible] = useState(false)

  const toggleAdvertisingCustomField = () =>
    setAdvertisingCustomFieldVisible(!advertisingCustomFieldVisible)

  const toggleExtras = ({ currentTarget: { checked } }: ChangeEvent<HTMLInputElement>) => {
    if (activeService) {
      if (checked) {
        activeService.extras.push(extrasName)
      } else {
        activeService.extras = activeService.extras.filter((extras) => extras !== extrasName)
      }

      if (serviceId === 2 && extrasName === 'Custom') {
        toggleCustomField()
      }
      if (serviceId === 6 && extrasName === 'Custom') {
        toggleAdvertisingCustomField()
      }
    }

    setFieldValue('services', [...services, activeService])
  }

  const setCustomFieldValue = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    setFieldValue('services', [...services, { ...activeService, customFields: [value] }])

  const extras = (
    <>
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
        <label htmlFor={extrasName} className=" text-sm font-medium text-onyx">
          {extrasName}
        </label>
      </div>
      {customFieldVisible && (
        <div className="relative mt-5 flex items-center">
          <EditIcon className="pointer-events-none absolute left-6 stroke-lavender-gray" />
          <input
            type="text"
            className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
            placeholder="Enter Custom"
            onChange={setCustomFieldValue}
          />
        </div>
      )}
      {advertisingCustomFieldVisible && (
        <div className="relative mt-5 flex items-center">
          <DollarIcon className="pointer-events-none absolute left-6 stroke-lavender-gray" />
          <input
            type="text"
            className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
            placeholder="Enter Custom"
            onChange={setCustomFieldValue}
          />
        </div>
      )}
    </>
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
