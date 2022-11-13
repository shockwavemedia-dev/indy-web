import { useCalendar } from '@h6s/calendar'
import axios from 'axios'
import { format, getDate, getYear, isSameMonth } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { SocialMedia } from '../types/SocialMedia.type'
import { SocialMediaCalendar } from '../types/SocialMediaCalendar.type'
import { Button } from './Button'
import { Card } from './Card'
import { ArrowIcon } from './icons/ArrowIcon'
import { FacebookIcon } from './icons/social-medias/FacebookIcon'
import { InstagramIcon } from './icons/social-medias/InstagramIcon'
import { LinkedInIcon } from './icons/social-medias/LinkedIn'
import { TikTokIcon } from './icons/social-medias/TikTokIcon'
import { TwitterIcon } from './icons/social-medias/TwitterIcon'
import { EditSocialMediaCalendarModal } from './modals/EditSocialMediaCalendarModal'
import { Pill } from './Pill'

export const SocialMediaCalendarList = () => {
  const { data: session } = useSession()
  const {
    headers,
    body,
    cursorDate,
    year,
    month,
    navigation: { toPrev, toNext },
  } = useCalendar()

  const { data } = useQuery(
    ['social-media-calendar', { year, month: month + 1 }],
    async () => {
      const { data } = await axios.get<SocialMediaCalendar>(
        `/v1/clients/${session!.user.userType.client.id}/social-media-calendar`,
        {
          params: {
            year,
            month: month + 1,
          },
        }
      )

      return data
    },
    {
      enabled: !!session,
    }
  )

  const [socialMedia, setSocialMedia] = useState<SocialMedia | undefined>(undefined)

  return (
    <>
      <svg className="sr-only">
        <defs>
          <pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            width="5"
            height="5"
            patternTransform="rotate(135)"
          >
            <line
              className="stroke-current text-slate-300/70"
              x1="0"
              y="0"
              x2="0"
              y2="5"
              strokeWidth="2"
            />
          </pattern>
        </defs>
      </svg>
      <Card>
        <div className="mb-5 flex justify-between">
          <div className="text-lg font-bold">
            {format(cursorDate, 'MMMM')} {getYear(cursorDate)}
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={toPrev}
              ariaLabel="Previous Month"
              type="button"
              className="w-fit rounded-md px-5"
            >
              <ArrowIcon className="-rotate-180 stroke-current" />
            </Button>
            <Button
              onClick={toNext}
              ariaLabel="Next Month"
              type="button"
              className="w-fit rounded-md px-5"
            >
              <ArrowIcon className="stroke-current" />
            </Button>
          </div>
        </div>
        {data && (
          <>
            <div className="mb-3 grid grid-cols-7">
              {headers.weekDays.map(({ key, value }) => (
                <div key={key} className="text-center font-bold">
                  {format(value, 'E')}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px rounded bg-slate-300 outline outline-1 outline-slate-300">
              {body.value
                .flatMap(({ value }) => value)
                .map(({ key, value }) =>
                  isSameMonth(value, cursorDate) ? (
                    <div key={key} className="min-h-[9.375rem] bg-white p-2.5 font-medium">
                      <div className="mb-4 font-semibold">{getDate(value)}</div>
                      <div className="space-y-3">
                        {(() => {
                          const socialMedias = data[format(value, 'yyyyMMdd')]

                          return socialMedias
                            ? socialMedias.map((socialMedia) => (
                                <button
                                  key={`todo-${socialMedia.id}`}
                                  type="button"
                                  onClick={() => setSocialMedia(socialMedia)}
                                  className="w-full rounded outline outline-1 outline-slate-300 transition-all hover:-translate-y-2.5 hover:shadow-md"
                                >
                                  <div className="flex items-center justify-between border-b border-b-slate-300 bg-slate-100 p-3">
                                    <div className="flex space-x-1">
                                      {socialMedia.channels?.map(
                                        (c, i) =>
                                          ({
                                            Facebook: (
                                              <FacebookIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            'Facebook Event': (
                                              <FacebookIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            Instagram: (
                                              <InstagramIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            Linkedin: (
                                              <LinkedInIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            'Tik Tok': (
                                              <TikTokIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            Twitter: (
                                              <TwitterIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            Story: null,
                                            'Video Reels': null,
                                          }[c])
                                      )}
                                    </div>
                                    <div className="text-sm">
                                      {socialMedia.postDate &&
                                        format(socialMedia.postDate, 'h:mmaaa')}
                                    </div>
                                  </div>
                                  <div className="mb-3 flex justify-between p-3">
                                    <div className="text-sm line-clamp-2">{socialMedia.post}</div>
                                    {socialMedia.attachments.length > 0 &&
                                      socialMedia.attachments[0].thumbnailUrl && (
                                        <div className="relative aspect-square h-10">
                                          <Image
                                            src={socialMedia.attachments[0].thumbnailUrl}
                                            alt={socialMedia.attachments[0].name}
                                            layout="fill"
                                            className="rounded"
                                          />
                                        </div>
                                      )}
                                  </div>
                                  <div className="flex p-3">
                                    <Pill
                                      twBackgroundColor={(() => {
                                        switch (socialMedia.status) {
                                          case 'To Do':
                                            return 'bg-light-red-crimson'
                                          case 'In Progress':
                                            return 'bg-light-golden-rod'
                                          case 'To Approve':
                                            return 'bg-light-navy'
                                          case 'Approved':
                                            return 'bg-light-forest-green'
                                          case 'Scheduled':
                                            return 'bg-light-forest-green'
                                          case 'Client Created Draft':
                                            return 'bg-light-red-crimson'
                                        }
                                      })()}
                                      twTextColor={(() => {
                                        switch (socialMedia.status) {
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
                                        }
                                      })()}
                                      value={socialMedia.status}
                                    />
                                  </div>
                                </button>
                              ))
                            : null
                        })()}
                      </div>
                    </div>
                  ) : (
                    <div key={key} className="bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <rect width="100%" height="100%" fill="url(#stripes)" />
                      </svg>
                    </div>
                  )
                )}
            </div>
          </>
        )}
      </Card>
      <EditSocialMediaCalendarModal
        onClose={() => setSocialMedia(undefined)}
        socialMedia={socialMedia}
      />
    </>
  )
}
