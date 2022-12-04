import axios from 'axios'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { FileBrowser } from '../../../components/FileBrowser'
import { Notifications } from '../../../components/Notifications'
import { RetainerInclusions } from '../../../components/RetainerInclusions'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { Client } from '../../../types/Client.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const ClientMyFiles: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()

  const { data } = useQuery(['clients', Number(id)], async () => {
    const { data } = await axios.get<Client>(`/v1/clients/${id}`)

    return data
  })

  if (!data) return null

  const clientId = id === undefined ? -1 : +id

  return (
    <>
      <div className="mx-auto w-full max-w-8xl space-y-5">
        <div className="flex gap-6 transition-all lg:flex-col">
          <FileBrowser clientId={clientId} />
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}

ClientMyFiles.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientMyFiles
