import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { AdminServicesTableColumns } from '../constants/tables/AdminServicesTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ServicesPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const { replace } = useRouter()

  useEffect(() => {
    setHeader('Services')
    setCrumbsNavigation([])
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Services</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <Card title="Services" className="flex max-h-155 flex-col">
          <DataTable
            dataEndpoint="/v1/services"
            columns={AdminServicesTableColumns}
            tableQueryKey={['services']}
            ofString="Services"
            rowOnClick={({ original: { id } }) => replace(`/service/${id}`)}
          />
        </Card>
      </div>
    </>
  )
}

ServicesPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ServicesPage
