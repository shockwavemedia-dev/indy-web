import axios from 'axios'
import { useQueryClient } from 'react-query'
import { Column } from 'react-table'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { CheckboxNoFormik } from '../../components/CheckboxNoFormik'
import { CreateSelectNoFormik } from '../../components/CreateSelectNoFormik'
import { DateInputNoFormik } from '../../components/DateInputNoFormik'
import { SelectNoFormik } from '../../components/SelectNoFormik'
import { Todo } from '../../types/Todo.type'
import { TodoStatusOptions } from '../options/TodoStatusOptions'

const initialTodoList = [
  'social media posts',
  'posters',
  'newspaper ads',
  'animations',
  'web sliders',
  'digital magazine',
  'edm',
  'billboards',
  'small video',
  'website',
  'dm',
  'organise menus with chef',
  'create content',
  'monthly meeting plan',
  'schedule edm',
  'upload to website',
  'print inhouse posters',
  'post newspaper ads',
  'advertise digital screens',
  'book letterbox drop',
  'upload to socials',
  'promote via radio',
]

const initialAssigneeList = ['Mark', 'Arjean', 'Kyle']

export const assigneeListStore = create(
  combine(
    {
      assigneeList: [] as Array<{
        label: string
        value: string
      }>,
    },
    (set) => ({
      update: (names: Array<string | undefined>) =>
        set({
          assigneeList: [
            ...initialAssigneeList.map((name) => ({
              label: name,
              value: name,
            })),
            ...names
              .filter((name) => name && !initialAssigneeList.includes(name))
              .map((name) => ({
                label: name!,
                value: name!,
              })),
          ],
        }),
      clear: () =>
        set({
          assigneeList: initialAssigneeList.map((name) => ({
            label: name,
            value: name,
          })),
        }),
    })
  )
)

export const todoListStore = create(
  combine(
    {
      todoList: [] as Array<Todo>,
    },
    (set, get) => ({
      getTodo: (todoName: string) => get().todoList.find(({ name }) => name === todoName),
      addTodo: (todoName: string) =>
        set({
          todoList: get().todoList.map((todo) =>
            todo.name !== todoName
              ? todo
              : {
                  ...todo,
                  selected: true,
                }
          ),
        }),
      removeTodo: (todoName: string) =>
        set({
          todoList: get().todoList.map((todo) =>
            todo.name !== todoName
              ? todo
              : {
                  ...todo,
                  id: undefined,
                  status: undefined,
                  assignee: undefined,
                  deadline: undefined,
                  selected: false,
                }
          ),
        }),
      updateTodo: (todo: Todo) =>
        set({
          todoList: get().todoList.map((t) => (t.name !== todo.name ? t : todo)),
        }),
      resetTodoList: () =>
        set({
          todoList: initialTodoList.map<Todo>((name, i) => ({
            name,
            custom: false,
            selected: false,
            notify: false,
          })),
        }),
      cleanTodoList: (todoList: Array<Todo>) =>
        set({
          todoList: [
            ...initialTodoList
              .filter((taskName) => !todoList.map(({ name }) => name).includes(taskName))
              .map<Todo>((name) => ({
                name,
                custom: false,
                selected: false,
                notify: false,
              })),
            ...todoList.map((todo) => ({ ...todo, custom: false, selected: true })),
          ],
        }),
      createCustomTodo: (todoName: string) =>
        set({
          todoList: [
            ...get().todoList,
            {
              name: todoName,
              custom: true,
              selected: true,
              notify: false,
            },
          ],
        }),
    })
  )
)

export const MarketingPlannerTaskTableColumns: Array<Column<Todo>> = [
  {
    Header: '',
    accessor: 'selected',
    id: 'selected',
    sortType: (todo) => (todo.original.selected ? -1 : 1),
    disableSortBy: true,
    Cell: ({ row: { original } }) => {
      const getTodo = todoListStore((state) => state.getTodo)
      const addTodo = todoListStore((state) => state.addTodo)
      const removeTodo = todoListStore((state) => state.removeTodo)
      const queryClient = useQueryClient()

      const todo = getTodo(original.name)

      return (
        <CheckboxNoFormik
          checked={!!todo && todo.selected}
          onChange={async () => {
            if (todo && todo.selected) {
              removeTodo(original.name)
              if (todo.id) {
                await axios.delete(`/v1/marketing-planner-tasks/${todo.id}`)
                queryClient.invalidateQueries('marketingPlanner')
              }
            } else addTodo(original.name)
          }}
          label=""
        />
      )
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ value }) => {
      const getTodo = todoListStore((state) => state.getTodo)

      const todo = getTodo(value)

      return (
        <div
          className={`text-sm font-semibold capitalize text-onyx${
            todo && !todo.selected ? ' opacity-50' : ''
          }`}
        >
          {value}
        </div>
      )
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row: { original } }) => {
      const getTodo = todoListStore((state) => state.getTodo)
      const updateTodo = todoListStore((state) => state.updateTodo)

      const todo = getTodo(original.name)

      return todo && todo.selected ? (
        <SelectNoFormik
          options={TodoStatusOptions}
          value={
            todo && todo.selected
              ? TodoStatusOptions.find(({ value }) => value === original.status)
              : null
          }
          onChange={(option) => {
            if (todo && option) updateTodo({ ...todo, status: option.value })
          }}
          twHeight="h-7"
          className="pr-5"
          placeholder="Select Status"
        />
      ) : (
        <div>-</div>
      )
    },
  },
  {
    Header: 'Assignee',
    accessor: 'assignee',
    Cell: ({ row: { original } }) => {
      const assigneeList = assigneeListStore((state) => state.assigneeList)
      const getTodo = todoListStore((state) => state.getTodo)
      const updateTodo = todoListStore((state) => state.updateTodo)

      const todo = getTodo(original.name)

      return todo && todo.selected ? (
        <CreateSelectNoFormik
          options={assigneeList}
          value={
            todo && todo.selected
              ? assigneeList.find(({ value }) => value === original.assignee)
              : null
          }
          onChange={(option) => {
            if (todo && option) updateTodo({ ...todo, assignee: option.value })
          }}
          twHeight="h-7"
          className="pr-5"
          placeholder="Select Assignee"
        />
      ) : (
        <div>-</div>
      )
    },
  },
  {
    Header: 'Deadline',
    accessor: 'deadline',
    Cell: ({ row: { original } }) => {
      const getTodo = todoListStore((state) => state.getTodo)
      const updateTodo = todoListStore((state) => state.updateTodo)

      const todo = getTodo(original.name)

      return todo && todo.selected ? (
        <DateInputNoFormik
          value={todo.deadline}
          onChange={(date) => updateTodo({ ...todo, deadline: date })}
          className="mr-5 w-48"
          twHeight="h-7"
          placeholder="Set Deadline"
        />
      ) : (
        <div>-</div>
      )
    },
  },
  {
    Header: 'Notify',
    accessor: 'notify',
    disableSortBy: true,
    Cell: ({ row: { original } }) => {
      const getTodo = todoListStore((state) => state.getTodo)
      const updateTodo = todoListStore((state) => state.updateTodo)

      const todo = getTodo(original.name)

      return todo && todo.selected ? (
        <CheckboxNoFormik
          checked={todo.notify}
          label=""
          onChange={() => updateTodo({ ...todo, notify: !todo.notify })}
        />
      ) : (
        <div>-</div>
      )
    },
  },
]
