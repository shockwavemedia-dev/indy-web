import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'
import 'react-slideshow-image/dist/styles.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { Card } from '../components/Card'
import { LinkButton } from '../components/LinkButton'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'

import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const WebsitePage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Website')
  }, [])

  const slideImages = [
    {
      url: '/images/website-atmosphere-avatar.png',
      link: 'https://atmospherestg.wpengine.com',
      title: 'Atmosphere Design',
    },
    {
      url: '/images/website-destination-avatar.png',
      link: 'https://cherrylane1stg.wpengine.com',
      title: 'Destination Design',
    },
    {
      url: '/images/website-element-avatar.png',
      link: 'https://elementstg.wpengine.com',
      title: 'Element Design',
    },
    {
      url: '/images/website-fynboss-avatar.png',
      link: 'https://fynbosstg.wpengine.com',
      title: 'Fynboss Design',
    },
    {
      url: '/images/website-platur-avatar.png',
      link: 'https://platurdesigstg.wpengine.com',
      title: 'Platur Design',
    },
    {
      url: '/images/website-terrace-avatar.png',
      link: 'https://terracestg.wpengine.com',
      title: 'Terrace Design',
    },
  ]

  return (
    <>
      <Head>
        <title>Indy - Website</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div className="flex space-x-3">
          <LinkButton
            href="https://dailypress.com.au/website-brief/"
            title="Custom Built Website"
            className="w-fit px-4"
            newTab
          />
          <LinkButton
            href="https://dailypress.com.au/website-brief/"
            title="Purchase Bespoke Website"
            className="w-fit px-4"
            newTab
          />
        </div>
        <div className="flex gap-6 lg:w-full lg:flex-col">
          <Card
            title={
              <div>
                Bespoke Template Websites{' '}
                <span className="font-normal">
                  (For an extra $200 a month for 24 months, select one of the bespoke websites
                  below)
                </span>
              </div>
            }
            className="flex-1"
          >
            <div className="grid grid-cols-3 gap-8 overflow-y-auto 2xl:grid-cols-2 md:grid-cols-1">
              {slideImages.map(({ link, title, url }, i) => (
                <div key={`website-${i}`}>
                  <Link href={link}>
                    <a target="_blank">
                      <Image src={url} alt="" height={542} width={1000} className="h-full w-auto" />
                    </a>
                  </Link>
                  <div className="mb-3 text-xl font-bold">{title}</div>
                  <LinkButton
                    href="https://dailypress.com.au/website-brief/"
                    title="Purchase Website"
                    className="h-fit w-fit px-4 py-2"
                    newTab
                  />
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
