import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Files } from '../types/Files.type'
import { Folder } from '../types/Folder.type'
import { Card } from './Card'
import { FileButton } from './FileButton'
import { AddFileIcon } from './icons/AddFileIcon'
import { CaretIcon } from './icons/CaretIcon'
import { FileDisplayModal, useFileDisplayModalStore } from './modals/FileDisplayModal'
import { UploadFileModal, useUploadFileModal } from './modals/UploadFileModal'

export const AnalyticsFileBrowser = ({ clientId }: { clientId: number }) => {
  const { toggleUploadFileModal } = useUploadFileModal()
  const { toggleShowPhotoVideoFileModal } = useFileDisplayModalStore()

  const [foldersStack, setFoldersStack] = useState<
    Array<{
      key: string
      id: number
      files: Files
    }>
  >([])
  const [yearFolder, setYearFolder] = useState('')
  const [monthFolder, setMonthFolder] = useState('')

  const { data: folder, isSuccess: filesSuccess } = useQuery(
    ['clientFiles', clientId],
    async () => {
      const { data } = await axios.get<Folder>(`/v1/clients/${clientId}/analytics-folder`)

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

  useEffect(() => {
    if (folder && foldersStack.length > 0) {
      const newFolderStack: Array<{
        key: string
        id: number
        files: Files
      }> = []

      let currentFolder: Folder = {}

      foldersStack.forEach(({ key }, i) => {
        if (i === 0) {
          currentFolder = folder[key].folders.reduce(
            (folders, folder) => ({ ...folders, ...folder }),
            {}
          )
          newFolderStack.push({
            key,
            id: folder[key].id,
            files: folder[key].files,
          })
        } else {
          currentFolder = currentFolder[key].folders.reduce(
            (folders, folder) => ({ ...folders, ...folder }),
            {}
          )
          newFolderStack.push({
            key,
            id: currentFolder[key].id,
            files: currentFolder[key].files,
          })
        }
      })

      setFoldersStack(newFolderStack)
    }
  }, [folder])

  return (
    <>
      <Card className="h-fit flex-1">
        {clientId !== -1 && !yearFolder && foldersStack.length > 0 && (
          <div className="absolute top-6 right-6 flex space-x-5">
            <button
              className="flex space-x-2"
              onClick={() => toggleUploadFileModal(foldersStack[foldersStack.length - 1].id)}
            >
              <AddFileIcon className="stroke-halloween-orange" />
              <div className=" text-sm font-semibold text-halloween-orange">Upload File</div>
            </button>
          </div>
        )}
        <div className="flex max-h-155 flex-wrap gap-4 overflow-y-auto pt-10">
          {clientId !== -1 ? (
            filesSuccess && (
              <>
                {foldersStack.length > 0 && (
                  <FileButton
                    name="Go back"
                    Icon={<CaretIcon className="-rotate-90 stroke-halloween-orange" />}
                    onClick={goUpOneFolder}
                  />
                )}
                {!yearFolder &&
                  Object.entries(
                    foldersStack.reduce((currentFolder, { key }) => {
                      const folders = currentFolder[key].folders

                      if (folders && !Array.isArray(folders[0])) {
                        return folders.reduce((folders, folder) => ({ ...folders, ...folder }), {})
                      }

                      return {}
                    }, folder)
                  ).map(([k, { id, name, files }]) => {
                    const enterFolder = () =>
                      setFoldersStack([
                        ...foldersStack,
                        {
                          key: k,
                          id: id,
                          files,
                        },
                      ])

                    return (
                      <FileButton
                        key={name}
                        name={name}
                        onClick={enterFolder}
                        folderId={id}
                        folderName={name}
                      />
                    )
                  })}
                {!yearFolder &&
                  foldersStack.length > 0 &&
                  Object.keys(foldersStack[foldersStack.length - 1].files).map((year) => {
                    const enterYearFolder = () => setYearFolder(year)

                    return <FileButton key={year} name={year} onClick={enterYearFolder} />
                  })}
                {yearFolder &&
                  !monthFolder &&
                  Object.keys(foldersStack[foldersStack.length - 1].files[yearFolder]).map(
                    (month) => {
                      const enterMonthFolder = () => setMonthFolder(month)

                      return (
                        <FileButton
                          key={month}
                          name={`${month.charAt(0).toUpperCase()}${month.slice(1)}`}
                          onClick={enterMonthFolder}
                        />
                      )
                    }
                  )}
                {monthFolder &&
                  foldersStack[foldersStack.length - 1].files[yearFolder][monthFolder].map(
                    ({ fileName, originalFilename, thumbnailUrl, url, fileType }) => (
                      <FileButton
                        key={fileName}
                        name={originalFilename}
                        thumbnailUrl={thumbnailUrl}
                        onClick={() =>
                          toggleShowPhotoVideoFileModal(url, fileType, originalFilename)
                        }
                        file
                      />
                    )
                  )}
              </>
            )
          ) : (
            <div className="flex-1 text-center text-xs text-metallic-silver">Select a Client.</div>
          )}
        </div>
      </Card>
      <FileDisplayModal />
      <UploadFileModal />
    </>
  )
}
