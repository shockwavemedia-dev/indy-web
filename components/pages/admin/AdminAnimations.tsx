import Head from 'next/head'
import { useState } from 'react'
import { AnimationTableColumns } from '../../../constants/tables/AnimationTableColumns'
import { useAnimationStore } from '../../../store/AnimationStore'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { UserIcon } from '../../icons/UserIcon'
import { VideoIcon } from '../../icons/VideoIcon'
import { DeleteAnimationModal } from '../../modals/DeleteAnimationModal'
import { EditAnimationModal } from '../../modals/EditAnimationModal'
import { NewAnimationCategoryModal } from '../../modals/NewAnimationCategoryModal'
import { NewAnimationModal } from '../../modals/NewAnimationModal'

export const AdminAnimations = () => {
  const [isNewAnimationCategoryModalVisible, setNewAnimationCategoryModalVisible] = useState(false)
  const [isNewAnimationModalVisible, setNewAnimationModalVisible] = useState(false)

  const toggleNewAnimationCategoryModal = () =>
    setNewAnimationCategoryModalVisible(!isNewAnimationCategoryModalVisible)

  const toggleNewAnimationModal = () => setNewAnimationModalVisible(!isNewAnimationModalVisible)

  const {
    activeAnimation,
    isEditAnimationModalVisible,
    isDeleteAnimationModalVisible,
    toggleEditAnimationModal,
    toggleDeleteAnimationModal,
  } = useAnimationStore()

  return (
    <>
      <Head>
        <title>Indy - Animations</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <div className="flex space-x-6">
          <FancyButton
            Icon={<UserIcon className="stroke-halloween-orange" />}
            title="Create Animation Category"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleNewAnimationCategoryModal}
            className="w-fit"
          />
          <FancyButton
            Icon={<VideoIcon className="stroke-halloween-orange" />}
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
            tableQueryKey={['animations']}
            ofString="Animations"
          />
        </Card>
      </div>
      <NewAnimationCategoryModal
        isVisible={isNewAnimationCategoryModalVisible}
        onClose={toggleNewAnimationCategoryModal}
      />
      <NewAnimationModal isVisible={isNewAnimationModalVisible} onClose={toggleNewAnimationModal} />
      <EditAnimationModal
        isVisible={isEditAnimationModalVisible}
        onClose={toggleEditAnimationModal}
        animation={activeAnimation}
      />
      <DeleteAnimationModal
        isVisible={isDeleteAnimationModalVisible}
        onClose={toggleDeleteAnimationModal}
        animation={activeAnimation}
      />
    </>
  )
}
