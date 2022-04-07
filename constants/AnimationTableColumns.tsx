import { Column } from 'react-table'
import { Animation } from '../interfaces/Animation.interface'
export const AnimationTableColumns: Array<Column<Animation>> = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: ({ value }) => <div className="font-urbanist text-sm font-medium text-onyx">{value}</div>,
  },
  {
    Header: 'Title',
    accessor: 'title',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Category',
    accessor: 'libraryCategoryName',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => (
      <div className="font-urbanist text-sm font-semibold text-onyx">{value}</div>
    ),
  },
]
