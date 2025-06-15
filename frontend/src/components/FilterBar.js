"use client"

import { useState, useRef, useEffect } from "react"
import { useFilterOptions } from "../hooks/useFilterOptions"

const FilterBar = ({ filters, onFiltersChange }) => {
  const { options } = useFilterOptions()
  const [selectedTags, setSelectedTags] = useState(filters.tags || [])
  const [showTagsDropdown, setShowTagsDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTagsDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (field, value) => {
    onFiltersChange({ [field]: value })
  }

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]

    setSelectedTags(newTags)
    onFiltersChange({ tags: newTags })
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSearchTerm("")
    onFiltersChange({
      keyword: "",
      jobType: "All",
      location: "All",
      tags: [],
      sort: "posting_date_desc",
    })
  }

  const filteredTags = options.tags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  const hasActiveFilters =
    filters.keyword || filters.jobType !== "All" || filters.location !== "All" || selectedTags.length > 0

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8 border border-secondary-100 hover:border-primary-200 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h2 className="text-base md:text-lg font-semibold text-secondary-900">Filter Jobs</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs md:text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center space-x-1 transition-all duration-200 hover:scale-105 transform"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear all filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        {/* Keyword Search */}
        <div className="relative group">
          <label htmlFor="keyword" className="block text-xs md:text-sm font-medium text-secondary-700 mb-1.5 md:mb-2">
            Search Keywords
          </label>
          <div className="relative">
            <input
              type="text"
              id="keyword"
              placeholder="Job title, company..."
              value={filters.keyword}
              onChange={(e) => handleInputChange("keyword", e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 pl-8 md:pl-10 text-sm border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 group-hover:border-primary-300"
            />
            <svg
              className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400 group-hover:text-primary-500 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Job Type Filter */}
        <div className="relative group">
          <label htmlFor="jobType" className="block text-xs md:text-sm font-medium text-secondary-700 mb-1.5 md:mb-2">
            Job Type
          </label>
          <div className="relative">
            <select
              id="jobType"
              value={filters.jobType}
              onChange={(e) => handleInputChange("jobType", e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 text-sm appearance-none border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 group-hover:border-primary-300 bg-white"
            >
              <option value="All">All Types</option>
              {options.jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-secondary-400 group-hover:text-primary-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="relative group">
          <label htmlFor="location" className="block text-xs md:text-sm font-medium text-secondary-700 mb-1.5 md:mb-2">
            Location
          </label>
          <div className="relative">
            <select
              id="location"
              value={filters.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 text-sm appearance-none border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 group-hover:border-primary-300 bg-white"
            >
              <option value="All">All Locations</option>
              {options.locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-secondary-400 group-hover:text-primary-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="relative group">
          <label htmlFor="sort" className="block text-xs md:text-sm font-medium text-secondary-700 mb-1.5 md:mb-2">
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => handleInputChange("sort", e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 text-sm appearance-none border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 group-hover:border-primary-300 bg-white"
            >
              <option value="posting_date_desc">Newest First</option>
              <option value="posting_date_asc">Oldest First</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-secondary-400 group-hover:text-primary-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Filter */}
      {options.tags.length > 0 && (
        <div className="mb-4">
          <label className="block text-xs md:text-sm font-medium text-secondary-700 mb-2 md:mb-3">Skills & Technologies</label>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
              className="w-full flex items-center justify-between px-3 md:px-4 py-2 md:py-2.5 text-sm border border-secondary-200 rounded-lg bg-white hover:bg-secondary-50 transition-all duration-200 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <span className="text-sm text-secondary-700">
                {selectedTags.length > 0
                  ? `${selectedTags.length} skill${selectedTags.length > 1 ? "s" : ""} selected`
                  : "Select skills..."}
              </span>
              <svg
                className={`w-4 h-4 text-secondary-400 transition-transform duration-200 ${showTagsDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showTagsDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-secondary-200 rounded-lg shadow-lg transform transition-all duration-200 origin-top">
                <div className="p-2 md:p-3 border-b border-secondary-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 text-sm border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <svg
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto p-2">
                  {filteredTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center px-2 md:px-3 py-1.5 md:py-2 hover:bg-secondary-50 rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                      />
                      <span className="ml-2 text-sm text-secondary-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
