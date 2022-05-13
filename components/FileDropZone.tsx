import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import FormErrorMessage from './FormErrorMessage'
import FileIcon from './icons/FileIcon'
import RemoveFileIcon from './icons/RemoveFileIcon'

const FileDropZone = ({
  label,
  name,
  mimeType,
  accept,
  maxSize,
  multiple = false,
  className,
}: {
  label: string
  name: string
  mimeType: string
  accept: Array<string>
  maxSize: number
  multiple?: boolean
  className?: string
}) => {
  const { setFieldValue } = useFormikContext()

  const [files, setFiles] = useState<Array<File>>([])

  const { isDragAccept, getRootProps, getInputProps, open } = useDropzone({
    accept: {
      [mimeType]: accept,
    },
    onDrop: (acceptedFiles: Array<File>) => setFiles([...files, ...acceptedFiles]),
    maxSize: maxSize * 1000000,
    multiple,
    noClick: true,
    noKeyboard: true,
  })

  useEffect(() => {
    setFieldValue(name, multiple ? files : files?.pop())
  }, [files])

  return (
    <div className={className}>
      <div className="mb-2 font-urbanist text-base font-medium text-onyx">{label}</div>
      <div
        {...getRootProps()}
        className={`flex min-h-35 cursor-default items-center justify-center overflow-hidden rounded-xl border border-dashed ${
          isDragAccept ? 'border-jungle-green bg-mint-cream' : 'border-lavender-gray bg-ghost-white'
        }`}
      >
        <div className="cursor absolute flex flex-col items-center">
          <div className="mb-1.5 font-urbanist text-sm font-medium text-onyx">
            Drag {'&'} drop you assets, or{' '}
            <button
              className="font-semibold text-jungle-green underline underline-offset-1"
              onClick={open}
              type="button"
            >
              browse it
            </button>
          </div>
          <div className="text-center font-urbanist text-xs font-normal text-metallic-silver">
            Files Supported:{' '}
            <span className="uppercase">{accept.join(', ').replace(/\./g, '')}</span>
            <br />
            Maximum size: {maxSize} MB
          </div>
        </div>
        <input {...getInputProps()} />
      </div>
      <div className="mt-4 space-y-3">
        {files?.map(({ name }) => {
          const removeFile = () =>
            setFiles(files?.filter(({ name: fileName }) => fileName !== name))

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
              <div className="mr-auto font-urbanist text-xs font-semibold text-onyx">{name}</div>
              <button type="button" className="group" onClick={removeFile}>
                <RemoveFileIcon className="stroke-lavender-gray group-hover:stroke-tart-orange" />
              </button>
            </div>
          )
        })}
      </div>
      <FormErrorMessage name={name} />
    </div>
  )
}

export default FileDropZone
