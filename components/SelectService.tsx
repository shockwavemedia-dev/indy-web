import axios from 'axios'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'
import { CreateEventForm } from '../types/forms/CreateEventForm.type'
import { Page } from '../types/Page.type'
import { Service } from '../types/Service.type'
import { Button } from './Button'
import { CheckIcon } from './icons/CheckIcon'
import { FloppyDiskIcon } from './icons/FloppyDiskIcon'

export const SelectService = ({ enabled }: { enabled: boolean }) => {
  const { data: session } = useSession()
  const { values, setFieldValue } = useFormikContext<CreateEventForm>()
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
    <div className="absolute -right-5 top-0 flex w-52 translate-x-full flex-col space-y-2 rounded-xl bg-white p-5">
      {!activeService &&
        services?.map((service) => {
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
              onClick={toggleService}
              serviceName={service.serviceName}
              selected={values.services.some(({ serviceId: sid }) => sid === service.serviceId)}
            />
          )
        })}
      {activeService && activeService.extras.length > 0 && (
        <>
          {activeService.extras.map((extras) => (
            <Extras
              key={`${activeService.serviceId}-${extras}`}
              extrasName={extras}
              serviceId={activeService.serviceId}
            />
          ))}
          <Button
            ariaLabel="Save Extras"
            onClick={removeActiveService}
            type="button"
            className="!mt-10"
          >
            <FloppyDiskIcon className="stroke-white" />
            <div>Save</div>
          </Button>
        </>
      )}
    </div>
  )
}

const ServiceButton = ({
  serviceName,
  selected,
  onClick,
}: {
  serviceName: string
  selected: boolean
  onClick: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-11 whitespace-nowrap rounded-xl px-6 text-left font-urbanist text-sm font-medium ${
      selected
        ? 'bg-jungle-green text-white'
        : 'border-1.5 border-solid border-bright-gray bg-white text-onyx'
    }`}
  >
    {serviceName}
  </button>
)

const Extras = ({ serviceId, extrasName }: { serviceId: number; extrasName: string }) => {
  const { values, setFieldValue } = useFormikContext<CreateEventForm>()

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

  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        name={extrasName}
        id={extrasName}
        className="mr-3 h-4 w-4 appearance-none rounded bg-white ring-1 ring-inset ring-bright-gray checked:bg-jungle-green checked:ring-0"
        onChange={toggleExtras}
      />
      <CheckIcon className="pointer-events-none absolute left-0.75 stroke-white" />
      <label htmlFor={extrasName} className="font-urbanist text-sm font-medium text-onyx">
        {extrasName}
      </label>
    </div>
  )
}
