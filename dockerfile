# syntax=docker/dockerfile:1.9
# Dependencies stage
FROM node:22-alpine AS deps
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and lockfile for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production dependencies stage
FROM node:22-alpine AS prod-deps
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and all node_modules
COPY package.json pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules

# Prune development dependencies
RUN pnpm prune --prod

# Development stage
FROM node:22-alpine AS development
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and lockfile
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose application port
EXPOSE 3000

# Start the application in development mode
CMD ["pnpm", "run", "start:dev"]

# Production stage
FROM node:22-alpine AS production

# Set production environment
ENV NODE_ENV=production

# Install tini for proper signal handling
RUN apk add --no-cache tini

WORKDIR /app

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application
COPY --from=build /app/dist ./dist

# Copy package files
COPY package*.json ./

# Create non-root user with consistent GID/UID
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs && \
    chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose application port
EXPOSE 3000

# Use tini as entrypoint for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "dist/main"]