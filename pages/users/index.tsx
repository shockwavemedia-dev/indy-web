import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { DataTable } from '../../components/DataTable'
import { FancyButton } from '../../components/FancyButton'
import { UserIcon } from '../../components/icons/UserIcon'
import { DeleteAdminUserModal } from '../../components/modals/DeleteAdminUserModal'
import { NewAdminUserModal } from '../../components/modals/NewAdminUserModal'
import { AdminUserTableColumns } from '../../constants/tables/AdminUserTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { useAdminUserStore } from '../../store/AdminUserStore'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'
const StaffUserPage: NextPageWithLayout = () => {
  const { setHeader, setButtons } = usePanelLayoutStore()
  const [isNewAdminUserModalVisible, setNewAdminUserModalVisible] = useState(false)

  const { replace } = useRouter()

  const toggleNewAdminUserModal = () => setNewAdminUserModalVisible(!isNewAdminUserModalVisible)

  const { activeAdminUser, isDeleteAdminUserModalVisible, toggleDeleteAdminUserModal } =
    useAdminUserStore()

  useEffect(() => {
    setHeader('Users')

    setButtons(
      <FancyButton
        Icon={<UserIcon className="stroke-halloween-orange" />}
        title="Create User"
        onClick={toggleNewAdminUserModal}
        className="w-fit"
      />
    )
  }, [])

  return (
    <>
      <NewAdminUserModal isVisible={isNewAdminUserModalVisible} onClose={toggleNewAdminUserModal} />
      <Head>
        <title>Indy - Users</title>
      </Head>
      <div className="mx-auto w-full">
        <Card title="Admin Users">
          <DataTable
            dataEndpoint="/v1/users"
            columns={AdminUserTableColumns}
            tableQueryKey={['users']}
            ofString="Users"
            rowOnClick={({ original: { id } }) => replace(`/users/${id}/details`)}
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
