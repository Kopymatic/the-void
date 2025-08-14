# https://stackoverflow.com/a/67403701
bunx prisma migrate deploy
bunx prisma generate

#doesnt work in docker container, so...
# GIT_COMMIT=$(git rev-parse --short HEAD) 
bun ./build