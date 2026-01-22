FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar arquivos proto, views, public e código do servidor
COPY proto/ ./proto/
COPY views/ ./views/
COPY public/ ./public/
COPY app.js .

# Expor porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "app.js"]
