import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { Pill } from '../../../components/Pill'
import { Table } from '../../../components/Table'
import { TitleValue } from '../../../components/TitleValue'
import { DepartmentMemberColumns } from '../../../constants/tables/DepartmentMemberColumns'
import PanelLayout from '../../../layouts/PanelLayout'
import { Department } from '../../../types/Department.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const DapartmentPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()

  const { data: department } = useQuery(['department', Number(id)], async () => {
    const { data } = await axios.get<Department>(`/v1/departments/${id}/members`)

    return data
  })

  return (
    <>
      <Head>
        <title>Indy - Departments</title>
      </Head>
      <div className="mx-auto flex w-full max-w-8xl space-x-6">
        <Card className="w-86 flex-none">
          <TitleValue title="ID" className="flex items-center justify-between">
            {department?.id}
          </TitleValue>
          <TitleValue title="Name" className="flex items-center justify-between">
            {department?.name}
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
          <TitleValue title="Description" className="flex items-center justify-between">
            {department?.description}
          </TitleValue>
        </Card>
        <Card className="w-full">
          <Table
            columns={DepartmentMemberColumns}
            data={department?.members || []}
            ofString="Department Members"
          />
        </Card>
      </div>
    </>
  )
}

DapartmentPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default DapartmentPage
