# Kopymatic.com

My personal little blogging/ranting/testing/learning/whatever platform

Here im going to put notes (mostly for me to use later)

## How to dev

for some reason i forgot this after taking a break so....

to run the project without suffering _too_ much, run the db on its own `docker compose --profile dev up`
and then just the usual `bun dev`

you should also be able to use startup-dev.sh

## Example .env

```bash
DATABASE_URL="file:./../data/dev.db" # change to prod.db in production

# Discord id for who can manage posts and stuff
ADMIN_DISCORD_ID="<DISCORD ID HERE>"

# AUTH STUFF
# you should use npx auth to create this (or bunx auth if you're super cool)
AUTH_SECRET="<TOP SECRET>"
AUTH_DISCORD_ID="<DISCORD APPLICATION ID HERE>"
AUTH_DISCORD_SECRET="<DISCORD OAUTH SECRET HERE>"

# Only for production
AUTH_TRUST_HOST=true
ORIGIN="<origin>"
NEXTAUTH_URL="<next auth url>"

# For automatic backups.
DO_BACKUPS=true
BACKUP_INTERVAL=43200000
```
