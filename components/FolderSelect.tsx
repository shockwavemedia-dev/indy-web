import axios from 'axios'
import { FormikValues, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Files } from '../types/Files.type'
import { Folder } from '../types/Folder.type'
import { FileButton } from './FileButton'

export const FolderSelect = ({ clientId }: { clientId: number }) => {
  const { setFieldValue } = useFormikContext<FormikValues>()
  const [foldersStack, setFoldersStack] = useState<
    Array<{
      key: string
      name: string
      id: number
    }>
  >([])
  const [yearFolder, setYearFolder] = useState('')
  const [monthFolder, setMonthFolder] = useState('')

  const { data: folder, isSuccess: filesSucess } = useQuery(['files', clientId], async () => {
    const { data } = await axios.get<Folder>(`/v2/clients/${clientId}/files`)

    return data
  })

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
    setFieldValue(
      'folderId',
      foldersStack.length > 0 ? foldersStack[foldersStack.length - 1].id : ''
    )
  }, [foldersStack])

  return (
    <div>
      {foldersStack.length > 0 && (
        <div className="mb-2 text-base font-medium text-onyx">
          Current Folder:{' '}
          <span className="text-sm font-semibold text-halloween-orange">
            {foldersStack[foldersStack.length - 1].name}
          </span>
        </div>
      )}
      <div className="mx-auto flex max-h-74 max-w-113 flex-wrap gap-4 overflow-y-auto">
        {filesSucess && !Array.isArray(folder) ? (
          <>
            {foldersStack.length > 0 && <FileButton name="../" onClick={goUpOneFolder} />}
            {Object.entries(
              foldersStack.reduce((currentFolder, { key }) => {
                if (
                  ((x: Folder | Files): x is Folder => {
                    const keys = Object.keys(x)

                    if (keys.length > 0) {
                      return !!x[keys[0]].name
                    }

                    return false
                  })(currentFolder)
                ) {
                  const folders = currentFolder[key].folders

                  if (folders && !Array.isArray(folders[0])) {
                    return folders.reduce((folders, folder) => ({ ...folders, ...folder }), {})
                  } else {
                    return currentFolder[key].files
                  }
                } else {
                  return currentFolder
                }
              }, folder as Folder | Files)
            ).map(([k, v]) => {
              const enterFolder = () =>
                setFoldersStack([
                  ...foldersStack,
                  {
                    id: v.id,
                    name: v.name,
                    key: k,
                  },
                ])

              if (v.name) {
                return <FileButton key={v.name} name={v.name} onClick={enterFolder} />
              }
            })}
          </>
        ) : (
          <div className="flex-1 text-center text-xs text-metallic-silver">No files found.</div>
        )}
      </div>
    </div>
  )
}
