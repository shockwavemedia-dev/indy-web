import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { Client } from '../../types/Client.type'
import { Page } from '../../types/Page.type'
import { SelectOption } from '../../types/SelectOption.type'
import { FileBrowser } from '../FileBrowser'
import { UserIcon } from '../icons/UserIcon'
import { Notifications } from '../Notifications'
import { SelectNoFormik } from '../SelectNoFormik'
export const MyFiles = () => {
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
    setHeader('My Files')
  }, [])

  const selectClient = (newValue: SingleValue<SelectOption<number>>) =>
    setClientId(newValue?.value || -1)

  return (
    <>
      <Head>
        <title>Indy - My Files</title>
      </Head>
      <div className="mx-auto flex w-full gap-6 lg:flex-col">
        <div className="flex-1 space-y-6">
          <SelectNoFormik
            Icon={UserIcon}
            onChange={selectClient}
            className="max-w-xs"
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
          <FileBrowser clientId={clientId} />
        </div>
        <Notifications className="w-86 lg:w-1/2" />
      </div>
    </>
  )
}
