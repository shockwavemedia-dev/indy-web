import { useEffect } from 'react'
import { useToastStore } from '../store/ToastStore'
import { Toast } from '../types/Toast'
import CloseToastIcon from './icons/CloseToastIcon'
import ToastErrorIcon from './icons/ToastErrorIcon'
import ToastInfoIcon from './icons/ToastInfoIcon'
import ToastSuccessIcon from './icons/ToastSuccessIcon'
import ToastWarningIcon from './icons/ToastWarningIcon'

const Toast = ({
  id,
  toast: { type, message, duration, persistent },
}: {
  id: number
  toast: Toast
}) => {
  const { closeToast } = useToastStore()

  const closeCurrentToast = () => closeToast(id)

  useEffect(() => {
    if (!persistent) {
      setTimeout(closeCurrentToast, duration)
    }
  }, [])

  return (
    <div className="flex items-center rounded-xl bg-white px-6 py-4 shadow">
      {type === 'success' ? (
        <ToastSuccessIcon />
      ) : type === 'error' ? (
        <ToastErrorIcon />
      ) : type === 'info' ? (
        <ToastInfoIcon />
      ) : (
        <ToastWarningIcon />
      )}
      <div className="ml-3 mr-5 font-urbanist text-sm font-medium text-onyx">{message}</div>
      <button
        onClick={closeCurrentToast}
        className="group grid h-6 w-6 place-items-center rounded-full"
      >
        <CloseToastIcon className="stroke-lavender-gray group-hover:stroke-waterloo" />
      </button>
    </div>
  )
}

export default Toast
