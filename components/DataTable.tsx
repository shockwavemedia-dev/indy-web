import axios from 'axios'
import { ReactNode, useEffect, useId, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Column, Row, TableState, usePagination, useSortBy, useTable } from 'react-table'
import { Page } from '../types/Page.type'
import { Dropdown } from './Dropdown'
import { CaretIcon } from './icons/CaretIcon'
import { FilterIcon } from './icons/FilterIcon'
import { SortIcon } from './icons/SortIcon'

export const DataTable = <T extends Record<string, unknown>>({
  tableQueryKey,
  dataEndpoint,
  dataParams,
  columns,
  ofString,
  tableActions,
  rowOnClick,
  initialState,
  controlledSort = false,
}: {
  tableQueryKey: Array<string | number | Record<string, unknown>>
  dataEndpoint: string
  dataParams?: Record<string, string | number | boolean>
  columns: Array<Column<T>>
  ofString: string
  tableActions?: ReactNode
  rowOnClick?: (row: Row<T>) => void
  initialState?: Partial<TableState<T>>
  controlledSort?: boolean
}) => {
  const [queryPageIndex, setQueryPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState<{
    sortBy: string
    sortOrder: 'asc' | 'desc'
  }>()

  const {
    data: pagination,
    isSuccess,
    isFetching,
    isLoading,
  } = useQuery(
    [...tableQueryKey, queryPageIndex, pageSize, sort],
    async () => {
      const { data } = await axios.get<{
        data: Array<T>
        page: Page
      }>(dataEndpoint, {
        params: {
          page_number: queryPageIndex + 1,
          size: pageSize,
          ...dataParams,
          ...sort,
        },
      })

      return data
    },
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
    state: { pageIndex, sortBy },
  } = useTable<T>(
    {
      columns: memoizedColumns,
      data: (isSuccess && pagination && pagination.data) || [],
      initialState: {
        ...initialState,
        pageIndex: queryPageIndex,
        pageSize,
      },
      manualPagination: true,
      pageCount: isSuccess && pagination ? pagination.page.lastPage : 0,
      autoResetSortBy: false,
      manualSortBy: controlledSort,
    },
    useSortBy,
    usePagination
  )

  useEffect(() => setQueryPageIndex(pageIndex), [pageIndex])
  useEffect(() => {
    if (sortBy.length > 0)
      setSort({
        sortBy: sortBy[0].id,
        sortOrder: sortBy[0].desc ? 'desc' : 'asc',
      })
    else setSort(undefined)
  }, [sortBy])

  const id = useId()
  const actions = [10, 15, 20, 25].map((s) => (
    <button
      key={`${id}-${s}`}
      type="button"
      onClick={() => setPageSize(s)}
      className={`px-2${s === pageSize ? ' rounded bg-halloween-orange text-white' : ''}`}
    >
      {s}
    </button>
  ))

  return (
    <>
      <div className="absolute right-6 top-6 flex items-center space-x-3">{tableActions}</div>
      {rows.length > 0 ? (
        <>
          <div className="mb-auto h-full overflow-y-auto">
            <table className="w-full" {...getTableProps()}>
              <thead className="sticky top-0 bg-white">
                {headerGroups.map(({ getHeaderGroupProps, headers }) => (
                  // key is already provided by getHeaderGroupProps()
                  // eslint-disable-next-line react/jsx-key
                  <tr {...getHeaderGroupProps()}>
                    {headers.map((column) => (
                      // key is already provided by getHeaderProps()
                      // eslint-disable-next-line react/jsx-key
                      <th
                        className="h-7 text-left align-top"
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        // {...(onHeaderClick
                        //   ? {
                        //       onClick: () => onHeaderClick(column),
                        //     }
                        //   : undefined)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className=" text-xs font-medium text-metallic-silver">
                            {column.render('Header')}
                          </div>
                          {column.canSort && (
                            <div className="space-y-1">
                              <SortIcon
                                className={
                                  column.isSorted && !column.isSortedDesc
                                    ? 'fill-halloween-orange'
                                    : 'fill-bright-gray'
                                }
                              />
                              <SortIcon
                                className={`rotate-180 ${
                                  column.isSortedDesc ? 'fill-halloween-orange' : 'fill-bright-gray'
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
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
                      className={`group h-12 border-b border-solid border-b-bright-gray hover:bg-halloween-orange/5 last:border-none${
                        rowOnClick ? ' cursor-pointer' : ''
                      }`}
                      {...row.getRowProps()}
                      onClick={rowOnClick ? () => rowOnClick(row) : undefined}
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
          <div className="relative flex items-center justify-center">
            <div className="absolute left-0 text-sm font-medium text-metallic-silver">
              {pageIndex * pageSize + 1}-
              {pageIndex + 1 === pagination?.page.lastPage
                ? pagination.page.total
                : (pageIndex + 1) * pageSize}{' '}
              of {pagination?.page.total || '?'} {ofString}
            </div>
            <button
              onClick={previousPage}
              type="button"
              disabled={!canPreviousPage || isFetching}
              className="group"
            >
              <CaretIcon
                className="-rotate-90 stroke-halloween-orange group-disabled:stroke-bright-gray"
                small
              />
            </button>
            <div className="mx-5 flex space-x-4 text-sm font-medium">
              {pageIndex > 1 && (
                <>
                  <button
                    onClick={() => gotoPage(0)}
                    className={`text-metallic-silver ${
                      isFetching
                        ? 'disabled:text-bright-gray'
                        : 'disabled:font-bold disabled:text-halloween-orange'
                    }`}
                    disabled={isFetching}
                  >
                    1
                  </button>
                  <div className={isFetching ? 'text-bright-gray' : 'text-metallic-silver'}>
                    ...
                  </div>
                </>
              )}
              {pageOptions
                .slice(pageIndex > 0 ? pageIndex - 1 : pageIndex, pageIndex + 5)
                .map((pageNumber) => {
                  const gotoThisPage = () => {
                    gotoPage(pageNumber)
                  }

                  return (
                    <button
                      onClick={gotoThisPage}
                      key={`goto-page-${pageNumber}`}
                      disabled={pageNumber === pageIndex || isFetching}
                      className={`text-metallic-silver ${
                        isFetching
                          ? 'disabled:text-bright-gray'
                          : 'disabled:font-bold disabled:text-halloween-orange'
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
                className="rotate-90 stroke-halloween-orange group-disabled:stroke-bright-gray"
                small
              />
            </button>
            <div className="mx-5 flex space-x-4 text-sm font-medium">
              <Dropdown actions={<div className="flex flex-col">{actions}</div>}>
                {({ visible }) => (
                  <div className="flex items-center space-x-2 rounded-md text-sm font-medium">
                    <FilterIcon className="stroke-lavender-gray" />
                    <div>Page Size</div>
                    <CaretIcon
                      className={`transition-transform stroke-waterloo${
                        visible ? '' : ' rotate-180'
                      }`}
                    />
                  </div>
                )}
              </Dropdown>
            </div>
          </div>
        </>
      ) : (
        !isLoading && (
          <div className="m-auto w-fit text-base text-metallic-silver">
            No entries found in {ofString} table.
          </div>
        )
      )}
    </>
  )
}
