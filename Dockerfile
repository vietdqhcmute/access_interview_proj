# Multi-stage Dockerfile for both backend and frontend

# ============================================
# Backend Stage (Ruby/Rails)
# ============================================
FROM ruby:3.3 AS backend

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
    nodejs \
    npm \
    postgresql-client \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install yarn
RUN npm install -g yarn

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock first for better caching
COPY backend/Gemfile backend/Gemfile.lock* ./

# Install gems to the bundle cache location
RUN bundle install

# Copy the rest of the application
COPY backend/ .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["rails", "server", "-b", "0.0.0.0"]

# ============================================
# Frontend Stage (Node.js)
# ============================================
FROM node:20-alpine AS frontend

# Install pnpm directly via npm (avoiding corepack issues)
RUN npm install -g pnpm@9.15.0

# Set working directory
WORKDIR /app

# Copy package files
COPY frontend/package.json frontend/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY frontend/ .

# Expose port 5173 (Vite default)
EXPOSE 5173

# Start development server
CMD ["pnpm", "run", "dev", "--", "--host"]
