import { useFormikContext } from 'formik'
import Dropzone from 'react-dropzone'
import FormErrorMessage from './FormErrorMessage'

const FileInput = ({
  label,
  name,
  multiple = false,
  className,
}: {
  label: string
  name: string
  multiple?: boolean
  className?: string
}) => {
  const { setFieldValue } = useFormikContext()

  const dropFiles = (files: Array<File>) => setFieldValue(name, multiple ? files : files.pop())

  return (
    <Dropzone onDrop={dropFiles} multiple={multiple} accept="video/*" noClick noKeyboard>
      {({ getRootProps, getInputProps, open, isDragActive }) => (
        <div className={className}>
          <div className="mb-2 font-urbanist text-base font-medium text-onyx">{label}</div>
          <div
            {...getRootProps()}
            className={`flex min-h-35 cursor-auto items-center justify-center overflow-hidden rounded-xl border border-dashed border-lavender-gray ${
              isDragActive ? 'bg-honeydew' : 'bg-ghost-white'
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
              <div className="text-center font-urbanist text-xs font-medium text-metallic-silver">
                Files Supported: MP3, MP4, AVI, MOV, FLV
                <br />
                Maximum size: 250 MB
              </div>
            </div>
            <input {...getInputProps()} />
          </div>
          <FormErrorMessage name={name} />
        </div>
      )}
    </Dropzone>
  )
}

export default FileInput
