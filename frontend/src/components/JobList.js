import JobCard from "./JobCard"
import LoadingSpinner from "./LoadingSpinner"

const JobList = ({ jobs, loading, onEdit, onDelete, onViewDetails }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 md:py-16">
        <LoadingSpinner size="large" />
        <p className="text-sm md:text-base text-secondary-600 mt-4">Loading amazing opportunities...</p>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 md:py-16">
        <div className="text-secondary-400 mb-4 md:mb-6">
          <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5"
            />
          </svg>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-secondary-900 mb-2">No jobs found</h3>
        <p className="text-sm md:text-base text-secondary-600 mb-4 md:mb-6 max-w-md mx-auto px-4">
          We couldn't find any jobs matching your criteria. Try adjusting your filters or add a new job posting.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <button className="text-sm md:text-base text-primary-600 hover:text-primary-800 font-medium">Clear Filters</button>
          <span className="hidden sm:inline text-secondary-400">•</span>
          <button className="text-sm md:text-base text-primary-600 hover:text-primary-800 font-medium">Add New Job</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary-900">
            {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Found
          </h2>
          <p className="text-sm md:text-base text-secondary-600">Discover your next career opportunity</p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-secondary-500">
          <span>Sort by:</span>
          <select className="border border-secondary-300 rounded-md px-2 py-1 text-secondary-700 text-sm">
            <option>Most Recent</option>
            <option>Oldest First</option>
            <option>Company A-Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  )
}

export default JobList
