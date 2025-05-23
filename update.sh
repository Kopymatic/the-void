#!/usr/bin/env bash
# This takes us to the directory of the script
cd ${0%/*} &&
echo "I'm in $(pwd)"

echo "Getting .env variables"
set -a && source .env && set +a
echo $DEVELOPMENT
if [[ $DEVELOPMENT == true ]]; then
  echo "In development, stopping"
else
  echo "In production, updating..."
  # Pull from the-void repo
  echo "Pulling from git"
  # https://stackoverflow.com/q/1125968 using a mixture of answers from this
  # This should pull and merge, preferring the origin repo
  git stash
  git pull -s recursive -X theirs &&

  # Bun Install
  echo "Bun Installing"
  bun install &&

  # Prisma generate
  echo "Applying any necessary Prisma migrations..."
  bunx prisma migrate deploy &&
  bunx prisma generate

  # Build
  printf "\nBuilding\n"
  bun run build &&

  # Restart using pm2
  printf "\nRestarting\n"
  pm2 restart thevoid
fi


