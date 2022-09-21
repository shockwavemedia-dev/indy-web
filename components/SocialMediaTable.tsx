import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { usePagination, useSortBy, useTable } from 'react-table'
import { SocialMediaColumns } from '../constants/tables/SocialMediaColumns'
import { Page } from '../types/Page.type'
import { SocialMedia } from '../types/SocialMedia.type'
import { CaretIcon } from './icons/CaretIcon'
import { SortIcon } from './icons/SortIcon'

export const SocialMediaTable = ({ clientId }: { clientId: number }) => {
  const { data: session } = useSession()

  const [queryPageIndex, setQueryPageIndex] = useState(0)

  const {
    data: pagination,
    isSuccess,
    isFetching,
    isLoading,
  } = useQuery(
    ['socialMedias', clientId, queryPageIndex],
    async () => {
      const { data } = await axios.get<{
        data: Array<SocialMedia>
        page: Page
      }>(`/v1/clients/${clientId}/social-media`, {
        params: {
          page_number: queryPageIndex + 1,
          size: 20,
        },
      })

      return data
    },
    { keepPreviousData: true, staleTime: 5000, enabled: !!session }
  )

  const memoizedColumns = useMemo(() => SocialMediaColumns, [])

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
    state: { pageIndex, pageSize },
  } = useTable<SocialMedia>(
    {
      columns: memoizedColumns,
      data: (isSuccess && pagination && pagination.data) || [],
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: 20,
        sortBy: [
          {
            id: 'id',
          },
        ],
      },
      manualPagination: true,
      pageCount: isSuccess && pagination ? pagination.page.lastPage : 0,
      autoResetSortBy: false,
    },
    useSortBy,
    usePagination
  )

  useEffect(() => setQueryPageIndex(pageIndex), [pageIndex])

  return (
    <>
      {rows.length > 0 ? (
        <>
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
                            <div className=" text-xs font-medium text-metallic-silver">
                              {render('Header')}
                            </div>
                            {canSort && (
                              <div className="space-y-1">
                                <SortIcon
                                  className={
                                    isSorted && !isSortedDesc
                                      ? 'fill-halloween-orange'
                                      : 'fill-bright-gray'
                                  }
                                />
                                <SortIcon
                                  className={`rotate-180 ${
                                    isSortedDesc ? 'fill-halloween-orange' : 'fill-bright-gray'
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
                      className="group h-12 border-b border-solid border-b-bright-gray last:border-none hover:bg-halloween-orange/5"
                      {...row.getRowProps()}
                    >
                      {row.cells.map(({ getCellProps, render }) => (
                        // key is already provided by getCellProps()
                        // eslint-disable-next-line react/jsx-key
                        <td className="h-30" {...getCellProps()}>
                          {render('Cell')}
                        </td>
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
              of {pagination?.page.total || '?'} Social Media
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
          </div>
        </>
      ) : (
        !isLoading && (
          <div className="m-auto w-fit text-base text-metallic-silver">
            No entries found in Social Media table.
          </div>
        )
      )}
    </>
  )
}
