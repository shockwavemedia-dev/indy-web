import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { LinkButton } from '../components/LinkButton'
import { DeletePhotographyVideographyModal } from '../components/modals/DeletePhotographyVideographyModal'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import { PhotographyVideographyColumns } from '../constants/tables/PhotographyVideographyColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import PhotographyAvatar from '../public/images/photography-avatar.jpg'
import VideographyAvatar from '../public/images/videography-avatar.jpg'
import { usePhotographyVideographyStore } from '../store/PhotographyVideographyStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PhotographyVideographyPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()

  const {
    activePhotographyVideography,
    isDeletePhotographyVideographyModalVisible,
    toggleDeletePhotographyVideographyModal,
  } = usePhotographyVideographyStore()

  useEffect(() => {
    setHeader('Photography/Videography')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Photography/Videography</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="mt-6 flex gap-6 transition-all lg:flex-col">
          <div className="flex flex-1 flex-col">
            <Card className="flex-1 flex-col transition-all">
              <div className="mb-5 flex space-x-5">
                <LinkButton title="Book" href="/new-photography-videography" className="w-44" />
                <Button ariaLabel="Book" type="button" className="mb-4 w-44" light>
                  Quote/Inquire
                </Button>
              </div>
              <div className="mx-auto flex w-fit space-x-6">
                <div>
                  <Link href="https://drive.google.com/file/d/1nFRafx4FBru8IkUIwHSOfNuYaYFp5sP5/view">
                    <a target="_blank" rel="noopener noreferrer">
                      <div className="mb-5 aspect-square max-h-102 overflow-hidden rounded-xl">
                        <Image src={VideographyAvatar} alt="videography" className="h-full" />
                      </div>
                    </a>
                  </Link>
                  <div className="font-semibold">Videography Portfolio</div>
                </div>
                <div>
                  <Link href="https://dailypress.myportfolio.com/">
                    <a target="_blank" rel="noopener noreferrer">
                      <div className="mb-5 aspect-square max-h-102 overflow-hidden rounded-xl">
                        <Image src={PhotographyAvatar} alt="photography" className="h-full" />
                      </div>
                    </a>
                  </Link>
                  <div className="font-semibold">Photography Portfolio</div>
                </div>
              </div>
            </Card>
            <Card title="Event Bookings Table" className="mt-8 flex max-h-155 flex-1 flex-col">
              <DataTable
                columns={PhotographyVideographyColumns}
                dataEndpoint={`/v1/clients/${session?.user.userType.client.id}/event-bookings`}
                tableQueryKey={['eventBookings']}
                ofString="Bookings"
              />
            </Card>
          </div>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications />
          </div>
        </div>
      </div>
      <DeletePhotographyVideographyModal
        isVisible={isDeletePhotographyVideographyModalVisible}
        onClose={toggleDeletePhotographyVideographyModal}
        photographyVideography={activePhotographyVideography}
      />
    </>
  )
}

PhotographyVideographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PhotographyVideographyPage
