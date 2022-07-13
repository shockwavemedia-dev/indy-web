import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Files } from '../../../types/Files.type'
import { FileButton } from '../../FileButton'
import { Notifications } from '../../Notifications'
import { RetainerInclusions } from '../../RetainerInclusions'

export const ClientMyFiles = () => {
  const { setHeader } = usePanelLayoutStore()
  const { data: session } = useSession()
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [department, setDepartment] = useState('')

  const { data: files, isSuccess } = useQuery('files', async () => {
    const { data } = await axios.get<Files>(`/v1/clients/${session?.user.userType.clientId}/files`)

    return data
  })

  const goUpToYearsFolder = () => setYear('')
  const goUpToMonthsFolder = () => setMonth('')
  const goUpToDepartmentsFolder = () => setDepartment('')

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
      <div className="mx-auto w-full max-w-8xl">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card className="flex h-fit flex-1 flex-wrap gap-4">
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
              department !== '' ? (
                <>
                  <FileButton
                    className="h-35 w-35"
                    key={department}
                    onClick={goUpToDepartmentsFolder}
                    name="../"
                  />
                  {files[year][month][department].map(
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
                    key={department}
                    onClick={goUpToMonthsFolder}
                    name="../"
                  />
                  {Object.keys(files[year][month]).map((department) => {
                    const openDepartmentFolder = () => setDepartment(department)
                    const departmentname = department
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (s) => s.toUpperCase())

                    return (
                      <FileButton
                        className="h-35 w-35"
                        key={department}
                        onClick={openDepartmentFolder}
                        name={departmentname}
                        textClassName="text-sm text-center"
                        showAction
                      />
                    )
                  })}
                </>
              )
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
                      showAction
                    />
                  )
                })}
              </>
            )}
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}
