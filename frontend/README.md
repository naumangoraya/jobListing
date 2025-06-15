# Job Listing Web App

A modern, responsive React single-page application for managing job listings with full CRUD functionality, filtering, and sorting capabilities.

## Features

- **Job Management**: Create, read, update, and delete job postings
- **Advanced Filtering**: Filter by keywords, job type, location, and tags
- **Sorting**: Sort jobs by posting date (newest/oldest first)
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Real-time Updates**: Instant UI updates without page reloads
- **Error Handling**: User-friendly error messages and loading states

## Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios (ready for Flask API integration)
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd job-listing-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Environment Variables

Create a `.env` file in the root directory to configure the API base URL:

\`\`\`
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── FilterBar.js    # Search and filter controls
│   ├── Header.js       # App header with navigation
│   ├── JobCard.js      # Individual job listing card
│   ├── JobForm.js      # Add/edit job form
│   ├── JobList.js      # Grid of job cards
│   ├── LoadingSpinner.js # Loading indicator
│   └── Notification.js # Toast notifications
├── hooks/              # Custom React hooks
│   ├── useJobs.js      # Job management logic
│   └── useFilterOptions.js # Filter options data
├── api/                # API integration
│   └── jobs.js         # Job-related API calls
├── styles/             # CSS and styling
├── App.js              # Main application component
└── index.js            # Application entry point
\`\`\`

## API Integration

The app is designed to work with a Flask REST API. Update the API base URL in the environment variables and ensure your backend supports the following endpoints:

- `GET /jobs` - Fetch jobs with optional query parameters
- `POST /jobs` - Create a new job
- `PUT /jobs/:id` - Update an existing job
- `DELETE /jobs/:id` - Delete a job

### Query Parameters for Filtering

- `keyword` - Search in title and company
- `job_type` - Filter by job type
- `location` - Filter by location
- `tag` - Filter by tags
- `sort` - Sort order (posting_date_desc/posting_date_asc)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
\`\`\`

Environment variables file:
