import { ApexOptions } from 'apexcharts'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { MarketingPlanner } from '../../types/MarketingPlanner.type'
import { Card } from '../Card'
import { DateInputNoFormik } from '../DateInputNoFormik'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const MarketingPlannerChart = () => {
  const { replace } = useRouter()
  const { data: session } = useSession()

  const { data: marketingPlanners, isLoading: marketingPlannersIsLoading } = useQuery(
    'marketingPlanner',
    async () => {
      const { data } = await axios.get<Array<MarketingPlanner>>(
        `/v1/clients/${session?.user.userType.client.id}/marketing-planners`
      )

      return data
    }
  )

  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  const series = useMemo((): ApexAxisChartSeries => {
    if (marketingPlanners) {
      return [
        {
          data: marketingPlanners
            .filter(
              ({ startDate, endDate }) =>
                (startDate.getTime() <= fromDate.getTime() &&
                  fromDate.getTime() <= endDate.getTime()) ||
                (fromDate.getTime() <= startDate.getTime() &&
                  endDate.getTime() <= toDate.getTime()) ||
                (startDate.getTime() <= toDate.getTime() && toDate.getTime() <= endDate.getTime())
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
  }, [marketingPlanners, fromDate, toDate])

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
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
        autoSelected: 'pan',
      },
      fontFamily: 'Urbanist',
      events: {
        dataPointSelection: (_e, _chart, options) =>
          replace(
            `/marketing-planner/${JSON.parse(options.w.globals.labels[options.dataPointIndex]).id}`
          ),
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
      <div className="absolute top-4 right-6 z-10 flex w-102 items-center space-x-2">
        <DateInputNoFormik
          placeholder="Month Year"
          views={['month', 'year']}
          label="From"
          value={fromDate}
          onChange={(date) => {
            date && setFromDate(date)
          }}
        />
        <DateInputNoFormik
          placeholder="Month Year"
          views={['month', 'year']}
          label="To"
          value={toDate}
          onChange={(date) => {
            date && setToDate(date)
          }}
        />
      </div>
      <div className="relative h-175 pt-4">
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
