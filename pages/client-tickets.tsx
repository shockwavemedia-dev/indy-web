import axios from 'axios'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { UserIcon } from '../components/icons/UserIcon'
import { SelectNoFormik } from '../components/SelectNoFormik'
import { AdminTicketsTableColumns } from '../constants/tables/AdminTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { Client } from '../types/Client.type'
import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { SelectOption } from '../types/SelectOption.type'

const ClientTicketsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  const [clientId, setClientId] = useState(-1)

  const { data: clients } = useQuery('clients', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Client>
      page: Page
    }>('/v1/clients')

    return data
  })

  useEffect(() => {
    setHeader('Client Tickets')
  }, [])

  const selectClient = (newValue: SingleValue<SelectOption<number>>) =>
    setClientId(newValue?.value || -1)

  useEffect(() => {
    setHeader('Client Tickets')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Visual Displays</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <SelectNoFormik
          Icon={UserIcon}
          onChange={selectClient}
          className="mb-8 max-w-xs"
          placeholder="Select Client"
          options={
            clients
              ? clients.map(({ name, id }) => ({
                  label: name,
                  value: id,
                }))
              : []
          }
        />
        {clientId !== -1 && (
          <div className="flex gap-6 transition-all lg:flex-col">
            <Card title="Project Status Table" className="flex max-h-155 flex-1 flex-col">
              <DataTable
                columns={AdminTicketsTableColumns}
                dataEndpoint={`/v1/clients/${clientId}/tickets`}
                tableQueryKey={['tickets', clientId]}
                ofString="Projects"
              />
            </Card>
          </div>
        )}
      </div>
    </>
  )
}

ClientTicketsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientTicketsPage
