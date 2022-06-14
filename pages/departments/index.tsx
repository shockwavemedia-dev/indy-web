import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../../components/Card'
import { DataTable } from '../../components/DataTable'
import { FancyButton } from '../../components/FancyButton'
import { UserIcon } from '../../components/icons/UserIcon'
import { NewDepartmentModal } from '../../components/modals/NewDepartmentModal'
import { DepartmentTableColumns } from '../../constants/tables/DepartmentTableColumns'
import PanelLayout from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const DepartmentsPage: NextPageWithLayout = () => {
  const [isNewDepartmentModalVisible, setNewDepartmentModalVisible] = useState(false)

  const toggleNewDepartmentModal = () => setNewDepartmentModalVisible(!isNewDepartmentModalVisible)

  return (
    <>
      <Head>
        <title>Indy - Departments</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyButton
          Icon={<UserIcon className="stroke-white" />}
          title="Create Department"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewDepartmentModal}
          twBackgroundColor="bg-bleu-de-france"
          twIconBackgroundColor="bg-bright-navy-blue"
          className="w-fit"
        />
        <Card title="Departments" className="flex flex-col">
          <DataTable
            dataEndpoint="/v1/departments"
            columns={DepartmentTableColumns}
            tableQueryKey={['departments']}
            ofString="Departments"
          />
        </Card>
        <NewDepartmentModal
          isVisible={isNewDepartmentModalVisible}
          onClose={toggleNewDepartmentModal}
        />
      </div>
    </>
  )
}

DepartmentsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default DepartmentsPage
