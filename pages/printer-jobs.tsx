import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { LinkButton } from '../components/LinkButton'
import { DeletePrinterJobModal } from '../components/modals/DeletePrinterJobModal'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { ClientPrinterJobColumns } from '../constants/tables/ClientPrinterJobColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
const PrintPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    setHeader('Printer Job')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Printer</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="mt-6 flex gap-6 transition-all lg:flex-col">
          <div className="flex flex-1 flex-col">
            <LinkButton className="mb-8 w-40" title="Add Printer Job" href="/new-printer-job" />
            <Card title="Printer Job List" className="flex max-h-155 flex-1 flex-col">
              <DataTable
                columns={ClientPrinterJobColumns}
                dataEndpoint={`/v1/clients/${session?.user.userType.client.id}/printer-jobs`}
                tableQueryKey={['printerJobs']}
                ofString="printerJobs"
                rowOnClick={({ original: { id } }) => replace(`/printer-jobs/${id}`)}
              />
            </Card>
          </div>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
      <DeletePrinterJobModal />
    </>
  )
}

PrintPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrintPage