#!/bin/bash

set -e # this makes sure that if any command fails, the script exits

echo "Starting dev environment..."

# Load environment variables from .env.local, or defaults
if [ -f .env.local ]; then
    echo "Loading .env.local..."
    export $(grep -v '^#' .env.local | xargs)
elif [ -f .env ]; then
    echo "Loading .env..."
    export $(grep -v '^#' .env | xargs)
else
    echo ".env.local not found. Using defaults..."
fi

# Start database in background
echo "Starting postgres..."
docker compose -f compose.dev.yml up -d db

# Run prisma migrations
echo "Running Prisma migrations..."
bunx prisma migrate dev

# Start the dev server with HMR
echo "Starting dev server..."
GIT_COMMIT=$(git rev-parse --short HEAD) bunx vite dev