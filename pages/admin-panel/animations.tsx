import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Card from '../../components/Card'
import DataTable from '../../components/DataTable'
import FancyButton from '../../components/FancyButton'
import UserIcon from '../../components/icons/UserIcon'
import VideoIcon from '../../components/icons/VideoIcon'
import NewAnimationCategoryModal from '../../components/modals/NewAnimationCategoryModal'
import NewAnimationModal from '../../components/modals/NewAnimationModal'
import { AdminRoutes } from '../../constants/routes/AdminRoutes'
import { AnimationTableColumns } from '../../constants/tables/AnimationTableColumns'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const Animations: NextPageWithLayout = () => {
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
            <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
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
            <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
              <VideoIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Animation"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAnimationModal}
          className="row-span-1 w-fit"
        />
      </div>
      <Card title="Animations">
        <DataTable
          dataEndpoint="/v1/libraries"
          columns={AnimationTableColumns}
          initialPageSize={20}
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

Animations.getLayout = (page: ReactElement) => (
  <PanelLayout routes={AdminRoutes}>{page}</PanelLayout>
)

export default Animations
