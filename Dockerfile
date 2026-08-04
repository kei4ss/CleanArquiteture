FROM node:20-alpine AS builder

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

FROM node:20-alpine AS runtime

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

# Comando para iniciar a aplicação
CMD ["npm", "start"]