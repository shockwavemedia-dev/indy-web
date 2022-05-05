import { useToastStore } from '../store/ToastStore'
import Toast from './Toast'

const ToastContainer = () => {
  const { toasts } = useToastStore()

  return (
    <div id="toasts-container" className="absolute top-6 right-6 z-50 space-y-3">
      {Object.entries(toasts).map(({ '0': toastId, '1': toast }) => (
        <Toast key={`toast-${toastId}`} id={Number(toastId)} toast={toast} />
      ))}
    </div>
  )
}

export default ToastContainer
