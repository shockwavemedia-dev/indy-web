import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import PhotographyAvatar from '../public/images/photography-avatar.jpg'
import VideographyAvatar from '../public/images/videography-avatar.jpg'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PhotographyVideographyPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Photography/Videography')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Photography/Videography</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="grid h-155 flex-1 transition-all lg:flex-none">
            <div className="ml-20 grid grid-cols-4 space-x-0">
              <Link href="/new-photography-videography">
                <Button ariaLabel="Book" type="button" className="mb-4 w-44">
                  Book
                </Button>
              </Link>

              <Button ariaLabel="Book" type="button" className="mb-4 w-44" light>
                Quote/Inquire
              </Button>
            </div>
            <div className="mr-6 ml-20 grid grid-cols-2 grid-rows-2">
              <a
                href="https://drive.google.com/file/d/1nFRafx4FBru8IkUIwHSOfNuYaYFp5sP5/view"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={VideographyAvatar}
                  alt="videography"
                  height={400}
                  width={400}
                  className="rounded-xl"
                />
                Videography Portfolio
              </a>
              <a
                href="https://dailypress.myportfolio.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={PhotographyAvatar}
                  alt="Photography"
                  height={400}
                  width={400}
                  className="rounded-xl"
                />
                Photography Portfolio
              </a>
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

PhotographyVideographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PhotographyVideographyPage
