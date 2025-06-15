// API base URL - can be configured via environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

// Get all jobs with optional filters
export const getJobs = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.jobType && filters.jobType !== "All") {
      queryParams.append('job_type', filters.jobType);
    }
    
    if (filters.location && filters.location !== "All") {
      queryParams.append('location', filters.location);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      queryParams.append('tag', filters.tags[0]); // Currently supporting single tag filter
    }
    
    if (filters.sort) {
      queryParams.append('sort', filters.sort);
    }

    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

// Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        posting_date: jobData.postingDate, // Already in YYYY-MM-DD format from the form
        job_type: jobData.jobType,
        tags: jobData.tags,
        link: jobData.link || 'https://example.com/job'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create job');
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
}

// Update an existing job
export const updateJob = async (id, jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        posting_date: jobData.postingDate,
        job_type: jobData.jobType,
        tags: jobData.tags,
        link: jobData.link
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update job');
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
}

// Delete a job
export const deleteJob = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete job');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
}

// Get unique values for filters
export const getFilterOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch filter options');
    }
    const jobs = await response.json();
    
    const jobTypes = [...new Set(jobs.map(job => job.job_type))];
    const locations = [...new Set(jobs.map(job => job.location))];
    const allTags = jobs.flatMap(job => job.tags || []);
    const tags = [...new Set(allTags)].sort();

    return {
      data: {
        jobTypes: jobTypes.sort(),
        locations: locations.sort(),
        tags,
      },
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
}
