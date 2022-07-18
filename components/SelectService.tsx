import axios from 'axios'
import { useFormikContext } from 'formik'
import { useQuery } from 'react-query'
import { NewDepartmentForm } from '../types/forms/NewDepartmentForm.type'
import { Page } from '../types/Page.type'
import { Service } from '../types/Service.type'
import { ServiceCheckIcon } from './icons/ServiceCheckIcon'

export const SelectService = ({ enabled }: { enabled: boolean }) => {
  const { values, setFieldValue } = useFormikContext<NewDepartmentForm>()

  const { data: services } = useQuery(
    'services',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Service>
        page: Page
      }>('/v1/services')

      return data
    },
    {
      enabled,
    }
  )

  return (
    <>
      <div className="absolute -right-6 top-0 flex w-60 translate-x-full flex-col items-center space-y-2 rounded-xl bg-white p-5">
        <div className="mb-3 text-lg font-semibold text-onyx">Select Services</div>
        {services?.map((service) => {
          const toggleService = () => {
            if (values.services.includes(service.id)) {
              setFieldValue(
                'services',
                values.services.filter((serviceId) => serviceId !== service.id)
              )
              return
            }

            setFieldValue('services', [...values.services, service.id])
          }

          return (
            <ServiceButton
              key={`service-${service.id}`}
              onClick={toggleService}
              serviceName={service.name}
              selected={values.services.includes(service.id)}
            />
          )
        })}
      </div>
    </>
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
}) => {
  const serviceButton = (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl px-6 disabled:opacity-50 ${
        selected ? 'bg-halloween-orange' : 'border-1.5 border-solid border-bright-gray bg-white'
      }`}
    >
      <div className={`text-left  text-sm font-medium ${selected ? 'text-white' : 'text-onyx'}`}>
        {serviceName}
      </div>
      {selected && <ServiceCheckIcon />}
    </button>
  )

  return serviceButton
}
