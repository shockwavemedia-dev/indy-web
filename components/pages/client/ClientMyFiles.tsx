import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Files } from '../../../types/Files.type'
import { CountCard } from '../../CountCard'
import { FancyButton } from '../../FancyButton'
import { FileButton } from '../../FileButton'
import { CalendarAddIcon } from '../../icons/CalendarAddIcon'
import { GalleryIcon } from '../../icons/GalleryIcon'
import { MenuBoardIcon } from '../../icons/MenuBoardIcon'
import { VideoIcon } from '../../icons/VideoIcon'
import { CreateProjectBriefModal } from '../../modals/CreateProjectBriefModal'

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

  const [isCreateProjectBriefModalVisible, setCreateProjectBriefModalVisible] = useState(false)
  const toggleCreateProjectBriefModal = () =>
    setCreateProjectBriefModalVisible(!isCreateProjectBriefModalVisible)

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
        <FancyButton
          Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
          title="New Project Brief"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleCreateProjectBriefModal}
          className="mb-8 w-fit"
        />
        <hr className="mb-6 border-t-bright-gray" />
        <div className="flex space-x-6">
          <Card className="flex w-260 flex-wrap gap-4">
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
                {files[year][month].map(({ id, originalFilename, url }) => (
                  <FileButton className="h-35 w-35" key={id} href={url} name={originalFilename} />
                ))}
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
            <div className="mb-3 flex space-x-3">
              <CountCard
                className="bg-deep-space-sparkle"
                Icon={<VideoIcon className="stroke-white" />}
                value={5}
                description="Animations Remaining"
              />
              <CountCard
                className="bg-charleston-green"
                Icon={<GalleryIcon className="stroke-white" />}
                value={2}
                description="Photoshoots Remaining"
              />
            </div>
            <div className="mb-6 flex space-x-3">
              <CountCard
                className="bg-halloween-orange"
                Icon={<MenuBoardIcon className="stroke-white" />}
                value={3}
                description="Graphics Remaining"
              />
              <CountCard
                className="bg-maximum-yellow-red"
                Icon={<VideoIcon className="stroke-white" />}
                value={1}
                description="Videoshoots Remaining"
              />
            </div>
            <Card title="Notifications" className="h-full w-full opacity-50">
              <div></div>
            </Card>
          </div>
        </div>
        <CreateProjectBriefModal
          isVisible={isCreateProjectBriefModalVisible}
          onClose={toggleCreateProjectBriefModal}
        />
      </div>
    </>
  )
}
