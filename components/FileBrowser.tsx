import axios from 'axios'
import { isAfter } from 'date-fns'
import { useEffect, useState } from 'react'
import { focusManager, useQuery } from 'react-query'
import { Files } from '../types/Files.type'
import { Folder } from '../types/Folder.type'
import { Card } from './Card'
import { FileButton } from './FileButton'
import { AddFileIcon } from './icons/AddFileIcon'
import { AddFolderIcon } from './icons/AddFolderIcon'
import { CaretIcon } from './icons/CaretIcon'
import { SortIcon2 } from './icons/SortIcon2'
import { CreateFolderModal, useCreateFolderModalStore } from './modals/CreateFolderModal'
import { DeleteFolderModal } from './modals/DeleteFolderModal'
import { FileDisplayModal, useFileDisplayModalStore } from './modals/FileDisplayModal'
import { RenameFolderModal } from './modals/RenameFolderModal'
import { UploadFileModal, useUploadFileModal } from './modals/UploadFileModal'
import { TextInputNoFormik } from './TextInputNoFormik'

export const FileBrowser = ({ clientId }: { clientId: number }) => {
  const { toggleModal: toggleCreateFolderModal } = useCreateFolderModalStore()
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
  const [search, setSearch] = useState('')

  const { data, isSuccess, isRefetching } = useQuery(
    ['clientFiles', clientId],
    async () => {
      const { data } = await axios.get<Folder>(`/v2/clients/${clientId}/files`)

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

  const [sortByCreated, setSortByCreated] = useState<'newest' | 'oldest'>('newest')
  const [sortByAlpha, setSortByAlpha] = useState<'a-z' | 'z-a'>('a-z')

  useEffect(() => {
    focusManager.setFocused(false)
    return () => focusManager.setFocused(undefined)
  }, [])

  return (
    <>
      <Card className={`h-fit flex-1 transition-opacity${isRefetching ? ' opacity-50' : ''}`}>
        <div className="absolute left-6 top-4 flex items-center space-x-3 [&>button]:flex [&>button]:space-x-2 [&>button]:rounded-md [&>button]:text-sm [&>button]:font-medium [&>button]:text-onyx  [&>button:hover]:text-halloween-orange">
          <button
            type="button"
            onClick={() => setSortByAlpha(sortByAlpha === 'a-z' ? 'z-a' : 'a-z')}
          >
            <SortIcon2 className="stroke-current" />
            <span>Sort ({sortByAlpha === 'a-z' ? 'A-Z' : 'Z-A'})</span>
          </button>
          {filesStack.length === 2 && (
            <button
              type="button"
              onClick={() => setSortByCreated(sortByCreated === 'newest' ? 'oldest' : 'newest')}
            >
              <SortIcon2 className="stroke-current" />
              <span>
                Order By: {sortByCreated === 'newest' ? 'Newest - Oldest' : 'Oldest - Newest'}
              </span>
            </button>
          )}
          <TextInputNoFormik
            name="subject"
            placeholder="Search"
            type="text"
            className="w-80"
            onChange={setSearch}
            value={search}
            slim
          />
        </div>
        {clientId !== -1 && filesStack.length === 0 && (
          <div className="absolute right-6 flex space-x-3">
            <button
              className="flex space-x-2"
              onClick={(e) => {
                e.stopPropagation()
                toggleCreateFolderModal(clientId)
              }}
            >
              <AddFolderIcon className="stroke-halloween-orange" />
              <div className=" text-sm font-semibold text-halloween-orange">Create Folder</div>
            </button>
            {foldersStack.length > 0 && (
              <button
                className="flex space-x-2"
                onClick={() => toggleUploadFileModal(currentFolderFilesAndId.id)}
              >
                <AddFileIcon className="stroke-halloween-orange" />
                <div className=" text-sm font-semibold text-halloween-orange">Upload File</div>
              </button>
            )}
          </div>
        )}
        <div className="mt-10 flex max-h-155 flex-wrap gap-4 overflow-y-auto">
          {clientId !== -1 ? (
            isSuccess && (
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
                  Object.entries(currentFolderFilesAndId.folder)
                    .filter(([_, { name }]) =>
                      search ? name.toLowerCase().includes(search.toLowerCase()) : true
                    )
                    .sort(([k], [k2]) => (sortByAlpha === 'a-z' ? 1 : -1) * k.localeCompare(k2))
                    .map(([k, { id, name }]) => (
                      <FileButton
                        disabled={isRefetching}
                        key={name}
                        name={name}
                        onClick={() => {
                          setFoldersStack([...foldersStack, k])
                          setSearch('')
                        }}
                        folderId={id}
                        folderName={name}
                        allowRename
                      />
                    ))}
                {currentFolderFilesAndId && filesStack.length === 0
                  ? Object.keys(currentFolderFilesAndId.files)
                      .filter((year) => (search ? year.includes(search) : true))
                      .map((year) => (
                        <FileButton
                          disabled={isRefetching}
                          key={year}
                          name={year}
                          onClick={() => {
                            setFilesStack([...filesStack, year])
                            setSearch('')
                          }}
                        />
                      ))
                  : filesStack.length === 1
                  ? Object.keys(currentFolderFilesAndId.files[filesStack[0]])
                      .filter((month) => (search ? month.includes(search) : true))
                      .map((month) => (
                        <FileButton
                          disabled={isRefetching}
                          key={month}
                          name={`${month.charAt(0).toUpperCase()}${month.slice(1)}`}
                          onClick={() => {
                            setFilesStack([...filesStack, month])
                            setSearch('')
                          }}
                        />
                      ))
                  : filesStack.length === 2 &&
                    Object.values(currentFolderFilesAndId.files[filesStack[0]][filesStack[1]])
                      .filter(({ originalFilename }) =>
                        search
                          ? originalFilename.toLowerCase().includes(search.toLowerCase())
                          : true
                      )
                      .sort(
                        (
                          { createdAt: d1, originalFilename: f1 },
                          { createdAt: d2, originalFilename: f2 }
                        ) =>
                          (sortByCreated === 'newest' ? 1 : -1) *
                          (isAfter(d1!, d2!) ? 1 : -1) *
                          (sortByAlpha === 'a-z' ? 1 : -1) *
                          f1.localeCompare(f2)
                      )
                      .map(
                        (
                          {
                            fileName,
                            originalFilename,
                            thumbnailUrl,
                            clientTicketFile,
                            url,
                            fileType,
                            id,
                          },
                          i
                        ) =>
                          clientTicketFile ? (
                            <FileButton
                              disabled={isRefetching}
                              key={`${fileName}-${i}`}
                              name={originalFilename}
                              thumbnailUrl={thumbnailUrl}
                              href={`/ticket/file/${clientTicketFile.id}`}
                              fileStatus={clientTicketFile.status}
                              file
                            />
                          ) : (
                            <FileButton
                              disabled={isRefetching}
                              key={`${fileName}-${i}`}
                              name={originalFilename}
                              thumbnailUrl={thumbnailUrl}
                              onClick={() =>
                                toggleShowPhotoVideoFileModal(
                                  url,
                                  fileType,
                                  originalFilename,
                                  id,
                                  clientId
                                )
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
        parentFolderId={currentFolderFilesAndId.id !== -1 ? currentFolderFilesAndId.id : undefined}
      />
      <RenameFolderModal />
      <DeleteFolderModal />
      <FileDisplayModal />
      <UploadFileModal />
    </>
  )
}
