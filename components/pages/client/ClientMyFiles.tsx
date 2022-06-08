import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { Files } from '../../../types/Files.type'
import { CountCard } from '../../CountCard'
import { FileButton } from '../../FileButton'
import { GalleryIcon } from '../../icons/GalleryIcon'
import { MenuBoardIcon } from '../../icons/MenuBoardIcon'
import { VideoIcon } from '../../icons/VideoIcon'

export const ClientMyFiles = () => {
  const { data: session } = useSession()
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')

  const { data: files, isSuccess } = useQuery('files', async () => {
    const { data } = await axios.get<Files>(`/v1/clients/${session?.user.userType.clientId}/files`)

    return data
  })

  const goUpToYearsFolder = () => setYear('')
  const goUpToMonthsFolder = () => setMonth('')

  if (!isSuccess) {
    return null
  }

  return (
    <>
      <Head>
        <title>Daily Press - My Files</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">My Files</div>
      <hr className="mb-6 border-t-bright-gray" />
      <div className="mx-auto h-4/5 w-full max-w-8xl">
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
                    />
                  )
                })}
              </>
            )}
          </Card>
          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex space-x-3">
              <CountCard
                Icon={<VideoIcon className="stroke-white" />}
                value={5}
                description="Animations Remaining"
                className="w-36"
                twBackgroundColor="bg-vivid-red-tangelo"
                twIconBackgroundColor="bg-dark-pastel-red"
              />
              <CountCard
                Icon={<GalleryIcon className="stroke-white" />}
                value={2}
                description="Photoshoots Remaining"
                twBackgroundColor="bg-jungle-green"
                twIconBackgroundColor="bg-illuminating-emerald"
              />
            </div>
            <div className="mb-6 flex space-x-3">
              <CountCard
                Icon={<MenuBoardIcon className="stroke-white" />}
                value={3}
                description="Graphics Remaining"
                twBackgroundColor="bg-bleu-de-france"
                twIconBackgroundColor="bg-bright-navy-blue"
              />
              <CountCard
                Icon={<VideoIcon className="stroke-white" />}
                value={1}
                description="Videoshoots Remaining"
                className="w-36"
                twBackgroundColor="bg-purple-x11"
                twIconBackgroundColor="bg-dark-orchid"
              />
            </div>
            <Card title="Notifications" className="h-full w-full opacity-50">
              <div></div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
