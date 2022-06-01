import Head from 'next/head'
import { useState } from 'react'
import { AnimationTableColumns } from '../../../constants/tables/AnimationTableColumns'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { UserIcon } from '../../icons/UserIcon'
import { NewAnimationRequestModal } from '../../modals/NewAnimationRequestModal'

export const ClientAnimations = () => {
  const [isNewAnimationRequestModalVisible, setNewAnimationRequestModalVisible] = useState(false)

  const toggleNewAnimationRequestModal = () =>
    setNewAnimationRequestModalVisible(!isNewAnimationRequestModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Animations</div>
      <div className="mx-auto flex h-full w-full max-w-8xl flex-col space-y-6">
        <FancyButton
          Icon={<UserIcon className="stroke-white" />}
          title="Request Animation"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAnimationRequestModal}
          twBackgroundColor="bg-bleu-de-france"
          twIconBackgroundColor="bg-bright-navy-blue"
          className="w-fit"
        />
        <Card title="Animations" className="flex flex-col">
          <DataTable
            dataEndpoint="/v1/libraries"
            dataParams={{
              types: 'library',
            }}
            columns={AnimationTableColumns}
            tableQueryKey={['libraries']}
            ofString="Animations"
          />
        </Card>
      </div>
      <NewAnimationRequestModal
        isVisible={isNewAnimationRequestModalVisible}
        onClose={toggleNewAnimationRequestModal}
      />
    </>
  )
}
