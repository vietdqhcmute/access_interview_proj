# access_interview_proj

## Demo

Visit the live demo: **https://access-interview-proj.vercel.app/**

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

**Create your `.env` file:**
```sh
cp .env.example .env
```

**Generate a JWT secret key:**
```sh
# After starting containers, generate a secure JWT secret
docker compose exec web rails secret

# Copy the output and add it to your .env file:
# DEVISE_JWT_SECRET_KEY=<paste_the_generated_secret_here>
```

**Configure User ID and Group ID (for file permissions):**

Docker Compose will use your system's UID and GID to avoid file permission issues.

**Linux/macOS:**
```sh
# Docker Compose automatically reads $UID and $GID from your shell
# Verify your IDs:
echo $UID  # Should output your user ID (e.g., 1000)
echo $GID  # Should output your group ID (e.g., 1000)
```

**Note:** On most Linux/macOS systems, `$UID` and `$GID` are automatically set by your shell. The containers will run with these IDs to ensure files created inside the container have the correct ownership on your host machine.

**If you encounter permission issues**, edit the `.env` file:
```sh
# Update UID and GID if your IDs are different from 1000:
UID=$(id -u)
GID=$(id -g)
```

**IMPORTANT:** Never commit the `.env` file to version control! It contains secrets.

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

