import Head from 'next/head'
import { ReactElement, useState } from 'react'
import UserIcon from '../components/common/icons/UserIcon'
import VideoIcon from '../components/common/icons/VideoIcon'
import Table from '../components/common/Table'
import Card from '../components/panel/Card.component'
import FancyButton from '../components/panel/FancyButton.component'
import NewAnimationCategoryModal from '../components/panel/NewAnimationCategoryModal.component'
import NewAnimationModal from '../components/panel/NewAnimationModal.component'
import { AnimationTableColumns } from '../constants/tables/AnimationTableColumns'
import PanelLayout from '../layouts/Panel.layout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const Animation: NextPageWithLayout = () => {
  const [isNewAnimationCategoryModalVisible, setNewAnimationCategoryModalVisible] = useState(false)
  const [isNewAnimationModalVisible, setNewAnimationModalVisible] = useState(false)

  const toggleNewAnimationCategoryModal = () =>
    setNewAnimationCategoryModalVisible(!isNewAnimationCategoryModalVisible)

  const toggleNewAnimationModal = () => setNewAnimationModalVisible(!isNewAnimationModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="mb-8 flex space-x-10">
        <FancyButton
          Icon={
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Animation Category"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAnimationCategoryModal}
          className="row-span-1 w-fit"
        />
        <FancyButton
          Icon={
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
              <VideoIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Animation"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAnimationModal}
          className="row-span-1 w-fit"
        />
      </div>
      <Card title="Animations" className="row-span-11">
        <Table
          dataEndpoint="/v1/libraries"
          columns={AnimationTableColumns}
          startingPageSize={20}
          tableQueryKey="libraries"
          ofString="Animations"
        />
      </Card>
      <NewAnimationCategoryModal
        isVisible={isNewAnimationCategoryModalVisible}
        onClose={toggleNewAnimationCategoryModal}
      />
      <NewAnimationModal isVisible={isNewAnimationModalVisible} onClose={toggleNewAnimationModal} />
    </>
  )
}

Animation.getLayout = (page: ReactElement) => <PanelLayout header="Animations">{page}</PanelLayout>

export default Animation
