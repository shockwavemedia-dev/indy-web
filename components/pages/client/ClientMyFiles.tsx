import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { FileBrowser } from '../../FileBrowser'
import { Notifications } from '../../Notifications'
import { RetainerInclusions } from '../../RetainerInclusions'

export const ClientMyFiles = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()

  useEffect(() => {
    setHeader('My Files')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - My Files</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl">
        <div className="flex gap-6 transition-all lg:flex-col">
          <FileBrowser clientId={session?.user.userType.client.id || -1} />
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}
