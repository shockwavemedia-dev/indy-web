import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Column, usePagination, useSortBy, useTable } from 'react-table'
import { Page } from '../../interfaces/Page.interface'
import { Ticket } from '../../interfaces/Ticket.interface'
import CalendarIcon from './Icons/Calendar.icon'
import CaretIcon from './Icons/Caret.icon'
import GearIcon from './Icons/Gear.icon'
import SortIcon from './Icons/Sort.icon'

const Table = ({
  dataEndpoint,
  columns,
}: {
  dataEndpoint: string
  columns: Array<Column<Ticket>>
}) => {
  const { data: session } = useSession()
  const [queryPageIndex, setQueryPageIndex] = useState(0)
  const [queryPageSize, setQueryPageSize] = useState(10)

  const getData = async (pageIndex: number, pageSize: number) => {
    const { data } = await axios.get<{
      data: Array<Ticket>
      page: Page
    }>(`${dataEndpoint}?page_number=${pageIndex + 1}&size=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    return data
  }

  const {
    data: pagination,
    isSuccess,
    isFetching,
  } = useQuery(
    ['tickets', queryPageIndex, queryPageSize],
    () => getData(queryPageIndex, queryPageSize),
    { keepPreviousData: true, staleTime: 5000 }
  )

  const memoizedColumns = useMemo(() => columns, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page: rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Ticket>(
    {
      columns: memoizedColumns,
      data: isSuccess && pagination ? pagination.data : [],
      initialState: { pageIndex: queryPageIndex, pageSize: queryPageSize },
      manualPagination: true,
      pageCount: isSuccess && pagination ? pagination.page.lastPage : 0,
      autoResetSortBy: false,
    },
    useSortBy,
    usePagination
  )

  useEffect(() => setQueryPageIndex(pageIndex), [pageIndex])
  useEffect(() => setQueryPageSize(pageSize), [pageSize])

  return (
    <>
      <div className="ml-auto mb-5 flex items-center space-x-2.5">
        <CalendarIcon className="stroke-metallic-silver" />
        <div className="font-urbanist text-sm font-medium text-onyx">Last week</div>
        <CaretIcon className="rotate-180 stroke-waterloo" small />
        <GearIcon className="!ml-5 stroke-waterloo" />
      </div>
      <div className="mb-auto h-full overflow-y-auto">
        <table className="w-full" {...getTableProps()}>
          <thead className="sticky top-0 bg-white">
            {headerGroups.map(({ getHeaderGroupProps, headers }) => (
              // key is already provided by getHeaderGroupProps()
              // eslint-disable-next-line react/jsx-key
              <tr {...getHeaderGroupProps()}>
                {headers.map(
                  ({
                    render,
                    getHeaderProps,
                    getSortByToggleProps,
                    canSort,
                    isSorted,
                    isSortedDesc,
                  }) => (
                    // key is already provided by getHeaderProps()
                    // eslint-disable-next-line react/jsx-key
                    <th
                      className="h-7 text-left align-top"
                      {...getHeaderProps(getSortByToggleProps({ title: undefined }))}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="font-urbanist text-xs font-medium text-metallic-silver">
                          {render('Header')}
                        </div>
                        {canSort && (
                          <div className="flex flex-col space-y-1">
                            <SortIcon
                              className={
                                isSorted && !isSortedDesc ? 'fill-jungle-green' : 'fill-bright-gray'
                              }
                            />
                            <SortIcon
                              className={`rotate-180 ${
                                isSortedDesc ? 'fill-jungle-green' : 'fill-bright-gray'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    </th>
                  )
                )}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                // key is already provided by getRowProps()
                // eslint-disable-next-line react/jsx-key
                <tr
                  className="h-12 border-b border-solid border-b-bright-gray last:border-none"
                  {...row.getRowProps()}
                >
                  {row.cells.map(({ getCellProps, render }) => (
                    // key is already provided by getCellProps()
                    // eslint-disable-next-line react/jsx-key
                    <td {...getCellProps()}>{render('Cell')}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="relative flex min-h-5 items-center justify-center">
        <div className="absolute left-0 font-urbanist text-sm font-medium text-metallic-silver">
          {pageIndex * pageSize + 1}-
          {pageIndex + 1 === pagination?.page.lastPage
            ? pagination.page.total
            : (pageIndex + 1) * pageSize}
          &nbsp;of {pagination?.page.total || '?'} tickets
        </div>
        <button
          onClick={previousPage}
          type="button"
          disabled={!canPreviousPage || isFetching}
          className="group"
        >
          <CaretIcon
            className="-rotate-90 stroke-jungle-green group-disabled:stroke-bright-gray"
            small
          />
        </button>
        <div className="mx-5 flex space-x-4 font-urbanist text-sm font-medium">
          {pageIndex > 1 && (
            <>
              <button
                onClick={() => gotoPage(0)}
                className={`text-metallic-silver ${
                  isFetching
                    ? 'disabled:text-bright-gray'
                    : 'disabled:font-bold disabled:text-jungle-green'
                }`}
                disabled={isFetching}
              >
                1
              </button>
              <div className={isFetching ? 'text-bright-gray' : 'text-metallic-silver'}>...</div>
            </>
          )}
          {pageOptions
            .slice(pageIndex > 0 ? pageIndex - 1 : pageIndex, pageIndex + 5)
            .map((pageNumber, i) => {
              const gotoThisPage = () => {
                gotoPage(pageNumber)
              }

              return (
                <button
                  onClick={gotoThisPage}
                  key={i}
                  disabled={pageNumber === pageIndex || isFetching}
                  className={`text-metallic-silver ${
                    isFetching
                      ? 'disabled:text-bright-gray'
                      : 'disabled:font-bold disabled:text-jungle-green'
                  }`}
                >
                  {pageNumber + 1}
                </button>
              )
            })}
          {/* todo add conditional last page button here */}
        </div>
        <button
          onClick={nextPage}
          type="button"
          disabled={!canNextPage || isFetching}
          className="group"
        >
          <CaretIcon
            className="rotate-90 stroke-jungle-green group-disabled:stroke-bright-gray"
            small
          />
        </button>
        <div className="absolute right-11 font-urbanist text-sm font-medium text-metallic-silver">
          Show
        </div>
        <div className="absolute right-5 font-urbanist text-sm font-semibold text-onyx">10</div>
        <CaretIcon className="absolute right-0 rotate-180 stroke-waterloo" small />
      </div>
    </>
  )
}

export default Table
