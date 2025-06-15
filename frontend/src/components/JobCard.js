"use client"

import { useState } from "react"

const JobCard = ({ job, onEdit, onDelete, onViewDetails }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    onDelete(job.id)
    setShowDeleteModal(false)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
  }

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-secondary-100 dark:border-secondary-700 group hover:border-primary-200 dark:hover:border-primary-700 relative overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-50/0 to-primary-50/0 group-hover:from-primary-50/10 group-hover:via-primary-50/5 group-hover:to-primary-50/0 dark:group-hover:from-primary-900/10 dark:group-hover:via-primary-900/5 dark:group-hover:to-primary-900/0 transition-all duration-500"></div>
      
      <div className="relative">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <h3
              className="text-lg md:text-xl font-semibold text-secondary-900 dark:text-white mb-2 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group-hover:translate-x-1 transform"
              onClick={() => onViewDetails(job)}
            >
              {job.title}
            </h3>
            <div className="space-y-2 text-secondary-600 dark:text-secondary-300">
              <p className="font-medium text-primary-600 dark:text-primary-400 flex items-center text-sm md:text-base">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
                {job.company}
              </p>
              <div className="flex items-center space-x-2 text-xs md:text-sm">
                <svg className="w-4 h-4 text-secondary-400 dark:text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span className="text-secondary-600 dark:text-secondary-300">{job.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs md:text-sm">
                <svg className="w-4 h-4 text-secondary-400 dark:text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5"
                  />
                </svg>
                <span className="inline-block bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-2 md:px-3 py-1 rounded-full text-xs font-medium border border-primary-100 dark:border-primary-800">
                  {job.jobType}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 md:translate-x-2 group-hover:translate-x-0">
            <button
              onClick={() => onEdit(job)}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-all duration-200 hover:scale-110"
              title="Edit job"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-110"
              title="Delete job"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-xs md:text-sm text-secondary-500 dark:text-secondary-400 mb-3">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Posted on {formatDate(job.postingDate)}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {job.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-secondary-50 dark:bg-secondary-700/50 text-secondary-700 dark:text-secondary-300 px-2 md:px-3 py-1 rounded-full text-xs font-medium border border-secondary-100 dark:border-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
            {job.tags.length > 3 && (
              <span className="inline-block bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 px-2 md:px-3 py-1 rounded-full text-xs font-medium">
                +{job.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {job.description && (
          <p className="text-xs md:text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-4 leading-relaxed">
            {job.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-secondary-100 dark:border-secondary-700">
          <button
            onClick={() => onViewDetails(job)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium text-xs md:text-sm transition-all duration-200 flex items-center group-hover:translate-x-1 transform"
          >
            View Details
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="flex items-center text-xs text-secondary-400 dark:text-secondary-500">
            <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Active
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl p-6 max-w-md w-full transform transition-all duration-300 ease-in-out animate-slide-in">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">Confirm Deletion</h3>
            <p className="text-secondary-600 dark:text-secondary-300 mb-6">Are you sure you want to delete this job posting?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobCard
