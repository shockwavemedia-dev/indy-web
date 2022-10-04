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
  createdAt,
}: {
  action: string
  createdBy: string
  fields?: SocialMediaActivityFields
  createdAt: Date
}) => {
  const fieldObject = fields && Object.entries(fields)

  const modified =
    fieldObject &&
    fieldObject.map(([field, values]) => {
      if (field === 'post' && typeof values.old === 'string' && typeof values.new === 'string') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Post Topic</div>
            <TitleValue title="New" className="mb-1">
              {values.new}
            </TitleValue>
            <TitleValue title="Old">{values.old}</TitleValue>
          </div>
        )
      } else if (
        field === 'status' &&
        typeof values.old === 'string' &&
        typeof values.new === 'string'
      ) {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Status</div>
            <TitleValue title="New" className="mb-1">
              <SocialMediaStatus value={values.new} />
            </TitleValue>
            <TitleValue title="Old">
              <SocialMediaStatus value={values.old} />
            </TitleValue>
          </div>
        )
      } else if (field === 'channels') {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Channels</div>
            <TitleValue title="New" className="mb-1">
              <div className="flex flex-wrap gap-1">
                {Array.isArray(values.new) &&
                  values.new.map((channel) => (
                    <div key={`${channel}-channel`} className="flex flex-wrap gap-1">
                      <SocialMediaChannels value={channel} />
                    </div>
                  ))}
              </div>
            </TitleValue>
            <TitleValue title="Old" className="mb-1">
              <div className="flex flex-wrap gap-1">
                {Array.isArray(values.old) &&
                  values.old.map((channel) => (
                    <div key={`${channel}-channel`} className="flex flex-wrap gap-1">
                      <SocialMediaChannels value={channel} />
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
              {values.new instanceof Date && format(values.new, 'MM/dd/yyyy h:mmaaa')}
            </TitleValue>
            <TitleValue title="Old">
              {values.old instanceof Date && format(values.old, 'MM/dd/yyyy h:mmaaa')}
            </TitleValue>
          </div>
        )
      } else if (
        field === 'attachment' &&
        typeof values.old === 'string' &&
        action === 'Removed an attachment'
      ) {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Removed an attachment</div>
            <div className=" text-xs font-medium text-metallic-silver">{values.old}</div>
          </div>
        )
      } else if (
        field === 'copy' &&
        typeof values.old === 'string' &&
        typeof values.new === 'string'
      ) {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Copy</div>
            <TitleValue title="New" className="mb-1">
              {values.new}
            </TitleValue>
            <TitleValue title="Old">{values.old}</TitleValue>
          </div>
        )
      } else if (
        field === 'notes' &&
        typeof values.old === 'string' &&
        typeof values.new === 'string'
      ) {
        return (
          <div key={field} className="flex flex-col">
            <div className="mb-2 mt-2 text-sm font-semibold text-onyx">Notes</div>
            <TitleValue title="New" className="mb-1">
              {values.new}
            </TitleValue>
            <TitleValue title="Old">{values.old}</TitleValue>
          </div>
        )
      }
    })

  return (
    <>
      <div className="mb-3 space-y-3 rounded-xl bg-white px-6 py-5 shadow">
        <div>
          <div className="flex items-center">
            <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
            <div className="ml-3 text-xs font-semibold text-onyx">{createdBy}</div>
            <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
            <div className=" text-xs font-medium text-lavender-gray">
              {format(createdAt, 'yy MMMM dd h:mmaaa')}
            </div>
          </div>
          {action === 'Uploaded an attachment.' ? (
            <div className=" text-sm font-medium text-onyx">{action}</div>
          ) : (
            modified
          )}
        </div>
      </div>
    </>
  )
}

export const SocialMediaStatus = ({ value }: { value: string }) => {
  return (
    <>
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'To Do':
              return 'bg-light-red-crimson'
            case 'In Progress':
              return 'bg-light-golden-rod'
            case 'To Approve':
              return 'bg-light-navy'
            case 'Approved':
              return 'bg-light-forest-green'
            case 'Scheduled':
              return 'bg-light-orchid'
            case 'Client Created Draft':
              return 'bg-light-red-crimson'
            default:
              return 'bg-light-orange'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'To Do':
              return 'text-red-crimson'
            case 'In Progress':
              return 'text-golden-rod'
            case 'To Approve':
              return 'text-navy'
            case 'Approved':
              return 'text-forest-green'
            case 'Scheduled':
              return 'text-orchid'
            case 'Client Created Draft':
              return 'text-red-crimson'
            default:
              return 'text-halloween-orange'
          }
        })()}
        value={value}
      />
    </>
  )
}

export const SocialMediaChannels = ({ value }: { value: string }) => {
  return (
    <>
      <Pill
        twBackgroundColor={(() => {
          switch (value) {
            case 'Story':
              return 'bg-light-red-crimson'
            case 'Facebook':
              return 'bg-light-golden-rod'
            case 'Instagram':
              return 'bg-light-navy'
            case 'Twitter':
              return 'bg-light-forest-green'
            case 'Linkedin':
              return 'bg-light-orchid'
            default:
              return 'bg-bright-gray'
          }
        })()}
        twTextColor={(() => {
          switch (value) {
            case 'Story':
              return 'text-red-crimson'
            case 'Facebook':
              return 'text-golden-rod'
            case 'Instagram':
              return 'text-navy'
            case 'Twitter':
              return 'text-forest-green'
            case 'Linkedin':
              return 'text-orchid'
            default:
              return 'text-onyx'
          }
        })()}
        value={value}
      />
    </>
  )
}
