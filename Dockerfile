# Imagen base
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install

# Copiar todo el código restante
COPY . .

# Exponer el puerto WebSocket
EXPOSE 3001

# Comando por defecto
CMD ["node", "server.js"]
