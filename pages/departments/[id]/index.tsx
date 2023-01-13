import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { PlusIcon } from '../../../components/icons/PlusIcon'
import {
  AddDepartmentMemberModal,
  useAddDepartmentMemberModalStore,
} from '../../../components/modals/AddDepartmentMemberModal'
import { Pill } from '../../../components/Pill'
import { Table } from '../../../components/Table'
import { TitleValue } from '../../../components/TitleValue'
import { DepartmentMemberTableColumns } from '../../../constants/tables/DepartmentMemberTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Department } from '../../../types/Department.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const DapartmentPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const { toggleModal } = useAddDepartmentMemberModalStore()

  const { data: department } = useQuery(['department', Number(id)], async () => {
    const { data } = await axios.get<Department>(`/v1/departments/${id}/members`)

    return data
  })

  useEffect(() => {
    if (department) {
      setHeader(department.name)
      setCrumbsNavigation([])
    }
  }, [department])

  return (
    <>
      <Head>
        <title>Indy - Departments</title>
      </Head>
      <div className="mx-auto flex w-full space-x-6">
        <Card className="h-fit w-86 flex-none">
          <TitleValue title="ID" className="flex items-center justify-between">
            {department?.id}
          </TitleValue>

          <TitleValue title="Status" className="flex items-center justify-between">
            <Pill
              twBackgroundColor={(() => {
                switch (department?.status) {
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
                switch (department?.status) {
                  case 'active':
                    return 'text-jungle-green'
                  case 'inactive':
                    return 'text-bleu-de-france'
                  case 'deleted':
                    return 'text-tart-orange'
                }
              })()}
              value={department?.status ?? ''}
            />
          </TitleValue>
          <TitleValue title="Min. Delivery Days" className="flex items-center justify-between">
            {department?.minDeliveryDays}
          </TitleValue>
          <TitleValue title="Services">
            {department?.services && department.services.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {department.services.map(({ serviceId, name }) => (
                  <Pill key={`service-${serviceId}`} value={name} />
                ))}
              </div>
            )}
          </TitleValue>
          <TitleValue title="Description" className="flex items-center justify-between">
            {department?.description}
          </TitleValue>
        </Card>
        <Card className="w-full" title="Members">
          <button className="absolute top-6 right-6 flex space-x-2" onClick={toggleModal}>
            <PlusIcon className="stroke-halloween-orange" />
            <div className=" text-sm font-semibold text-halloween-orange">Add Member</div>
          </button>
          <Table
            columns={DepartmentMemberTableColumns}
            data={department?.members || []}
            ofString="Department Members"
          />
        </Card>
      </div>
      <AddDepartmentMemberModal />
    </>
  )
}

DapartmentPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default DapartmentPage
