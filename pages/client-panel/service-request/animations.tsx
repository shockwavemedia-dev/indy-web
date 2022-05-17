import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Card from '../../../components/Card'
import DataTable from '../../../components/DataTable'
import FancyButton from '../../../components/FancyButton'
import UserIcon from '../../../components/icons/UserIcon'
import NewAnimationRequestModal from '../../../components/modals/NewAnimationRequestModal'
import { ClientRoutes } from '../../../constants/routes/ClientRoutes'
import { AnimationTableColumns } from '../../../constants/tables/AnimationTableColumns'
import PanelLayout from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const Animation: NextPageWithLayout = () => {
  const [isNewAnimationRequestModalVisible, setNewAnimationRequestModalVisible] = useState(false)

  const toggleNewAnimationRequestModal = () =>
    setNewAnimationRequestModalVisible(!isNewAnimationRequestModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="mx-auto grid h-262.5 w-270 grid-rows-10 gap-6">
        <FancyButton
          Icon={
            <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Request Animation"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAnimationRequestModal}
          className="row-span-1 w-fit"
        />
        <Card title="Animations" className="row-span-11">
          <DataTable
            dataEndpoint="/v1/libraries"
            dataParams={{
              types: 'library',
            }}
            columns={AnimationTableColumns}
            initialPageSize={20}
            tableQueryKey="libraries"
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

Animation.getLayout = (page: ReactElement) => (
  <PanelLayout routes={ClientRoutes}>{page}</PanelLayout>
)

export default Animation
