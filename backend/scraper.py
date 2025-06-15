import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

print("Initializing Chrome WebDriver...")
# Set up Chrome options for headless mode
options = Options()
options.add_argument('--headless=new')  # Updated headless mode for newer Chrome versions
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

# List to store job data
jobs = []
max_jobs = 90  # Limit to 90 jobs for demo purposes
page_num = 1

print(f"\nStarting to scrape jobs (target: {max_jobs} jobs)...")
while len(jobs) < max_jobs:
    print(f"\nScraping page {page_num}...")
    # Wait for job listings to load
    wait = WebDriverWait(driver, 15)
    job_elements = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "Job_job-card__YgDAV")))
    print(f"Found {len(job_elements)} jobs on page {page_num}")
    
    # Extract data from each job card
    for job in job_elements:
        if len(jobs) >= max_jobs:
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
        except:
            country = "N/A"
            cities = []
        
        try:
            salary = locations_div.find_element(By.CLASS_NAME, "Job_job-card__salary__QZswp").text
        except:
            salary = "N/A"
        
        try:
            tags_div = job.find_element(By.CLASS_NAME, "Job_job-card__tags__zfriA")
            # Filter out empty strings and ensure only meaningful tags are included
            tags = [tag.text for tag in tags_div.find_elements(By.CLASS_NAME, "Job_job-card__location__bq7jX") if tag.text.strip()]
        except:
            tags = []
        
        try:
            posting_date = job.find_element(By.CLASS_NAME, "Job_job-card__posted-on__NCZaJ").text
        except:
            posting_date = "N/A"
        
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
        
        # Append job data to list
        jobs.append({
            "title": title,
            "company": company,
            "country": country,
            "cities": cities,
            "salary": salary,
            "posting_date": posting_date,
            "job_type": job_type,
            "tags": tags,
            "link": link
        })
        print(f"Scraped job {len(jobs)}/{max_jobs}: {title} at {company}")
    
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

print("\nProcessing and saving data...")
df = pd.DataFrame(jobs)
df.to_csv("actuary_jobs.csv", index=False)
print(f"\nScraping complete! Successfully scraped {len(jobs)} jobs.")
print("Data saved to actuary_jobs.csv")