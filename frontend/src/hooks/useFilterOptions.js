"use client"

import { useState, useEffect } from "react"
import * as jobsApi from "../api/jobs"

export const useFilterOptions = () => {
  const [options, setOptions] = useState({
    jobTypes: [],
    locations: [],
    tags: [],
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true)
      try {
        const response = await jobsApi.getFilterOptions()
        setOptions(response.data)
      } catch (err) {
        console.error("Error fetching filter options:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOptions()
  }, [])

  return { options, loading }
}
