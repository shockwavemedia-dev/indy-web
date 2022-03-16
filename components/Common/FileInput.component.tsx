import { DragEvent, useRef, useState } from 'react'

const FileInput = ({ label, name }: { label: string; name: string }) => {
  const [fileInputAreaBg, setFileInputAreaBg] = useState('bg-wildsand')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileBrowsing = () => {
    fileInputRef.current?.click()
  }

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (fileInputRef.current) {
      fileInputRef.current.files = e.dataTransfer.files
    }
  }

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFileInputAreaBg('bg-gallery')
  }

  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFileInputAreaBg('bg-wildsand')
  }

  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] font-inter text-[12px] font-normal text-mineshaft">{label}</label>
      <div
        className={`flex h-[140px] items-center justify-center overflow-hidden rounded-[4px] border border-dashed border-manatee ${fileInputAreaBg}`}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleFileDrop}
      >
        <div className="cursor absolute flex flex-col items-center">
          <div className="mb-[8px] font-inter text-[14px] font-semibold text-mineshaft">
            Drag &amp; drop you assets, or{' '}
            <button
              className=" font-medium text-stormgray underline underline-offset-1"
              name="Browse Assets"
              onClick={handleFileBrowsing}
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
      </div>
      <input className="hidden" type="file" name={name} id={name} multiple ref={fileInputRef} />
    </div>
  )
}

export default FileInput
