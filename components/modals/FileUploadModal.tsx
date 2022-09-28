import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { SocialMedia } from '../../types/SocialMedia.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileBrowserSelect } from '../FileBrowserSelect'
import { FileIcon } from '../icons/FileIcon'
import { RemoveFileIcon } from '../icons/RemoveFileIcon'
import { UploadFileIcon } from '../icons/UploadFileIcon'
import { UploadFromMyFilesIcon } from '../icons/UploadFromMyFilesIcon'
import { Modal } from '../Modal'

export const useFileUploadModal = create(
  combine(
    {
      visible: false,
      files: [] as Array<File>,
      myFiles: [] as Array<{
        id: number
        name: string
      }>,
      socialMedia: undefined as SocialMedia | undefined,
    },
    (set, get) => ({
      setVisible: (visible: boolean, socialMedia?: SocialMedia) => set({ visible, socialMedia }),
      addFiles: (
        files:
          | Array<File>
          | {
              id: number
              name: string
            }
      ) =>
        Array.isArray(files)
          ? set({ files: [...get().files, ...files] })
          : set({ myFiles: [...get().myFiles, files] }),
      removeFile: (fileName: string | number) =>
        set({
          files: get().files.filter(({ name }) => name !== fileName),
          myFiles: get().myFiles.filter(({ name }) => name !== fileName),
        }),
      resetFiles: () => set({ files: [], myFiles: [] }),
    })
  )
)

export const FileUploadModal = () => {
  const [tab, setTab] = useState<'upload' | 'my-files'>('upload')

  const { data: session } = useSession()
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()
  const { socialMedia, setVisible } = useFileUploadModal()
  //const setVisible = useFileUploadModal((state) => state.setVisible)
  const visible = useFileUploadModal((state) => state.visible)
  const addFiles = useFileUploadModal((state) => state.addFiles)
  const removeFile = useFileUploadModal((state) => state.removeFile)
  const resetFiles = useFileUploadModal((state) => state.resetFiles)
  const files = useFileUploadModal((state) => state.files)
  const myFiles = useFileUploadModal((state) => state.myFiles)
  const { isDragAccept, getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles: Array<File>) => addFiles(acceptedFiles),
    multiple: true,
    noClick: true,
    noKeyboard: true,
  })

  useEffect(() => {
    if (!visible) resetFiles()
  }, [visible])

  if (!session) return null

  const addAttachment = async () => {
    const attachments = files
    const fileIds = myFiles && myFiles.length > 0 ? myFiles.map((s) => s.id) : []

    const initialValues = {
      post: socialMedia?.post,
      attachments: socialMedia?.attachments,
      copy: socialMedia?.copy,
      status: socialMedia?.status,
      channels: socialMedia?.channels,
      notes: socialMedia?.notes,
      postDate: socialMedia?.postDate,
    }

    try {
      const { status } = await axios.post(
        `/v1/social-media/${socialMedia?.id}`,
        objectWithFileToFormData({ ...initialValues, attachments, fileIds, _method: 'PUT' })
      )
      if (status === 200) {
        queryClient.invalidateQueries(['socialMedia', socialMedia?.id])
        queryClient.invalidateQueries(['socialMedias'])
        setVisible(false)
        showToast({
          type: 'success',
          message: `Attachment(s) successfully uploaded!
          `,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! :dizzy_face:',
      })
    }
  }

  return (
    <>
      {socialMedia && (
        <Modal
          title="Add Attachment(s)"
          onClose={() => setVisible(false)}
          className="max-h-[45rem] w-175"
        >
          <div className="flex w-full  pb-3.5 [&>button]:flex [&>button]:w-32 [&>button]:items-center [&>button]:justify-center [&>button]:space-x-2 [&>button>div]:font-semibold">
            <button onClick={() => setTab('upload')}>
              <UploadFileIcon
                className={tab === 'upload' ? 'stroke-halloween-orange' : 'stroke-lavender-gray'}
              />
              <div className={tab === 'upload' ? undefined : 'text-lavender-gray'}>Upload</div>
            </button>
            <button onClick={() => setTab('my-files')}>
              <UploadFromMyFilesIcon
                className={tab === 'my-files' ? 'stroke-halloween-orange' : 'stroke-lavender-gray'}
              />
              <div className={tab === 'my-files' ? undefined : 'text-lavender-gray'}>My Files</div>
            </button>
          </div>
          <div
            className={`-mt-0.5 mr-auto mb-5 h-0.75  w-32 rounded bg-halloween-orange transition-all${
              tab === 'my-files' ? ' ml-32' : ''
            }`}
          />
          {tab === 'upload' ? (
            <div
              {...getRootProps()}
              className={`relative flex h-40 w-full cursor-default items-center justify-center overflow-hidden rounded-xl border border-dashed ${
                isDragAccept
                  ? 'border-halloween-orange bg-mint-cream'
                  : 'border-lavender-gray bg-ghost-white'
              }`}
            >
              <div className="cursor absolute flex flex-col items-center">
                <div className="mb-1.5 text-sm font-medium text-onyx">
                  Drag {'&'} drop you assets, or{' '}
                  <button
                    className="font-semibold text-halloween-orange underline underline-offset-1"
                    onClick={open}
                    type="button"
                  >
                    browse it
                  </button>
                </div>
              </div>
              <input {...getInputProps()} />
            </div>
          ) : (
            <FileBrowserSelect clientId={socialMedia.clientId || -1} />
          )}
          {[...files, ...myFiles].length > 0 && (
            <div className="mt-4 max-h-44 w-full space-y-3 overflow-y-auto">
              {[...files, ...myFiles].map(({ name }) => {
                return (
                  <div
                    key={`${name}`}
                    className="flex h-14 items-center rounded-xl border border-bright-gray px-6"
                  >
                    <div className="relative mr-3.5">
                      <FileIcon />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 font-varela-round text-tiny uppercase text-white">
                        {name.split(/\./).pop()}
                      </div>
                    </div>
                    <div className="mr-auto text-xs font-semibold text-onyx">{name}</div>
                    <button type="button" className="group" onClick={() => removeFile(name)}>
                      <RemoveFileIcon className="stroke-lavender-gray group-hover:stroke-tart-orange" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
          <Button
            type="button"
            onClick={addAttachment}
            ariaLabel="Done"
            className="mt-8 ml-auto w-fit flex-none px-8"
          >
            Upload
          </Button>
        </Modal>
      )}
    </>
  )
}
