import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PrintersPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Printers')
  }, [])

  return (
    <>
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
