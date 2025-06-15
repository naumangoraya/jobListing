import csv
from app import app, db, Job
from datetime import datetime, timedelta

def parse_posting_date(date_str):
    try:
        # Handle "Xd ago" format
        if 'ago' in date_str:
            parts = date_str.split()
            number = int(parts[0].rstrip('d'))  # Remove 'd' and convert to int
            return (datetime.now() - timedelta(days=number)).date()
        # Handle YYYY-MM-DD format
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    except (ValueError, IndexError):
        print(f"Warning: Could not parse date '{date_str}', using current date")
        return datetime.now().date()

def clean_location(location_str):
    # Remove brackets and quotes, split by comma
    if location_str.startswith('[') and location_str.endswith(']'):
        location_str = location_str[1:-1]
    locations = [loc.strip().strip("'") for loc in location_str.split(',')]
    return ', '.join(locations)

# Create application context
with app.app_context():
    try:
        with open('actuary_jobs.csv', 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Skip if job already exists
                if Job.query.filter_by(link=row['link']).first():
                    print(f"Skipping existing job: {row['title']}")
                    continue
                    
                # Clean and prepare the data
                location = clean_location(row['cities'])
                tags = ','.join(eval(row['tags'])) if row['tags'] else ''
                
                # Create new job entry
                job = Job(
                    title=row['title'],
                    company=row['company'],
                    location=location,
                    posting_date=parse_posting_date(row['posting_date']),
                    job_type=row['job_type'],
                    tags=tags,
                    link=row['link']
                )
                db.session.add(job)
                print(f"Added job: {row['title']} at {row['company']}")
            
            # Commit all changes
            db.session.commit()
            print("Data imported successfully.")
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        db.session.rollback()