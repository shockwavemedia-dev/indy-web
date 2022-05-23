import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { UserIcon } from '../components/icons/UserIcon'
import { DeleteAdminUserModal } from '../components/modals/DeleteAdminUserModal'
import { NewAdminUserModal } from '../components/modals/NewAdminUserModal'
import { AdminUserTableColumns } from '../constants/tables/AdminUserTableColumns'
import PanelLayout from '../layouts/PanelLayout'
import { useAdminUserStore } from '../store/AdminUserStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
const StaffUserPage: NextPageWithLayout = () => {
  const [isNewAdminUserModalVisible, setNewAdminUserModalVisible] = useState(false)

  const toggleNewAdminUserModal = () => setNewAdminUserModalVisible(!isNewAdminUserModalVisible)

  const { activeAdminUser, isDeleteAdminUserModalVisible, toggleDeleteAdminUserModal } =
    useAdminUserStore()

  return (
    <>
      <NewAdminUserModal isVisible={isNewAdminUserModalVisible} onClose={toggleNewAdminUserModal} />
      <Head>
        <title>Daily Press - Staff User</title>
      </Head>
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col space-y-6">
        <FancyButton
          Icon={
            <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Staff"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAdminUserModal}
          className="w-fit"
        />
        <Card title="Admin Users" className="flex flex-col">
          <DataTable
            dataEndpoint="/v1/users"
            columns={AdminUserTableColumns}
            initialPageSize={20}
            tableQueryKey={['users']}
            ofString="Users"
          />
        </Card>
      </div>
      <DeleteAdminUserModal
        isVisible={isDeleteAdminUserModalVisible}
        onClose={toggleDeleteAdminUserModal}
        user={activeAdminUser}
      />
    </>
  )
}

StaffUserPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default StaffUserPage
