import axios from 'axios'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Page } from '../../types/Page.type'
import { Service } from '../../types/Service.type'
import FormErrorMessage from '../common/FormErrorMessage'
import CaretIcon from '../common/icons/CaretIcon'
import CheckIcon from '../common/icons/CheckIcon'
import ClipboardIcon from '../common/icons/ClipboardIcon'

const SelectService = ({ name }: { name: string }) => {
  const { setFieldValue } = useFormikContext()
  const { data: session } = useSession()

  const { data: services, isLoading } = useQuery('services', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>(`/v1/clients/${session?.user.userType.clientId}/services`)

    return data
  })

  const [isServicesVisible, setServicesVisible] = useState(false)

  const [selectedServices, setSelectedServices] = useState<{
    [serviceId: number]: Array<string>
  }>({})

  const setSelectedServiceInForm = (selectedServices: { [serviceId: number]: Array<string> }) =>
    setFieldValue(
      name,
      Object.keys(selectedServices).map((serviceId) => ({
        serviceId: Number(serviceId),
        extras: selectedServices[Number(serviceId)] || [],
      }))
    )

  const toggleServices = () => setServicesVisible(!isServicesVisible)

  const toggleService = (serviceId: number) => {
    let servicesToAssign = {}

    if (selectedServices[serviceId]) {
      const { [serviceId]: _, ...filteredServices } = selectedServices
      servicesToAssign = filteredServices
    } else {
      servicesToAssign = { ...selectedServices, [serviceId]: [] }
    }

    setSelectedServices(servicesToAssign)
    setSelectedServiceInForm(servicesToAssign)
  }

  const toggleExtra = (serviceId: number, extra: string) => {
    let servicesToAssign = {}
    const selectedServiceExtras = selectedServices[serviceId]

    if (selectedServices[serviceId].includes(extra)) {
      servicesToAssign = {
        ...selectedServices,
        [serviceId]: selectedServiceExtras.filter((e) => e !== extra),
      }
    } else {
      servicesToAssign = {
        ...selectedServices,
        [serviceId]: [...selectedServiceExtras, extra],
      }
    }

    setSelectedServices(servicesToAssign)
    setSelectedServiceInForm(servicesToAssign)
  }

  return (
    <div className="relative flex w-full flex-col">
      <button
        className="flex min-h-12.5 cursor-default items-center rounded-xl ring-1 ring-bright-gray focus:ring-2 focus:ring-jungle-green focus:ring-opacity-40"
        name="Services"
        onClick={toggleServices}
        type="button"
      >
        <ClipboardIcon className="absolute ml-6 stroke-lavender-gray" />
        <div className="mr-auto pl-13 font-urbanist text-sm font-medium text-metallic-silver">
          {isLoading ? 'Loading Services...' : 'Select services'}
        </div>
        <CaretIcon
          className={`mr-6 stroke-waterloo ${isServicesVisible ? 'rotate-0' : 'rotate-180'}`}
        />
      </button>
      <FormErrorMessage name={name} />
      <div
        className={`absolute top-full z-20 mt-2 flex w-full flex-col overflow-hidden rounded bg-white shadow-react-select ${
          !isServicesVisible ? 'invisible' : 'visible'
        }`}
      >
        <div className="max-h-75 overflow-y-auto py-1">
          {services?.map((service, i) => (
            <ServiceRow
              service={service}
              selectedServices={selectedServices}
              toggleService={toggleService}
              toggleExtra={toggleExtra}
              key={`service-${service.serviceName}-${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const ServiceRow = ({
  service,
  selectedServices,
  toggleService,
  toggleExtra,
}: {
  service: Service
  selectedServices: {
    [serviceId: number]: Array<string>
  }
  toggleService: (serviceId: number) => void
  toggleExtra: (serviceId: number, extra: string) => void
}) => {
  const isServiceSelected = selectedServices[service.serviceId]

  const fireToggleService = () => toggleService(service.serviceId)

  return (
    <>
      <button
        className="flex h-8.5 w-full cursor-default items-center justify-between py-2 px-3 font-urbanist text-sm font-medium text-onyx hover:bg-honeydew"
        type="button"
        name={service.serviceName}
        onClick={fireToggleService}
      >
        <div>{service.serviceName}</div>
        <div
          className={`flex min-h-4 min-w-4 items-center justify-center rounded border border-solid border-bright-gray ${
            isServiceSelected ? 'border-none bg-jungle-green' : 'bg-white'
          }`}
        >
          {isServiceSelected && <CheckIcon className="stroke-white" />}
        </div>
      </button>
      {isServiceSelected &&
        service.extras?.map((extra, i) => {
          const selectExtra = () => toggleExtra(service.serviceId, extra)

          return (
            <Extra
              extra={extra}
              selectedExtras={selectedServices[service.serviceId]}
              selectExtra={selectExtra}
              key={`service-${extra}-${i}`}
            />
          )
        })}
    </>
  )
}

const Extra = ({
  extra,
  selectedExtras,
  selectExtra,
}: {
  extra: string
  selectedExtras: Array<string>
  selectExtra: () => void
}) => {
  const isExtraSelected = selectedExtras.includes(extra)

  return (
    <button
      className="flex h-8.5 w-full cursor-default items-center justify-between py-2 pl-9 pr-3 font-urbanist text-sm font-medium text-onyx hover:bg-honeydew"
      type="button"
      onClick={selectExtra}
    >
      <div>{extra}</div>
      <div
        className={`flex min-h-4 min-w-4 items-center justify-center rounded border border-solid border-bright-gray ${
          isExtraSelected ? 'border-none bg-jungle-green' : 'bg-white'
        }`}
      >
        {isExtraSelected && <CheckIcon className="stroke-white" />}
      </div>
    </button>
  )
}

export default SelectService
