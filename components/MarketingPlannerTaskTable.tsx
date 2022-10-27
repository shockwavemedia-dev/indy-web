import { useMemo } from 'react'
import { Column, TableState, useSortBy, useTable } from 'react-table'
import { Todo } from '../types/Todo.type'
import { SortIcon } from './icons/SortIcon'

export const MarketingPlannerTaskTable = ({
  data,
  columns,
  ofString,
  autoResetSortBy = false,
  initialState,
}: {
  data: Array<Todo>
  columns: Array<Column<Todo>>
  ofString: string
  autoResetSortBy?: boolean
  initialState?: Partial<TableState<Todo>>
}) => {
  const memoizedColumns = useMemo(() => columns, [])

  const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } = useTable<Todo>(
    {
      columns: memoizedColumns,
      data: data,
      autoResetSortBy,
      initialState,
    },
    useSortBy
  )

  return (
    <>
      {rows.length > 0 ? (
        <>
          <div className="mb-auto h-full overflow-y-auto">
            <table className="w-full" {...getTableProps()}>
              <thead className="sticky top-0 z-20 bg-white">
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
              <tbody {...getTableBodyProps()} className="z-10">
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    // key is already provided by getRowProps()
                    // eslint-disable-next-line react/jsx-key
                    <tr
                      className={`h-12 border-b border-solid border-b-bright-gray last:border-none ${
                        row.original.status &&
                        row.original.status !== 'Completed' &&
                        row.original.deadline &&
                        row.original.deadline < new Date()
                          ? 'bg-red-crimson/50'
                          : ''
                      }`}
                      {...row.getRowProps()}
                    >
                      {row.cells.map(({ getCellProps, render }) => (
                        // key is already provided by getCellProps()
                        // eslint-disable-next-line react/jsx-key
                        <td {...getCellProps()} className="relative">
                          {render('Cell')}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="m-auto w-fit text-base text-metallic-silver">
          No entries found in {ofString} table.
        </div>
      )}
    </>
  )
}
