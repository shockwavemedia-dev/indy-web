import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import PhotographyAvatar from '../public/images/bpm-technology-logo.png'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ScreenManagerPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Screen Manager')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Screen Manager</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="grid h-155 flex-1 place-items-center transition-all lg:flex-none">
            <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-3">
              <div>
                <Link href="https://app.bpmtech.com.au/login">
                  <a target="_blank" rel="noopener noreferrer">
                    <div className="bg-black mb-5 aspect-square max-h-40 overflow-hidden rounded-xl">
                      <Image src={PhotographyAvatar} alt="bpm-technology" className="h-full" />
                    </div>
                  </a>
                </Link>
              </div>
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

ScreenManagerPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ScreenManagerPage
