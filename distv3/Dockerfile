# Étape 1 : Utiliser une image légère de Node.js
FROM node:latest
LABEL authors="almamyhaidara"

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier uniquement le build de l’application (dist/) et les fichiers essentiels
COPY package.json package-lock.json ./
COPY dist ./dist
COPY prisma ./prisma

# Étape 4 : Installer uniquement les dépendances de production
RUN npm install -f --omit=dev



# Étape 5 : Définir les variables d’environnement
ENV PORT=5000
ENV DATABASE_URL=postgresql://neondb_owner:npg_raD1zwtqEb3Z@ep-old-leaf-a8o55vxz-pooler.eastus2.azure.neon.tech/neondb?sslmode=require

# Étape 6 : Exposer le port
EXPOSE 5000

# Étape 7 : Lancer l’application NestJS
CMD ["node", "dist/main.js"]
