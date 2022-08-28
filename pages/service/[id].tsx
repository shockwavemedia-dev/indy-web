import axios from 'axios'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../components/Card'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { Pill } from '../../components/Pill'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { Page } from '../../types/Page.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'
import { Service } from '../../types/Service.type'

const ServicePage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { setHeader } = usePanelLayoutStore()

  const { data: services } = useQuery('services', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Service>
      page: Page
    }>(`/v1/services`)

    return data
  })

  const servicePerId = services
    ?.filter((service) => service.id === Number(id))
    .map((service) => ({
      serviceId: service.id,
      serviceName: service.name,
      serviceExtras: service.extras,
    }))

  useEffect(() => {
    setHeader('Service')
  }, [])

  return (
    <>
      <div className="mx-auto w-full max-w-8xl">
        {servicePerId?.map(({ serviceId, serviceName, serviceExtras }) => (
          <Card
            key={`service-${serviceId}`}
            title={serviceName}
            className="mb-5 flex h-fit flex-1 cursor-default flex-col border border-halloween-orange"
          >
            <button className="mb-5 flex space-x-2">
              <PlusIcon className="stroke-halloween-orange" />
              <div className=" text-sm font-semibold text-halloween-orange">Add Extra</div>
            </button>
            {serviceExtras &&
              serviceExtras.map((extra, index) => (
                <div key={`${extra}-${index}`} className="grid grid-cols-3 gap-3">
                  <Card className="mb-2 h-fit w-full cursor-default border border-light-tart-orange">
                    <Pill
                      twBackgroundColor="bg-honeydew"
                      twTextColor="text-jungle-green"
                      value={extra}
                    />
                    <div className="absolute top-6 right-6 space-x-4">
                      <button className="group">
                        <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
                      </button>
                    </div>
                  </Card>
                </div>
              ))}
          </Card>
        ))}
      </div>
    </>
  )
}

ServicePage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ServicePage
