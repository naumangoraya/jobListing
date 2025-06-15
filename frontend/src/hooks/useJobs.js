"use client"

import { useState, useEffect, useCallback } from "react"
import * as jobsApi from "../api/jobs"

export const useJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    keyword: "",
    jobType: "All",
    location: "All",
    tags: [],
    sort: "posting_date_desc",
  })

  const fetchJobs = useCallback(
    async (currentFilters = filters) => {
      setLoading(true)
      setError(null)

      try {
        const response = await jobsApi.getJobs(currentFilters)
        setJobs(response.data)
      } catch (err) {
        setError("Failed to fetch jobs. Please try again.")
        console.error("Error fetching jobs:", err)
      } finally {
        setLoading(false)
      }
    },
    [filters],
  )

  const createJob = async (jobData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await jobsApi.createJob(jobData)
      await fetchJobs() // Refresh the list
      return response.data
    } catch (err) {
      setError("Failed to create job. Please try again.")
      console.error("Error creating job:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateJob = async (id, jobData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await jobsApi.updateJob(id, jobData)
      await fetchJobs() // Refresh the list
      return response.data
    } catch (err) {
      setError("Failed to update job. Please try again.")
      console.error("Error updating job:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteJob = async (id) => {
    setLoading(true)
    setError(null)

    try {
      await jobsApi.deleteJob(id)
      await fetchJobs() // Refresh the list
    } catch (err) {
      setError("Failed to delete job. Please try again.")
      console.error("Error deleting job:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    fetchJobs(updatedFilters)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return {
    jobs,
    loading,
    error,
    filters,
    createJob,
    updateJob,
    deleteJob,
    updateFilters,
    refetch: fetchJobs,
  }
}
