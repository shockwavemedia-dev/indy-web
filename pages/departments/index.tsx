import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { DataTable } from '../../components/DataTable'
import { FancyButton } from '../../components/FancyButton'
import { UserIcon } from '../../components/icons/UserIcon'
import { EditDepartmentModal } from '../../components/modals/EditDepartmentModal'
import { NewDepartmentModal } from '../../components/modals/NewDepartmentModal'
import { DepartmentTableColumns } from '../../constants/tables/DepartmentTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const DepartmentsPage: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { setHeader, setButtons } = usePanelLayoutStore()
  const [isNewDepartmentModalVisible, setNewDepartmentModalVisible] = useState(false)

  const toggleNewDepartmentModal = () => setNewDepartmentModalVisible(!isNewDepartmentModalVisible)

  useEffect(() => {
    setHeader('Staffs')

    setButtons(
      <FancyButton
        Icon={<UserIcon className="stroke-halloween-orange" />}
        title="Create Department"
        subtitle="Laborerivit rem cones mil"
        onClick={toggleNewDepartmentModal}
        className="w-fit"
      />
    )
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Departments</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <Card title="Departments" className="flex max-h-155 flex-col">
          <DataTable
            dataEndpoint="/v1/departments"
            columns={DepartmentTableColumns}
            tableQueryKey={['departments']}
            ofString="Departments"
            rowOnClick={({ original: { id } }) => replace(`/departments/${id}`)}
          />
        </Card>
      </div>
      <NewDepartmentModal
        isVisible={isNewDepartmentModalVisible}
        onClose={toggleNewDepartmentModal}
      />
      <EditDepartmentModal />
    </>
  )
}

DepartmentsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default DepartmentsPage
