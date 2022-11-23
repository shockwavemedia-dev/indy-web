import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'

import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const WebsitePage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Website Services')
  }, [])

  const slideImages = [
    {
      url: '/images/website-atmosphere-avatar.png',
      link: 'https://atmospherestg.wpengine.com',
    },
    {
      url: '/images/website-calypso-avatar.png',
      link: 'https://atmospherestg.wpengine.com',
    },
    {
      url: '/images/website-cherry-avatar.png',
      link: 'https://atmospherestg.wpengine.com',
    },
    {
      url: '/images/website-destination-avatar.png',
      link: 'https://cherrylane1stg.wpengine.com',
    },
    {
      url: '/images/website-element-avatar.png',
      link: 'https://elementstg.wpengine.com',
    },
    {
      url: '/images/website-fynboss-avatar.png',
      link: 'https://fynbosstg.wpengine.com',
    },
    {
      url: '/images/website-platur-avatar.png',
      link: 'https://platurdesigstg.wpengine.com',
    },
    {
      url: '/images/website-terrace-avatar.png',
      link: 'https://terracestg.wpengine.com',
    },
  ]

  return (
    <>
      <Head>
        <title>Indy - Website Services</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div className="flex space-x-6">
          <div className="h-full w-full min-w-0 flex-1">
            <Fade>
              {slideImages.map((slideImage, index) => (
                <a
                  key={index}
                  href={slideImage.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!h-fit !w-full rounded-xl"
                >
                  <div
                    className="!h-130 !w-full transition delay-100 ease-in-out"
                    style={{
                      backgroundImage: `url(${slideImage.url})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                </a>
              ))}
            </Fade>
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

WebsitePage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default WebsitePage
