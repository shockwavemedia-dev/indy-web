import { ApexOptions } from 'apexcharts'
import axios from 'axios'
import { getMonth } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { MarketingPlanner } from '../../types/MarketingPlanner.type'
import { SelectOption } from '../../types/SelectOption.type'
import { Card } from '../Card'
import { CalendarIcon } from '../icons/CalendarIcon'
import { SelectNoFormik } from '../SelectNoFormik'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const monthsOption: Array<SelectOption<number>> = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  { label: 'March', value: 2 },
  { label: 'April', value: 3 },
  { label: 'May', value: 4 },
  { label: 'June', value: 5 },
  { label: 'July', value: 6 },
  { label: 'August', value: 7 },
  { label: 'September', value: 8 },
  { label: 'October', value: 9 },
  { label: 'November', value: 10 },
  { label: 'December', value: 11 },
]

export const MarketingPlannerChart = () => {
  const { replace } = useRouter()

  const { data: marketingPlanners, isLoading: marketingPlannersIsLoading } = useQuery(
    'marketingPlanner',
    async () => {
      const { data } = await axios.get<Array<MarketingPlanner>>(`/v1/clients/1/marketing-planners`)

      return data
    }
  )

  const [month, setMonth] = useState(
    monthsOption.find(({ value }) => value === getMonth(new Date()))
  )

  const series = useMemo((): ApexAxisChartSeries => {
    if (marketingPlanners) {
      return [
        {
          data: marketingPlanners
            .filter(
              ({ startDate, endDate }) =>
                getMonth(startDate) === month?.value || getMonth(endDate) === month?.value
            )
            .map(({ id, eventName, startDate, endDate }) => ({
              x: JSON.stringify({
                id,
                eventName,
              }),
              y: [startDate.getTime(), endDate.getTime()],
            })),
        },
      ]
    }

    return []
  }, [marketingPlanners, month])

  const options: ApexOptions = {
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '90%',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (_, options) =>
        JSON.parse(options.w.globals.labels[options.dataPointIndex]).eventName,
      style: {
        fontWeight: 500,
        fontSize: '12px',
      },
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        offsetX: -28,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    chart: {
      toolbar: {
        offsetY: -33,
        tools: {
          download: false,
          zoomin: false,
          zoomout: false,
          reset: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
          zoom: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.19995 11.7H14.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.7 14.2V9.19995" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <path d="M22 22L20 20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          `,
          pan: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.28 10.45L21 6.72998L17.28 3.01001" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6.72998H21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.71997 13.55L3 17.2701L6.71997 20.9901" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 17.27H3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
        },
        autoSelected: 'pan',
      },
      fontFamily: 'Urbanist',
      events: {
        dataPointSelection: (_e, _chart, options) =>
          replace(
            `/marketing-planner/${JSON.parse(options.w.globals.labels[options.dataPointIndex]).id}`
          ),

        dataPointMouseEnter: (e) => {
          e.path[0].style.cursor = 'pointer'
        },
      },
    },
    grid: {
      borderColor: '#E8E8EF',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    annotations: {
      xaxis: [
        {
          x: new Date().getTime(),
          borderColor: '#F25D23',
          strokeDashArray: 0,
        },
      ],
    },
  }

  return (
    <Card title="Marketing Plan Calendars" className="flex-1">
      <div className="absolute top-6 right-32 z-10">
        <SelectNoFormik
          Icon={CalendarIcon}
          options={monthsOption}
          value={month}
          onChange={(newValue: SingleValue<SelectOption<number>>) => {
            if (newValue) setMonth(newValue)
          }}
        />
      </div>
      <div className="relative h-175">
        {series && series[0] && series[0].data.length > 0 ? (
          <ReactApexChart type="rangeBar" options={options} series={series} height="100%" />
        ) : (
          !marketingPlannersIsLoading && (
            <div className="grid h-full w-full place-items-center bg-white text-lavender-gray">
              No marketing plans found.
            </div>
          )
        )}
      </div>
    </Card>
  )
}
