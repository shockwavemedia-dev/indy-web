/* eslint-disable react/jsx-key */
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
      activeService: undefined as Service | undefined,
      services: [] as Array<{
        serviceId: number
        serviceName: string
        extras: Array<string>
        customFields: Array<string>
        updatedExtras: Array<{ name: string; quantity?: number | string | null }>
      }>,
    },
    (set) => ({
      setTicket: (ticket?: Ticket) => set({ ticket }),
      setServices: (
        services: Array<{
          serviceId: number
          serviceName: string
          extras: Array<string>
          customFields: Array<string>
          updatedExtras: Array<{ name: string; quantity?: number | string | null }>
        }>
      ) => set({ services }),
      setActiveService: (activeService?: Service) => set({ activeService }),
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
  const services = useProjectBrief((state) => state.services)
  const setServices = useProjectBrief((state) => state.setServices)
  const setActiveService = useProjectBrief((state) => state.setActiveService)
  const setTicket = useProjectBrief((state) => state.setTicket)
  const [marketingDateVisible, setMarketingDateVisible] = useState(false)

  const toggleMarketingDate = () => setMarketingDateVisible(!marketingDateVisible)

  const submitForm = async (values: CreateProjectBriefForm) => {
    try {
      const {
        status,
        data: { ticketCode },
      } = await axios.post<Ticket>(
        '/v1/tickets/event',
        objectWithFileToFormData({
          ...values,
          services: values.services.map(
            ({ serviceId, extras, customFields, updatedExtras, serviceName }) => ({
              serviceId,
              extras:
                serviceName === 'Print' || serviceName === 'Social Media' ? updatedExtras : extras,
              customFields,
            })
          ),
        })
      )
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

  const [priority, setPriority] = useState<SingleValue<SelectOption<ProjectBriefPriority>>>()

  useEffect(() => {
    setHeader('Project Brief')
    setTicket()
    setActiveService()
    setServices([])
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Project Brief</title>
      </Head>
      <div className="mx-auto w-full">
        <Formik
          validationSchema={CreateProjectBriefFormSchema}
          initialValues={{
            requestedBy: session?.user.id || -1,
            clientId: session?.user.userType.client.id || -1,
            subject: '',
            services,
            duedate: null,
            description: ticket ? ticket.description : '',
            attachments: [],
            priority: '',
          }}
          onSubmit={submitForm}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="mx-auto flex w-fit space-x-6">
              <div className="flex w-130 flex-col rounded-xl bg-white p-6">
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  label="Give your project a name"
                  placeholder="Enter subject"
                  name="subject"
                  className="mb-5"
                  hint="Give your project a name e.g Melbourne Cup"
                />
                <ProjectBriefPrioritySelect
                  label="Let us know urgent your project is"
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
                  label="Tell us about your project"
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
                <div className="flex">
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
  const services = useProjectBrief((state) => state.services)
  const activeService = useProjectBrief((state) => state.activeService)
  const setServices = useProjectBrief((state) => state.setServices)
  const setActiveService = useProjectBrief((state) => state.setActiveService)
  const { setFieldValue } = useFormikContext<CreateProjectBriefForm>()

  const { data: fetchedServices } = useQuery('services', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>(`/v1/clients/${session?.user.userType.client.id}/services`)

    return data
  })

  const selectAllExtrasPerService = () => {
    if (activeService) {
      const service = services.find(({ serviceId }) => serviceId === activeService.serviceId)
      let payload
      if (service) {
        const updated = service.extras?.map((extra) => ({
          name: extra,
          quantity: '',
        }))
        payload = [
          ...services.filter(({ serviceId }) => serviceId !== service.serviceId),
          {
            ...service,
            extras: service.extras,
            updatedExtras:
              activeService.serviceName === 'Print' || activeService.serviceName === 'Social Media'
                ? updated
                : [],
          },
        ]
      } else {
        const updated = activeService.extras?.map((extra) => ({
          name: extra,
          quantity: '',
        }))
        payload = [
          ...services,
          {
            ...activeService,
            extras: activeService.extras,
            updatedExtras:
              activeService.serviceName === 'Print' || activeService.serviceName === 'Social Media'
                ? updated
                : [],
          },
        ]
      }
      setServices(payload)
      setFieldValue('services', payload)
    }
  }

  const deSelectAllExtrasPerService = () => {
    if (activeService) {
      const service = services.find(({ serviceId }) => serviceId === activeService.serviceId)
      let payload
      if (service) {
        payload = services.filter(({ serviceId }) => serviceId !== service.serviceId)
        setServices(payload)
        setFieldValue('services', payload)
      }
    }
  }

  return (
    <>
      <div className="flex h-fit w-60 flex-col items-center space-y-2 rounded-xl bg-white p-5">
        <div className="mb-3 text-lg font-semibold text-onyx">Select Services</div>
        {fetchedServices?.map((service) => {
          const toggleService = () => {
            if (service.extras.length === 0) {
              let payload
              if (services.find(({ serviceId }) => serviceId === service.serviceId)) {
                payload = services.filter(({ serviceId }) => serviceId !== service.serviceId)
              } else {
                payload = [
                  {
                    serviceId: service.serviceId,
                    serviceName: service.serviceName,
                    extras: [],
                    customFields: [],
                    updatedExtras: [],
                  },
                  ...services,
                ]
              }

              setServices(payload)
              setFieldValue('services', payload)
            } else {
              if (activeService?.serviceId === service.serviceId) {
                setActiveService()
              } else {
                setActiveService(service)
              }
            }
          }

          return (
            <ServiceButton
              key={`service-${service.serviceId}`}
              disabled={!service.isEnabled}
              onClick={toggleService}
              serviceName={service.serviceName}
              selected={
                service.extras.length > 0
                  ? !!services.find(
                      ({ serviceId: sid, extras }) => sid === service.serviceId && extras.length > 0
                    )
                  : services.some(({ serviceId: sid }) => sid === service.serviceId)
              }
              activeService={activeService?.serviceId === service.serviceId}
            />
          )
        })}
      </div>
      {activeService && activeService.extras.length > 0 && (
        <div
          className={`ml-5 h-fit rounded-xl bg-white p-5 ${
            activeService?.serviceName === 'Print' || activeService?.serviceName === 'Social Media'
              ? 'w-130 '
              : 'w-75'
          }`}
        >
          <div className="mb-3 text-center text-lg font-semibold text-onyx">
            Select {activeService.extraQuota > 0 && activeService.extraQuota} Extras
          </div>
          <div className="space-y-2">
            <div className="mt-2 flex space-x-2">
              <a
                className="h-fit cursor-pointer select-none pt-0.5 text-sm font-medium text-halloween-orange"
                onClick={selectAllExtrasPerService}
              >
                Select All
              </a>
              <div>|</div>
              <a
                className="h-fit cursor-pointer select-none pt-0.5 text-sm font-medium text-halloween-orange"
                onClick={deSelectAllExtrasPerService}
              >
                Deselect All
              </a>
            </div>
            {activeService.extras.map((extras, i) => {
              const foundedExtras = services.find(
                ({ serviceId }) => serviceId === activeService.serviceId
              )?.extras
              return (
                <>
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
                    serviceName={activeService.serviceName}
                  />
                </>
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
  activeService,
}: {
  serviceName: string
  selected: boolean
  disabled: boolean
  onClick: () => void
  activeService: boolean
}) => {
  const serviceButton = (
    <button
      type="button"
      onClick={disabled ? () => {} : onClick}
      className={`flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl px-6 disabled:opacity-50 ${
        selected || activeService
          ? 'bg-halloween-orange'
          : 'border-1.5 border-solid border-bright-gray bg-white'
      } ${disabled ? 'cursor-default opacity-40' : ''}`}
    >
      <div
        className={`text-left  text-sm font-medium ${
          selected || activeService ? 'text-white' : 'text-onyx'
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
  serviceName,
  extrasName,
}: {
  disabled: boolean
  serviceId: number
  serviceName: string
  extrasName: string
}) => {
  const services = useProjectBrief((state) => state.services)
  const setServices = useProjectBrief((state) => state.setServices)
  const activeService = useProjectBrief((state) => state.activeService)
  const { setFieldValue } = useFormikContext<CreateProjectBriefForm>()

  const [customFieldVisible, setCustomFieldVisible] = useState(false)

  const toggleCustomField = () => setCustomFieldVisible(!customFieldVisible)

  const [customPrintFieldVisible, setPrintCustomFieldVisible] = useState(false)
  const [socialMediaValidationVisible, setsocialMediaValidation] = useState(false)

  //const togglePrintCustomField = () => setPrintCustomFieldVisible(!customPrintFieldVisible)

  const [advertisingCustomFieldVisible, setAdvertisingCustomFieldVisible] = useState(false)

  const toggleAdvertisingCustomField = () =>
    setAdvertisingCustomFieldVisible(!advertisingCustomFieldVisible)

  const toggleExtras = ({ currentTarget: { checked } }: ChangeEvent<HTMLInputElement>) => {
    if (activeService) {
      const service = services.find(({ serviceId }) => serviceId === activeService.serviceId)
      let payload
      if (checked) {
        if (activeService.serviceName === 'Print' || activeService.serviceName === 'Social Media') {
          setPrintCustomFieldVisible(true)
        }
        if (service) {
          if (
            activeService.serviceName === 'Print' ||
            activeService.serviceName === 'Social Media'
          ) {
            const extras = [...service.updatedExtras, { name: extrasName, quantity: '' }]
            const updated = extras?.map((extra) => ({
              name: extra.name,
              quantity: extra.quantity,
            }))

            payload = [
              ...services.filter(({ serviceId }) => serviceId !== service.serviceId),
              {
                ...service,
                extras: [...service.extras, extrasName],
                updatedExtras: updated,
              },
            ]
          } else {
            payload = [
              ...services.filter(({ serviceId }) => serviceId !== service.serviceId),
              {
                ...service,
                extras: [...service.extras, extrasName],
              },
            ]
          }
        } else {
          const extras = [{ name: extrasName, quantity: 0 }]
          const updated = extras?.map((extra) => ({
            name: extra.name,
            quantity: extra.quantity,
          }))
          payload = [
            ...services,
            { ...activeService, extras: [extrasName], updatedExtras: updated },
          ]
        }
        setServices(payload)
        setFieldValue('services', payload)
      } else {
        if (activeService.serviceName === 'Print' || activeService.serviceName === 'Social Media') {
          setPrintCustomFieldVisible(false)
        }
        if (service) {
          const extrasPayload = service.extras.filter((extra) => extra !== extrasName)
          if (extrasPayload.length > 0) {
            if (
              activeService.serviceName === 'Print' ||
              activeService.serviceName === 'Social Media'
            ) {
              const updatedExtras = service.updatedExtras.filter(
                (extra) => extra.name !== extrasName
              )
              payload = [
                ...services.filter(({ serviceId }) => serviceId !== service.serviceId),
                { ...service, extras: extrasPayload, updatedExtras: updatedExtras },
              ]
            } else {
              payload = [
                ...services.filter(({ serviceId }) => serviceId !== service.serviceId),
                { ...service, extras: extrasPayload },
              ]
            }
          } else {
            payload = services.filter(({ serviceId }) => serviceId !== service.serviceId)
          }

          setServices(payload)
          setFieldValue('services', payload)
        }
      }

      if (serviceId === 2 && extrasName === 'Custom') {
        toggleCustomField()
      }

      if (serviceId === 6 && extrasName === 'Custom') {
        toggleAdvertisingCustomField()
      }
    }
  }

  const setCustomFieldValue = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (activeService) {
      const service = services.find(({ serviceId }) => serviceId === activeService.serviceId)
      if (service) {
        const payload = [
          ...services.filter(({ serviceId }) => serviceId !== service.serviceId),
          {
            ...service,
            customFields: [value],
          },
        ]
        setServices(payload)
        setFieldValue('services', payload)
      }
    }
  }

  const setAdditonalField = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value !== '' && Number(value) < 50) {
      setsocialMediaValidation(true)
    } else {
      setsocialMediaValidation(false)
    }
    if (activeService) {
      const service = services.find(({ serviceId }) => serviceId === activeService.serviceId)
      if (service) {
        const payload = [
          ...services.filter(({ serviceId }) => serviceId !== service.serviceId),
          {
            ...service,
            updatedExtras: service.updatedExtras?.map((extra) => ({
              name: extra.name,
              quantity: extra.name === extrasName ? value : extra.quantity,
            })),
          },
        ]
        setServices(payload)
        setFieldValue('services', payload)
      }
    }
  }

  const extras = (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div
          className={`relative flex items-center ${disabled ? 'cursor-default opacity-40' : ''}`}
        >
          <input
            type="checkbox"
            name={extrasName}
            id={extrasName}
            className="mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray checked:bg-halloween-orange checked:ring-0"
            onChange={disabled ? undefined : toggleExtras}
            disabled={disabled}
            checked={
              !!services.find(
                ({ serviceId: sid, extras }) => sid === serviceId && extras.includes(extrasName)
              )
            }
          />
          <CheckIcon className="pointer-events-none absolute left-0.75 stroke-white" />
          <div className="-mr-5 mt-2 flex space-x-5">
            <label htmlFor={extrasName} className=" text-sm font-medium text-onyx">
              {extrasName}
            </label>
          </div>
        </div>
        {customPrintFieldVisible ? (
          <div className="flex flex-col">
            <div className="relative mt-5 flex items-center">
              {serviceName === 'Print' ? (
                <EditIcon className="pointer-events-none absolute left-5 stroke-lavender-gray" />
              ) : (
                <DollarIcon className="pointer-events-none absolute left-5 stroke-lavender-gray" />
              )}
              <input
                type="number"
                onChange={setAdditonalField}
                className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
                placeholder={serviceName === 'Print' ? 'Enter Quantity' : 'Enter Amount'}
              />
            </div>
            {socialMediaValidationVisible && (
              <div className={`mt-1 text-xs font-medium text-tart-orange first-letter:uppercase`}>
                Minimum cost is 50
              </div>
            )}
          </div>
        ) : (
          <div className="relative mt-5 flex items-center">
            {services
              .filter(
                (option) => option.serviceId === serviceId && option.extras.includes(extrasName)
              )
              .map(
                (service) =>
                  service.updatedExtras &&
                  service.updatedExtras.length > 0 &&
                  service.updatedExtras
                    .filter((option) => option.name === extrasName)
                    .map((extra) => (
                      <>
                        {serviceName === 'Print' && (
                          <>
                            <EditIcon className="pointer-events-none absolute left-5 stroke-lavender-gray" />
                            <input
                              type="number"
                              onChange={setAdditonalField}
                              className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
                              placeholder="Enter Quantity"
                              defaultValue={
                                extra.quantity !== undefined && extra.quantity !== null
                                  ? extra.quantity
                                  : 0
                              }
                            />
                          </>
                        )}
                        {serviceName === 'Social Media' && (
                          <div className="flex flex-col">
                            <div className="relative mt-5 flex items-center">
                              <DollarIcon className="pointer-events-none absolute left-5 stroke-lavender-gray" />
                              <input
                                type="number"
                                onChange={setAdditonalField}
                                className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
                                placeholder="Enter Amount"
                                defaultValue={
                                  extra.quantity !== undefined && extra.quantity !== null
                                    ? extra.quantity
                                    : 0
                                }
                              />
                            </div>
                            {socialMediaValidationVisible && (
                              <div
                                className={`mt-1 text-xs font-medium text-tart-orange first-letter:uppercase`}
                              >
                                Minimum cost is 50
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ))
              )}
          </div>
        )}
      </div>
      {customFieldVisible && (
        <>
          <div className="relative mt-5 flex items-center">
            <EditIcon className="pointer-events-none absolute left-6 stroke-lavender-gray" />
            <input
              type="text"
              className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
              placeholder="Enter Custom"
              onChange={setCustomFieldValue}
            />
          </div>
        </>
      )}
      {/* {advertisingCustomFieldVisible && (
        <div className="relative mt-5 flex items-center">
          <DollarIcon className="pointer-events-none absolute left-6 stroke-lavender-gray" />
          <input
            type="text"
            className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
            placeholder="Enter Custom"
            onChange={setCustomFieldValue}
          />
        </div>
      )} */}
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
