import Head from 'next/head'
import { ReactElement, useState } from 'react'
import UserIcon from '../components/Common/Icons/User.icon'
import Table from '../components/Common/Table'
import Card from '../components/Panel/Card.component'
import FancyButton from '../components/Panel/FancyButton.component'
import NewAnimationCategoryModal from '../components/Panel/NewAnimationCategoryModal.component'
import NewAnimationModal from '../components/Panel/NewAnimationModal.component'
import { AnimationTableColumns } from '../constants/AnimationTableColumns'
import PanelLayout from '../layouts/Panel.layout'
import { NextPageWithLayout } from '../types/NextPageWithLayout.type'

const Animation: NextPageWithLayout = () => {
  const [isNewAnimationCategoryModalVisible, setAnimationCategoryModalVisible] = useState(false)
  const [isNewAnimationModalVisible, setAnimationModalVisible] = useState(false)

  const toggleNewAnimationCategoryModal = () =>
    setAnimationCategoryModalVisible(!isNewAnimationCategoryModalVisible)

  const toggleNewAnimationModal = () => setAnimationModalVisible(!isNewAnimationModalVisible)

  return (
    <>
      <NewAnimationCategoryModal
        isVisible={isNewAnimationCategoryModalVisible}
        onClose={toggleNewAnimationCategoryModal}
      />
      <NewAnimationModal isVisible={isNewAnimationModalVisible} onClose={toggleNewAnimationModal} />
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="mx-auto grid h-262.5 w-270 grid-rows-10 gap-2">
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
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Animation"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAnimationModal}
          className="row-span-1 w-fit"
        />
        <Card title="Animations" className="row-span-11">
          <Table
            dataEndpoint="/v1/libraries"
            columns={AnimationTableColumns}
            startingPageSize={20}
            tableKey="libraries"
          />
        </Card>
      </div>
    </>
  )
}

Animation.getLayout = (page: ReactElement) => <PanelLayout forAdmin>{page}</PanelLayout>

export default Animation
