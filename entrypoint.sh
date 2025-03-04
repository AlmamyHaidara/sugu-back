#!/bin/sh
# entrypoint.sh

echo "=== Pushing Prisma schema to DB ==="
npx prisma db push

echo "=== Starting application ==="
# Exécute le process principal (Nest en l’occurrence)
exec node dist/main.js

