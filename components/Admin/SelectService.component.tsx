import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Service } from '../../interfaces/Service.interface'
import CaretDownIcon from '../Common/Icons/CaretDown.icon'
import CheckIcon from '../Common/Icons/Check.icon'
import LightbulbIcon from '../Common/Icons/Lightbulb.icon'

const SelectService = ({
  selectedServices,
  setFieldValue,
}: {
  selectedServices: Array<{ serviceId: number; extras: Array<string> }>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  const [isServicesVisible, setServicesVisible] = useState(false)
  const { data: session } = useSession()
  const { data: services, isLoading } = useQuery('services', async () => {
    const { data } = await axios.get<Array<Service>>(
      `/v1/clients/${session?.user.userType.clientId}/services`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    return data
  })

  const toggleServices = () => setServicesVisible(!isServicesVisible)

  return (
    <div className="flex w-full flex-col">
      <label className="mb-2 font-inter text-xs font-normal text-mineshaft">Services</label>
      <div className="relative flex w-full flex-col">
        <button
          className="flex h-11.5 cursor-default items-center overflow-hidden rounded border border-solid border-ebonyclay border-opacity-10 px-2.5 focus-visible:border focus-visible:border-solid focus-visible:border-ebonyclay focus-visible:border-opacity-10"
          name="Services"
          onClick={toggleServices}
          type="button"
        >
          <div className="mr-auto flex items-center space-x-2">
            <LightbulbIcon className="stroke-black" />
            <div className="mr-auto font-inter text-sm font-normal text-stormgray">
              {isLoading ? 'Loading Services...' : 'Select Services'}
            </div>
          </div>
          <CaretDownIcon className="stroke-black" />
        </button>
        <div
          className={`absolute top-full z-10 mt-2 flex w-full flex-col overflow-hidden rounded bg-white shadow-react-select ${
            !isServicesVisible && 'invisible'
          }`}
        >
          <div className="max-h-75 overflow-y-auto py-1">
            {services?.map((service, i) => (
              <ServiceRow
                service={service}
                selectedServices={selectedServices}
                setFieldValue={setFieldValue}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const ServiceRow = ({
  service,
  selectedServices,
  setFieldValue,
}: {
  service: Service
  selectedServices: Array<{ serviceId: number; extras: Array<string> }>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  const [isServiceSelected, setServiceSelected] = useState(false)

  const toggleService = () => {
    setServiceSelected(!isServiceSelected)

    if (!isServiceSelected) {
      selectedServices.unshift({
        serviceId: service.serviceId,
        extras: [],
      })
    } else {
      selectedServices = selectedServices.filter(({ serviceId }) => serviceId !== service.serviceId)
    }

    setFieldValue('services', selectedServices)
  }

  return (
    <>
      <button
        className="flex h-8.5 w-full cursor-default items-center justify-between py-2 px-3 hover:bg-pattensblue"
        type="button"
        name={service.serviceId.toString()}
        onClick={toggleService}
      >
        <div>{service.serviceId}</div>
        <div
          className={`flex min-h-4 min-w-4 items-center justify-center rounded border border-solid border-mineshaft ${
            isServiceSelected ? 'bg-mineshaft' : 'bg-white'
          }`}
        >
          {isServiceSelected && <CheckIcon className="stroke-white" />}
        </div>
      </button>
      {isServiceSelected &&
        service.extras?.map((extra, i) => {
          const handleSelectExtra = () => {
            const extras = selectedServices.find(
              ({ serviceId }) => serviceId === service.serviceId
            )!.extras
            const extraExists = extras.includes(extra)

            if (extraExists) {
              selectedServices.find(({ serviceId }) => serviceId === service.serviceId)!.extras =
                extras.filter((e) => e !== extra)
            } else {
              selectedServices
                .find(({ serviceId }) => serviceId === service.serviceId)!
                .extras.unshift(extra)
            }
          }

          return <Extra extra={extra} selectExtra={handleSelectExtra} key={i} />
        })}
    </>
  )
}

const Extra = ({ extra, selectExtra }: { extra: string; selectExtra: () => void }) => {
  const [isExtraSelected, setExtraSelected] = useState(false)

  const toggleExtra = () => {
    setExtraSelected(!isExtraSelected)
    selectExtra()
  }

  return (
    <button
      className="flex h-8.5 w-full cursor-default items-center justify-between py-2 pl-9 pr-3 hover:bg-pattensblue"
      type="button"
      onClick={toggleExtra}
    >
      <div>{extra}</div>
      <div
        className={`flex min-h-4 min-w-4 items-center justify-center rounded border border-solid border-mineshaft ${
          isExtraSelected ? 'bg-mineshaft' : 'bg-white'
        }`}
      >
        {isExtraSelected && <CheckIcon className="stroke-white" />}
      </div>
    </button>
  )
}

export default SelectService
