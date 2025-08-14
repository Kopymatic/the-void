# Install bun and use it for build
FROM oven/bun:1 AS build

RUN --mount=type=secret,id=env,target=./.env.deploy bash -c 'source ./.env.deploy'

# Define the workdir
WORKDIR /app

# Install packages
RUN apt-get update
# Necessary for better-sqlite3
RUN apt-get install -y python3 build-essential

RUN echo $DATABASE_URL

# Copy the package info for install
COPY package.json .
COPY bun.lock .

# Install packages
RUN bun i

# not sure what this is for exactly...
COPY . . 

# Run project setup
RUN bunx prisma generate
RUN bun run build

FROM oven/bun:1 AS run

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/startup.sh ./startup.sh

EXPOSE 3000/tcp
RUN chmod +x ./startup.sh
CMD ["./startup-prod.sh"]
