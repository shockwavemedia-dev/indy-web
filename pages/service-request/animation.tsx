import Head from 'next/head'
import { ReactElement, useState } from 'react'
import UserIcon from '../../components/common/icons/UserIcon'
import Table from '../../components/common/Table'
import Card from '../../components/panel/Card.component'
import FancyButton from '../../components/panel/FancyButton.component'
import NewAnimationRequestModal from '../../components/panel/NewAnimationRequestModal.component'
import { AnimationTableColumns } from '../../constants/tables/AnimationTableColumns'
import PanelLayout from '../../layouts/Panel.layout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

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
          <Table
            dataEndpoint="/v1/libraries"
            columns={AnimationTableColumns}
            startingPageSize={20}
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

Animation.getLayout = (page: ReactElement) => <PanelLayout header="Animations">{page}</PanelLayout>

export default Animation
