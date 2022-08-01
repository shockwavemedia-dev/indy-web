import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Files } from '../types/Files.type'
import { Folder } from '../types/Folder.type'
import { Card } from './Card'
import { FileButton } from './FileButton'
import { CaretIcon } from './icons/CaretIcon'
import { PlusIcon } from './icons/PlusIcon'
import { CreateFolderModal, useCreateFolderModalStore } from './modals/CreateFolderModal'
import { DeleteFolderModal } from './modals/DeleteFolderModal'
import { FileDisplayModal, useFileDisplayModalStore } from './modals/FileDisplayModal'
import { RenameFolderModal } from './modals/RenameFolderModal'

export const FileBrowser = ({ clientId }: { clientId: number }) => {
  const { toggleModal: toggleCreateFolderModal } = useCreateFolderModalStore()
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
    <>
      <Card className="h-fit flex-1">
        {!yearFolder && (
          <button className="absolute right-6 flex space-x-2" onClick={toggleCreateFolderModal}>
            <PlusIcon className="stroke-halloween-orange" />
            <div className=" text-sm font-semibold text-halloween-orange">Create Folder</div>
          </button>
        )}
        <div className="flex max-h-155 flex-wrap gap-4 overflow-y-auto pt-5">
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
                        allowRename
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
                          key={fileName}
                          name={originalFilename}
                          thumbnailUrl={thumbnailUrl}
                          href={`/ticket/file/${clientTicketFile.id}`}
                          fileStatus={clientTicketFile.status}
                          file
                        />
                      ) : (
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
      <CreateFolderModal
        parentFolderId={
          foldersStack.length > 0 ? foldersStack[foldersStack.length - 1].id : undefined
        }
      />
      <RenameFolderModal />
      <DeleteFolderModal />
      <FileDisplayModal />
    </>
  )
}
