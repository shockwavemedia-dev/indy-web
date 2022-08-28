import { Column } from 'react-table'
import { Pill } from '../../components/Pill'
import { Service } from '../../types/Service.type'

export const AdminServicesTableColumns: Array<Column<Service>> = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ value }) => <div className=" text-sm font-semibold capitalize text-onyx">{value}</div>,
  },
  {
    Header: 'Extras',
    accessor: 'extras',
    Cell: ({ value }) => (
      <div className="flex flex-wrap gap-1">
        {value &&
          value.map((extra) => (
            <div key={`${extra}-extras`} className="flex flex-wrap gap-1">
              <Pill twBackgroundColor="bg-honeydew" twTextColor="text-jungle-green" value={extra} />
            </div>
          ))}
      </div>
    ),
  },
]
