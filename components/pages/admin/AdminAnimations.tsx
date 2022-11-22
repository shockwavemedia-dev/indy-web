import Head from 'next/head'
import { useEffect, useState } from 'react'
import { AnimationTableColumns } from '../../../constants/tables/AnimationTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
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
  const { setHeader, setButtons } = usePanelLayoutStore()

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

  useEffect(() => {
    setHeader('Animations')

    setButtons(
      <>
        <FancyButton
          Icon={<UserIcon className="stroke-halloween-orange" />}
          title="Create Animation Category"
          subtitle=""
          onClick={toggleNewAnimationCategoryModal}
          className="w-fit"
        />
        <FancyButton
          Icon={<VideoIcon className="stroke-halloween-orange" />}
          title="Create Animation"
          subtitle=""
          onClick={toggleNewAnimationModal}
          className="w-fit"
        />
      </>
    )
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Animations</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <Card title="Animations" className="flex max-h-155 flex-col">
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
