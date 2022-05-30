import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { UserIcon } from '../components/icons/UserIcon'
import { DeleteAdminUserModal } from '../components/modals/DeleteAdminUserModal'
import { EditAdminUserModal } from '../components/modals/EditAdminUserModal'
import { NewAdminUserModal } from '../components/modals/NewAdminUserModal'
import { AdminUserTableColumns } from '../constants/tables/AdminUserTableColumns'
import PanelLayout from '../layouts/PanelLayout'
import { useAdminUserStore } from '../store/AdminUserStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
const StaffUserPage: NextPageWithLayout = () => {
  const [isNewAdminUserModalVisible, setNewAdminUserModalVisible] = useState(false)

  const toggleNewAdminUserModal = () => setNewAdminUserModalVisible(!isNewAdminUserModalVisible)

  const {
    activeAdminUser,
    isEditAdminUserModalVisible,
    isDeleteAdminUserModalVisible,
    toggleEditAdminUserModal,
    toggleDeleteAdminUserModal,
  } = useAdminUserStore()

  return (
    <>
      <NewAdminUserModal isVisible={isNewAdminUserModalVisible} onClose={toggleNewAdminUserModal} />
      <Head>
        <title>Daily Press - Staffs</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyButton
          Icon={<UserIcon className="stroke-white" />}
          title="Create Staff"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewAdminUserModal}
          twBackgroundColor="bg-jungle-green"
          twIconBackgroundColor="bg-illuminating-emerald"
          className="w-fit"
        />
        <Card title="Admin Users" className="flex flex-col">
          <DataTable
            dataEndpoint="/v1/users"
            columns={AdminUserTableColumns}
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
      <EditAdminUserModal
        isVisible={isEditAdminUserModalVisible}
        onClose={toggleEditAdminUserModal}
        user={activeAdminUser}
      />
    </>
  )
}

StaffUserPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default StaffUserPage
