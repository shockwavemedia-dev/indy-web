import { Field } from 'formik'

const FileInput = ({ label, name }: { label: string; name: string }) => {
  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] font-inter text-[12px] font-normal text-mineshaft">{label}</label>
      <div className="flex h-[140px] items-center justify-center overflow-hidden rounded-[4px] border border-dashed border-manatee bg-gallery">
        <Field
          {...{
            className: 'w-full h-full opacity-0',
          }}
          type="file"
          name={name}
          id={name}
          multiple
        />
        <div className="absolute font-inter text-[14px] font-semibold text-mineshaft">
          Drag &amp; drop you assets, or{' '}
          <button
            className=" font-medium text-stormgray underline underline-offset-1"
            name="Browse Assets"
          >
            browse it
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileInput
