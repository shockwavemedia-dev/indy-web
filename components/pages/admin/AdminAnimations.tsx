import Head from 'next/head'
import { useState } from 'react'
import { AnimationTableColumns } from '../../../constants/tables/AnimationTableColumns'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { UserIcon } from '../../icons/UserIcon'
import { VideoIcon } from '../../icons/VideoIcon'
import { NewAnimationCategoryModal } from '../../modals/NewAnimationCategoryModal'
import { NewAnimationModal } from '../../modals/NewAnimationModal'

export const AdminAnimations = () => {
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
            Icon={<UserIcon className="stroke-white" />}
            title="Create Animation Category"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleNewAnimationCategoryModal}
            twBackgroundColor="bg-bleu-de-france"
            twIconBackgroundColor="bg-bright-navy-blue"
            className="w-fit"
          />
          <FancyButton
            Icon={<VideoIcon className="stroke-white" />}
            title="Create Animation"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleNewAnimationModal}
            twIconBackgroundColor="bg-carrot-orange"
            twBackgroundColor="bg-deep-saffron"
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
