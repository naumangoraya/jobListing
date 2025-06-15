"use client"

import { useEffect } from "react"

const Notification = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message && onClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, onClose, duration])

  if (!message) return null

  const bgColor = type === "error" ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-green-500 to-green-600"

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md transform transition-all duration-300 ease-in-out animate-slide-in`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 focus:outline-none">
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default Notification
