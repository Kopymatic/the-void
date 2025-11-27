#docker compose up db -d &&

#bunx prisma migrate dev &&
#bunx prisma generate &&

GIT_COMMIT=$(git rev-parse --short HEAD) bun dev