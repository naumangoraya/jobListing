"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import FilterBar from "./components/FilterBar"
import JobList from "./components/JobList"
import JobForm from "./components/JobForm"
import JobDetailsModal from "./components/JobDetailsModal"
import Notification from "./components/Notification"
import { useJobs } from "./hooks/useJobs"
import { Routes, Route, useLocation } from "react-router-dom"

function App() {
  const { jobs, loading, error, filters, createJob, updateJob, deleteJob, updateFilters } = useJobs()
  const location = useLocation()

  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [notification, setNotification] = useState({ message: "", type: "success" })

  useEffect(() => {
    if (location.pathname === '/') {
      setShowForm(false)
    }
  }, [location])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
  }

  const handleAddJob = () => {
    setEditingJob(null)
    setShowForm(true)
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
    setShowForm(true)
  }

  const handleViewDetails = (job) => {
    setSelectedJob(job)
    setShowJobDetails(true)
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, formData)
        showNotification("Job updated successfully! 🎉")
      } else {
        await createJob(formData)
        showNotification("Job posted successfully! 🚀")
      }
      setShowForm(false)
      setEditingJob(null)
    } catch (error) {
      showNotification("Operation failed. Please try again. ❌", "error")
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingJob(null)
  }

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId)
      showNotification("Job deleted successfully! 🗑️")
    } catch (error) {
      showNotification("Failed to delete job. Please try again. ❌", "error")
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header onAddJob={handleAddJob} jobCount={jobs.length} loading={loading} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={
            showForm ? (
              <div className="max-w-4xl mx-auto">
                <JobForm job={editingJob} onSubmit={handleFormSubmit} onCancel={handleFormCancel} loading={loading} />
              </div>
            ) : (
              <>
                <FilterBar filters={filters} onFiltersChange={updateFilters} />

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-red-700 font-medium">Something went wrong</p>
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <JobList
                  jobs={jobs}
                  loading={loading}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                  onViewDetails={handleViewDetails}
                />
              </>
            )
          } />
        </Routes>
      </main>

      <JobDetailsModal
        job={selectedJob}
        isOpen={showJobDetails}
        onClose={() => setShowJobDetails(false)}
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
      />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />
    </div>
  )
}

export default App
