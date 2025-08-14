# https://stackoverflow.com/a/67403701
bunx prisma migrate deploy
bunx prisma generate

GIT_COMMIT=$(git rev-parse --short HEAD) bun ./build