import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateSocialMediaModal } from '../components/modals/CreateSocialMediaModal'
import { SocialMediaTable } from '../components/SocialMediaTable'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useSocialMediaStore } from '../store/SocialMediaStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
const SocialMediaPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  const { isCreateSocialMediaModalVisible, toggleCreateSocialMediaModal } = useSocialMediaStore()

  useEffect(() => {
    setHeader('Social Media')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Social Media</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <div className="flex flex-col gap-6 transition-all">
          <div className="flex-1">
            <Button
              onClick={toggleCreateSocialMediaModal}
              ariaLabel="Add Social Media"
              className="mb-2 w-35"
              type="button"
            >
              <div>Add Social Media</div>
            </Button>
          </div>
          <Card className="flex max-h-155 flex-1 flex-col">
            <SocialMediaTable />
          </Card>
        </div>
      </div>
      <CreateSocialMediaModal
        isVisible={isCreateSocialMediaModalVisible}
        onClose={toggleCreateSocialMediaModal}
      />
    </>
  )
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
