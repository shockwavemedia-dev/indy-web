import { Tooltip } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { EditIcon } from '../../../components/icons/EditIcon'
import {
  ClientPrinterModal,
  useClientPrinterModalStore,
} from '../../../components/modals/ClientPrinterModal'
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

  const { toggleModal: togglePrinterModal } = useClientPrinterModalStore()

  if (!client) return null

  return (
    <>
      <div className="w-full">
        <div className="mb-6 flex gap-6">
          <Card title="Printer Details" className="min-w-[21.5rem]">
            <div className="absolute top-6 right-6 space-x-2">
              <Tooltip title="Add/Update Printer" placement="top">
                <button
                  className="group"
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePrinterModal(client)
                  }}
                >
                  <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
                </button>
              </Tooltip>
            </div>
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
          <Card title="Print List" className="flex-1">
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
      <ClientPrinterModal />
    </>
  )
}

ClientPrinter.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientPrinter
