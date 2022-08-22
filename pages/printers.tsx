import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { FancyButton } from '../components/FancyButton'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { CreatePrinterModal } from '../components/modals/CreatePrinterModal'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PrintersPage: NextPageWithLayout = () => {
  const { setHeader, setButtons } = usePanelLayoutStore()

  const [isCreatePrinterModalVisible, setCreatePrinterModalVisible] = useState(false)

  const toggleCreatePrinterModal = () => setCreatePrinterModalVisible(!isCreatePrinterModalVisible)

  useEffect(() => {
    setHeader('Printers')

    setButtons(
      <FancyButton
        Icon={<MonitorIcon className="stroke-halloween-orange" />}
        title="Create Printer"
        subtitle="Laborerivit rem cones mil"
        onClick={toggleCreatePrinterModal}
        className="w-fit"
      />
    )
  }, [])

  return (
    <>
      <CreatePrinterModal
        isVisible={isCreatePrinterModalVisible}
        onClose={toggleCreatePrinterModal}
      />
      <Head>
        <title>Indy - Printers</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="grid h-155 flex-1 place-items-center transition-all lg:flex-none">
            <div className="">Nothing to see here. 🦗</div>
          </Card>
        </div>
      </div>
    </>
  )
}

PrintersPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrintersPage
