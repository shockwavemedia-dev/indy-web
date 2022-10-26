import FullCalendar from '@fullcalendar/react'
import axios from 'axios'
import { format, getMonth, getYear } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { SocialMediaCalendar } from '../types/SocialMediaCalendar.type'
import { Card } from './Card'

import DayGrid from '@fullcalendar/daygrid'

export const SocialMediaCalendarList = () => {
  const { data: session } = useSession()

  const [date, setDate] = useState(new Date())

  const { data } = useQuery(
    ['socialmedia-calendar', { year: date.getFullYear(), month: date.getMonth() + 1 }],
    async () => {
      const { data } = await axios.get<SocialMediaCalendar>(
        `/v1/clients/${session!.user.userType.client.id}/social-media-calendar?`,
        {
          params: {
            year: getYear(date),
            month: getMonth(date) + 1,
          },
        }
      )

      return data
    },
    {
      enabled: !!session,
    }
  )

  return (
    <Card>
      <div className="absolute top-6 left-6 text-3xl font-semibold text-onyx">
        {format(date, 'LLLL')} {date.getFullYear()}
      </div>
      <FullCalendar
        plugins={[DayGrid]}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        fixedWeekCount={false}
        headerToolbar={{
          left: '',
          right: 'prev,next',
        }}
        datesSet={({ start }) => setDate(start)}
        events={
          data
            ? Object.entries(data).flatMap(([date, socialMedia]) =>
                socialMedia.map(({ post, id, postDate }) => ({
                  date,
                  title: postDate && format(postDate, 'h:mmaaa') + ' ' + post,
                  url: `social-media/${id}`,
                }))
              )
            : []
        }
        //eventClick={}
        eventDisplay="list-item"
        dayHeaderClassNames="text-white bg-onyx !font-normal uppercase"
        dayCellClassNames={({ isToday }) => (isToday ? '!bg-halloween-orange/25' : '')}
        eventBorderColor="#F25D23"
        eventClassNames="hover:!bg-transparent text-onyx"
      />
    </Card>
  )
}
