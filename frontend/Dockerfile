
# frontend/Dockerfile
FROM node:20

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]