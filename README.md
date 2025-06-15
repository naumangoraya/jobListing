# Job Listing Application

A full-stack job listing application with a React frontend and Flask backend. This modern web application provides a seamless platform for job seekers and employers to connect through an intuitive and feature-rich interface.

## Overview

The Job Listing Application is designed to streamline the job search and posting process with the following key features:

- **Modern UI/UX**: Built with React and styled using Tailwind CSS for a responsive and user-friendly interface
- **Advanced Filtering**: Filter jobs by type, location, skills, and keywords
- **Real-time Search**: Instant search results as you type
- **Sorting Options**: Sort jobs by posting date (newest/oldest)
- **Tag-based Filtering**: Filter jobs by specific skills and technologies
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Secure Backend**: RESTful API built with Flask and PostgreSQL for reliable data management

## Demo Video
Check out the demo video: [Watch Demo](https://vimeo.com/1093519577?share=copy#t=0)

## Prerequisites

### System Requirements
- Node.js and npm (see [frontend/requirements.txt](frontend/requirements.txt))
- Python 3.8 or higher
- PostgreSQL database

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database:
   - Create a database named `jobs_db`
   - Update the database URI in `app.py` if needed

5. Run the Flask backend:
   ```bash
   python app.py
   ```
   The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## Features

- View all job listings
- Filter jobs by type, location, and tags
- Create new job listings
- Update existing job listings
- Delete job listings
- Sort jobs by posting date

## API Endpoints

- GET /jobs - Get all jobs with optional filters
- POST /jobs - Create a new job
- PUT /jobs/<id> - Update a job
- DELETE /jobs/<id> - Delete a job

## Environment Variables

### Backend
- `SQLALCHEMY_DATABASE_URI`: PostgreSQL database connection string

### Frontend
- `REACT_APP_API_URL`: Backend API URL (defaults to http://localhost:5000) 