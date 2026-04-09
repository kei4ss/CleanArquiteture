FROM node:20-alpine 

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY src ./src
COPY server.ts ./

# Build do TypeScript
RUN npm run build

# Comando para iniciar a aplicação
CMD ["npm", "start"]