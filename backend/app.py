from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace 'username', 'password', and 'dbname' with your PostgreSQL details
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

@app.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    required_fields = ['title', 'company', 'location', 'posting_date', 'job_type', 'link']
    if not data or not all(key in data for key in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        posting_date = datetime.strptime(data['posting_date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format, use YYYY-MM-DD'}), 400

    new_job = Job(
        title=data['title'],
        company=data['company'],
        location=data['location'],
        posting_date=posting_date,
        job_type=data['job_type'],
        tags=','.join(data.get('tags', [])),
        link=data['link']
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({'message': 'Job created successfully'}), 201

@app.route('/jobs', methods=['GET'])
def get_jobs():
    query = Job.query
    job_type = request.args.get('job_type')
    location = request.args.get('location')
    tag = request.args.get('tag')
    sort = request.args.get('sort', 'posting_date_desc')

    if job_type:
        query = query.filter_by(job_type=job_type)
    if location:
        query = query.filter(Job.location.ilike(f'%{location}%'))
    if tag:
        query = query.filter(Job.tags.ilike(f'%{tag}%'))

    if sort == 'posting_date_asc':
        query = query.order_by(Job.posting_date.asc())
    else:
        query = query.order_by(Job.posting_date.desc())

    jobs = query.all()
    return jsonify([{
        'id': job.id,
        'title': job.title,
        'company': job.company,
        'location': job.location,
        'posting_date': job.posting_date.isoformat(),
        'job_type': job.job_type,
        'tags': job.tags.split(',') if job.tags else [],
        'link': job.link
    } for job in jobs])

@app.route('/jobs/<int:id>', methods=['GET'])
def get_job(id):
    job = Job.query.get(id)
    if job is None:
        return jsonify({'error': 'Job not found'}), 404
    return jsonify({
        'id': job.id,
        'title': job.title,
        'company': job.company,
        'location': job.location,
        'posting_date': job.posting_date.isoformat(),
        'job_type': job.job_type,
        'tags': job.tags.split(',') if job.tags else [],
        'link': job.link
    })

@app.route('/jobs/<int:id>', methods=['PUT'])
def update_job(id):
    job = Job.query.get(id)
    if job is None:
        return jsonify({'error': 'Job not found'}), 404
    data = request.get_json()
    
    if 'posting_date' in data:
        try:
            job.posting_date = datetime.strptime(data['posting_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format, use YYYY-MM-DD'}), 400
    
    job.title = data.get('title', job.title)
    job.company = data.get('company', job.company)
    job.location = data.get('location', job.location)
    job.job_type = data.get('job_type', job.job_type)
    job.tags = ','.join(data.get('tags', job.tags.split(',')))
    job.link = data.get('link', job.link)
    db.session.commit()
    return jsonify({'message': 'Job updated successfully'})

@app.route('/jobs/<int:id>', methods=['DELETE'])
def delete_job(id):
    job = Job.query.get(id)
    if job is None:
        return jsonify({'error': 'Job not found'}), 404
    db.session.delete(job)
    db.session.commit()
    return jsonify({'message': 'Job deleted successfully'}), 204

if __name__ == '__main__':
    app.run(debug=True)