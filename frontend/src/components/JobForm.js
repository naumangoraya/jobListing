"use client"

import { useState, useEffect } from "react"
import LoadingSpinner from "./LoadingSpinner"

const JobForm = ({ job, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    tags: "",
    description: "",
    postingDate: new Date().toISOString().split('T')[0], // Default to today's date
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        jobType: job.jobType || "Full-time",
        tags: Array.isArray(job.tags) ? job.tags.join(", ") : job.tags || "",
        description: job.description || "",
        postingDate: job.postingDate ? new Date(job.postingDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      })
    }
  }, [job])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // Convert tags string to array
      const formattedData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      }
      await onSubmit(formattedData)
      // Reset form if it's a new job (no job prop)
      if (!job) {
        setFormData({
          title: "",
          company: "",
          location: "",
          jobType: "Full-time",
          tags: "",
          description: "",
          postingDate: new Date().toISOString().split('T')[0],
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-secondary-200">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6">{job ? "Edit Job" : "Add New Job"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-secondary-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`input-field ${errors.title ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="e.g. Senior Frontend Developer"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className={`input-field ${errors.company ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="e.g. TechCorp Inc."
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-secondary-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className={`input-field ${errors.location ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="e.g. San Francisco, CA or Remote"
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Job Type */}
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-secondary-700 mb-2">
              Job Type
            </label>
            <select
              id="jobType"
              value={formData.jobType}
              onChange={(e) => handleChange("jobType", e.target.value)}
              className="select-field"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Posting Date */}
          <div>
            <label htmlFor="postingDate" className="block text-sm font-medium text-secondary-700 mb-2">
              Posting Date
            </label>
            <input
              type="date"
              id="postingDate"
              value={formData.postingDate}
              onChange={(e) => handleChange("postingDate", e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-secondary-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            className="input-field"
            placeholder="e.g. React, JavaScript, TypeScript (comma-separated)"
          />
          <p className="mt-1 text-sm text-secondary-500">Separate multiple tags with commas</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-secondary-700 mb-2">
            Job Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="input-field resize-none"
            placeholder="Brief description of the job role and requirements..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn-primary flex items-center space-x-2" disabled={loading}>
            {loading && <LoadingSpinner size="small" />}
            <span>{job ? "Update Job" : "Add Job"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobForm
