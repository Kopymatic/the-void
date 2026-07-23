# Install node and use it for build
FROM node:24-alpine AS build


# Define the workdir
WORKDIR /app

# Necessary for better-sqlite3
RUN apk add --no-cache python3 
# RUN apk add --no-cache build-essential

COPY . . 
# RUN sh -c '. ./.env.deploy'
RUN echo $DATABASE_URL

# Copy the package info for install
COPY package.json .
COPY package-lock.json .

# Install packages
RUN npm i

# not sure what this is for exactly...

# Run project setup
RUN npx prisma generate
RUN npm run build

FROM node:24-alpine AS run

RUN apk add --no-cache openssl

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/startup.sh ./startup.sh

EXPOSE 3000/tcp
RUN chmod +x ./startup.sh
CMD ["./startup.sh"]