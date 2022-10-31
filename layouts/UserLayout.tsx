import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useQuery } from 'react-query'
import { UserIcon } from '../components/icons/UserIcon'
import { CreateSupportTicketModal } from '../components/modals/CreateSupportTicketModal'
import { User } from '../types/User.type'
import { usePanelLayoutStore } from './PanelLayout'

const UserLayout = ({ children }: { children: ReactNode }) => {
  const {
    query: { id },
    asPath,
  } = useRouter()

  const { setHeader } = usePanelLayoutStore()

  const { data } = useQuery(
    ['clients', Number(id)],
    async () => {
      const { data } = await axios.get<User>(`/v1/admin-users/${id}`)

      return data
    },
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (data) setHeader('Profile Page')
  }, [data])

  if (!data) return null

  return (
    <>
      <Head>
        <title>Indy - User Page</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div>
          <div className="flex border-b border-b-bright-gray pb-3.5 [&>a]:flex [&>a]:w-1/7 [&>a]:items-center [&>a]:justify-center [&>a]:space-x-2 [&>a]:font-semibold [&>a>svg]:stroke-lavender-gray [&>a>svg]:transition-colors">
            <Link href={`/users/${id}/details`}>
              <a className="group">
                <UserIcon
                  className={`group-hover:stroke-halloween-orange${
                    asPath.endsWith('details') ? ' !stroke-halloween-orange' : ''
                  }`}
                />
                <span>Details</span>
              </a>
            </Link>
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

export default UserLayout
