#!/bin/sh
npm run prisma:generate
npm run prisma:migrate
exec node dist/main.js