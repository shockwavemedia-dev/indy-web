import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { Service } from '../types/Service.type'
import { Card } from './Card'
import { StatusCountCard } from './StatusCountCard'

export const RetainerInclusions = () => {
  const { data: session } = useSession()

  const { data: retainerInclusions } = useQuery('retainerInclusions', async () => {
    const {
      data: { data },
    } = await axios.get<{ data: Array<Service> }>(
      `/v1/clients/${session!.user.userType.client.id}/services`
    )

    return data
  })

  const statusCardColor = [
    'bg-deep-space-sparkle',
    'bg-charleston-green',
    'bg-halloween-orange',
    'bg-maximum-yellow-red',
    'bg-navy',
    'bg-red-crimson',
    'bg-orchid',
    'bg-forest-green',
    'bg-bright-navy-blue',
  ]

  return (
    <Card title="Retainer Inclusions" className="h-fit flex-none">
      <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-3">
        {retainerInclusions?.map((retainer, index) => {
          return retainer.marketingQuota === 0 ? (
            <StatusCountCard
              key={`${retainer.serviceId}-${retainer.serviceName}`}
              value="&infin;"
              className={retainer.isEnabled === false ? 'bg-gray' : statusCardColor[index]}
              description={retainer.serviceName}
              classNameValue="!text-3xl"
              isEnabled={retainer.isEnabled}
            />
          ) : (
            <StatusCountCard
              totalAvailable={retainer.marketingQuota + retainer.extraQuota}
              key={`${retainer.serviceId}-${retainer.serviceName}`}
              value={retainer.totalUsed - (retainer.marketingQuota + retainer.extraQuota)}
              className={retainer.isEnabled === false ? 'bg-gray' : statusCardColor[index]}
              description={retainer.serviceName}
              isEnabled={retainer.isEnabled}
            />
          )
        })}
      </div>
    </Card>
  )
}
