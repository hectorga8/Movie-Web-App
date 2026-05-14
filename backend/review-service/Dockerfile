FROM node:20-alpine

# Instalamos pnpm globalmente
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5004

CMD ["pnpm", "run", "dev"]
