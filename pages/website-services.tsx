import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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
          <Card className="flex-1 flex-col transition-all">
            <div className="grid h-fit grid-cols-2 gap-4">
              {WebsiteServicesList?.map(({ image, link }) => (
                <div key={`${link}-website`} className="h-fit">
                  <Link href={link}>
                    <a target="_blank" rel="noopener noreferrer">
                      <div className="mb-5 aspect-square overflow-hidden rounded-xl">
                        <Image
                          src={image}
                          alt="videography"
                          height={400}
                          width={400}
                          className="h-full"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
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
