import Dropzone from 'react-dropzone'

const FileInput = ({
  label,
  name,
  setFieldValue,
}: {
  label: string
  name: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  const handleDrop = (files: Array<File>) => setFieldValue(name, files)

  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] font-inter text-[12px] font-normal text-mineshaft">{label}</label>
      <Dropzone onDrop={handleDrop} noClick noKeyboard>
        {({ getRootProps, getInputProps, open, isDragActive }) => (
          <div
            {...getRootProps()}
            className={`flex h-[140px] cursor-auto items-center justify-center overflow-hidden rounded-[4px] border border-dashed border-manatee ${
              isDragActive ? 'bg-gallery' : 'bg-wildsand'
            }`}
          >
            <div className="cursor absolute flex flex-col items-center">
              <div className="mb-[8px] font-inter text-[14px] font-semibold text-mineshaft">
                Drag &amp; drop you assets, or{' '}
                <button
                  className=" font-medium text-stormgray underline underline-offset-1"
                  name="Browse Assets"
                  onClick={open}
                  type="button"
                >
                  browse it
                </button>
              </div>
              <div className="text-center font-inter text-[12px] font-normal text-frenchgray">
                File Supported: MP3, MP4, AVI, MOV, FLV. <br />
                Maximum size: 250 MB
              </div>
            </div>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </div>
  )
}

export default FileInput
