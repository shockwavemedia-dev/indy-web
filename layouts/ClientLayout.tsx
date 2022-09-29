import { Tooltip } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useQuery } from 'react-query'
import { FancyButton } from '../components/FancyButton'
import { LifeBuoyIcon } from '../components/icons/LifeBuoyIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { NotepadIcon } from '../components/icons/NotepadIcon'
import { PenAndRulerIcon } from '../components/icons/PenAndRulerIcon'
import { PrinterIcon } from '../components/icons/PrinterIcon'
import { ReceiptIcon } from '../components/icons/ReceiptIcon'
import { SquareDollarIcon } from '../components/icons/SquareDollarIcon'
import { UserIcon } from '../components/icons/UserIcon'
import {
  CreateSupportTicketModal,
  useCreateSupportTicketModalStore,
} from '../components/modals/CreateSupportTicketModal'
import { Client } from '../types/Client.type'
import { usePanelLayoutStore } from './PanelLayout'

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const {
    query: { id },
    asPath,
  } = useRouter()

  const { setHeader, setButtons } = usePanelLayoutStore()
  const { toggleModal: toggleSupportTicketModal } = useCreateSupportTicketModalStore()

  const { data } = useQuery(
    ['clients', Number(id)],
    async () => {
      const { data } = await axios.get<Client>(`/v1/clients/${id}`)

      return data
    },
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    setButtons(
      <>
        <FancyButton
          Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
          title="New Ticket"
          subtitle="Laborerivit rem cones mil"
          onClick={(e) => {
            e.stopPropagation()
            toggleSupportTicketModal(Number(id))
          }}
          className="w-fit"
        />
      </>
    )
  }, [])

  useEffect(() => {
    if (data) setHeader(data.name)
  }, [data])

  if (!data) return null

  return (
    <>
      <Head>
        <title>{`Indy - ${data.name}`}</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div>
          <div className="flex border-b border-b-bright-gray pb-3.5 [&>a]:flex [&>a]:w-1/7 [&>a]:items-center [&>a]:justify-center [&>a]:space-x-2 [&>a]:font-semibold [&>a>svg]:stroke-lavender-gray [&>a>svg]:transition-colors">
            <Link href={`/clients/${id}/details`}>
              <a className="group">
                <UserIcon
                  className={`group-hover:stroke-halloween-orange${
                    asPath.endsWith('details') ? ' !stroke-halloween-orange' : ''
                  }`}
                />
                <span>Details</span>
              </a>
            </Link>
            <Link href={`/clients/${id}/screens`}>
              <a className="group">
                <MonitorIcon
                  className={`group-hover:stroke-halloween-orange${
                    asPath.endsWith('screens') ? ' !stroke-halloween-orange' : ''
                  }`}
                />
                <span>Screens</span>
              </a>
            </Link>
            <Link href={`/clients/${id}/marketing-plan`}>
              <a className="group">
                <SquareDollarIcon
                  className={`group-hover:stroke-halloween-orange${
                    asPath.endsWith('marketing-plan') ? ' !stroke-halloween-orange' : ''
                  }`}
                />
                <span>Marketing Plan</span>
              </a>
            </Link>
            <Link href={`/clients/${id}/printer`}>
              <a className="group">
                <PrinterIcon
                  className={`group-hover:stroke-halloween-orange${
                    asPath.endsWith('printer') ? ' !stroke-halloween-orange' : ''
                  }`}
                />
                <span>Printer</span>
              </a>
            </Link>
            <Link href={`/clients/${id}/style-guide`}>
              <a className="group">
                <PenAndRulerIcon
                  className={`group-hover:stroke-halloween-orange${
                    asPath.endsWith('style-guide') ? ' !stroke-halloween-orange' : ''
                  }`}
                />
                <span>Style Guide</span>
              </a>
            </Link>
            <Link href={`/clients/${id}/notes`}>
              <a className="group">
                <NotepadIcon
                  className={`group-hover:stroke-halloween-orange${
                    asPath.endsWith('notes') ? ' !stroke-halloween-orange' : ''
                  }`}
                />
                <span>Notes</span>
              </a>
            </Link>
            <Tooltip title="Coming soon 🚀" placement="top">
              <div className="flex w-1/7 cursor-default items-center justify-center space-x-2 font-semibold opacity-40">
                <ReceiptIcon className="stroke-lavender-gray" />
                <span>Invoices</span>
              </div>
            </Tooltip>
          </div>
          <div
            className={`-mt-0.5 h-0.75 w-1/7 rounded bg-halloween-orange transition-all ${
              {
                screens: 'ml-1/7',
                'marketing-plan': 'ml-2/7',
                printer: 'ml-3/7',
                'style-guide': 'ml-4/7',
                notes: 'ml-5/7',
              }[asPath.split('/').pop() ?? '']
            }`}
          />
        </div>
        {children}
      </div>
      <CreateSupportTicketModal />
    </>
  )
}

export default ClientLayout
