# Use Node.js 20 LTS
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose port 5173 (Vite default)
EXPOSE 5173

# Start development server
CMD ["pnpm", "run", "dev"]
