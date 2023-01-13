import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import IndyTvAvatar from '../public/images/indy-tv.png'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ScreenManagerPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Screen Manager')
    setCrumbsNavigation([])
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Screen Manager</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="h-155 flex-1">
            <div className="flex flex-wrap">
              <Link href="https://app.bpmtech.com.au/login">
                <a target="_blank" rel="noopener noreferrer">
                  <div className="mb-5 aspect-square max-h-40 overflow-hidden">
                    <Image src={IndyTvAvatar} alt="indy-tv" className="h-full" />
                  </div>
                </a>
              </Link>
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
