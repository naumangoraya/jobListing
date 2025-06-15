"use client"

import { useEffect } from "react"

const JobDetailsModal = ({ job, isOpen, onClose, onEdit, onDelete }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !job) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      onDelete(job.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">{job.title}</h2>
              <div className="flex items-center space-x-4 text-secondary-600">
                <span className="font-medium">{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium">
                  {job.jobType}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Posted Date */}
            <div>
              <p className="text-sm text-secondary-500">Posted on {formatDate(job.postingDate)}</p>
            </div>

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {job.description && (
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Job Description</h3>
                <p className="text-secondary-700 leading-relaxed">{job.description}</p>
              </div>
            )}

            {/* Additional Details */}
            <div className="bg-secondary-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Job Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-secondary-700">Company:</span>
                  <p className="text-secondary-600">{job.company}</p>
                </div>
                <div>
                  <span className="font-medium text-secondary-700">Location:</span>
                  <p className="text-secondary-600">{job.location}</p>
                </div>
                <div>
                  <span className="font-medium text-secondary-700">Job Type:</span>
                  <p className="text-secondary-600">{job.jobType}</p>
                </div>
                <div>
                  <span className="font-medium text-secondary-700">Posted:</span>
                  <p className="text-secondary-600">{formatDate(job.postingDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-secondary-200">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button
              onClick={() => {
                onEdit(job)
                onClose()
              }}
              className="btn-primary"
            >
              Edit Job
            </button>
            <button onClick={handleDelete} className="btn-danger">
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsModal
