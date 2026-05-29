import React, { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'
import '../styles/Toast.css'

const Toast = () => {
  const { toasts, removeToast } = useContext(ToastContext)

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-message">{toast.message}</div>
          <button 
            className="toast-close" 
            onClick={() => removeToast(toast.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
