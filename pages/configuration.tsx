import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { FancyButton } from '../components/FancyButton'
import { DatabaseExportIcon } from '../components/icons/DatabaseExportIcon'
import { DatabaseImportIcon } from '../components/icons/DatabaseImportIcon'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useToastStore } from '../store/ToastStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ConfigurationPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()
  const { replace } = useRouter()
  const { showToast } = useToastStore()

  useEffect(() => {
    setHeader('Services')
  }, [])

  const restoreDB = async () => {
    try {
      const { status } = await axios.post('/commands/restore-db')

      if (status === 200) {
        showToast({
          type: 'success',
          message: 'Running restoring database from last restoration point.',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  const backUpDB = async () => {
    try {
      const { status } = await axios.post('/commands/backup-db')

      if (status === 200) {
        showToast({
          type: 'success',
          message: 'Current Database was set as restoration point Successfully.',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }
  return (
    <>
      <Head>
        <title>Indy - Database Backup and Restoration</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <Card title="Database" className="flex max-h-155 flex-col">
          <div key="channel.name" className="mb-6 mt-6 grid grid-cols-2 content-start gap-6">
            <div>
              <FancyButton
                Icon={<DatabaseExportIcon className="stroke-jungle-green" />}
                title="Backup Database"
                onClick={backUpDB}
                subtitle="Set current database as restoration point"
                className="jungle-green w-fit"
              />
            </div>
            <div>
              <FancyButton
                Icon={<DatabaseImportIcon className="stroke-halloween-orange" />}
                title="Restore Database"
                onClick={restoreDB}
                subtitle="Reset Database from restoration point"
                className="jungle-green w-fit"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

ConfigurationPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ConfigurationPage
