# Étape 1 : Utiliser une image légère de Node.js
FROM node:latest
LABEL authors="almamyhaidara"

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier uniquement le build de l’application (dist/) et les fichiers essentiels
COPY package.json package-lock.json ./
COPY distv3/dist ./dist
COPY ./uploads ./uploads
COPY ./prisma ./prisma

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Étape 4 : Installer uniquement les dépendances de production
RUN npm install -f --omit=dev

# Étape 5 : Définir les variables d’environnement
ENV PORT=5000
# ENV DATABASE_URL=postgresql://neondb_owner:npg_raD1zwtqEb3Z@ep-old-leaf-a8o55vxz-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
#ENV DATABASE_URL="postgresql://postgres:adminpsql@127.0.0.1:5433/sugu_db?schema=public"

# RUN npx prisma db push

# Étape 6 : Exposer le port
EXPOSE 5000

# Étape 7 : Lancer l’application NestJS
# CMD ["node", "dist/main.js"]
ENTRYPOINT ["/app/entrypoint.sh"]