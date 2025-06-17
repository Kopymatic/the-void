# Install node 22
FROM node:22
# Install bun and use it for build
FROM oven/bun:1 AS build

# Define the workdir
WORKDIR /app

# Install packages
RUN apt-get update
# Necessary for better-sqlite3
RUN apt-get install -y python3 build-essential


# Copy the package info for install
COPY package.json .
COPY bun.lock .

# Install packages
RUN bun i

# not sure what this is for exactly...
COPY . . 
# Run project setup
RUN bunx prisma migrate deploy
RUN bunx prisma generate
RUN bun run build

FROM node:22 AS run

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

EXPOSE 3000/tcp
ENTRYPOINT ["bun", "./build"]

# OLD

# # Node version
# ARG NODE_VERSION=18.0.0
# # Use node image
# FROM node:${NODE_VERSION}-alpine

# # use the official Bun image
# # see all versions at https://hub.docker.com/r/oven/bun/tags
# FROM oven/bun:1 AS base
# WORKDIR /usr/src/app

# # Install python
# RUN apt-get update
# # to fix sqlite3 "make not found" and python not found
# RUN apt-get install -y python3 build-essential

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY package.json bun.lock /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lock /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile --production

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM base AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# # COPY --from=install /temp/dev/build build
# COPY . .

# # [optional] tests & build
# # ENV NODE_ENV=production
# # RUN bun test
# # RUN bun run build

# # copy production dependencies and source code into final image
# FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# # COPY --from=prerelease /usr/src/app/index.ts .
# COPY --from=prerelease /usr/src/app/package.json .


# # run the app
# USER bun
# EXPOSE 3000/tcp
# ENTRYPOINT [ "bun", "run", "preview" ]