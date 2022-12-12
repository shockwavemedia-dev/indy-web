import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { AdminPrinterJobColumns } from '../../../constants/tables/AdminPrinterJobColumns'
import PanelLayout, { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { DeletePrinterJobModal } from '../../modals/DeletePrinterJobModal'

const PrinterManagerPrinterJobsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    setHeader('Print')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Print</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="mt-6 flex gap-6 transition-all lg:flex-col">
          <div className="flex flex-1 flex-col">
            <Card title="Print List" className="flex max-h-155 flex-1 flex-col">
              <DataTable
                columns={AdminPrinterJobColumns}
                dataEndpoint={`/v1/printers/${session?.user.userType.id}/printer-jobs`}
                tableQueryKey={['printerJobs']}
                ofString="printerJobs"
                rowOnClick={({ original: { id } }) => replace(`/print/${id}`)}
              />
            </Card>
          </div>
        </div>
      </div>
      <DeletePrinterJobModal />
    </>
  )
}

PrinterManagerPrinterJobsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrinterManagerPrinterJobsPage
