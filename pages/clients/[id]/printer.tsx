import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { TitleValue } from '../../../components/TitleValue'
import { AdminPrinterJobColumns } from '../../../constants/tables/AdminPrinterJobColumns'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { Client } from '../../../types/Client.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Printer } from '../../../types/Printer.type'

const ClientPrinter: NextPageWithLayout = () => {
  const {
    replace,
    query: { id },
  } = useRouter()
  const { data: client } = useQuery(['clients', Number(id)], async () => {
    const { data } = await axios.get<Client>(`/v1/clients/${id}`)

    return data
  })

  const { data: printerCompany } = useQuery(
    'printerCompany',
    async () => {
      const { data } = await axios.get<Printer>(
        `/v1/printers/${client?.printer && client?.printer.id}`
      )

      return data
    },
    {
      enabled: !!client?.printer,
    }
  )

  if (!client) return null

  return (
    <div className="w-full">
      <div className="mb-6 flex gap-6">
        <Card title="Printer Details" className="min-w-[21.5rem]">
          {client.printer !== null ? (
            <div className="space-y-4">
              {printerCompany?.companyThumbnailLogoUrl && (
                <Image
                  src={printerCompany?.companyThumbnailLogoUrl}
                  height={100}
                  width={100}
                  alt="company logo"
                  className="rounded-lg"
                />
              )}
              <TitleValue title="Company Name" className="capitalize">
                {client?.printer.companyName}
              </TitleValue>
              <TitleValue title="Email">{printerCompany?.email}</TitleValue>
              <TitleValue title="Contact Name">{printerCompany?.contactName}</TitleValue>
              <TitleValue title="Contact Phone">{printerCompany?.phone}</TitleValue>
            </div>
          ) : (
            <div className="mb-5 w-fit text-sm font-semibold text-halloween-orange">
              No Printer Selected
            </div>
          )}
        </Card>
        <Card title="Printer Job List" className="flex-1">
          <DataTable
            columns={AdminPrinterJobColumns}
            dataEndpoint={`/v1/clients/${Number(id)}/printer-jobs`}
            tableQueryKey={['printerJobs']}
            ofString="printerJobs"
            rowOnClick={({ original: { id } }) => replace(`/printer-jobs/${id}`)}
          />
        </Card>
      </div>
    </div>
  )
}

ClientPrinter.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientPrinter
