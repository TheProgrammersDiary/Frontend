FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -frozen-lockfile

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./
COPY --from=builder /app/ssl_certificate.pem ./
COPY --from=builder /app/ssl_private_key.pem ./

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]