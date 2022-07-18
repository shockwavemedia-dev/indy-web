import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { File } from '../types/File.type'
import { Files } from '../types/Files.type'
import { Folder } from '../types/Folder.type'
import { Card } from './Card'
import { FileButton } from './FileButton'

export const FileBrowser = ({ clientId }: { clientId: number }) => {
  const [foldersStack, setFoldersStack] = useState<Array<string>>([])
  const [folderIdStack, setfolderIdStack] = useState<Array<number>>([])
  const [yearFolder, setYearFolder] = useState('')
  const [monthFolder, setMonthFolder] = useState('')

  const { data: folder, isSuccess: filesSucess } = useQuery(
    ['files', clientId],
    async () => {
      const { data } = await axios.get<Folder>(`/v2/clients/${clientId}/files`)

      return data
    },
    {
      enabled: clientId !== -1,
    }
  )

  const goUpOneFolder = () =>
    monthFolder
      ? setMonthFolder('')
      : yearFolder
      ? setYearFolder('')
      : setFoldersStack([...foldersStack].slice(0, -1))

  useEffect(() => {
    setFoldersStack([])
    setYearFolder('')
    setMonthFolder('')
  }, [clientId])

  return (
    <Card className="h-fit flex-1">
      <div className="flex flex-wrap gap-4">
        {clientId !== -1 ? (
          filesSucess && !Array.isArray(folder) ? (
            <>
              {foldersStack.length > 0 && <FileButton name="../" onClick={goUpOneFolder} />}
              {Object.entries(
                foldersStack.reduce((currentFolder, folderName) => {
                  if (
                    ((x: Folder | Files): x is Folder => {
                      const keys = Object.keys(x)

                      if (keys.length > 0) {
                        return !!x[keys[0]].name
                      }

                      return false
                    })(currentFolder)
                  ) {
                    const folders = currentFolder[folderName].folders

                    if (folders && !Array.isArray(folders[0])) {
                      return folders.reduce((folders, folder) => ({ ...folders, ...folder }), {})
                    } else {
                      return currentFolder[folderName].files
                    }
                  } else {
                    return currentFolder
                  }
                }, folder as Folder | Files)
              ).map(([k, v]) => {
                const enterFolder = () => {
                  setFoldersStack([...foldersStack, k])
                  setfolderIdStack([...folderIdStack, v.id])
                }

                if (v.name) {
                  return <FileButton key={v.name} name={v.name} onClick={enterFolder} />
                }

                if (monthFolder && ((x: unknown): x is Record<string, Array<File>> => !!x)(v)) {
                  return v[monthFolder].map(
                    ({ originalFilename, fileName, thumbnailUrl, url, clientTicketFile }) => (
                      <FileButton
                        key={fileName}
                        name={originalFilename}
                        thumbnailUrl={thumbnailUrl}
                        href={clientTicketFile ? `/ticket/file/${clientTicketFile.id}` : url}
                        fileStatus={clientTicketFile ? clientTicketFile.status : ''}
                        openNewTab={!clientTicketFile}
                      />
                    )
                  )
                } else if (yearFolder === k) {
                  return Object.keys(v).map((month) => {
                    const enterMonthFolder = () => setMonthFolder(month)

                    return (
                      <FileButton
                        key={month}
                        name={`${month.charAt(0).toUpperCase()}${month.slice(1)}`}
                        onClick={enterMonthFolder}
                      />
                    )
                  })
                }

                const enterYearFolder = () => setYearFolder(k)

                return (
                  <FileButton
                    key={k}
                    name={`${k.charAt(0).toUpperCase()}${k.slice(1)}`}
                    onClick={enterYearFolder}
                  />
                )
              })}
            </>
          ) : (
            <div className="flex-1 text-center text-xs text-metallic-silver">No files found.</div>
          )
        ) : (
          <div className="flex-1 text-center text-xs text-metallic-silver">Select a Client.</div>
        )}
      </div>
    </Card>
  )
}
