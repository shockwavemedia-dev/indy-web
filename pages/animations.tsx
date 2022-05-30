import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { UserIcon } from '../components/icons/UserIcon'
import { VideoIcon } from '../components/icons/VideoIcon'
import { NewAnimationCategoryModal } from '../components/modals/NewAnimationCategoryModal'
import { NewAnimationModal } from '../components/modals/NewAnimationModal'
import { AnimationTableColumns } from '../constants/tables/AnimationTableColumns'
import PanelLayout from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const AnimationsPage: NextPageWithLayout = () => {
  const [isNewAnimationCategoryModalVisible, setNewAnimationCategoryModalVisible] = useState(false)
  const [isNewAnimationModalVisible, setNewAnimationModalVisible] = useState(false)

  const toggleNewAnimationCategoryModal = () =>
    setNewAnimationCategoryModalVisible(!isNewAnimationCategoryModalVisible)

  const toggleNewAnimationModal = () => setNewAnimationModalVisible(!isNewAnimationModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Animations</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <div className="flex space-x-6">
          <FancyButton
            Icon={
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
                <UserIcon className="stroke-jungle-green" />
              </div>
            }
            title="Create Animation Category"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleNewAnimationCategoryModal}
            className="w-fit"
          />
          <FancyButton
            Icon={
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
                <VideoIcon className="stroke-jungle-green" />
              </div>
            }
            title="Create Animation"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleNewAnimationModal}
            className="w-fit"
          />
        </div>
        <Card title="Animations">
          <DataTable
            dataEndpoint="/v1/libraries"
            columns={AnimationTableColumns}
            tableQueryKey={['libraries']}
            ofString="Animations"
          />
        </Card>
      </div>
      <NewAnimationCategoryModal
        isVisible={isNewAnimationCategoryModalVisible}
        onClose={toggleNewAnimationCategoryModal}
      />
      <NewAnimationModal isVisible={isNewAnimationModalVisible} onClose={toggleNewAnimationModal} />
    </>
  )
}

AnimationsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default AnimationsPage
