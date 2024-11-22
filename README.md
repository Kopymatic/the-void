# the void

My personal little blogging/ranting/testing/learning/whatever platform

Here im going to put notes (mostly for me to use later)

## Example .env

```bash
DATABASE_URL="file:./../data/dev.db" # change to prod.db in production

# Discord id for who can manage posts and stuff
ADMIN_DISCORD_ID="<DISCORD ID HERE>"

# you should use npx auth to create this (or bunx auth if you're super cool)
AUTH_SECRET="<TOP SECRET>"
AUTH_DISCORD_ID="<DISCORD APPLICATION ID HERE>"
AUTH_DISCORD_SECRET="<DISCORD OAUTH SECRET HERE>"

# In production, trust the host
AUTH_TRUST_HOST=true

# For automatic backups.
DO_BACKUPS=true
BACKUP_INTERVAL=43200000
```
