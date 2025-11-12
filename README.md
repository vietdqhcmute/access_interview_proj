# access_interview_proj

## Prerequisites

- Docker and Docker Compose
- Node.js 20.19.0 (if running outside Docker)

## Node version

This project uses Node.js 20.19.0. If you use nvm, run:

```sh
nvm install 20.19.0
nvm use 20.19.0
```

The file `.nvmrc` at the repository root pins the version for `nvm`.

## Setup on a new machine

### 1. Clone the repository

```sh
git clone <repository-url>
cd access_interview_proj
```

### 2. Configure environment variables

Docker Compose will automatically use your system's UID and GID to avoid file permission issues.

**Linux/macOS:**
```sh
# These are usually set automatically by your shell
echo $UID  # Should output your user ID (e.g., 1000)
echo $GID  # Should output your group ID (e.g., 1000)
```

**If needed**, create a `.env` file:
```sh
cp .env.example .env
# Edit .env and set UID=$(id -u) and GID=$(id -g)
```

### 3. Build and run with Docker

```sh
# Build the containers
docker-compose build

# Start all services (database, backend, frontend)
docker-compose up

# Or run in detached mode
docker-compose up -d
```

### 4. Access the application

- **Backend (Rails API):** http://localhost:3000
- **Frontend:** http://localhost:5173
- **Database:** localhost:3306

### 5. Common commands

```sh
# Stop all services
docker-compose down

# Rebuild after Dockerfile changes
docker-compose build

# View logs
docker-compose logs -f

# Run Rails commands
docker-compose exec web rails console
docker-compose exec web rails db:migrate

# Run bundle install if you add gems
docker-compose exec web bundle install

# Fix file permissions (if needed)
sudo chown -R $(id -u):$(id -g) backend/
sudo chown -R $(id -u):$(id -g) frontend/
```

## Project Structure

- `backend/` - Rails API backend
- `frontend/` - Frontend application (Vite + pnpm)
- `Dockerfile` - Multi-stage Dockerfile for both backend and frontend
- `docker-compose.yml` - Docker Compose configuration

