import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Card from '../components/Card'
import DataTable from '../components/DataTable'
import FancyButton from '../components/FancyButton'
import UserIcon from '../components/icons/UserIcon'
import NewDepartmentModal from '../components/modals/NewDepartmentModal'
import { DepartmentTableColumns } from '../constants/tables/DepartmentTableColumns'
import PanelLayout from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const Departments: NextPageWithLayout = () => {
  const [isNewDepartmentModalVisible, setNewDepartmentModalVisible] = useState(false)

  const toggleNewDepartmentModal = () => setNewDepartmentModalVisible(!isNewDepartmentModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="grid-rows-10 mx-auto grid h-262.5 w-270 gap-6">
        <FancyButton
          Icon={
            <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Department"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewDepartmentModal}
          className="row-span-1 w-fit"
        />
        <Card title="Departments" className="row-span-11">
          <DataTable
            dataEndpoint="/v1/departments"
            columns={DepartmentTableColumns}
            initialPageSize={20}
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

Departments.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default Departments
