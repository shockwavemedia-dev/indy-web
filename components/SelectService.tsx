import { Tooltip } from '@mui/material'
import axios from 'axios'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'
import { CreateProjectBriefForm } from '../types/forms/CreateProjectBriefForm'
import { Page } from '../types/Page.type'
import { Service } from '../types/Service.type'
import { Button } from './Button'
import { CheckIcon } from './icons/CheckIcon'
import { FloppyDiskIcon } from './icons/FloppyDiskIcon'
import { ServiceCheckIcon } from './icons/ServiceCheckIcon'

export const SelectService = ({ enabled }: { enabled: boolean }) => {
  const { data: session } = useSession()
  const { values, setFieldValue } = useFormikContext<CreateProjectBriefForm>()
  const [activeService, setActiveService] = useState<Service | null>(null)

  const { data: services } = useQuery(
    'services',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Service>
        page: Page
      }>(`/v1/clients/${session?.user.userType.clientId}/services`)

      return data
    },
    {
      enabled,
    }
  )

  const removeActiveService = () => setActiveService(null)

  return (
    <>
      <div className="absolute -right-5 top-0 flex w-60 translate-x-full flex-col items-center space-y-2 rounded-xl bg-white p-5">
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
        <div className="absolute -right-70 top-0 flex w-52 translate-x-full flex-col items-center rounded-xl bg-white p-5">
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
