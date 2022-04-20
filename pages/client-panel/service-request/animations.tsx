import Head from 'next/head'
import { ReactElement, useState } from 'react'
import DataTable from '../../../components/common/DataTable'
import UserIcon from '../../../components/common/icons/UserIcon'
import Card from '../../../components/panel/Card'
import FancyButton from '../../../components/panel/FancyButton'
import NewAnimationRequestModal from '../../../components/panel/modals/NewAnimationRequestModal'
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
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
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
  <PanelLayout header="Animations" routes={ClientRoutes}>
    {page}
  </PanelLayout>
)

export default Animation
