import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { ClientPrinterJobColumns } from '../../../constants/tables/ClientPrinterJobColumns'
import PanelLayout, { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { LinkButton } from '../../LinkButton'
import { DeletePrinterJobModal } from '../../modals/DeletePrinterJobModal'
import { Notifications } from '../../Notifications'
import { RetainerInclusions } from '../../RetainerInclusions'

const PrinterManagerPrinterJobsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    setHeader('Printer Job')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Printer Job</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="mt-6 flex gap-6 transition-all lg:flex-col">
          <div className="flex flex-1 flex-col">
            <LinkButton className="mb-8 w-40" title="Add Printer Job" href="/new-printer-job" />
            <Card title="Printer Job List" className="flex max-h-155 flex-1 flex-col">
              <DataTable
                columns={ClientPrinterJobColumns}
                dataEndpoint={`/v1/printers/${session?.user.userType.id}/printer-jobs`}
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

PrinterManagerPrinterJobsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrinterManagerPrinterJobsPage
