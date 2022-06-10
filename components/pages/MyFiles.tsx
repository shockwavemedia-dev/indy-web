import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { Card } from '../../components/Card'
import { Client } from '../../types/Client.type'
import { Files } from '../../types/Files.type'
import { Page } from '../../types/Page.type'
import { SelectOption } from '../../types/SelectOption.type'
import { FileButton } from '../FileButton'
import { UserIcon } from '../icons/UserIcon'
import { SelectNoFormik } from '../SelectNoFormik'

export const MyFiles = () => {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
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
  const selectClient = (newValue: SingleValue<SelectOption<number>>) =>
    setClientId(newValue?.value || -1)

  return (
    <>
      <Head>
        <title>Indy - My Files</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">My Files</div>
      <div className="mx-auto w-full max-w-7xl space-y-6">
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
                      className="h-20 w-20"
                      key={year}
                      onClick={openYearFolder}
                      name={year}
                    />
                  )
                })
              ) : month !== '' ? (
                <>
                  <FileButton
                    className="h-20 w-20"
                    key={month}
                    onClick={goUpToMonthsFolder}
                    name="../"
                  />
                  {files[year][month].map(({ id, originalFilename, url }) => (
                    <FileButton className="h-20 w-20" key={id} href={url} name={originalFilename} />
                  ))}
                </>
              ) : (
                <>
                  <FileButton
                    className="h-20 w-20"
                    key={month}
                    onClick={goUpToYearsFolder}
                    name="../"
                  />
                  {Object.keys(files[year]).map((month) => {
                    const openMonthFolder = () => setMonth(month)

                    return (
                      <FileButton
                        className="h-20 w-20"
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
                <div className="font-urbanist text-base text-metallic-silver">No files found.</div>
              </div>
            )
          ) : (
            <div className="grid h-20 w-full place-items-center">
              <div className="font-urbanist text-base text-metallic-silver">Select a Client.</div>
            </div>
          )}
          {/* {clientId && filesSucess && !Array.isArray(files) ? (
            year === '' ? (
              Object.keys(files).map((year) => {
                const openYearFolder = () => setYear(year)

                return <File key={year} onClick={openYearFolder} name={year} />
              })
            ) : month !== '' ? (
              <>
                <File key={month} onClick={goUpToMonthsFolder} name="../" />
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
            )
          ) : (
            <div className="grid h-20 w-full place-items-center">
              <div className="font-urbanist text-base text-metallic-silver">No files found.</div>
            </div>
          )} */}
        </Card>
      </div>
    </>
  )
}
