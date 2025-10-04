docker compose up db -d &&

bunx prisma migrate dev &&
bunx prisma generate &&

bun dev