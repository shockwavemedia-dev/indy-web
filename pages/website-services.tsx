import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { WebsiteServicesList } from '../constants/options/WebsiteServicesList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const WebsitePage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Website Services')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Website Services</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex space-x-6">
          <Card className="h-fit w-full min-w-0 flex-1">
            <div className="flex h-fit w-fit grid-cols-2 flex-wrap place-content-center gap-5">
              {WebsiteServicesList?.map(({ image, link }) => (
                <a
                  key={`${link}-website`}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-none flex-col items-center justify-center space-y-1 p-3"
                >
                  <Image className="rounded-xl" src={image} height={176} width={314} alt={link} />
                </a>
              ))}
            </div>
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
    </>
  )
}

WebsitePage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default WebsitePage
