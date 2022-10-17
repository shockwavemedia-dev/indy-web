import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import AdminPrinterJobPage from '../../components/pages/admin/AdminPrinterJob'
import ClientPrinterJobPage from '../../components/pages/client/ClientPrinterJob'
import PrinterManagerPrinterJobPage from '../../components/pages/printerManager/PrinterManagerPrinterJob'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const PrinterPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { data: session } = useSession()

  if (session?.isClient) {
    return <ClientPrinterJobPage printerId={Number(id)} />
  } else if (session?.isAdmin) {
    return <AdminPrinterJobPage printerId={Number(id)} />
  } else if (session?.isPrinterManager) {
    return <PrinterManagerPrinterJobPage printerId={Number(id)} />
  }

  return null
}

PrinterPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrinterPage
