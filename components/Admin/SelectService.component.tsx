import camelcaseKeys from 'camelcase-keys'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Service } from '../../interfaces/Service.interface'
import { API_BASE_URL } from '../../utils/constants'
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
    const res = await fetch(
      `${API_BASE_URL}/v1/clients/${session?.user.userType.clientId}/services`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )

    const { data } = await res.json()

    return camelcaseKeys(data, { deep: true }) as Array<Service>
  })

  const toggleServices = () => {
    setServicesVisible(!isServicesVisible)
  }

  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] font-inter text-[12px] font-normal text-mineshaft">Service</label>
      <div className="relative flex w-full flex-col">
        <button
          className="flex h-[46px] cursor-default items-center overflow-hidden rounded-[4px] border border-solid border-ebonyclay border-opacity-10 px-[10px] focus-visible:border focus-visible:border-solid focus-visible:border-ebonyclay focus-visible:border-opacity-10"
          name="Services"
          onClick={toggleServices}
          type="button"
        >
          <div className="mr-auto flex items-center space-x-[8px]">
            <LightbulbIcon />
            <div className="mr-auto font-inter text-[14px] font-normal text-stormgray">
              {isLoading ? 'Loading Services...' : 'Select Services'}
            </div>
          </div>
          <CaretDownIcon className="stroke-black" />
        </button>
        <div
          className={`absolute top-full z-10 mt-[8px]  flex w-full flex-col overflow-hidden rounded-[4px] bg-white shadow-react-select ${
            !isServicesVisible && 'invisible'
          }`}
        >
          <div className="max-h-[300px] overflow-y-auto py-[4px]">
            {services?.map((service, i) => {
              return (
                <ServiceRow
                  service={service}
                  selectedServices={selectedServices}
                  setFieldValue={setFieldValue}
                  key={i}
                />
              )
            })}
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

  const handleSelectService = () => {
    setServiceSelected(!isServiceSelected)

    if (!isServiceSelected) {
      selectedServices.unshift({
        serviceId: service.serviceId,
        extras: [],
      })
    } else {
      selectedServices = selectedServices.filter(({ serviceId }) => serviceId !== service.serviceId)
    }

    setFieldValue('service', selectedServices)
  }

  return (
    <>
      <button
        className="flex h-[33px] w-full cursor-default items-center justify-between py-[8px] px-[12px] hover:bg-pattensblue"
        type="button"
        name={service.serviceId.toString()}
        onClick={handleSelectService}
      >
        <div>{service.serviceId}</div>
        <div
          className={`flex min-h-[16px] min-w-[16px] items-center justify-center rounded-[4px] border border-solid border-mineshaft ${
            isServiceSelected ? 'bg-mineshaft' : 'bg-white'
          }`}
        >
          {isServiceSelected && <CheckIcon />}
        </div>
      </button>
      {isServiceSelected &&
        service.extras?.map((extra, i) => {
          const selectExtra = () => {
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

          return <ExtraRow extra={extra} selectExtra={selectExtra} key={i} />
        })}
    </>
  )
}

const ExtraRow = ({ extra, selectExtra }: { extra: string; selectExtra: () => void }) => {
  const [isExtraSelected, setExtraSelected] = useState(false)

  const handleSelectExtra = () => {
    setExtraSelected(!isExtraSelected)
    selectExtra()
  }

  return (
    <button
      className="flex h-[33px] w-full cursor-default items-center justify-between py-[8px] pl-[36px] pr-[12px] hover:bg-pattensblue"
      type="button"
      onClick={handleSelectExtra}
    >
      <div>{extra}</div>
      <div
        className={`flex min-h-[16px] min-w-[16px] items-center justify-center rounded-[4px] border border-solid border-mineshaft ${
          isExtraSelected ? 'bg-mineshaft' : 'bg-white'
        }`}
      >
        {isExtraSelected && <CheckIcon />}
      </div>
    </button>
  )
}

export default SelectService
