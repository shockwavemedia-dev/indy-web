import axios from 'axios'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { MultiValue } from 'react-select'
import { Page } from '../types/Page.type'
import { Service } from '../types/Service.type'
import { ServiceOption } from '../types/ServiceOption.type'
import { ServiceOptionExtraValue } from '../types/ServiceOptionExtraValue.type'
import { ServiceOptionValue } from '../types/ServiceOptionValue.type'
import { ClipboardIcon } from './icons/ClipboardIcon'
import { Select } from './Select'

export const SelectService = ({ enabled }: { enabled: boolean }) => {
  const { data: session } = useSession()
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
  const { setFieldValue } = useFormikContext()
  const [value, setValue] = useState<MultiValue<ServiceOption>>([])

  const onChange = (newValue: MultiValue<ServiceOption>) => {
    const { services, extras } = newValue
      .map(({ value }) => value)
      .reduce<{
        services: Array<ServiceOptionValue>
        extras: Array<ServiceOptionExtraValue>
      }>(
        (values, curr) => {
          if (typeof curr === 'number') {
            values.services.push(curr)
          } else {
            values.extras.push(curr)
          }

          return values
        },
        {
          services: [],
          extras: [],
        }
      )

    setValue(
      newValue.filter(({ value }) => {
        if (typeof value === 'number') {
          return true
        } else if (((x): x is ServiceOptionExtraValue => typeof x === 'object')(value)) {
          return services.includes(value.serviceId)
        }
      })
    )

    setFieldValue(
      'services',
      services.map((serviceId) => ({
        serviceId,
        extras: extras.filter(({ serviceId: id }) => id === serviceId).map(({ name }) => name),
      }))
    )
  }

  return (
    <Select<
      ServiceOptionValue | ServiceOptionExtraValue,
      true,
      { label: string; options: Array<ServiceOption> }
    >
      name="services"
      placeholder="Select services"
      Icon={ClipboardIcon}
      options={services?.map(({ serviceName, serviceId, extras }) => {
        if (
          value
            .map(({ value }) => value)
            .filter((value): value is number => typeof value === 'number')
            .includes(serviceId)
        ) {
          const serviceExtras = value
            .map(({ value }) => value)
            .filter(
              (
                value
              ): value is {
                serviceId: number
                name: string
              } => typeof value === 'object'
            )
            .filter(({ serviceId: id }) => id === serviceId)
            .map(({ name }) => name)

          return {
            label: serviceName,
            options: extras
              .filter((extra) => !serviceExtras.includes(extra))
              .map((extra) => ({
                label: extra,
                value: {
                  serviceId: serviceId,
                  name: extra,
                },
              })),
          }
        }

        return {
          label: serviceName,
          value: serviceId,
        }
      })}
      isMulti
      closeMenuOnSelect={false}
      onChange={onChange}
      formatGroupLabel={({ label, options: { length } }) => (
        <div className="flex items-center justify-between">
          <div className="font-urbanist text-sm font-semibold text-jungle-green">{label}</div>
          <div className="font-urbanist text-sm font-semibold text-metallic-silver">{length}</div>
        </div>
      )}
      value={value}
    />
  )
}
