# Access Interview Project

A full-stack web application for managing CSV keyword uploads and Wikipedia data crawling with background job processing.

## 🌐 Live Demo

**Frontend:** https://access-interview-proj.vercel.app/
**Backend API:** https://access-interview-backend-d4700e4f289a.herokuapp.com/

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Docker Desktop** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)
- **Git**

**Optional (for running outside Docker):**
- Node.js 20.19.0
- Ruby 3.3.10
- PostgreSQL 16
- Redis 7

## 🔧 Environment Variables

The project requires the following environment variables to be configured:

### Backend Environment Variables
```bash
# Database Configuration
DATABASE_HOST=db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_secure_password
DATABASE_NAME=app_development

# Redis Configuration
REDIS_URL=redis://redis:6379/0

# JWT Secret (generate with: docker compose exec web rails secret)
DEVISE_JWT_SECRET_KEY=your_generated_secret_key_here

# Optional: User ID for file permissions
UID=1000
GID=1000
```

### Frontend Environment Variables
```bash
# Development (uses Vite proxy)
VITE_API_URL=/api/

# Production
VITE_API_URL=https://access-interview-backend-d4700e4f289a.herokuapp.com/
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vietdqhcmute/access_interview_proj.git
cd access_interview_proj
```

### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and configure your variables
# At minimum, set a secure DATABASE_PASSWORD
```

### 3. Generate JWT Secret Key

After starting the containers (step 4), generate a secure JWT secret:

```bash
# Generate the secret
docker compose exec web rails secret

# Copy the output and add it to your .env file as DEVISE_JWT_SECRET_KEY
# Then restart the containers: docker compose restart
```

### 4. Start the Application with Docker Compose

```bash
# Build and start all services (database, redis, backend, sidekiq, frontend)
docker compose up --build

# Or run in detached mode (background)
docker compose up -d --build

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f web
docker compose logs -f frontend
```

### 5. Initialize the Database

```bash
# Create database
docker compose exec web rails db:create

# Run migrations
docker compose exec web rails db:migrate

# (Optional) Seed initial data
docker compose exec web rails db:seed
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Sidekiq Web UI:** http://localhost:3000/sidekiq
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379

## 🏗️ Project Structure

```
access_interview_proj/
├── backend/                 # Rails API backend
│   ├── app/
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # ActiveRecord models
│   │   ├── workers/        # Sidekiq background jobs
│   │   └── serializers/    # JSON API serializers
│   ├── config/             # Rails configuration
│   ├── db/                 # Database migrations and schema
│   └── spec/               # RSpec tests
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context providers
│   │   └── lib/           # Utilities and configurations
│   └── public/            # Static assets
│
├── .github/               # GitHub Actions CI/CD workflows
├── docker-compose.yml     # Docker services configuration
└── .env.example           # Environment variables template
```

## 🔄 CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- **Backend:** Automatically deployed to Heroku on push to `master`
- **Redis:** Setup on Heroku as add-on
- **PostgreSQL:** Setup on Heroku as add-on
- **Frontend:** Automatically deployed to Vercel on push to `master`

## 📝 Additional Notes

- The frontend runs with hot-reload enabled in development
- Backend API uses JWT ONLY (not use Cookie) authentication via Devise
- Background jobs are processed by Sidekiq with Redis
- Cron jobs are processed by Sidekiq with Redis
- Database data persists in Docker volumes
- PostgreSQL runs on port 5432 (configurable)
- Frontend development server runs on port 5173

## 📄 License

[Your License Here]
- `Dockerfile` - Multi-stage Dockerfile for both backend and frontend
- `docker-compose.yml` - Docker Compose configuration

