import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app and database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:nauman@localhost/jobs_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    posting_date = db.Column(db.Date, nullable=False)
    job_type = db.Column(db.String(50), nullable=False)
    tags = db.Column(db.String(255))
    link = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return f'<Job {self.title} at {self.company}>'

def parse_date(date_str):
    try:
        # Handle different date formats
        if 'ago' in date_str.lower():
            # Handle relative dates like "2 days ago"
            parts = date_str.lower().split()
            if len(parts) >= 2:
                number = int(parts[0])
                unit = parts[1]
                if 'day' in unit:
                    days = number
                elif 'week' in unit:
                    days = number * 7
                elif 'month' in unit:
                    days = number * 30
                else:
                    days = 0
                return datetime.now().date()
        else:
            # Try parsing standard date formats
            for fmt in ['%b %d, %Y', '%B %d, %Y', '%Y-%m-%d']:
                try:
                    return datetime.strptime(date_str, fmt).date()
                except ValueError:
                    continue
    except:
        pass
    return datetime.now().date()  # Default to today if parsing fails

def scrape_jobs():
    print("Initializing Chrome WebDriver...")
    # Set up Chrome options for headless mode
    options = Options()
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.7151.104 Safari/537.36')

    # Initialize the Chrome driver
    driver = webdriver.Chrome(options=options)

    print("Navigating to ActuaryList.com...")
    # Navigate to the Actuary List website
    driver.get("https://www.actuarylist.com/")

    max_jobs = 90  # Limit to 90 jobs for demo purposes
    page_num = 1
    jobs_scraped = 0

    print(f"\nStarting to scrape jobs (target: {max_jobs} jobs)...")
    with app.app_context():
        while jobs_scraped < max_jobs:
            print(f"\nScraping page {page_num}...")
            # Wait for job listings to load
            wait = WebDriverWait(driver, 15)
            job_elements = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "Job_job-card__YgDAV")))
            print(f"Found {len(job_elements)} jobs on page {page_num}")
            
            # Extract data from each job card
            for job in job_elements:
                if jobs_scraped >= max_jobs:
                    break
                try:
                    title = job.find_element(By.CLASS_NAME, "Job_job-card__position__ic1rc").text
                except:
                    title = "N/A"
                
                try:
                    company = job.find_element(By.CLASS_NAME, "Job_job-card__company__7T9qY").text
                except:
                    company = "N/A"
                
                try:
                    locations_div = job.find_element(By.CLASS_NAME, "Job_job-card__locations__x1exr")
                    country = locations_div.find_element(By.CLASS_NAME, "Job_job-card__country__GRVhK").text
                    cities = [city.text for city in locations_div.find_elements(By.CLASS_NAME, "Job_job-card__location__bq7jX") if city.text]
                    location = f"{', '.join(cities)}, {country}" if cities else country
                except:
                    location = "N/A"
                
                try:
                    tags_div = job.find_element(By.CLASS_NAME, "Job_job-card__tags__zfriA")
                    tags = [tag.text for tag in tags_div.find_elements(By.CLASS_NAME, "Job_job-card__location__bq7jX") if tag.text.strip()]
                except:
                    tags = []
                
                try:
                    posting_date = job.find_element(By.CLASS_NAME, "Job_job-card__posted-on__NCZaJ").text
                    posting_date = parse_date(posting_date)
                except:
                    posting_date = datetime.now().date()
                
                try:
                    link = job.find_element(By.CLASS_NAME, "Job_job-page-link__a5I5g").get_attribute("href")
                except:
                    link = "N/A"
                
                # Determine job type (default to Full-Time unless specified in tags)
                job_type = "Full-Time"
                if any("intern" in tag.lower() for tag in tags):
                    job_type = "Intern"
                elif any("part-time" in tag.lower() for tag in tags):
                    job_type = "Part-Time"
                
                # Check if job already exists in database
                existing_job = Job.query.filter_by(link=link).first()
                if not existing_job:
                    # Create new job entry
                    new_job = Job(
                        title=title,
                        company=company,
                        location=location,
                        posting_date=posting_date,
                        job_type=job_type,
                        tags=','.join(tags),
                        link=link
                    )
                    db.session.add(new_job)
                    db.session.commit()
                    jobs_scraped += 1
                    print(f"Scraped and stored job {jobs_scraped}/{max_jobs}: {title} at {company}")
                else:
                    print(f"Skipping duplicate job: {title} at {company}")
            
            # Try to find and click the Next button
            try:
                next_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Next')]")
                if not next_button.is_enabled():
                    print("Reached last page")
                    break
                print(f"Moving to page {page_num + 1}...")
                next_button.click()
                page_num += 1
                time.sleep(3)  # Increased wait time for page load
            except:
                print("No more pages available")
                break

    print("\nClosing browser...")
    # Close the driver
    driver.quit()

    print(f"\nScraping complete! Successfully scraped and stored {jobs_scraped} jobs in the database.")

if __name__ == "__main__":
    scrape_jobs()