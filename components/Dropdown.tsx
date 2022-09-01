import { ReactNode, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

export const Dropdown = ({
  children,
  actions,
}: {
  children: ({ visible }: { visible: boolean }) => ReactNode
  actions: ReactNode
}) => {
  const [visible, setVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickAway(dropdownRef, () => {
    setVisible(false)
  })

  return (
    <div ref={dropdownRef} className="relative">
      <button type="button" onClick={() => setVisible(!visible)}>
        {children({ visible })}
      </button>
      <div
        className={`absolute right-0 z-60 space-y-1 rounded border border-lavender-gray bg-white px-4 py-2 shadow-md${
          !visible ? ' hidden' : ''
        }`}
      >
        {actions}
      </div>
    </div>
  )
}
