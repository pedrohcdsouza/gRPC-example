FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar arquivos proto e código do servidor
COPY proto/ ./proto/
COPY server.js .

# Expor porta
EXPOSE 50052

# Comando para iniciar o servidor
CMD ["node", "server.js"]
