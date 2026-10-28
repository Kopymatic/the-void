#Build stage
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY prisma ./prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate

COPY . .

RUN npm run build

# Runtime
FROM node:24-alpine AS run
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy build artifacts (only what's needed to run)
COPY --from=build --chown=nodejs:nodejs /app/build ./build
COPY --from=build --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nodejs:nodejs /app/prisma ./prisma
COPY --from=build --chown=nodejs:nodejs /app/startup.sh ./startup.sh

# Copy static files and config
COPY --chown=nodejs:nodejs ./static ./static

# Expose app port
EXPOSE 3000/tcp

# Switch to non-root user
USER nodejs

RUN chmod +x ./startup.sh

# Health check for orchestrator
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Forward build args to runtime stage
ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

EXPOSE 3000/tcp
CMD ["./startup.sh"]