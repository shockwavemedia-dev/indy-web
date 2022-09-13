import { format } from 'date-fns'
import Image from 'next/image'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { SocialMediaActivityFields } from '../types/SocialMediaActivityFields.type'
import { Pill } from './Pill'
import { TitleValue } from './TitleValue'

export const SocialMediaActivityCard = ({
  action,
  createdBy,
  fields,
}: {
  action: string
  createdBy: string
  fields?: SocialMediaActivityFields
}) => {
  const fieldObject = fields && Object.entries(fields)

  const modified =
    fieldObject &&
    fieldObject.map(([field, { old }]) => {
      console.log(field)
      if (field === 'post' && typeof old === 'string') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Post Topic</div>
            <TitleValue title="New" className="mb-1">
              {old}
            </TitleValue>
            <TitleValue title="Old">{old}</TitleValue>
          </div>
        )
      } else if (field === 'status' && typeof old === 'string') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Status</div>
            <TitleValue title="New" className="mb-1">
              {old}
            </TitleValue>
            <TitleValue title="Old">{old}</TitleValue>
          </div>
        )
      } else if (field === 'channels') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Channels</div>
            <TitleValue title="New" className="mb-1">
              <div className="flex flex-wrap gap-1">
                {Array.isArray(old) &&
                  old.map((channel) => (
                    <div key={`${channel}-channel`} className="flex flex-wrap gap-1">
                      <Pill
                        twBackgroundColor="bg-honeydew"
                        twTextColor="text-jungle-green"
                        value={channel}
                      />
                    </div>
                  ))}
              </div>
            </TitleValue>
            <TitleValue title="Old" className="mb-1">
              <div className="flex flex-wrap gap-1">
                {Array.isArray(old) &&
                  old.map((channel) => (
                    <div key={`${channel}-channel`} className="flex flex-wrap gap-1">
                      <Pill
                        twBackgroundColor="bg-honeydew"
                        twTextColor="text-jungle-green"
                        value={channel}
                      />
                    </div>
                  ))}
              </div>
            </TitleValue>
          </div>
        )
      } else if (field === 'postDate') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Post Date</div>
            <TitleValue title="New" className="mb-1">
              {old instanceof Date && format(old, 'MM/dd/yyyy h:mmaaa')}
            </TitleValue>
            <TitleValue title="Old">
              {old instanceof Date && format(old, 'MM/dd/yyyy h:mmaaa')}
            </TitleValue>
          </div>
        )
      } else if (
        field === 'attachment' &&
        typeof old === 'string' &&
        action === 'Removed an attachment'
      ) {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Removed an attachment</div>
            <div className=" text-xs font-medium text-metallic-silver">{old}</div>
          </div>
        )
      } else if (field === 'copy' && typeof old === 'string') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Copy</div>
            <TitleValue title="New" className="mb-1">
              {old}
            </TitleValue>
            <TitleValue title="Old">{old}</TitleValue>
          </div>
        )
      } else if (field === 'notes' && typeof old === 'string') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Notes</div>
            <TitleValue title="New" className="mb-1">
              {old}
            </TitleValue>
            <TitleValue title="Old">{old}</TitleValue>
          </div>
        )
      }
    })

  return (
    <>
      <div className="mb-2 space-y-3 rounded-xl bg-white px-6 py-5 shadow">
        <div>
          <div className="flex items-center">
            <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
            <div className="ml-3 text-sm font-semibold text-onyx">{createdBy}</div>
            <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
            <div className=" text-xs font-medium text-lavender-gray">{'22 Sep13'}</div>
          </div>
          {action === 'Uploaded a file.' ? (
            <div className=" text-sm font-medium text-onyx">{action}</div>
          ) : (
            modified
          )}
        </div>
      </div>
    </>
  )
}
