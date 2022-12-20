import { useCalendar } from '@h6s/calendar'
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import axios from 'axios'
import { format, getDate, getYear, isSameDay, isSameMonth, isToday } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useQuery } from 'react-query'
import { useSocialMediaStore } from '../store/SocialMediaStore'
import { SocialMediaCalendar } from '../types/SocialMediaCalendar.type'
import { Button } from './Button'
import { Card } from './Card'
import { ArrowIcon } from './icons/ArrowIcon'
import { BoostIcon } from './icons/BoostIcon'
import { BoostOffIcon } from './icons/BoostOffIcon'
import { DollarIcon } from './icons/DollarIcon'
import { PlusIcon } from './icons/PlusIcon'
import { FacebookIcon } from './icons/social-medias/FacebookIcon'
import { InstagramIcon } from './icons/social-medias/InstagramIcon'
import { LinkedInIcon } from './icons/social-medias/LinkedIn'
import { TikTokIcon } from './icons/social-medias/TikTokIcon'
import { TwitterIcon } from './icons/social-medias/TwitterIcon'
import { EditSocialMediaBoostModal } from './modals/EditSocialMediaBoostModal'
import { EditSocialMediaModal, useEditSocialMediaModal } from './modals/EditSocialMediaModal'
import { Pill } from './Pill'

export const SocialMediaCalendarList = ({ clientId }: { clientId?: number }) => {
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
        `/v1/clients/${clientId ?? session!.user.userType.client.id}/social-media-calendar`,
        {
          params: {
            year,
            month: month + 1,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }
      )

      return data
    },
    {
      enabled: !!session,
    }
  )
  const toggleEditSocialMediaModal = useEditSocialMediaModal(
    (state) => state.toggleEditSocialMediaModal
  )

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top-end" className="ml-auto" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 260,
      backgroundColor: 'white',
      fontSize: theme.typography.pxToRem(11),
    },
  }))

  const { setPostDate, toggleCreateSocialMediaModal } = useSocialMediaStore()

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
                    <div
                      key={key}
                      className="group relative min-h-[9.375rem] bg-white p-2.5 font-medium"
                    >
                      <Button
                        type="button"
                        ariaLabel="Add Post"
                        onClick={() => {
                          toggleCreateSocialMediaModal()
                          setPostDate(value)
                        }}
                        className="invisible absolute right-3 h-max w-max p-2 group-hover:visible"
                      >
                        <PlusIcon className="stroke-white" />
                      </Button>
                      <div className="mb-4 flex space-x-1 font-semibold">
                        <div>{getDate(value)}</div>
                        {isToday(value) && (
                          <div className="rounded bg-halloween-orange px-1.5 py-1 text-xs text-white">
                            Today
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {(() => {
                          const socialMedias = Object.values(data)
                            .flatMap((s) => s)
                            .filter(({ postDate }) => isSameDay(new Date(postDate!), value))

                          return socialMedias
                            ? socialMedias.map((socialMedia) => (
                                <button
                                  key={`todo-${socialMedia.id}`}
                                  type="button"
                                  onClick={() => toggleEditSocialMediaModal(socialMedia)}
                                  className="w-full rounded outline outline-1 outline-slate-300 transition-all hover:-translate-y-2.5 hover:shadow-md"
                                >
                                  <div className="flex items-center justify-between border-b border-b-slate-300 bg-slate-100 p-3">
                                    <div className="flex flex-wrap gap-1">
                                      {socialMedia.channels?.map(
                                        (c, i) =>
                                          ({
                                            Facebook: (
                                              <FacebookIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            'Facebook Event': (
                                              <FacebookIcon key={`icon-${socialMedia.id}-${i}`} />
                                            ),
                                            'Facebook Post': (
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
                                      socialMedia.attachments[1]?.thumbnailUrl && (
                                        <div className="relative aspect-square h-10">
                                          <Image
                                            src={socialMedia.attachments[1].thumbnailUrl}
                                            alt={socialMedia.attachments[1].name}
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
                                  <div className="flex items-center justify-center p-3">
                                    {socialMedia.boostedChannels && (
                                      <HtmlTooltip
                                        className=""
                                        title={
                                          <React.Fragment>
                                            <Card className="">
                                              <ul className="list-square">
                                                <p className=" mb-2 text-lg font-bold text-halloween-orange">
                                                  Boosted Channels
                                                </p>
                                                {socialMedia.boostedChannels?.map(
                                                  (boostedChannel) => (
                                                    <li
                                                      key={boostedChannel.name}
                                                      className="mb-3 text-halloween-orange"
                                                    >
                                                      {boostedChannel.name}
                                                      <div className="mt-2 flex space-x-5">
                                                        <DollarIcon className="-mt-1 stroke-jungle-green transition-colors hover:stroke-halloween-orange"></DollarIcon>

                                                        <p className="-ml-9 text-xs text-jungle-green">
                                                          {Number(
                                                            boostedChannel.quantity
                                                          ).toLocaleString('en')}
                                                        </p>
                                                      </div>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </Card>
                                          </React.Fragment>
                                        }
                                      >
                                        <button>
                                          <BoostIcon className="mr-16 h-10 stroke-jungle-green transition-colors hover:stroke-halloween-orange" />
                                        </button>
                                      </HtmlTooltip>
                                    )}
                                    {!socialMedia.boostedChannels && (
                                      <Tooltip
                                        title="Not Boosted"
                                        placement="top"
                                        className="ml-2 h-10"
                                      >
                                        <div>
                                          <BoostOffIcon className=" stroke-gray-600 transition-colors hover:stroke-halloween-orange" />
                                        </div>
                                      </Tooltip>
                                    )}
                                    <EditSocialMediaBoostModal />
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
      <EditSocialMediaModal />
    </>
  )
}
