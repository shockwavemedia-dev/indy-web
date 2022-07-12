import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { Card } from '../../components/Card'
import { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { Client } from '../../types/Client.type'
import { Files } from '../../types/Files.type'
import { Page } from '../../types/Page.type'
import { SelectOption } from '../../types/SelectOption.type'
import { FileButton } from '../FileButton'
import { UserIcon } from '../icons/UserIcon'
import { Notifications } from '../Notifications'
import { SelectNoFormik } from '../SelectNoFormik'
export const MyFiles = () => {
  const { setHeader } = usePanelLayoutStore()
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [department, setDepartment] = useState('')
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

  const { data: files, isSuccess: filesSucess } = useQuery(
    ['files', clientId],
    async () => {
      const { data } = await axios.get<Files>(`/v1/clients/${clientId}/files`)

      return data
    },
    {
      enabled: clientId !== -1,
    }
  )

  const goUpToYearsFolder = () => setYear('')
  const goUpToMonthsFolder = () => setMonth('')
  const goUpToDepartmentsFolder = () => setDepartment('')
  const selectClient = (newValue: SingleValue<SelectOption<number>>) =>
    setClientId(newValue?.value || -1)

  useEffect(() => {
    setHeader('My Files')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - My Files</title>
      </Head>
      <div className="mx-auto flex w-full max-w-8xl gap-6 lg:flex-col">
        <div className="flex-1 space-y-6">
          <SelectNoFormik
            Icon={UserIcon}
            onChange={selectClient}
            className="max-w-xs"
            placeholder="Select Client"
            options={
              !!clients
                ? clients.map(({ name, id }) => ({
                    label: name,
                    value: id,
                  }))
                : []
            }
          />
          <Card className="flex flex-wrap gap-4">
            {clientId !== -1 ? (
              !Array.isArray(files) && filesSucess ? (
                year === '' ? (
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
                          const fileUrl = clientTicketFile
                            ? `/ticket/file/${clientTicketFile.id}`
                            : url

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
                            textClassName="text-xs"
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
                        />
                      )
                    })}
                  </>
                )
              ) : (
                <div className="grid h-20 w-full place-items-center">
                  <div className="font-urbanist text-base text-metallic-silver">
                    No files found.
                  </div>
                </div>
              )
            ) : (
              <div className="grid h-20 w-full place-items-center">
                <div className="font-urbanist text-base text-metallic-silver">Select a Client.</div>
              </div>
            )}
          </Card>
        </div>
        <Notifications className="w-86 lg:w-1/2" />
      </div>
    </>
  )
}
