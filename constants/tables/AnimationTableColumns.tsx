import { Column } from 'react-table'
import { EditIcon } from '../../components/icons/EditIcon'
import { TrashIcon } from '../../components/icons/TrashIcon'
import { useAnimationStore } from '../../store/AnimationStore'
import { Animation } from '../../types/Animation.type'

export const AnimationTableColumns: Array<Column<Animation>> = [
  {
    Header: 'Title',
    accessor: 'title',
    Cell: ({ value }) => <div className=" text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Category',
    accessor: 'libraryCategoryName',
    Cell: ({ value }) => <div className=" text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => <div className=" text-sm font-semibold text-onyx">{value}</div>,
  },
  {
    Header: '',
    accessor: 'id',
    id: 'actions',
    disableSortBy: true,
    Cell: ({ row: { original: animation } }) => {
      const { setActiveAnimation, toggleEditAnimationModal, toggleDeleteAnimationModal } =
        useAnimationStore()

      const editAnimation = () => {
        setActiveAnimation(animation)
        toggleEditAnimationModal()
      }

      const deleteAnimation = () => {
        setActiveAnimation(animation)
        toggleDeleteAnimationModal()
      }

      return (
        <div className="flex space-x-2">
          <button onClick={editAnimation} className="group">
            <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
          <button onClick={deleteAnimation} className="group">
            <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
        </div>
      )
    },
  },
]
