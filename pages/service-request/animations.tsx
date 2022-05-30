import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../../components/Card'
import { DataTable } from '../../components/DataTable'
import { FancyButton } from '../../components/FancyButton'
import { UserIcon } from '../../components/icons/UserIcon'
import { NewAnimationRequestModal } from '../../components/modals/NewAnimationRequestModal'
import { AnimationTableColumns } from '../../constants/tables/AnimationTableColumns'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const AnimationPage: NextPageWithLayout = () => {
  const [isNewAnimationRequestModalVisible, setNewAnimationRequestModalVisible] = useState(false)

  const toggleNewAnimationRequestModal = () =>
    setNewAnimationRequestModalVisible(!isNewAnimationRequestModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="mx-auto flex h-full w-full max-w-8xl flex-col space-y-6">
        <FancyButton
          Icon={
            <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Request Animation"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAnimationRequestModal}
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

AnimationPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default AnimationPage
