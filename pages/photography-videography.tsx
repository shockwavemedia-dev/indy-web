import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { PhotographyVideographyColumns } from '../constants/tables/PhotographyVideographyColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import PhotographyAvatar from '../public/images/photography-avatar.jpg'
import VideographyAvatar from '../public/images/videography-avatar.jpg'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PhotographyVideographyPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()

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
          <div className="flex w-9/12 flex-col">
            <div className="mb-5 flex w-full">
              <Link href="/new-photography-videography">
                <Button ariaLabel="Book" type="button" className="mb-5 mr-5 w-44">
                  Book
                </Button>
              </Link>
              <Button ariaLabel="Book" type="button" className="mb-5 w-44" light>
                Quote/Inquire
              </Button>
            </div>
            <Card className="grid flex-1 transition-all lg:flex-none">
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
            <Card
              title="Photography/Videography Table"
              className="mt-8 flex max-h-155 flex-1 flex-col"
            >
              <DataTable
                columns={PhotographyVideographyColumns}
                dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/event-bookings`}
                tableQueryKey={['eventBookings']}
                ofString="Bookings"
              />
            </Card>
          </div>
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
