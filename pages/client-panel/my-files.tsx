import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import Card from '../../components/Card'
import File from '../../components/File'
import { ClientRoutes } from '../../constants/routes/ClientRoutes'
import PanelLayout from '../../layouts/PanelLayout'
import { Files } from '../../types/Files.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const MyFiles: NextPageWithLayout = () => {
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
      <div className="mx-auto w-full max-w-7xl">
        <Card className="flex flex-wrap gap-4">
          {year === '' ? (
            Object.keys(files).map((year) => {
              const openYearFolder = () => setYear(year)

              return <File key={year} onClick={openYearFolder} name={year} />
            })
          ) : month !== '' ? (
            <>
              <File key={month} onClick={goUpToMonthsFolder} name="../" />
              {files['202']}
              {files[year][month].map(({ id, originalFilename, url }) => (
                <File key={id} href={url} name={originalFilename} />
              ))}
            </>
          ) : (
            <>
              <File key={month} onClick={goUpToYearsFolder} name="../" />
              {Object.keys(files[year]).map((month) => {
                const openMonthFolder = () => setMonth(month)

                return <File key={month} onClick={openMonthFolder} name={month} />
              })}
            </>
          )}
        </Card>
      </div>
    </>
  )
}

MyFiles.getLayout = (page: ReactElement) => <PanelLayout routes={ClientRoutes}>{page}</PanelLayout>

export default MyFiles
