import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CheckDocumentIcon } from '../components/icons/CheckDocumentIcon'
import { DownloadIcon } from '../components/icons/DownloadIcon'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { SignageDisplayList } from '../constants/options/SignageDisplayList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ComplianceSignageRegulationsPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Compliance Signage Regulations')
    setCrumbsNavigation([])
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Compliance Signage Regulations</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="mt-6 flex gap-6 transition-all lg:flex-col">
          <div className="flex flex-1">
            <Card className="flex">
              <div className="mt-8 grid grid-cols-5 gap-3">
                {SignageDisplayList?.map(({ image, name }) => {
                  const downloadFile = () => {
                    const link = document.createElement('a')
                    link.href = `/images/signage/${name}`
                    link.setAttribute('download', name)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }

                  return (
                    <div key={`${name}-signage`} className="mb-8 aspect-square max-h-130">
                      <Image src={image} alt={name} className="!h-full" />
                      <div className="mt-8 mb-3">
                        <Button
                          ariaLabel="Download"
                          type="button"
                          className="w-40"
                          onClick={downloadFile}
                        >
                          <DownloadIcon className="stroke-white" />
                          <div>Download</div>
                        </Button>
                      </div>
                      <Button ariaLabel="Order" type="button" className="w-40">
                        <CheckDocumentIcon className="stroke-white" />
                        <div>Order</div>
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
    </>
  )
}

ComplianceSignageRegulationsPage.getLayout = (page: ReactElement) => (
  <PanelLayout>{page}</PanelLayout>
)

export default ComplianceSignageRegulationsPage
