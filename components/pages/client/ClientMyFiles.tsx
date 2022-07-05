import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Files } from '../../../types/Files.type'
import { FancyLink } from '../../FancyLink'
import { FileButton } from '../../FileButton'
import { CalendarAddIcon } from '../../icons/CalendarAddIcon'
import { Notifications } from '../../Notifications'
import { StatusCountCard } from '../../StatusCountCard'

export const ClientMyFiles = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')

  const { data: files, isSuccess } = useQuery('files', async () => {
    const { data } = await axios.get<Files>(`/v1/clients/${session?.user.userType.clientId}/files`)

    return data
  })

  const goUpToYearsFolder = () => setYear('')
  const goUpToMonthsFolder = () => setMonth('')

  useEffect(() => {
    setHeader('My Files')
  }, [])

  if (!isSuccess) {
    return null
  }

  return (
    <>
      <Head>
        <title>Indy - My Files</title>
      </Head>
      <div className="mx-auto h-4/5 w-full max-w-8xl">
        <FancyLink
          href="/project-brief"
          Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
          title="New Project Brief"
          subtitle="Laborerivit rem cones mil"
          className="w-fit"
        />
        <hr className="mb-6 border-t-bright-gray" />
        <div className="flex space-x-6">
          <Card className="flex h-fit w-260 flex-wrap gap-4">
            {year === '' ? (
              Object.keys(files).map((year) => {
                const openYearFolder = () => setYear(year)

                return (
                  <FileButton
                    className="h-35 w-35"
                    key={year}
                    onClick={openYearFolder}
                    name={year}
                    textClassName="text-sm"
                  />
                )
              })
            ) : month !== '' ? (
              <>
                <FileButton
                  className="h-35 w-35"
                  key={month}
                  onClick={goUpToMonthsFolder}
                  name="../"
                />
                {files[year][month].map(
                  ({ id, originalFilename, url, thumbnailUrl, clientTicketFile }) => {
                    const status = clientTicketFile?.status ?? null
                    const fileUrl = clientTicketFile ? `/ticket/file/${clientTicketFile.id}` : url

                    return (
                      <FileButton
                        className="h-35 w-35"
                        key={id}
                        href={fileUrl}
                        name={originalFilename}
                        thumbnailUrl={thumbnailUrl}
                        fileStatus={status}
                      />
                    )
                  }
                )}
              </>
            ) : (
              <>
                <FileButton
                  className="h-35 w-35"
                  key={month}
                  onClick={goUpToYearsFolder}
                  name="../"
                />
                {Object.keys(files[year]).map((month) => {
                  const openMonthFolder = () => setMonth(month)

                  return (
                    <FileButton
                      className="h-35 w-35"
                      key={month}
                      onClick={openMonthFolder}
                      name={month}
                      textClassName="text-xs"
                    />
                  )
                })}
              </>
            )}
          </Card>
          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex space-x-1">
              <StatusCountCard
                value={8}
                className="bg-deep-space-sparkle"
                description="Graphics Design"
              />
              <StatusCountCard value={5} className="bg-charleston-green" description="Animations" />
              <StatusCountCard
                value={5}
                className="bg-halloween-orange"
                description="Web Updates"
              />
            </div>
            <div className="mb-2 flex space-x-1">
              <StatusCountCard
                value={8}
                className="bg-maximum-yellow-red"
                description="Photo Shoots"
              />
              <StatusCountCard value={3} className="bg-navy" description="Video Shoots" />
              <StatusCountCard value={11} className="bg-red-crimson" description="Social Posts" />
            </div>
            <div className="mb-2 flex space-x-1">
              <StatusCountCard value={9} className="bg-orchid" description="Marketing" />
              <StatusCountCard value={7} className="bg-forest-green" description="Health Check" />
              <StatusCountCard
                value={15}
                className="bg-bright-navy-blue"
                description="App Updates"
              />
            </div>
            <Notifications />
          </div>
        </div>
      </div>
    </>
  )
}
