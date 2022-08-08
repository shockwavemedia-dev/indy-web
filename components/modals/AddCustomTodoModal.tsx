import { Form, Formik } from 'formik'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { todoListStore } from '../../constants/tables/MarketingPlannerTaskTableColumns'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const useAddCustomTodoModal = createStore(
  combine(
    {
      visible: false,
    },
    (set, get) => ({
      toggle: () => set({ visible: !get().visible }),
    })
  )
)

export const AddCustomTodoModal = () => {
  const createCustomTodo = todoListStore((state) => state.createCustomTodo)
  const visible = useAddCustomTodoModal((state) => state.visible)
  const toggle = useAddCustomTodoModal((state) => state.toggle)

  return (
    <>
      {visible && (
        <Modal title="Create Task" onClose={toggle}>
          <Formik
            initialValues={{
              name: '',
            }}
            onSubmit={({ name }) => {
              createCustomTodo(name)
              toggle()
            }}
          >
            {() => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  label="Todo Name"
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Todo Name"
                  name="name"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={toggle} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Create" type="submit">
                    Create
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
