import { Tooltip } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { EditIcon } from '../../../components/icons/EditIcon'
import { UploadFileIcon } from '../../../components/icons/UploadFileIcon'
import { DeleteTicketModal } from '../../../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../../../components/modals/EditTicketModal'
import { EditUserModal, useEditUserModal } from '../../../components/modals/EditUserModal'
import { ReAssignTicketModal } from '../../../components/modals/ReAssignTIcketModal'
import {
  UploadProfileModal,
  useUploadProfileModal,
} from '../../../components/modals/UploadProfileModal'
import { Pill } from '../../../components/Pill'
import { TitleValue } from '../../../components/TitleValue'
import { UserTicketsTableColumn } from '../../../constants/tables/UserTicketsTableColumn'
import PanelLayout from '../../../layouts/PanelLayout'
import UserLayout from '../../../layouts/UserLayout'
import DummyProfilePic from '../../../public/images/dummy-profile-pic.png'
import { useAdminUserStore } from '../../../store/AdminUserStore'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { User } from '../../../types/User.type'

const UserDetailsPage: NextPageWithLayout = () => {
  const {
    query: { id },
    replace,
  } = useRouter()

  const toggleUploadProfileModal = useUploadProfileModal((state) => state.toggleUploadProfileModal)
  const toggleEditUserModal = useEditUserModal((state) => state.toggleEditUserModal)

  const { setActiveAdminUser } = useAdminUserStore()

  const { data } = useQuery(['users', Number(id)], async () => {
    try {
      const { data } = await axios.get<User>(`/v1/admin-users/${id}`)

      setActiveAdminUser(data)

      return data
    } catch (e) {
      replace('/users')
    }
  })

  if (!data) return null

  return (
    <div className="w-full">
      <div className="mb-6 flex gap-6">
        <Card title="" className="min-w-[21.5rem]">
          <div className="absolute top-6 right-6 space-x-2">
            <Tooltip
              title={data.status === 'deleted' ? 'Disabled Upload' : 'Upload Profile Photo'}
              placement="right"
            >
              <button
                className="group"
                disabled={data.status === 'deleted'}
                onClick={() => toggleUploadProfileModal(data)}
              >
                <UploadFileIcon className="stroke-green-800 group-hover:stroke-green-600" />
              </button>
            </Tooltip>
          </div>
          <div className="mb-6 space-y-2">
            {data.profileFile?.url && (
              <Image
                src={data.profileFile.url}
                height={250}
                width={250}
                alt="company logo"
                className="rounded-lg"
              />
            )}
            {!data.profileFile && (
              <Image
                src={DummyProfilePic}
                height={250}
                width={250}
                alt="company logo"
                className="rounded-lg"
              />
            )}
          </div>
          <div className="space-y-4">
            <TitleValue title="Name">{data.fullName}</TitleValue>
            <TitleValue title="Status" className="flex items-center justify-between">
              <Pill
                twBackgroundColor={(() => {
                  switch (data?.status) {
                    case 'active':
                      return 'bg-honeydew'
                    case 'inactive':
                      return 'bg-alice-blue'
                    case 'deleted':
                      return 'bg-light-tart-orange'
                    case 'inactive':
                      return 'bg-light-deep-saffron'
                  }
                })()}
                twTextColor={(() => {
                  switch (data?.status) {
                    case 'active':
                      return 'text-jungle-green'
                    case 'inactive':
                      return 'text-bleu-de-france'
                    case 'deleted':
                      return 'text-tart-orange'
                  }
                })()}
                value={data?.status ?? ''}
              />
            </TitleValue>
          </div>
        </Card>
        <Card title="About" className="flex-1">
          <button
            className="absolute top-6 right-6 flex space-x-2"
            onClick={() => toggleEditUserModal(data)}
          >
            <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
            <div className=" text-sm font-semibold text-halloween-orange">Edit</div>
          </button>
          <div title="123" className="... mb-6 grid grid-cols-3 content-start gap-4">
            <TitleValue title="Department">
              <Pill
                twBackgroundColor={(() => {
                  return 'bg-honeydew'
                })()}
                twTextColor={(() => {
                  return 'text-jungle-green'
                })()}
                value={data.userType.department?.name ?? ''}
              ></Pill>
            </TitleValue>
            <TitleValue title="Position">
              <Pill
                twBackgroundColor={(() => {
                  return 'bg-alice-blue'
                })()}
                twTextColor={(() => {
                  return 'text-bleu-de-france'
                })()}
                value={data.userType.position ?? ''}
              ></Pill>
            </TitleValue>
            <TitleValue title="Role">
              <Pill
                twBackgroundColor={(() => {
                  return 'bg-alice-blue'
                })()}
                twTextColor={(() => {
                  return 'text-bleu-de-france'
                })()}
                value={data.userType.role ?? ''}
              ></Pill>
            </TitleValue>
          </div>
          <div className="... mb-4 grid grid-cols-3 content-start gap-4">
            <TitleValue title="First Name">{data.firstName}</TitleValue>
            <TitleValue title="Middle Name">{data.middleName}</TitleValue>
            <TitleValue title="Last Name">{data.lastName}</TitleValue>
            <TitleValue className="capitalize" title="Gender">
              {data.gender}
            </TitleValue>
            <TitleValue title="Phone">{data.contactNumber}</TitleValue>
          </div>
        </Card>
      </div>
      <Card title="Tickets" className="flex max-h-155 flex-1 flex-col">
        <div className="">
          <DataTable
            columns={UserTicketsTableColumn}
            dataEndpoint={`/v1/admin-users/${data.userType.id}/tickets`}
            tableQueryKey={[]}
            ofString="Tickets"
            dataParams={{}}
            rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
          />
        </div>
      </Card>
      <ReAssignTicketModal />
      <UploadProfileModal />
      <EditUserModal />
      <EditTicketModal />
      <DeleteTicketModal />
    </div>
  )
}

UserDetailsPage.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <UserLayout>{page}</UserLayout>
  </PanelLayout>
)

export default UserDetailsPage
