# Étape 1 : Utiliser une image légère de Node.js
FROM node:18-slim
LABEL authors="almamyhaidara"

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires
COPY package*.json ./
COPY distv3/dist ./dist
COPY prisma ./prisma
COPY entrypoint.sh ./
COPY uploads /app/uploads

# Étape 4 : Installer les dépendances et configurer les permissions
RUN npm install --omit=dev && \
    chmod +x /app/entrypoint.sh && \
    mkdir -p /app/uploads && \
    chown -R node:node /app

# Étape 5 : Basculer vers un utilisateur non-root
USER node

# Étape 6 : Variables d'environnement
ENV PORT=5000
ENV NODE_ENV=production
ENV DATABASE_URL="mysql://aviplus:aviplus@mltdev.ml:3306/sugu_db"

# Étape 7 : Exposer le port
EXPOSE 5000

# Étape 8 : Volume pour les uploads
VOLUME /app/uploads

# Étape 9 : Point d'entrée
ENTRYPOINT ["/app/entrypoint.sh"]
