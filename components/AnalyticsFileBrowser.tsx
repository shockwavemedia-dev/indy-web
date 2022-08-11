import axios from 'axios'
import { useEffect, useState } from 'react'
import { focusManager, useQuery } from 'react-query'
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
  const [currentFolderFilesAndId, setCurrentFolderFilesAndId] = useState<{
    folder: Folder
    files: Files
    id: number
  }>({
    folder: {},
    files: {},
    id: -1,
  })
  const [foldersStack, setFoldersStack] = useState<Array<string>>([])
  const [filesStack, setFilesStack] = useState<Array<string>>([])

  const { data, isSuccess, isRefetching } = useQuery(
    ['clientFiles', clientId],
    async () => {
      const { data } = await axios.get<Folder>(`/v1/clients/${clientId}/analytics-folder`)

      return data
    },
    {
      enabled: clientId !== -1,
    }
  )

  useEffect(() => {
    setFilesStack([])
    setFoldersStack([])
  }, [clientId])

  useEffect(() => {
    if (data) {
      setCurrentFolderFilesAndId(
        foldersStack.reduce(
          (folderAndFiles, currentFolder) => {
            if (!Array.isArray(folderAndFiles.folder[currentFolder].files))
              folderAndFiles.files = folderAndFiles.folder[currentFolder].files
            else folderAndFiles.files = {}

            folderAndFiles.id = folderAndFiles.folder[currentFolder]
              ? folderAndFiles.folder[currentFolder].id
              : -1

            if (
              folderAndFiles.folder[currentFolder].folders &&
              folderAndFiles.folder[currentFolder].folders.length > 0
            )
              folderAndFiles.folder = folderAndFiles.folder[currentFolder].folders.reduce(
                (folders, folder) => ({ ...folders, ...folder }),
                {}
              )
            else folderAndFiles.folder = {}

            return folderAndFiles
          },
          {
            folder: data,
            files: {} as Files,
            id: -1,
          }
        )
      )
    }
  }, [foldersStack, data])

  useEffect(() => {
    focusManager.setFocused(false)
    return () => focusManager.setFocused(undefined)
  }, [])

  return (
    <>
      <Card className={`h-fit flex-1 transition-opacity${isRefetching ? ' opacity-50' : ''}`}>
        {clientId !== -1 && filesStack.length === 0 && foldersStack.length > 0 && (
          <div className="absolute top-6 right-6 flex space-x-5">
            <button
              className="flex space-x-2"
              onClick={() => toggleUploadFileModal(currentFolderFilesAndId.id)}
            >
              <AddFileIcon className="stroke-halloween-orange" />
              <div className=" text-sm font-semibold text-halloween-orange">Upload File</div>
            </button>
          </div>
        )}
        <div className="mt-10 flex max-h-155 flex-wrap gap-4 overflow-y-auto">
          {clientId !== -1 && isSuccess && (
            <>
              {foldersStack.length > 0 && (
                <FileButton
                  disabled={isRefetching}
                  name="Go back"
                  Icon={<CaretIcon className="-rotate-90 stroke-halloween-orange" />}
                  onClick={() => {
                    if (filesStack.length === 0) setFoldersStack([...foldersStack].slice(0, -1))
                    else setFilesStack([...filesStack].slice(0, -1))
                  }}
                />
              )}
              {currentFolderFilesAndId &&
                filesStack.length === 0 &&
                Object.entries(currentFolderFilesAndId.folder).map(([k, { id, name }]) => (
                  <FileButton
                    disabled={isRefetching}
                    key={name}
                    name={name}
                    onClick={() => setFoldersStack([...foldersStack, k])}
                    folderId={id}
                    folderName={name}
                  />
                ))}
              {currentFolderFilesAndId && filesStack.length === 0
                ? Object.keys(currentFolderFilesAndId.files).map((year) => (
                    <FileButton
                      disabled={isRefetching}
                      key={year}
                      name={year}
                      onClick={() => setFilesStack([...filesStack, year])}
                    />
                  ))
                : filesStack.length === 1
                ? Object.keys(currentFolderFilesAndId.files[filesStack[0]]).map((month) => (
                    <FileButton
                      disabled={isRefetching}
                      key={month}
                      name={`${month.charAt(0).toUpperCase()}${month.slice(1)}`}
                      onClick={() => setFilesStack([...filesStack, month])}
                    />
                  ))
                : filesStack.length === 2 &&
                  Object.values(currentFolderFilesAndId.files[filesStack[0]][filesStack[1]]).map(
                    ({
                      fileName,
                      originalFilename,
                      thumbnailUrl,
                      clientTicketFile,
                      url,
                      fileType,
                    }) =>
                      clientTicketFile ? (
                        <FileButton
                          disabled={isRefetching}
                          key={fileName}
                          name={originalFilename}
                          thumbnailUrl={thumbnailUrl}
                          href={`/ticket/file/${clientTicketFile.id}`}
                          fileStatus={clientTicketFile.status}
                          file
                        />
                      ) : (
                        <FileButton
                          disabled={isRefetching}
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
          )}
        </div>
      </Card>
      <FileDisplayModal />
      <UploadFileModal />
    </>
  )
}
