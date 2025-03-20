# Usa la imagen oficial de Node.js
FROM node:22

# Configurar variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo package.json y package-lock.json para aprovechar la caché de Docker
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto 8080 para Google Cloud Run
EXPOSE 8080

# Comando de inicio
CMD ["npm", "run", "dev"]
