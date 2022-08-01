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
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="grid h-fit w-full flex-1 place-items-center transition-all lg:flex-none">
            <div className="flex w-212.5 flex-wrap place-content-center gap-2">
              {WebsiteServicesList?.map(({ image, link }) => (
                <a key={`${link}-website`} href={link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={image}
                    alt="website-atmosphere"
                    height={400}
                    width={400}
                    className="rounded-xl"
                  />
                </a>
              ))}
            </div>
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}

WebsitePage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default WebsitePage
